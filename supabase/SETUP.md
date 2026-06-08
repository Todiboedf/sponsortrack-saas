# Sponsorlens SaaS — Live data setup

Three steps to go live. Two of them are 30 seconds in a browser, one is a curl.

## 1. Create the schema (one-time, ~30 seconds)

1. Open the Supabase SQL editor: <https://supabase.com/dashboard/project/isboggphmcpnjeigrach/sql/new>
2. Paste the entire contents of `supabase/schema.sql`
3. Click **Run**

That creates `sponsors`, `sponsor_kpis_daily`, `sponsor_users`, RLS policies, and the `sponsor_kpis_latest` view.

## 2. Seed the 5 starter sponsors

```bash
curl -X POST https://sponsorlens-saas.vercel.app/api/seed \
  -H "Authorization: Bearer $CRON_SECRET"
```

Inserts: Nike, Adidas, Red Bull, Macron, Emirates (all real public Instagram handles).

## 3. Run the first daily collect manually

```bash
curl https://sponsorlens-saas.vercel.app/api/cron/collect-instagram \
  -H "Authorization: Bearer $CRON_SECRET"
```

Fetches `followers / posts / likes / comments / engagement_rate / EMV` for each sponsor's Instagram and writes today's row to `sponsor_kpis_daily`.

After that, refresh <https://sponsorlens-saas.vercel.app/demo> — the page now shows live data with a **Live data** badge.

## 4. Recurring daily refresh

Vercel cron (`vercel.json`) hits `/api/cron/collect-instagram` every day at 06:00 UTC. Nothing to do.

> **Note**: Instagram blocks Vercel egress IPs intermittently. If a daily run fails for that reason, retrying from the local CLI works (your home IP isn't blocked). Add a paid scraper API key (RapidAPI, Apify) later for reliability.

## 5. Per-sponsor login (optional)

1. Go to <https://sponsorlens-saas.vercel.app/login> → **Create account** with the sponsor's email.
2. Confirm the email (Supabase sends the verification link automatically).
3. In the Supabase SQL editor, link the user to a sponsor:
   ```sql
   insert into public.sponsor_users (user_id, email, sponsor_id, role)
   values (
     (select id from auth.users where email = 'sponsor@example.com'),
     'sponsor@example.com',
     (select id from public.sponsors where slug = 'nike'),
     'admin'
   );
   ```
4. They sign in at `/login` and are redirected to `/dashboard` — RLS scopes them to their sponsor's KPIs only.

## Secrets reference

| Name | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel + `.env.local` | client-safe |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel + `.env.local` | client-safe |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel + `.env.local` | server only |
| `CRON_SECRET` | Vercel + `.env.local` | gates `/api/cron/*` and `/api/seed` |

`CRON_SECRET` — set as an environment variable (Vercel + `.env.local`). **The previously-committed value was exposed in this public repo and must be rotated; never commit it again.**
