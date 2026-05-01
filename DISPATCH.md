---
title: Dispatch Claude Code · SponsorTrack SaaS Redesign V2
date: 2026-05-01
tags: [dispatch, sponsortrack, claude-code, redesign, urgent]
target_repo: ~/work/sponsortrack-saas/
production_url: https://sponsortrack-saas.vercel.app
estimated_duration: 4-8h
related_session: [[Sessions/2026-05-01-osasuna-board-debrief]]
---

# Dispatch · SponsorTrack SaaS · Redesign V2 (Sport-Branded Premium)

> Brief à coller dans Claude Code (WSL ou Dispatch mobile) après `cd ~/work/sponsortrack-saas/` puis `claude`.
> **Méthode imposée : spec-driven + plan-first + opérateur pattern (cf. best practices 2026).**

---

## ⚙️ INSTRUCTION D'OUVERTURE (OBLIGATOIRE)

Avant toute édition, tu dois :

1. **Lire le brief en entier** — sections 1 à 9
2. **Faire `/plan`** et produire un plan détaillé qui couvre toutes les phases ci-dessous
3. **Soumettre le plan** pour revue avant exécution
4. **Décomposer** en sub-agents pour les blocs indépendants (ex: design system / page hero / page pricing peuvent partir en parallèle)
5. **Travailler en branche** dédiée : `feat/redesign-v2-sport-branded`
6. **Commit atomiques** par feature (un commit = un changement compréhensible)
7. **Valider chaque phase** avant de passer à la suivante (build + lint + typecheck + screenshot)
8. **Ne pas ajouter de scope** : si tu as une idée hors brief, la poser en TODO en bas du PR, pas l'implémenter

---

## 1. CONTEXTE

SponsorTrack SaaS a été créé fin avril 2026. Le site existe (sponsortrack-saas.vercel.app) avec :
- Site vitrine (Next.js 16, Tailwind 4, Framer Motion, Recharts)
- Backend Supabase wired (sponsors / sponsor_kpis_daily / sponsor_users + RLS)
- Auth email+password + dashboard protégé
- Cron Instagram + EMV computation
- Pages /, /features, /pricing, /demo, /about, /contact, /privacy, /terms

**Le 30 avril 2026, visio board CA Osasuna passée.** Le board a validé l'approche et SponsorTrack devient l'outil de mesure du pilote. Voir [[Sessions/2026-05-01-osasuna-board-debrief]].

**Décision Guillaume (1er mai 2026)** : refonte complète du design sur direction "sport-branded premium". L'esthétique générique violet/dark "AI startup" actuelle ne porte pas le positionnement sport pro. On vise une identité éditoriale forte, un mélange de tech rigueur (Linear/Vercel) et de gravitas sport (palette club, typo serif éditoriale).

**Sources de vérité** :
- Brain : [[projet-sponsortrack]] (post-refonte du 1er mai, **lis-le entièrement**)
- Pitch board CA Osasuna : `https://osasuna-project.vercel.app/clients/osasuna` (palette, typo, ton)
- Session log : [[Sessions/2026-04-30-osasuna-board-pitch/SESSION-LOG]]

---

## 2. DIRECTION CRÉATIVE — SPORT-BRANDED PREMIUM

### Palette principale

Reprends la palette du pitch Osasuna (case study principal). Le SaaS est cousin du pitch, l'identité doit dialoguer.

```
--navy:   #0A1628  /* fond principal dark mode */
--red:    #8B0028  /* accent primaire, CTA, highlights data */
--cream:  #F4EFE6  /* fond light mode, cards sur dark */
--gold:   #B8975A  /* accent éditorial, chiffres, médaillons */
--ink:    #0F1A2E  /* corps de texte sur cream */
--mute:   #6B7480  /* secondary text */

/* support */
--red-glow:  rgba(139, 0, 40, 0.18)
--gold-soft: rgba(184, 151, 90, 0.12)
```

Mode par défaut : **dark navy** sur la home et marketing. Light cream sur les pages denses (pricing, features grid, docs futurs).

### Typographie

```
Headlines (h1, h2, hero) : "Tiempos Headline" ou "Playfair Display" ou "GT Sectra"
                          → fallback Georgia, serif. Italics autorisés pour respiration.
Body : "Inter" (déjà installé) ou "Söhne" → fallback system-ui
Numbers / data : "JetBrains Mono" ou "IBM Plex Mono" → fallback ui-monospace, monospace
```

