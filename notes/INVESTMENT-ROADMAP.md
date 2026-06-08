# Sponsorlens : Investment & Roadmap

*One-pager for the Group 1 discussion. June 2026.*

---

## What Sponsorlens is

The sponsor-intelligence layer for sport: it measures, proves and grows the value of every sponsorship (social, in-venue, broadcast) and turns it into the reports that renew contracts.

**Why it's relevant to Group 1.** Group 1 sells, activates and monetises sponsorship inventory for rights holders and brands, but has no measurement / ROI product (its four services are Global Marketing, Talent Partnerships, Experiences, Commercial). Sponsorlens is exactly that missing layer: the proof engine behind Group 1's commercial pitch and renewals.

## Honest state (June 2026)

- **0 paying client, 0 signed pilot.** The product is built and a public demo runs on a fictional club ("Atlético Demo"). A LaLiga club was pitched via my Master's project but declined, so it is context, not a client.
- **Social analytics: built.** Instagram public data via a RapidAPI provider, KPIs + EMV, per-sponsor dashboard (Supabase, auth, RLS).
- **Computer vision: in active development.** Logo / jersey / LED screen-time on match footage. The ML is a solved class of problem; the real constraint is footage access, not the algorithm.

### Footage access, by tier

| Tier | Source | Status |
|---|---|---|
| 1 | Owned & social content (club / player) | Clean, available now. Where a POC runs. |
| 2 | In-venue capture (stadium LED / signage) | Club-authorised. |
| 3 | Recorded broadcast (media-monitoring style, Nielsen Sports lineage) | Grey zone at POC, licences at scale. |
| 4 | Official league / broadcaster partnership (real-time, audited value, multi-league) | Premium tier. **This is where Group 1's relationships unlock access.** |

## Roadmap & investment, 3 levels

**Level 0 · Proof of concept (now).** One match, 2-3 sponsor logos, measured screen-time, a sample exposure report. Cost: ~€0-500 + founder time. Purpose: de-risk and demo.

**Level 1 · Sellable MVP.** Productised CV pipeline + the existing dashboard + first paying property.

| Item | Detail | Weight |
|---|---|---|
| Team | 1 CV/ML engineer (key hire) + 1 product engineer; founder on product & commercial | 70-90% of budget |
| Compute | Cloud GPU for video processing, scales with match volume | hundreds €/mo early |
| Data | Audience data to turn exposure into € media value | variable |
| Legal | GDPR + rights / licence formalisation | one-off |

**12-month runway:** ~€50-100k ultra-lean (founder + freelancers) up to ~€200-400k with a small full-time team. Salary-dominated.

**Level 2 · Scale.** Multi-property, multi-league, official partnerships, real-time. The capital-intensive tier (peers raised $2.6M to $75M at this stage).

## What each side brings

| | Brings |
|---|---|
| **Guillaume / Sponsorlens** | Product, technology, founder execution |
| **Group 1** | Rights-holder & league relationships (footage access), brand demand, distribution. In-kind investment worth more than cash on the access problem. |
| **To fund (cash)** | The CV/ML build + compute. The one piece relationships can't replace. |

## The ask

1. Validate a **POC together on one property** (owned / social content to start).
2. Agree the **partnership shape**: access + distribution vs. equity / cash.
3. **Scope the MVP** and its funding.

*Contact: Guillaume Haas · guillaume.haas.nice@gmail.com*
