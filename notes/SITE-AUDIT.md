> 🔄 **Mise à jour 8 juin (post-fixes).** La plupart des points ci-dessous sont **faits** : P0 sécurité (CRON_SECRET rotaté), P1 domaine (sponsorlens.io live) + crédibilité, puis une **passe dé-Osasuna** (PR #12 mergée + commits `9e5e55c` crash-fix, `bc0dc2c` em-dashes, `53f558a`/`434c0ed` dé-Osasuna). **Posture actuelle : 0 pilot signé, produit construit, démo club fictif « Atlético Demo », premier prospect = Group 1.** Toute mention « pilote / case study Osasuna » ci-dessous est **historique** (retirée du site). Reste ouvert : formulaire contact, Stripe/onboarding, POC computer vision.

# Audit complet : Sponsorlens (repo `sponsortrack-saas`)

*8 juin 2026 · `main` @ b5d747c · build ✓ propre (17 routes) · déployé `sponsortrack-saas.vercel.app` (200)*

## Verdict

Site **sain et complet** : Next 16.2.4 / React 19, Supabase + analytics Instagram **réellement câblés**, build et TypeScript OK. Cinq chantiers : **(A)** une faille de secret, **(B)** ce qui reste à connecter, **(C)** la cohérence de marque/domaine, **(D)** la crédibilité pour un public expert, **(E)** le polish visuel — et le computer vision à 0%.

---

## A. 🚨 Sécurité — à traiter EN PREMIER (P0)

- **`CRON_SECRET` en clair** dans `supabase/SETUP.md` (ligne 64) : `0354…f1d3`. Le repo GitHub est **public**. Ce secret protège `/api/cron/*` et `/api/seed` → n'importe qui peut écrire en base et cramer le quota RapidAPI.
- Référence projet Supabase `isboggphmcpnjeigrach` exposée de même.
- **Action :** régénérer `CRON_SECRET` (Vercel + `.env.local`), le remplacer par un placeholder dans `SETUP.md`, idéalement purger l'historique git. Vérifier que les clés Supabase n'ont jamais été commit.

---

## B. Ce qui est à connecter (couche intégrations)

| Service | État | À faire |
|---|---|---|
| Supabase (DB / Auth / RLS) | ✅ câblé (`URL` / `ANON` / `SERVICE_ROLE` en `.env.local`) | vérifier que les 3 clés sont aussi sur Vercel |
| Analytics Instagram (RapidAPI) | ✅ **réel** (`RAPIDAPI_KEY`, fetch profil+posts, EMV) | fiabiliser (IP Vercel bloquée par IG par moments) |
| Cron quotidien | ✅ `vercel.json` → 06:00 UTC | — |
| **Formulaire contact** | ⚠️ **perd les leads** : `CONTACT_FORWARD_URL`/`_TOKEN` absents → le endpoint logge en console et n'envoie rien | brancher un webhook ou un email **avant de montrer le site à du réseau** |
| **Domaine `sponsorlens.io`** | ❌ référencé dans le code (canonical / OG / JSON-LD) mais **non connecté** → ces URLs pointent vers du 404 | acheter + brancher sur Vercel |
| **Email transactionnel** | ❌ absent (seul Supabase Auth envoie la confirmation) | brancher (Resend/Postmark) si onboarding |
| **Stripe / paiement** | ❌ absent (aucune dépendance) | requis pour vendre en self-serve |
| **Computer vision** | ❌ **0%** (aucune lib, route ou table) | à construire (cf. `INVESTMENT-ROADMAP.md`) |
| Analytics web (Plausible/GA) | ❌ absent | utile avant de driver du trafic |
| Lien Vercel CLI local | ❌ pas de `.vercel/` | `vercel link` pour piloter en CLI |

---

## C. Cohérence de marque (rebrand Sponsorlens — partie infra)

Le **code est 100% Sponsorlens** (0 occurrence « sponsortrack »). Restent les couches externes :

| Élément | Actuel | Cible |
|---|---|---|
| Repo GitHub | `Todiboedf/sponsortrack-saas` | `…/sponsorlens` |
| Projet + URL Vercel | `sponsortrack-saas.vercel.app` (live) | `sponsorlens.io` |
| Domaine | non connecté | `sponsorlens.io` acheté + branché |
| Dossier local | `~/work/sponsortrack-saas` | `~/work/sponsorlens` |
| Notes brain | `projet-sponsortrack.md`, `concurrence-sponsortrack.md` | renommer Sponsorlens |

⚠️ **Conséquence actuelle :** le site live affiche « Sponsorlens » sur une URL « sponsortrack », et canonical/OG pointent vers `sponsorlens.io` (404) → incohérent + mauvais rendu de partage social.

---

## D. Crédibilité (priorité haute — public expert type Pierre / Group 1)

| Sujet | Problème | Reco |
|---|---|---|
| **Computer vision** | annoncé « live » (« our model watches the broadcast feed… ») alors que **0% construit** | reformuler en « in development / pilot » **ou** démontrer un vrai POC |
| **Testimonials** | personnes inventées (Marta Lindgren/Nordic FC, Pablo Reyes/CD Valencia, Aisha N'Dour) sous micro-disclaimer | retirer, ou remplacer par le pilote **Osasuna réel** |
| **Stats** | « €2.4B analysed in 2025 », « 48 leagues live », « 94% renewal » en *illustrative · pre-launch* | remplacer par des chiffres vrais/modestes ou cadrer clairement « cible/vision » |
| Claims entreprise | « SOC 2 Type II in progress », « 48 leagues » | aligner sur la réalité |

> Devant un ex-NBA international qui connaît Blinkfire/Relo, l'overclaim **décrédibilise**. La carte gagnante = honnêteté + un POC CV qui marche.

---

## E. Visuel / design

- **Tension de palette dans le hero** : aurora **cyan/violet** + CTA cyan (« Inside the Broadcast ») vs le reste du site en **navy/red/cream/gold**. C'est le **premier écran** → trancher : parti-pris broadcast assumé, ou réalignement sur la DA sport-branded.
- **`<em>` italic-gradient sur ~5 titres** (Problem, Platform, Workspaces, Testimonials, Final CTA) → limiter à 2-3. C'est l'« AI-tell n°1 » de ton propre brief V4.
- **AI-tells** : icônes lucide partout, `GradientOrb` répétés, motif « eyebrow + badge + h2 + grid 3-cards » sur presque chaque section. Le brief `DESIGN-DNA V4` corrige exactement ça mais **n'a jamais été mergé**.

---

## F. Hygiène technique

- Build ✓ mais **warning Recharts `width(-1)/height(-1)`** à la prégénération → un graphe peut s'afficher vide (conteneur sans dimension au SSR). À corriger.
- OG en `.svg` (`public/og.svg`) — certains réseaux ne rendent pas le SVG ; le route dynamique `/og` gère, à vérifier en partage réel.
- TypeScript strict, lint OK. Données de seed = Nike/Adidas/Red Bull/Macron/Emirates (marques génériques — pour une démo agence, préférer les sponsors **réels d'Osasuna**).

---

## Plan de changements proposé (priorisé)

**P0 — Sécurité (30 min)**
1. Régénérer `CRON_SECRET` + le retirer de `SETUP.md`.

**P1 — Cohérence & crédibilité (avant Pierre)**
2. Acheter + connecter `sponsorlens.io` ; aligner projet/URL Vercel.
3. Brancher le formulaire contact (ne plus perdre les leads).
4. Crédibilité : retirer testimonials inventés + recadrer stats + reformuler la claim CV.
5. Trancher le hero (palette).

**P2 — Produit (pour vendre)**
6. Stripe + onboarding + email transactionnel.
7. POC computer vision (cf. `INVESTMENT-ROADMAP.md`).

**P3 — Polish & propreté**
8. Passe V4 (réduire les AI-tells) ; renommer repo / dossier / notes brain.
