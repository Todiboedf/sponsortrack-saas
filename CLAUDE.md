@AGENTS.md

# Sponsorlens — project state

Sponsor-intelligence SaaS for sports clubs / leagues / brands. Solo founder (Guillaume Haas). First pilot: CA Osasuna.
Stack: Next 16.2.4 · React 19 · Tailwind 4 · Framer Motion · Recharts · Supabase.

## Brand
- Name is **Sponsorlens** (renamed from "SponsorTrack" — code is 100% Sponsorlens).
- Palette (sport-branded premium): navy `#0A1628` · red `#8B0028` · cream `#F4EFE6` · gold `#B8975A`.
  **No cyan / violet / purple** — the whole site was realigned to gold/red in 2026-06.
- Fonts: Playfair Display (display) · Inter (body) · JetBrains Mono (data).

## Domain & deploy
- Domain: **sponsorlens.io** (registered on Namecheap, account Todiboedf) — being connected to Vercel.
- `SITE_URL` in `app/layout.tsx` is already `https://sponsorlens.io`.
- GitHub repo: `Todiboedf/sponsortrack-saas`. Vercel project: `sponsortrack-saas` → renaming to `sponsorlens-saas`.

## Integrations — what is / isn't connected
- **Supabase** (DB / Auth / RLS): wired. Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- **Instagram analytics**: real, via RapidAPI (`RAPIDAPI_KEY`). Daily Vercel cron `/api/cron/collect-instagram`, gated by `CRON_SECRET`.
- **Contact form** `/api/contact`: NOT delivering — set `CONTACT_FORWARD_URL` (+ `CONTACT_FORWARD_TOKEN`) or leads are only console-logged.
- **Not built yet**: Stripe / payment; **computer vision (0% — currently a positioning claim, not a product)**.

## Honesty posture (keep it)
- Copy is **honest founder-led** (set 2026-06): computer vision is framed "in development", SOC 2 "planned", no fabricated stats or testimonials. The audience includes domain experts (e.g. Group 1 / Pierre Jouannin) — do not re-inflate claims.
- Computer vision is feasible (YOLO / Roboflow); the real constraint is footage rights, not the ML. Strategy in `notes/INVESTMENT-ROADMAP.md`.

## Docs
- `notes/SITE-AUDIT.md` — full technical + credibility audit, prioritized fixes.
- `notes/INVESTMENT-ROADMAP.md` — investment & roadmap one-pager (for the Group 1 partnership discussion).

## Conventions
- Obey `AGENTS.md`: read `node_modules/next/dist/docs/` before writing Next.js code (this is Next 16, APIs differ).
- TypeScript strict, zero `any`. Feature branches, atomic commits.
- Secrets only in env (Vercel + `.env.local`), never committed.
