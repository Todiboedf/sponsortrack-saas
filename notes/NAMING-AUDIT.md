# Naming audit · SponsorTrack

**Date**: 2026-05-04
**Owner**: Guillaume Haas
**Status**: notes only · no rename action taken

## 1. Current name

`SponsorTrack` — descriptive, on-the-nose, confident sport-insider feel. The
name is currently used across the product, marketing site
(`sponsortrack-saas.vercel.app`), and the live pilot with CA Osasuna. The
brand identity is sport-branded premium (navy / red / cream / gold) and is
already shaped around the SponsorTrack wordmark.

## 2. Trademark / domain quick check

This is a one-pass desk audit, not a legal opinion. Before any rename, run
through a trademark attorney and a full `tsdr.uspto.gov` / EUIPO `tmview`
search.

- **sponsortrack.io** — currently used (vercel domain alias).
- **sponsortrack.com** — registered, not by us. Worth a buy-side ping.
- **sponsortrack.app** — likely available, candidate fallback.
- **sponsortrack.eu** — likely available; EU-first positioning fits.
- Direct competitors named close to "track" or "sponsor":
  - SponsorCX — sponsorship CRM
  - Sponsorium — partnership management
  - Trak.io — generic tracking
  - HelloSponsor — sponsor management
  - Greenfly — sport content / influencer management

No identical USPTO / EUIPO collision found in this quick pass for
`SponsorTrack` in Class 9 (software) and Class 42 (SaaS). Two adjacent marks
worth flagging in a deeper review:

- "Sponsor Track" (with space) — generic-leaning phrase used in several
  sponsor-services taglines.
- "Sportstrack" / "Sports Track" — used by analytics adjacent products.

Conclusion: name is defensible enough to keep through V3 design refresh.
A formal trademark filing is a Q3 task once the first two paid customers
are signed.

## 3. Twelve alternative names (sport-branded, founder-led)

Each line is the candidate name + a one-line pitch. None of these have been
applied to the codebase. They are reserved for a future naming sprint if a
trademark blocker appears.

1. **Renewly** — outcome-first. The product exists to renew sponsor
   contracts. Says it on the tin.
2. **SignalRights** — sponsor rights × measurement signal. Premium feel,
   slight legal undertone, fits sport-rights buyers.
3. **Pitchproof** — pitch (the field) plus proof (the report). Audit-grade
   reads in a one-word brand.
4. **Rightboard** — sponsor rights on a board (dashboard / boardroom).
   Two-sided meaning, sober.
5. **Sponsorlab** — research-and-development positioning. Implies a lab
   that builds new measurement methods, not yet another CRM.
6. **Mediaproof** — direct: the proof of media value. Reads as a
   methodology brand more than a SaaS, which is the founder bet.
7. **Spotbench** — sponsor spot (TV ad slang) + bench (squad). Two
   sport-insider words stitched together.
8. **ClubROI** — direct positioning. Risk: easy for clubs, less so for
   leagues. Strong in sales, weaker as a marketing brand.
9. **Sponsorsense** — sponsor + intelligence. Reads like a Bloomberg
   terminal for sponsorship. Easier `.com` shot.
10. **Frontboard** — sponsor exposure on the front of the jersey. Imagery
    is dense in one word.
11. **Renewdesk** — desk = operational hub for renewals. Calmer than
    Renewly; better for enterprise buyers.
12. **Inkpitch** — signed in ink + pitch. Strong, contract-flavoured.
    Risk: small market overlap with print / typography brands.

## 4. Recommendation

**Keep `SponsorTrack`** for V3 redesign. It is descriptive, defensible
in a quick search, and the existing equity (live URL, pilot, board pitch
deck) all point at it. Park the twelve alternates as fallback if the
formal Q3 trademark search turns up a blocker, in which case `Renewly`
and `Pitchproof` are the strongest contenders.

No code change. No domain action. Audit only.
