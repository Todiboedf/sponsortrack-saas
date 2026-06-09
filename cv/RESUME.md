# Sponsorlens CV POC — point de reprise (2026-06-09)

Pour reprendre vite (meeting Group 1 **jeudi 11 juin matin**).

## Où on en est
- Site `sponsorlens.io` live (HTTP 200). `main` = dernier commit. Branche `feat/autonomous-2026-06-08-eve` == `main`.
- POC CV : **étapes 1-4 faites**. **STOP à l'étape 5** → en attente de `cv/weights/best.pt` (Roboflow) + `cv/sponsors.json` confirmé.

## Env CV — déjà prêt sur disque, NE PAS réinstaller
- venv `cv/.venv` (créé via `uv`) avec **ultralytics 8.4 + torch 2.12 (CPU) + opencv 4.13**.
- `ffmpeg`/`ffprobe` statiques dans `~/.local/bin`. `yt-dlp` dispo.
- Footage `cv/osasuna-highlight.mp4` (Osasuna vs Alavés, 720p **H.264**, 195s) + 70 frames dans `cv/frames/` (gitignorés).
- Sponsors identifiés depuis la footage : **Kosner, Eneryeti, Nissan** (`cv/sponsors.json`).

## Étape 5 — dès que `best.pt` est déposé
```bash
cv/.venv/bin/python cv/pipeline.py --video cv/osasuna-highlight.mp4 \
  --model cv/weights/best.pt --sponsors cv/sponsors.json \
  --property "CA Osasuna" --opponent "Alavés" --out cv/report.json
cv/.venv/bin/python cv/test_screen_time.py   # non-régression
```

## Étape 6 — si Supabase resumé + `supabase/schema.sql` lancé
```bash
cv/.venv/bin/python cv/upload_supabase.py --report cv/report.json
```
Puis brancher `CvExposurePanel` (déjà monté sur `/demo` avec données sample) sur la vraie data : fetch `cv_sponsor_exposure` côté server component, build, push `main`.

## Étape 7 — captures pour le meeting → `cv/demo-assets/`

## À faire par Guillaume
- Lancer `supabase/schema.sql` dans le SQL editor → tables `contact_messages` + `cv_matches` + `cv_sponsor_exposure`.
- Roboflow : annoter Kosner/Eneryeti/Nissan sur `cv/frames/`, train YOLOv11n, déposer `best.pt` dans `cv/weights/`.

## Meeting jeudi — cadrage
Osasuna = **démo CV sur broadcast public, PAS un pilote signé**. 4 questions de prép dans le brain `Clients/group-1-agency.md`.

## Pour orienter une nouvelle session Claude Code
Lire : ce fichier + brain `Knowledge/projet-sponsorlens.md` + `Knowledge/repo-sponsorlens.md` + `git log --oneline -12`.
