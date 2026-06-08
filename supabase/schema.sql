-- ═══════════════════════════════════════════════════════════════════
-- Sponsorlens SaaS — Database Schema
-- Run in Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- Project: isboggphmcpnjeigrach
-- ═══════════════════════════════════════════════════════════════════

-- 1. Sponsors ─────────────────────────────────────────────────────
create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  logo_url text,
  instagram_handle text,
  tiktok_handle text,
  twitter_handle text,
  industry text,
  country text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists sponsors_slug_idx on public.sponsors(slug);

-- 2. Daily KPIs per sponsor per platform ─────────────────────────
create table if not exists public.sponsor_kpis_daily (
  id uuid primary key default gen_random_uuid(),
  sponsor_id uuid not null references public.sponsors(id) on delete cascade,
  platform text not null check (platform in ('instagram','tiktok','twitter','youtube','facebook')),
  date date not null,
  followers int,
  posts int,
  likes int,
  comments int,
  shares int,
  reach int,
  impressions int,
  engagement_rate numeric(6,3),
  emv numeric(12,2),
  raw jsonb,
  created_at timestamptz not null default now(),
  unique(sponsor_id, platform, date)
);

create index if not exists sponsor_kpis_daily_sponsor_idx on public.sponsor_kpis_daily(sponsor_id, date desc);
create index if not exists sponsor_kpis_daily_date_idx on public.sponsor_kpis_daily(date desc);
create index if not exists sponsor_kpis_daily_platform_idx on public.sponsor_kpis_daily(platform);

-- 3. Sponsor users (auth) ─────────────────────────────────────────
create table if not exists public.sponsor_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text unique not null,
  sponsor_id uuid references public.sponsors(id) on delete set null,
  role text not null default 'viewer' check (role in ('admin','viewer')),
  created_at timestamptz not null default now()
);

create index if not exists sponsor_users_sponsor_idx on public.sponsor_users(sponsor_id);

-- 4. Row-level security ───────────────────────────────────────────
alter table public.sponsors enable row level security;
alter table public.sponsor_kpis_daily enable row level security;
alter table public.sponsor_users enable row level security;

-- Public read for sponsors list (logos, names) — used on demo page
drop policy if exists sponsors_public_read on public.sponsors;
create policy sponsors_public_read on public.sponsors
  for select using (true);

-- KPIs: a logged-in user only sees rows of sponsors they're attached to
-- Anonymous demo can read aggregated data — we expose a public-safe view below
drop policy if exists kpis_select_own on public.sponsor_kpis_daily;
create policy kpis_select_own on public.sponsor_kpis_daily
  for select to authenticated using (
    sponsor_id in (
      select sponsor_id from public.sponsor_users where user_id = auth.uid()
    )
  );

drop policy if exists kpis_select_anon_demo on public.sponsor_kpis_daily;
create policy kpis_select_anon_demo on public.sponsor_kpis_daily
  for select to anon using (true);

drop policy if exists sponsor_users_select_own on public.sponsor_users;
create policy sponsor_users_select_own on public.sponsor_users
  for select to authenticated using (user_id = auth.uid());

-- 5. Helper view: latest KPI per sponsor/platform ────────────────
create or replace view public.sponsor_kpis_latest as
select distinct on (sponsor_id, platform)
  sponsor_id, platform, date, followers, posts, likes, comments,
  engagement_rate, emv
from public.sponsor_kpis_daily
order by sponsor_id, platform, date desc;

-- 6. Contact form messages (leads) ───────────────────────────────
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  reason text,
  name text not null,
  email text not null,
  company text,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_idx on public.contact_messages(created_at desc);

alter table public.contact_messages enable row level security;
-- No anon/authenticated policy on purpose: only the service role (the
-- /api/contact route, via SUPABASE_SERVICE_ROLE_KEY) can read/write leads.

-- 7. Computer-vision broadcast / in-venue exposure ───────────────
-- Populated by the Python pipeline in cv/ (see cv/README.md).
create table if not exists public.cv_matches (
  id uuid primary key default gen_random_uuid(),
  property text not null,
  opponent text,
  competition text,
  match_date date,
  source text check (source in ('recorded-broadcast','in-venue','owned')),
  video_label text,
  duration_seconds numeric,
  sample_fps numeric,
  processed_at timestamptz not null default now()
);

create table if not exists public.cv_sponsor_exposure (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.cv_matches(id) on delete cascade,
  sponsor text not null,
  placement text check (placement in ('jersey','led','backdrop','pitch','other')),
  visible_seconds numeric not null default 0,
  detections int not null default 0,
  avg_area_pct numeric,
  peak_area_pct numeric,
  first_seen_seconds numeric,
  last_seen_seconds numeric,
  est_media_value numeric,
  created_at timestamptz not null default now()
);

create index if not exists cv_exposure_match_idx on public.cv_sponsor_exposure(match_id);

alter table public.cv_matches enable row level security;
alter table public.cv_sponsor_exposure enable row level security;
-- Writes happen via the service role (the cv/ pipeline). Anon read is allowed so
-- the public demo can render results; tighten to authenticated if you go private.
drop policy if exists cv_matches_anon_read on public.cv_matches;
create policy cv_matches_anon_read on public.cv_matches for select to anon using (true);
drop policy if exists cv_exposure_anon_read on public.cv_sponsor_exposure;
create policy cv_exposure_anon_read on public.cv_sponsor_exposure for select to anon using (true);
