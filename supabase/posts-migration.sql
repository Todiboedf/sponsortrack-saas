-- ═══════════════════════════════════════════════════════════════════
-- Posts backfill table (Apify collectors) — idempotent, additive only.
-- Run in Supabase SQL Editor. Does not touch any existing table.
-- ═══════════════════════════════════════════════════════════════════

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  account text not null,
  platform text not null check (platform in ('instagram','tiktok','twitter','youtube','facebook')),
  posted_at timestamptz,
  caption text,
  likes int,
  comments int,
  permalink text not null,
  sponsor_tags text[] not null default '{}',
  raw jsonb,
  created_at timestamptz not null default now(),
  unique(platform, permalink)
);

create index if not exists posts_account_idx on public.posts(account, posted_at desc);
create index if not exists posts_posted_at_idx on public.posts(posted_at desc);

alter table public.posts enable row level security;

-- Writes via service role only; anon read allowed (future demo widgets).
drop policy if exists posts_anon_read on public.posts;
create policy posts_anon_read on public.posts for select to anon using (true);
