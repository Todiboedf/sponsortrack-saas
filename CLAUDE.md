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
# Sponsorlens : pages sponsor Yverdon Sport

## Ce qu'on construit
Deux pages statiques, `/yverdon/roseyres` et `/yverdon/egokiefer` : la version « ce que le sponsor voit » du produit Sponsorlens, construite sur la mesure reelle du match Yverdon Sport 0-0 Stade-Lausanne-Ouchy du 20.09.2026. Le brief complet, les donnees et les scripts sont dans `docs/handoff-yverdon/`. Lire `docs/handoff-yverdon/00-LIS-MOI-D-ABORD.md` en entier avant de toucher au code.

## Donnees
- `docs/handoff-yverdon/data/J09-SLO-mesure-complete-donnees.json` fait foi pour les totaux (version 4.1).
- `docs/handoff-yverdon/data/J09-passages-detail.json` : les passages avec chronos, pour la frise.
- `docs/handoff-yverdon/data/Roseyres-J09-donnees-et-hypotheses.json` : hypotheses et valeurs Roseyres, formule de reference.
- `docs/handoff-yverdon/scripts/valeur.py` reproduit la fiche Roseyres (860 base, 2561 optimiste). Toute valeur affichee doit sortir de cette formule, avec les memes hypotheses, ou etre marquee borne basse.
- Charger les JSON dans des types TypeScript stricts. Pas de `any`. Pas de chiffre code en dur dans les composants.

## Regles de contenu
- Chaque chiffre affiche porte son statut : mesure, verifie ou hypothese. Pas de scenario « bas ». Arrondi normal (au dixieme pour les parts, comme le rapport) : ne jamais gonfler veut dire pas d'estimation ajoutee, pas tronquer.
- Jamais « temps reel », « automatique », « sans intervention ». Les pages sont mises a jour apres chaque match.
- EgoKiefer : « statut a confirmer par le club », jamais « Bronze ». Roseyres.ch : creation de Smartimmo Sarl, « Sponsor principal » selon le site du club.
- Pas de montants d'autres sponsors, pas de tarifs Sponsorlens, pas de citation du club comme client.
- Texte en francais, vouvoiement envers le sponsor, phrases courtes, pas de tiret cadratin, pas d'emoji, pas de lorem ipsum.

## Style
- Mobile d'abord. Inter. Couleurs de `docs/handoff-yverdon/refs/style-maison-sponsorlens.css` : encre #0A1628, texte #1F2937, gris #6B7280, filets #E3E6EA, surface #F6F7F9, accent vert #008300 (repères et cadres, pas de decoration), bleus de donnees #256abf #5598e7 #86b6ef #104281.
- Icones Lucide uniquement. Typographie de conseil, sobre. Pas de camembert, pas de double axe.
- Frise des passages sur 0 a 95 minutes avec mi-temps separees ; classement en barres horizontales, la marque de la page en couleur, les autres en gris ; valeur en tuiles ou barres empilees TV, stade, social.

## Stack
- Next.js (App Router), TypeScript strict, Tailwind, Lucide. Pages statiques, donnees importees depuis JSON au build.
- Videos et vignettes versionnees dans `public/yverdon/` (Roseyres 14 Mo, EgoKiefer 2,5 Mo), servies par la preview Vercel. Vercel Blob plus tard, via `YVERDON_MEDIA_BASE_URL`.
- Avant chaque livraison : `npm run lint`, `npm run build`, captures a 390 px et 1280 px de large.

## Securite
- La cle API Roboflow reste dans `.env` (ROBOFLOW_API_KEY), jamais dans un fichier versionne ni dans un chat.
- Aucun script de telechargement de flux video tiers.
