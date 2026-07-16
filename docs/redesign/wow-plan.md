# Sponsorlens "wow" redesign — design doc (v1, July 2026)

North star: **broadcast-grade sports intelligence.** The site should look like the
product's own computer-vision output: precise, technical, alive. The real model
already renders volt yellow-green detection chips with dark mono text and a
mono chyron bar (`Sponsorlens — logo detection | recorded broadcast POC`) — the
site adopts that language as its identity. Craft bar: Linear (type discipline),
Stripe (polish), Vercel (dark-UI confidence). Their standards, none of their pixels.

## 1. Signature motif — the detection overlay

One brand gesture, used consistently and sparingly:

- **HUD frame**: corner-bracket target frames (2px, volt) around real artifacts
  (video, report, stat blocks). Component: `HudFrame` (evolution of DetectionBox).
- **Confidence tag**: mono uppercase chip, volt background + navy text, exactly
  like the model output: `KOSNER · 0.91`, `MEASURED · 0.98`.
- **Chyron section label**: broadcast lower-third replacing every pill kicker —
  a volt tick `▮` + mono uppercase label + thin rule. Component: `Chyron`.
- **Lock-on hover**: cards grow corner brackets + a confidence tag on hover
  (CSS-only, `group-hover`, opacity/transform).
- **Ticker**: broadcast bottom-bar strip of real study metrics (CSS marquee).

Usage budget: max one *animated* motif moment per viewport. Brackets may appear
statically wherever a real artifact needs framing.

## 2. Tokens

### Color (one accent; navy value range widened)

| token | value | role |
|---|---|---|
| `navy-black` | `#050B14` | near-black sections (hero floor, final CTA) |
| `navy` | `#0A1628` | base background (kept) |
| `navy-elev` | `#0E1D33` | elevated surface (cards) |
| `navy-line` | `rgba(230,237,243,0.10)` | hairlines |
| `volt` | `#D8FF3E` | THE accent: primary CTA, live signals, brackets, active states |
| `volt-dim` | `rgba(216,255,62,0.55)` | secondary volt strokes |
| `cream` | `#F4EFE6` | primary text on navy (kept), "report paper" surface on pricing tables |
| `amber` | `#E8A33D` | status: IN DEVELOPMENT only |
| `slate` | `#8B98A9` | status: PLANNED only, muted text |

Retired: gold `#B8975A` (everywhere), crimson `#8B0028` as UI accent, all
`text-gradient-*` utilities, gradient orbs/mesh backgrounds. Crimson survives
nowhere; volt is the only CTA color. Contrast: volt on navy ≈ 15:1, navy text
on volt ≈ 13:1, cream on navy ≈ 14:1 — all AA+.

Status system (mono, quiet): LIVE = volt outline · IN DEVELOPMENT = amber
outline · PLANNED = slate outline. Labels/semantics unchanged, restyle only.

### Type

- **Display**: Archivo variable (`next/font/google`, `wdth` axis).
  Expanded caps (wdth 125, 600–700) for kickers/stat labels = scoreboard energy;
  regular width, tight tracking (-0.02em) for headlines, weights 600–750.
- **Body**: Inter (kept).
- **Data**: JetBrains Mono — every number, timestamp, badge, confidence, table
  figure. `tabular-nums` always.
- **Retired**: Playfair Display entirely. No serif system; no italic-accent
  pattern anywhere.

Scale (desktop): hero 64–76px / section H2 36–44px / H3 20–24px / body 16–17px /
mono data 12–13px / chyron 11px caps +0.18em.

### Space, radius, motion

- Section rhythm: `py-16 lg:py-20` (max gap between content blocks ≤160px).
  No viewport-height voids; every section carries a real data artifact.
- Radius: HUD/brackets = 0 (square, like the model output); cards 12px; buttons 8px
  (rectangular chyron-like CTAs, not pills).
- Motion: entrances one-time, ≤500ms, transform/opacity only, ≤3 staggered
  siblings, IntersectionObserver. Count-ups 0.8s. Ticker = CSS transform marquee.
  Hero renders instantly; the HUD bracket draws ~300ms after paint (CSS only).
  No scroll-linked JS anywhere: GSAP + ScrollTrigger removed from the bundle.
  `prefers-reduced-motion`: all non-essential motion off (global CSS + MotionConfig).

## 3. Per-page plan

