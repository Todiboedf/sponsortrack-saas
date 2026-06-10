# Sponsorlens CV POC — point de reprise (2026-06-10 soir)

**POC TERMINÉ de bout en bout (étapes 1-7)** la veille du meeting Group 1 (**jeudi 11 juin, 10h45**).

## Résultat

- **Modèle** : YOLOv11s entraîné **en local** (le download .pt Roboflow est verrouillé sur notre plan → dataset exporté puis `yolo detect train` local, 100 epochs / 34 min CPU). Best : **mAP@50 0.692 · P 0.714 · R 0.653** (val 8 images). Poids : `cv/weights/best.pt` (gitignoré) + run complet dans `runs/detect/cv/train_local/v2-yolo11s/`.
- **Rapport** : `cv/report.json` — 390 frames @ 2 fps sur le highlight Osasuna-Alavés (195 s), 10 sponsors détectés. Top : **Kosner 120.5 s (61.9 % share of voice)**, Nissan 97.5 s, Macron 80 s, Halcon 62.5 s.
- **Supabase** : rapport uploadé (`cv_matches` 3a32f0b7…, 10 lignes `cv_sponsor_exposure`). `schema.sql` exécuté le 10/06 ~15 h.
- **/demo branché** : fetch server-side des dernières données CV, fallback sample si tables vides. Sur `main`, build green, déployé.
- **Assets meeting** : `cv/demo-assets/` → 4 frames annotées (jusqu'à 11 détections, conf 0.66-0.91), `report-pretty.txt`, `results.png` (courbes training), `confusion_matrix_normalized.png`.

## Env (inchangé, NE PAS réinstaller)

venv `cv/.venv` : ultralytics 8.4 + torch 2.12 CPU + opencv 4.13 + roboflow + supabase. Clés : `.env` (ROBOFLOW_API_KEY) + `.env.local` (Supabase, RapidAPI, CRON_SECRET).

## Re-run complet (si besoin)

```bash
cv/.venv/bin/python cv/pipeline.py --video cv/osasuna-highlight.mp4 \
  --model cv/weights/best.pt --sponsors cv/sponsors.json \
  --property "CA Osasuna" --opponent "Alavés" --out cv/report.json
cv/.venv/bin/python cv/test_screen_time.py          # non-régression (3 tests)
cv/.venv/bin/python cv/upload_supabase.py --report cv/report.json   # env Supabase requis dans le shell
cv/.venv/bin/python cv/make_demo_assets.py --model cv/weights/best.pt
```

Ré-entraîner (dataset v2 déjà dans `cv/dataset/`) :
```bash
cv/.venv/bin/yolo detect train data=cv/dataset/data.yaml model=yolo11s.pt \
  epochs=100 imgsz=512 batch=8 device=cpu workers=8 cache=ram \
  fliplr=0.0 flipud=0.0 patience=30 seed=0 project=cv/train_local name=v2-yolo11s exist_ok=True
```

## Avant le meeting (matin du 11/06)

1. Vérifier que `/demo` prod affiche bien « CA Osasuna vs Alavés » dans le panel Match-day exposure (ISR 5 min).
2. Si le plan RapidAPI a été upgradé : re-trigger `/api/cron/collect-instagram` (Bearer CRON_SECRET) pour la data sociale fraîche du jour — le cron auto tourne à 06:00 UTC.
3. Login démo dashboard : `guillaume@hl-conciergerie.com` → workspace **CA Osasuna** (`/dashboard`).

## Contexte meeting

Osasuna = démo sur broadcast public, **pas un pilote signé** (recadré par écrit dans la réponse à Omar du 10/06). Prép complète : brain `Clients/group-1-agency.md`.
