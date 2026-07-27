# Supabase — AudcompAudit

| | |
|---|---|
| Project | **AudcompAudit** |
| Ref | `hqmahvhyljkllbcpqaeg` |
| URL | `https://hqmahvhyljkllbcpqaeg.supabase.co` |

## Apply the migrations

```bash
supabase link --project-ref hqmahvhyljkllbcpqaeg
supabase db push
```

`db push` applies everything in `migrations/` in filename order. Review
`20260727000000_wilfred_opportunities.sql` before running it — it creates the
Wilfred opportunity desk schema and turns on row-level security.

## Which key goes where

Supabase issues two classes of key. They are not interchangeable, and putting
the wrong one in the wrong place is the single most common way a Supabase
project gets breached.

| Key | Looks like | Where it may go | Bypasses RLS? |
|---|---|---|---|
| **Publishable / anon** | `sb_publishable_…` or a long `eyJ…` JWT with `"role":"anon"` | Client-side code, including `ops.html`. It is designed to be public. | No — RLS applies |
| **Secret / service_role** | `sb_secret_…` or a JWT with `"role":"service_role"` | Server-side only: edge functions, CI secrets, a backend you control. **Never** in a page, never in this repo. | **Yes — full access** |

`ops.html` is served from the public marketing site. Anything in it is readable
by anyone who loads the page. Only the publishable key belongs there.

If a secret key is ever pasted into a browser page, a commit, a chat window, or
a screenshot: **rotate it immediately** in Dashboard → Project Settings → API
Keys. Rotation is cheap; a leaked secret key is not.

## Why the dashboard shows no data even with a correct key

By design. The policies in the Wilfred migration require an authenticated
session belonging to a row in `public.staff`:

```sql
USING (public.is_staff())
```

A publishable key on its own is anonymous, so it reads nothing. That is the
intended behaviour for a page on a public domain — it is what stops a stranger
reading your pipeline.

To make the page show real data, add Supabase Auth sign-in and insert each
staff member into `public.staff`:

```sql
insert into public.staff (user_id, email, full_name, is_admin)
values ('<auth.users.id>', 'you@audcomp.com', 'Your Name', true);
```

**Do not** "fix" an empty dashboard by relaxing a policy to `USING (true)`.
That publishes every opportunity, rep name and deal value to the internet.

## Sharing the schema without sharing a secret

To have the dashboard built against the real tables, run this in the SQL editor
and share the output. It exposes structure only — no rows, no credentials.

```sql
select table_name, column_name, data_type, is_nullable
from information_schema.columns
where table_schema = 'public'
order by table_name, ordinal_position;
```
