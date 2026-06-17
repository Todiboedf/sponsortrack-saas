@AGENTS.md

# Sponsorlens

Sponsor-intelligence SaaS for sports clubs / leagues / brands. Solo founder (Guillaume Haas).
Stack: Next.js 16 · React 19 · TypeScript (strict) · Tailwind 4 · Supabase · Vercel.
Separate Python computer-vision pipeline in `cv/`; standalone data scripts in `scripts/`.

## Conventions
- **Read `node_modules/next/dist/docs/` before writing Next.js code** — this is Next 16, APIs differ (see AGENTS.md).
- TypeScript strict, zero `any`. Atomic commits.
- Secrets only in env (`.env.local`, Vercel) — never commit them.
- Brand (no cyan/violet/purple): navy `#0A1628` · red `#8B0028` · cream `#F4EFE6` · gold `#B8975A`.
  Fonts: Playfair Display (display) · Inter (body) · JetBrains Mono (data).

## Honesty posture — IMPORTANT (audience includes domain experts)
Copy is honest and founder-led. No invented stats, testimonials, or clients.
- CA Osasuna is a **demo / study club — NOT a signed client or pilot.** Never frame it as either.
- Computer vision is described **"in development"** in public copy (the POC is real, not a finished product).
- Never re-inflate claims that were deliberately toned down.

## Project state lives in code, not here
What's built / wired / live changes commit-to-commit and rots in this file.
Read the code; for the CV pipeline read `cv/RESUME.md`. Do not add a "what's connected" list here.