Justification : sérif éditoriale = gravitas sport pro / club centenaire. Mono = précision data. Inter = lisibilité moderne. **Ne jamais mélanger 3 sans-serif différentes.**

### Motion

- **Subtil mais présent**. Pas d'animations gratuites.
- Inspirations : Linear (transitions instantanées), Vercel (fade-up sur scroll), The Athletic (lecture posée)
- Cas d'usage : KPI cards qui count up sur viewport-enter, ligne rouge qui se trace sur les charts, logos sponsors qui pulsent légèrement (computer vision detection)
- Framer Motion déjà installé, à exploiter

### Imagerie & icônes

- **Photos** : ambiance match sport pro (stadium, supporters, screenshot broadcast). Palette filtrée pour cohérence (treatment crossfade red/navy sur b&w).
- **Mockups** : dashboards en avant, broadcast feeds annotés (logo detection avec encadrés rouges), reports white-label
- **Icônes** : Lucide (déjà standard) en stroke 1.5, taille fixe, jamais en couleur primaire (que mute ou inverse)

### Refs design à étudier (5 min de browse avant de coder)

Tech rigueur :
- linear.app (typographie, density, motion)
- vercel.com (dark mode, dataviz cards)
- planetscale.com (techy mais lisible)

Sport / éditorial :
- theathletic.com (typo serif headlines, density d'info)
- statsperform.com (B2B sport pro, data heavy)
- hudl.com (sport SaaS, dashboards mockups)

Premium B2B avec dataviz :
- stripe.com (dataviz, gradient subtil sur dark)
- attio.com (récent, premium B2B 2026)
- resend.com (clean, motion subtil, pricing transparent)

### À ÉVITER absolument

- ❌ Glassmorphism gratuit
- ❌ Gradients arc-en-ciel "AI startup 2024"
- ❌ Hero vidéo loop type SaaS générique
- ❌ Mockups iPhone "look at our app on phone"
- ❌ Stock photos type "diverse team in office"
- ❌ Emojis dans la copy ailleurs que dans des contextes éditoriaux explicites

---

## 3. SPEC PAGE-BY-PAGE

### `/` — Homepage

Structure recommandée (sections, dans l'ordre) :

1. **Hero** — H1 sérif italique court (ex: *"Sponsor intelligence, lived in real time."*) + sous-titre 2 lignes max + 2 CTA (Start free trial / Watch live demo) + petit bandeau "New · Match-day computer vision is live" (garder, déjà là)
2. **Mockup dashboard hero** — pas une iframe, une vraie composition Recharts qui simule un dashboard live (Osasuna en exemple, sponsors Caja Rural / Macron / Digi). Animation count-up sur les chiffres. ← **STAR DU SHOW**
3. **Trusted by** — bandeau ligues : LaLiga / Serie A / Ligue 1 / Bundesliga / Eredivisie / Liga Portugal / MLS / Euroleague / WTA. Logos en mute, animation slow scroll
4. **The problem** — 3 cards (spreadsheets eat your week / no proof of ROI / growth goes untracked)
5. **The platform** — feature grid en 3 lignes :
   - Unified social analytics
   - Match-day computer vision
   - ROI that renews contracts
6. **How it works** — flow 4 steps (connect / detect / report / renew)
7. **Per-sponsor workspaces** — visuel split-screen (vue club / vue sponsor) avec switcher
8. **Stats / social proof** — €2.4B media value analysed in 2025 / 48 leagues live / 94% renewal rate / 11× faster than spreadsheets (garder le disclaimer "illustrative · pre-launch")
9. **Pricing teaser** — 3 cards minimal avec prix (€1.5K / €3.5K / €7K), CTA See full pricing
10. **Testimonials** (illustrative) — 3 cards avec disclaimer
11. **CTA final** — Start free trial / Book a demo

### `/pricing`

```
Toggle Monthly | Yearly (-20%)
3 cards :
  - Starter €1,500/mo · €1,200/mo yearly
  - Pro €3,500/mo · €2,800/mo yearly · "Most popular"
  - Enterprise €7,000/mo · €5,600/mo yearly · (NE PLUS DIRE "Custom")
```

**Tableau de comparaison complet** : reprends l'existant et corrige Enterprise prix. Ajoute 2 lignes manquantes :
- "Setup fee" : €0 / €0 / €5,000 (négociable)
- "Onboarding included" : 2h call / 8h call + dedicated CSM 30 jours / Full white-glove onboarding 90 jours

FAQ pricing en bas (8 questions max).

### `/features`

Refonte complète. 6 sections, chacune avec mockup produit dédié :
1. Cross-platform analytics
2. Match-day computer vision (vidéo demo si possible — 8 sec broadcast avec logo detection rouge)
3. Sponsor portals
4. Prospection engine + AI outreach
5. White-label reporting
6. Security & compliance

### `/demo`

Lien vers le `/dashboard` real-data si user logged + version "preview" pour visiteurs anonymes. Garde `/demo` server component existant, juste retravaille le layout pour matcher la nouvelle DA.

### `/about`

Garde le solo founder narrative existant (Guillaume Haas). Ajoute :
- Section "Our case study : CA Osasuna" avec lien externe `/customers/osasuna`
- Photo Guillaume + bio courte (2 paragraphes max)
- Lien CV / LinkedIn

### `/customers/osasuna` (NOUVELLE PAGE)

Page case study :
- Hero : "How we built sponsor intelligence with CA Osasuna"
- Le pilote 20 semaines + chiffres clés du dashboard live
- Quote board (illustrative en attendant retour officiel — disclaimer)
- Lien vers `osasuna-project.vercel.app/clients/osasuna` (le pitch board public)
- CTA "Become our next case study · book a discovery call"

### `/changelog` (NOUVELLE PAGE)

Liste chronologique des features :
- 2026-04-25 · Live Supabase + Instagram fetcher
- 2026-04-25 · Per-sponsor dashboards
- 2026-04-30 · CA Osasuna pilot
- 2026-05-XX · Match-day computer vision (à confirmer)
- 2026-05-XX · Sport-branded redesign V2

### `/privacy` `/terms` `/contact`

Garder. Juste refresh le styling pour matcher la DA.

---

## 4. NAV & FOOTER

### Nav principale

```
Logo SponsorTrack · Features · Pricing · Customers · Changelog · About | Sign in · Start free trial
```

(Retirer "Live demo" de la nav, l'envoyer dans Features ou en CTA secondary)

### Footer

3 colonnes :
- Product (Features / Pricing / Customers / Changelog / Status)
- Company (About / Blog / Careers (=mailto en attendant) / Contact)
- Legal (Privacy / Terms / DPA / Security)

Bottom : `© 2026 SponsorTrack · Built by TFM Team · Real Madrid Graduate School, Universidad Europea de Madrid`

---

## 5. ACCEPTANCE CRITERIA

- [ ] Pricing Enterprise affiche **€7,000/mo** explicitement (jamais "Custom")
- [ ] Toutes les pages sont stylées avec la palette navy/red/cream/gold (zéro violet/purple)
- [ ] Typographie serif sur les h1/h2 hero, sans-serif sur le body, mono sur les chiffres
- [ ] Page `/customers/osasuna` existe et linke vers le pitch public
- [ ] Page `/changelog` existe avec au moins 5 entrées chronologiques
- [ ] Mockup dashboard hero est un composant React Recharts (pas une image figée)
- [ ] Dark navy = défaut sur home/marketing · cream sur pages denses (pricing comparison, /features grid)
- [ ] Aucune occurrence de "purple", "violet" dans le code (Tailwind classes, CSS variables, copy)
- [ ] Aucun emoji ailleurs que dans le changelog ou cas explicite
- [ ] Lighthouse desktop ≥ 90 perf, ≥ 95 a11y, ≥ 95 SEO, ≥ 95 best-practices
- [ ] Build local OK (`pnpm build` ou `npm run build`)
- [ ] TypeScript strict, zéro `any`
- [ ] Lint clean
- [ ] Test manuel : navigation desktop + mobile (<768px) sans casse
- [ ] Tous les liens internes valides (vérification automatique en CI si possible)

---

## 6. WORKFLOW RECOMMANDÉ

```bash
cd ~/work/sponsortrack-saas/
git checkout main && git pull
git checkout -b feat/redesign-v2-sport-branded

# Phase 0 — design system (1h)
# Crée tailwind.config.ts theme extension avec palette + typo
# Crée components/ui/ tokens (Card, Button, Stat, KpiCard, FeatureCard)

# Phase 1 — homepage refonte (2h)
pnpm dev
# itération sur page.tsx + composants hero/mockup-dashboard/trusted-by

# Phase 2 — pricing + features + customers + changelog (2h)
# pricing: corriger Enterprise €7K, garder toggle yearly
# customers/osasuna: nouvelle page
# changelog: nouvelle page

# Phase 3 — about + nav + footer (1h)
# refresh styling

# Phase 4 — QA (1h)
pnpm lint
pnpm typecheck
pnpm build
# Ouvre chaque page, screenshot pour ton rapport

# Commit & push
git add -A
git commit -m "feat: SponsorTrack V2 redesign · sport-branded premium · pricing Enterprise €7K"
git push -u origin feat/redesign-v2-sport-branded
# PR + merge main · Vercel auto-deploy
```

---

## 7. SUB-AGENTS RECOMMANDÉS

Pattern opérateur : tu es le contrôleur, tu délègues les blocs indépendants à des sub-agents.

| Sub-agent | Mission | Bloc indépendant ? |
|---|---|---|
| `design-system-builder` | Tailwind theme + tokens + base components | ✅ phase 0 |
| `homepage-redesigner` | Refonte `/` complète | ✅ après phase 0 |
| `pricing-redesigner` | Refonte `/pricing` + correction Enterprise €7K | ✅ après phase 0 |
| `customer-page-creator` | Création `/customers/osasuna` from scratch | ✅ après phase 0 |
| `changelog-creator` | Création `/changelog` | ✅ indépendant |
| `qa-reviewer` | Lighthouse + lint + typecheck + cross-browser screenshots | ⏰ phase finale |

**N'utilise pas de sub-agent pour des tâches < 15 lignes de code** — overhead non rentable.

---

## 8. SI QUELQUE CHOSE BLOQUE

| Symptôme | Action |
|---|---|
| Build casse sur une dépendance | Ne pas downgrade silencieusement. Créer un commit "chore: pin {dep}@{version}" séparé avec justification |
| Lighthouse perf < 90 | Profile via Chrome DevTools, identifier la source (LCP image ? layout shift ?). Pas de quick fix sale. |
| Une fonte ne charge pas | Vérifier `next/font/google` ou `next/font/local`. Si fonte propriétaire indisponible, fallback documenté dans tailwind.config.ts |
| Conflict Supabase migration | NE PAS toucher au schema existant. Tout le redesign est purement front-end. Si tu DOIS toucher au schema, créer un commit séparé avec migration explicite. |
| Tu veux ajouter une feature hors brief | TODO list dans le PR, pas dans le code. Demander validation Guillaume avant. |
| Doute sur la copy | Garder le ton existant + sober. Inspirations : Linear, Stripe (jamais "supercharge", "next-gen", "AI-powered" sauf si très précis et vrai) |

---

## 9. POST-DEPLOY

Une fois mergé en main et Vercel deployed :

1. Tester `https://sponsortrack-saas.vercel.app` en navigation privée + mobile
2. Vérifier que les acceptance criteria sont tous ✅
3. Capturer 5 screenshots clés (home / pricing / features / customers/osasuna / dashboard)
4. Mettre à jour [[projet-sponsortrack]] dans le brain · ajouter "V2 redesign live"
5. Mettre à jour [[status]] · sponsortrack passe en 🟢 (refonte design done)
6. Notifier Guillaume avec lien + screenshots

---

## 10. CHECKLIST PROMPT PRACTICES (POUR TOI, CLAUDE CODE)

Avant de coder, valide mentalement :
- [ ] J'ai lu le brief en entier
- [ ] J'ai fait `/plan` et soumis
- [ ] J'ai créé la branche feat/redesign-v2-sport-branded
- [ ] J'ai chargé la palette + typo dans tailwind.config.ts AVANT de toucher aux composants
- [ ] Je commit atomique par feature
- [ ] Je test build entre chaque phase
- [ ] Je n'invente pas de feature hors brief
- [ ] Quand bloqué, je documente le blocage, je ne contourne pas

---

## Voir aussi

- [[Sessions/2026-05-01-osasuna-board-debrief]] — contexte visio
- [[Sessions/2026-04-30-osasuna-board-pitch/DISPATCH-osasuna-project-public-pitch]] — pattern dispatch précédent (référence)
- [[projet-sponsortrack]] — source de vérité produit
- [[projet-osasuna-project]] — case study principal
- [[brand-voice]] — ton à respecter
- [[stack-technique]] — stack écosystème
