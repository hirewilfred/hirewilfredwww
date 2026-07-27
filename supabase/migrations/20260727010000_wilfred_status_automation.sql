-- =====================================================================
-- Wilfred — status-driven automation for the existing outreach pipeline
--
-- This is ADDITIVE to the AudcompAudit schema. It deliberately does NOT
-- create salespeople/opportunities tables: those already exist as
-- public.experts and public.outreach_leads. Creating parallel tables would
-- fork the sales data into two places that immediately disagree.
--
-- outreach_leads is LEFT ALONE. No columns are added to it and nothing in
-- this file writes to it: the trigger is AFTER UPDATE and only INSERTs into
-- outreach_agent_events. That table stays owned by the AudcompAudit app.
--
-- What it adds:
--   1. wilfred_automation_rules  — one row per "when status becomes X, do Y"
--   2. an AFTER UPDATE trigger on outreach_leads that logs each status change
--      and queues the enabled rules onto the existing outreach_agent_events
--   3. wilfred_lead_board        — the view the Ops Console reads
--
-- Statuses are the set already in use by outreach_leads:
--   researched | contacted | replied | interested | booked | closed | disqualified
--
-- 'booked' is the handoff point: a lead that books a first meeting becomes a
-- prospective AI client. Value and scope are established after that meeting,
-- downstream — never written back onto the lead.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Rules
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wilfred_automation_rules (
  id          TEXT PRIMARY KEY,
  on_status   TEXT NOT NULL,
  title       TEXT NOT NULL,
  detail      TEXT,
  agent       TEXT,
  enabled     BOOLEAN NOT NULL DEFAULT TRUE,
  config      JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT wilfred_rules_status_chk CHECK (on_status IN
    ('researched','contacted','replied','interested','booked','closed','disqualified'))
);

INSERT INTO public.wilfred_automation_rules (id, on_status, title, agent, detail) VALUES
  ('r_researched',  'researched',  'Enrich and assign',                  'Scout',
   'Complete firmographics and decision-maker contact, then round-robin to an expert. Nothing sends until the owner approves — approval_status stays pending_review.'),
  ('r_contacted',   'contacted',   'Run the send cadence',               'Sam',
   'Push the sequence through Instantly, respecting the campaign daily_send_cap. Each touch increments follow_up_count and stamps last_touch_at.'),
  ('r_replied',     'replied',     'Stop the cadence, classify the reply','Sam',
   'Halt the sequence immediately so nobody is chased after answering, classify intent, notify the owning expert.'),
  ('r_interested',  'interested',  'Offer the booking link',             'Olivia',
   'Send the owning expert''s bookings_url and propose times. Sets next_action_at so the lead cannot go quiet unnoticed.'),
  ('r_booked',      'booked',      'Prep the meeting, open the client pipeline', 'Olivia',
   'Build the pre-call brief 24 hours ahead and confirm the hold. Handoff point: the lead becomes a prospective AI client and enters the delivery pipeline at Initial meeting. Value is set there, after the meeting.'),
  ('r_closed',      'closed',      'Confirm the win and invoice',        'Quinn',
   'The deal already exists from the meeting handoff, so advance it to Agent building rather than creating a duplicate, then raise the first invoice.'),
  ('r_disqualified','disqualified','Capture the reason and suppress',    'Claire',
   'Record a loss reason, suppress the contact from every live cadence, add to long-cycle nurture.')
ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------
-- 2. AFTER UPDATE trigger on outreach_leads.
--
--    Deliberately AFTER, and deliberately INSERT-only. It reads the row and
--    writes to outreach_agent_events; it never modifies outreach_leads, so
--    the app's own handling of that table is untouched. Dropping the trigger
--    removes every trace of this feature from the outreach flow:
--
--      DROP TRIGGER trg_wilfred_lead_status ON public.outreach_leads;
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.wilfred_on_lead_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r RECORD;
BEGIN
  IF NEW.status IS NOT DISTINCT FROM OLD.status THEN
    RETURN NULL;                       -- AFTER trigger: return value is ignored
  END IF;

  -- Queue every enabled rule for the new status onto the existing event log.
  FOR r IN
    SELECT * FROM public.wilfred_automation_rules
    WHERE on_status = NEW.status AND enabled
  LOOP
    INSERT INTO public.outreach_agent_events
      (campaign_id, lead_id, agent_id, agent_display_name, event_type, summary, details, status, occurred_at)
    VALUES
      (NEW.campaign_id, NEW.id, r.id, r.agent, 'status_automation',
       r.title || ' — ' || COALESCE(NEW.company_name, 'unknown'),
       jsonb_build_object(
         'from_status', OLD.status,
         'to_status',   NEW.status,
         'rule_id',     r.id,
         'expert_id',   NEW.expert_id,
         'handoff',     (NEW.status = 'booked'),
         'changed_by',  auth.uid()),
       'queued', NOW());
  END LOOP;

  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_wilfred_lead_status ON public.outreach_leads;
CREATE TRIGGER trg_wilfred_lead_status
  AFTER UPDATE OF status ON public.outreach_leads
  FOR EACH ROW EXECUTE FUNCTION public.wilfred_on_lead_status_change();

-- ---------------------------------------------------------------------
-- 3. The board view the Ops Console reads
-- ---------------------------------------------------------------------
CREATE OR REPLACE VIEW public.wilfred_lead_board AS
SELECT
  l.id,
  l.company_name,
  l.contact_name,
  l.contact_email,
  l.status,
  l.next_action_note,
  l.next_action_at,
  l.follow_up_count,
  l.last_touch_at,
  l.updated_at,
  l.campaign_id,
  c.name        AS campaign_name,
  c.channel     AS campaign_channel,
  l.expert_id,
  e.full_name   AS expert_name,
  e.is_bdm,
  (l.status NOT IN ('closed','disqualified')) AS is_open
FROM public.outreach_leads l
LEFT JOIN public.outreach_campaigns c ON c.id = l.campaign_id
LEFT JOIN public.experts           e ON e.id = l.expert_id;

ALTER VIEW public.wilfred_lead_board SET (security_invoker = ON);

-- ---------------------------------------------------------------------
-- 4. RLS on the new rules table only. outreach_leads, outreach_campaigns,
--    experts and outreach_agent_events keep whatever policies they already
--    have — this migration does not touch them.
--
--    public.profiles.is_staff is the existing staff flag in this database,
--    so the rule table reuses it rather than inventing a second allow-list.
-- ---------------------------------------------------------------------
ALTER TABLE public.wilfred_automation_rules ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.wilfred_is_staff()
RETURNS BOOLEAN
LANGUAGE SQL SECURITY DEFINER SET search_path = public STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND (p.is_staff OR p.is_admin)
  );
$$;

DROP POLICY IF EXISTS wilfred_rules_staff_read ON public.wilfred_automation_rules;
CREATE POLICY wilfred_rules_staff_read ON public.wilfred_automation_rules
  FOR SELECT TO authenticated USING (public.wilfred_is_staff());

DROP POLICY IF EXISTS wilfred_rules_staff_write ON public.wilfred_automation_rules;
CREATE POLICY wilfred_rules_staff_write ON public.wilfred_automation_rules
  FOR ALL TO authenticated
  USING (public.wilfred_is_staff()) WITH CHECK (public.wilfred_is_staff());