### Home
1. **Hero (asymmetric, left-aligned)**: instant headline "Measured, not estimated."
   — HUD brackets lock onto "Measured," with tag `MEASURED · 0.98` (wow #a).
   Mono subline (daily measurement · Mondays 07:00). Volt CTA "Open the live demo"
   + quiet secondary. The real detection video sits right beside/under the fold line
   inside a HudFrame with a broadcast chyron caption. Mono trust microline.
2. **Ticker strip** (wow #b): real study numbers on loop — 283 posts · 62% Kosner
   screen time · 14× TikTok vs IG · €5.84M EMV/30d · 26:14 logo seconds · 9 accounts.
3. **Osasuna study**: split — real weekly-report page in a HudFrame + three
   measured numbers as detection chips. "Not a client — a public-data study" kept.
4. **Problem**: editorial numbered rows (01/02/03), each with a small real artifact
   (spreadsheet row motif in mono), no icon-card grid.
5. **Platform**: asymmetric bento — social analytics panel (real IG/TT split),
   CV panel (real poster frame + boxes), reporting panel (real report crop).
   Status chips on every claim (labels unchanged). Lock-on hover (wow #c).
6. **How it works**: static broadcast timeline — 4 steps as timecode segments on
   one bar (no pinning, no 400vh, no node diagram).
7. **Two views**: keep the club/sponsor split (real numbers), restyled chrome.
8. **Pre-launch strip**: the honest stats (1 founder, 8 sponsors, 100% EU, 283
   posts) as one compact mono band — replaces the big stats box.
9. **Pricing teaser**: same tiers/values, restyled (mono prices, volt featured ring).
10. **Final CTA** on near-black: bracket-framed headline, real study line, CTAs.

### Features
Compact left hero (no orbs), pillar rows keep alternating copy/mockup layout but
mockup chrome moves to volt/mono HUD language; comparison table on cream "report
paper"; compact CTA. All statuses/plans/copy claims unchanged.

### Pricing
Compact hero + billing toggle (volt active state), tier cards (values untouched,
mono figures), cream comparison matrix + FAQ restyled. Setup-fee note kept.

### About
Founder-led editorial: keep all copy/claims; values as a 2×2 editorial list (no
icon cards); milestones as mono timecode timeline; real-number stat grid in HUD
chips; illustrative-scenario labelling untouched.

### Changelog
Mono date rail + entry cards with status-chip tags. Copy unchanged.

### Contact / Login / 404
Same identity: chyron kickers, rectangular inputs with volt focus ring, no orbs.

### OG image + favicon
OG: navy field, volt HUD brackets locking "Measured, not estimated.", mono
bottom chyron `sponsorlens.io · logo detection · reported Mondays 07:00`.
Favicon/logo mark: volt corner-bracket + center dot (detection reticle) — replaces
the dashed lens rings; wordmark stays "Sponsorlens" (Archivo semibold).

### /demo
Coherence pass only: typography vars resolve to Archivo automatically, swap
gold accents → volt/cream in chart chrome where trivial, keep all functionality.

## 4. Anti-generic checklist (QA gate)

1. Zero headings with serif + gold-italic pattern.
2. Zero identical 3-column icon-card grids.
3. No section is more than one viewport of emptiness.
4. A first-time visitor can name the ONE visual signature in 10s (detection overlay).
5. Every section contains a real data artifact.
6. Zero fake logos/testimonials/stock illustration.
7. Hero headline readable within 1s on Fast 3G (no animation gating).
8. Squint test: hierarchy still reads on screenshots.

Plus: build/typecheck green, both-width Playwright pass (no overflow, zero console
errors), AA contrast, visible focus, reduced-motion honored, no scroll-linked
main-thread work, no new dependency >20kb gzip (net: gsap **removed**).

## 5. Components

New: `Chyron`, `HudFrame`, `ConfidenceTag`, `Ticker`, `StatusChip` (FeatureBadge
restyle), lock-on hover treatment in `Card`.
Deleted: GradientOrb, AnimatedMesh, SectionDivider, ChaosBackground,
PlatformConvergence, GoldenHourBackdrop, HowItWorksScene (GSAP), AnimatedHeadline
(letter stagger), scenes/*. Dependencies: gsap removed.

## 6. Honesty invariants (unchanged, non-negotiable)

Osasuna = public study, never a client. CV = "in development". No invented
stats/testimonials/logos. Pricing values, truth labels, routes, SEO semantics
untouched. English copy; edits only sharpen the factual tone.
