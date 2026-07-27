-- =====================================================================
-- Wilfred opportunity desk
-- Sales teams (Media / Animals / Experts), their salespeople, and every
-- opportunity tracked by status so automation can hang off status changes.
--
-- SECURITY POSTURE
-- ops.html is served from the public marketing site, so its Supabase anon
-- key is readable by anyone who loads the page. Every policy below
-- therefore requires an AUTHENTICATED session that maps to a row in
-- public.staff. An anon key on its own reads nothing. Do not add
-- "USING (true)" SELECT policies to these tables — that would publish the
-- sales pipeline to the internet.
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.sales_team AS ENUM ('media', 'animals', 'experts');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.opportunity_status AS ENUM (
    'new', 'contacted', 'qualified', 'discovery',
    'proposal', 'negotiation', 'stalled', 'won', 'lost'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ---------------------------------------------------------------------
-- Staff — the allow-list. A Supabase auth user only gets access if their
-- user id appears here. This is what makes the anon key useless on its own.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.staff (
  user_id     UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  full_name   TEXT,
  is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (SELECT 1 FROM public.staff s WHERE s.user_id = auth.uid());
$$;

-- ---------------------------------------------------------------------
-- Salespeople
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.salespeople (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT UNIQUE,
  team        public.sales_team NOT NULL,
  initials    TEXT,
  user_id     UUID REFERENCES auth.users (id) ON DELETE SET NULL,
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_salespeople_team ON public.salespeople (team) WHERE active;

-- ---------------------------------------------------------------------
-- Opportunities
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.opportunities (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  company         TEXT NOT NULL,
  team            public.sales_team NOT NULL,
  salesperson_id  UUID REFERENCES public.salespeople (id) ON DELETE SET NULL,
  status          public.opportunity_status NOT NULL DEFAULT 'new',
  value           NUMERIC(12,2) NOT NULL DEFAULT 0,
  is_recurring    BOOLEAN NOT NULL DEFAULT TRUE,
  next_action     TEXT,
  expected_close  DATE,
  source          TEXT,
  notes           TEXT,
  status_changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_opportunities_status ON public.opportunities (status);
CREATE INDEX IF NOT EXISTS idx_opportunities_team   ON public.opportunities (team, status);
CREATE INDEX IF NOT EXISTS idx_opportunities_rep    ON public.opportunities (salesperson_id);
CREATE INDEX IF NOT EXISTS idx_opportunities_updated ON public.opportunities (updated_at DESC);

-- ---------------------------------------------------------------------
-- Status history — every transition, so automation is auditable and you
-- can measure time-in-stage rather than guessing at it.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.opportunity_status_history (
  id              BIGSERIAL PRIMARY KEY,
  opportunity_id  UUID NOT NULL REFERENCES public.opportunities (id) ON DELETE CASCADE,
  from_status     public.opportunity_status,
  to_status       public.opportunity_status NOT NULL,
  changed_by      UUID REFERENCES auth.users (id) ON DELETE SET NULL,
  changed_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  dwell_seconds   BIGINT
);

CREATE INDEX IF NOT EXISTS idx_status_history_opp
  ON public.opportunity_status_history (opportunity_id, changed_at DESC);

-- ---------------------------------------------------------------------
-- Automation rules — one row per "when status becomes X, do Y".
-- enabled=false stops the rule firing without deleting the history.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.automation_rules (
  id            TEXT PRIMARY KEY,
  on_status     public.opportunity_status NOT NULL,
  title         TEXT NOT NULL,
  detail        TEXT,
  enabled       BOOLEAN NOT NULL DEFAULT TRUE,
  agent         TEXT,
  config        JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- Automation runs — what actually fired. The dashboard's activity feed.
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.automation_runs (
  id              BIGSERIAL PRIMARY KEY,
  rule_id         TEXT REFERENCES public.automation_rules (id) ON DELETE SET NULL,
  opportunity_id  UUID REFERENCES public.opportunities (id) ON DELETE CASCADE,
  fired_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  outcome         TEXT NOT NULL DEFAULT 'queued',   -- queued | ok | skipped | error
  message         TEXT,
  payload         JSONB NOT NULL DEFAULT '{}'::JSONB
);

CREATE INDEX IF NOT EXISTS idx_automation_runs_time ON public.automation_runs (fired_at DESC);

-- ---------------------------------------------------------------------
-- Trigger: record the transition, stamp updated_at, and queue any enabled
-- rule for the new status. A worker (edge function or n8n) drains
-- automation_runs where outcome = 'queued'.
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_opportunity_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at := NOW();

  IF TG_OP = 'UPDATE' AND NEW.status IS DISTINCT FROM OLD.status THEN
    NEW.status_changed_at := NOW();

    INSERT INTO public.opportunity_status_history
      (opportunity_id, from_status, to_status, changed_by, dwell_seconds)
    VALUES
      (NEW.id, OLD.status, NEW.status, auth.uid(),
       GREATEST(0, EXTRACT(EPOCH FROM (NOW() - OLD.status_changed_at))::BIGINT));

    INSERT INTO public.automation_runs (rule_id, opportunity_id, outcome, message, payload)
    SELECT r.id, NEW.id, 'queued',
           r.title || ' — ' || NEW.company,
           jsonb_build_object(
             'from', OLD.status, 'to', NEW.status,
             'team', NEW.team, 'value', NEW.value,
             'salesperson_id', NEW.salesperson_id)
    FROM public.automation_rules r
    WHERE r.on_status = NEW.status AND r.enabled;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_opportunity_status ON public.opportunities;
CREATE TRIGGER trg_opportunity_status
  BEFORE UPDATE ON public.opportunities
  FOR EACH ROW EXECUTE FUNCTION public.handle_opportunity_status_change();

-- ---------------------------------------------------------------------
-- Reporting view the dashboard reads for its charts.
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW public.opportunity_board AS
SELECT
  o.id, o.name, o.company, o.team, o.status, o.value, o.is_recurring,
  o.next_action, o.expected_close, o.status_changed_at, o.updated_at,
  s.id   AS salesperson_id,
  s.name AS salesperson_name,
  s.initials,
  (o.status NOT IN ('won', 'lost')) AS is_open
FROM public.opportunities o
LEFT JOIN public.salespeople s ON s.id = o.salesperson_id;

-- ---------------------------------------------------------------------
-- Row level security — authenticated staff only, on every table.
-- ---------------------------------------------------------------------
ALTER TABLE public.staff                      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salespeople                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_rules           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_runs            ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS staff_self_read ON public.staff;
CREATE POLICY staff_self_read ON public.staff
  FOR SELECT TO authenticated USING (user_id = auth.uid());

DROP POLICY IF EXISTS salespeople_staff_read ON public.salespeople;
CREATE POLICY salespeople_staff_read ON public.salespeople
  FOR SELECT TO authenticated USING (public.is_staff());
DROP POLICY IF EXISTS salespeople_staff_write ON public.salespeople;
CREATE POLICY salespeople_staff_write ON public.salespeople
  FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS opportunities_staff_read ON public.opportunities;
CREATE POLICY opportunities_staff_read ON public.opportunities
  FOR SELECT TO authenticated USING (public.is_staff());
DROP POLICY IF EXISTS opportunities_staff_write ON public.opportunities;
CREATE POLICY opportunities_staff_write ON public.opportunities
  FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS status_history_staff_read ON public.opportunity_status_history;
CREATE POLICY status_history_staff_read ON public.opportunity_status_history
  FOR SELECT TO authenticated USING (public.is_staff());

DROP POLICY IF EXISTS rules_staff_read ON public.automation_rules;
CREATE POLICY rules_staff_read ON public.automation_rules
  FOR SELECT TO authenticated USING (public.is_staff());
DROP POLICY IF EXISTS rules_staff_write ON public.automation_rules;
CREATE POLICY rules_staff_write ON public.automation_rules
  FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS runs_staff_read ON public.automation_runs;
CREATE POLICY runs_staff_read ON public.automation_runs
  FOR SELECT TO authenticated USING (public.is_staff());

-- The view inherits RLS from its base tables under security_invoker.
ALTER VIEW public.opportunity_board SET (security_invoker = ON);

-- ---------------------------------------------------------------------
-- Seed: the nine automation rules the dashboard ships with.
-- ---------------------------------------------------------------------
INSERT INTO public.automation_rules (id, on_status, title, detail, agent) VALUES
  ('r_new',        'new',        'Enrich and route',
   'Sam pulls firmographics and the decision-maker contact, then routes the opportunity to the right team queue. Wilfred assigns an owner if none is set.', 'Sam'),
  ('r_contacted',  'contacted',  'Start the follow-up cadence',
   'Sam runs a three-touch sequence over eight days. Any reply stops the cadence and pings the owner.', 'Sam'),
  ('r_qualified',  'qualified',  'Offer the discovery slot',
   'Olivia sends the calendar link and drafts the $3,000 audit SOW from the vertical template. Owner approves before it goes out.', 'Olivia'),
  ('r_discovery',  'discovery',  'Prep the audit',
   'Olivia builds the workshop brief 24 hours ahead. Scout compiles the vertical research pack.', 'Olivia'),
  ('r_proposal',   'proposal',   'Chase the proposal',
   'Sam follows up on day 3 and day 7. No response by day 10 moves the opportunity to Stalled.', 'Sam'),
  ('r_negotiation','negotiation','Review the paper',
   'David reviews redlines against the MSA and flags deviations on liability, term or data residency.', 'David'),
  ('r_stalled',    'stalled',    'Re-engage, then park',
   'Claire drops the opportunity into a value-led nurture track. Wilfred re-surfaces it in 30 days.', 'Claire'),
  ('r_won',        'won',        'Hand off to delivery',
   'Creates the pipeline deal at Agent building, generates the agents.json seed config, and raises the first invoice through Quinn.', 'Quinn'),
  ('r_lost',       'lost',       'Capture the reason',
   'Prompts the owner for a loss reason, then adds the company to the long-cycle nurture list.', 'Claire')
ON CONFLICT (id) DO NOTHING;
