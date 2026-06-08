# Sponsorlens — Computer Vision pipeline

Measure **sponsor screen-time / media value on match footage** (broadcast,
in-venue or owned clips) without a broadcaster partnership to start.

```
video → sampled frames (opencv) → YOLO logo detection → per-sponsor screen-time → JSON → Supabase
```

This is a standalone Python pipeline (separate from the Next.js app). It runs on
your machine / a GPU, then pushes results into the same Supabase project so the
app can display them.

## What it produces

Per match, per sponsor: **visible seconds**, detection count, average & peak
on-screen area (%), first/last seen, and a placeholder € media value
(`visible_seconds × --rate-per-second`, until real audience data is wired). See
`sample_report.json` for the exact shape.

## Install

```bash
cd cv
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

(GPU strongly recommended for full matches; CPU is fine for short clips / tests.)

## 1. Get footage (legal note)

- **Owned / social clips** (club or player posts): cleanest, available now → best for the first POC.
- **In-venue**: a camera you/the club control filming the LED boards.
- **Recorded broadcast**: record from a service you subscribe to (DAZN / beIN / Movistar…). This is **media-monitoring grey zone** — fine for private R&D / a POC / a demo, **not** a commercial-scale foundation (broadcaster T&Cs). At scale you need a league/broadcaster deal. Never re-publish the footage; the pipeline only emits *metrics*.

> For a first demo you don't even need real sponsor footage: any clear match clip with visible logos proves the detection works. Brand it once you have owned content.

## 2. Annotate & train a model

The pipeline needs a YOLO model fine-tuned on **your** sponsor logos.

1. Create a project on [Roboflow](https://roboflow.com), upload frames (export some with `python dump_frames.py --video clip.mp4 --fps 0.5 --out frames/`, or screenshot the clip).
2. Draw boxes around each sponsor logo. **Class names must match `sponsors.json` `classes`** (same spelling/order = stable class ids).
3. Generate a dataset (YOLO format) and train, either in Roboflow or locally:

```bash
yolo detect train data=dataset/data.yaml model=yolo11s.pt epochs=80 imgsz=1280
# → runs/detect/train/weights/best.pt
```

Copy `best.pt` to `cv/weights/best.pt`.

## 3. Run the pipeline

```bash
python pipeline.py \
  --video atletico-demo-vs-rivals.mp4 \
  --model weights/best.pt \
  --property "Atlético Demo" --opponent "Rivals FC" --competition "Demo League" \
  --source recorded-broadcast \
  --sample-fps 2 --conf 0.35 --rate-per-second 9.0 \
  --out report.json
```

- `--sample-fps 2` = analyse 2 frames/sec (enough for screen-time; raise for precision, lower for speed).
- `--rate-per-second` = € per visible second (placeholder media-value model).

## 4. Upload to Supabase

```bash
cp .env.example .env   # fill NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
python upload_supabase.py --report report.json
```

Tables `cv_matches` + `cv_sponsor_exposure` must exist (run `supabase/schema.sql`).

## 5. Show it in the app

A ready, presentational React component lives at
`src/components/CvExposurePanel.tsx`. Feed it rows from `cv_sponsor_exposure`
(or its built-in sample) and mount it on `/demo` or a future dashboard match view.

## Scale & cost reality

- **POC / pilot / first clients**: this lean setup (subscribe + record + YOLO) gives Blinkfire-grade screen-time at a fraction of the cost.
- **Commercial scale** (10+ clients, sub-24h delivery, guaranteed coverage): needs a **league/broadcaster data deal** (LaLiga centralises rights → negotiate with the league, not the club) and parallelised GPU workers. This is the moat, and where a partner like Group 1 unlocks access.

## Files

| File | Role |
|---|---|
| `pipeline.py` | CLI orchestrator (video → report.json) |
| `detect.py` | YOLO wrapper + `Detection` dataclass |
| `screen_time.py` | frame sampling + per-sponsor aggregation |
| `upload_supabase.py` | report.json → Supabase |
| `dump_frames.py` | export frames from a video for annotation |
| `test_screen_time.py` | stdlib tests for the aggregation math (`python3 test_screen_time.py`) |
| `sponsors.example.json` | class names + placements config (copy to `sponsors.json`) |
| `sample_report.json` | example output / schema reference |
| `requirements.txt` · `.env.example` | deps + env template |
