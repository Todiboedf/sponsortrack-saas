"""Generate meeting demo assets from the trained model + pipeline report.

Outputs into cv/demo-assets/ (gitignored):
    annotated-NN-<frame>.jpg  — the frames with the most detections, boxes drawn
    report-pretty.txt         — human-readable summary of report.json

Usage:
    cv/.venv/bin/python cv/make_demo_assets.py \
        --model cv/weights/best.pt --frames cv/frames \
        --report cv/report.json --out cv/demo-assets --top 4
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path


def annotate_top_frames(
    model_path: str, frames_dir: str, out_dir: Path, top: int, conf: float
) -> list[tuple[str, int, float]]:
    """Run the model over extracted frames, save the `top` busiest ones annotated."""
    import cv2
    from ultralytics import YOLO

    model = YOLO(model_path)
    scored = []
    for fp in sorted(Path(frames_dir).glob("*.jpg")):
        r = model.predict(str(fp), conf=conf, verbose=False)[0]
        n = len(r.boxes) if r.boxes is not None else 0
        if n == 0:
            continue
        avg_conf = float(r.boxes.conf.mean())
        scored.append((n, avg_conf, fp, r))

    scored.sort(key=lambda t: (t[0], t[1]), reverse=True)
    saved: list[tuple[str, int, float]] = []
    for i, (n, avg_conf, fp, r) in enumerate(scored[:top], start=1):
        dest = out_dir / f"annotated-{i:02d}-{fp.stem}.jpg"
        cv2.imwrite(str(dest), r.plot())
        saved.append((dest.name, n, avg_conf))
    return saved


def pretty_report(report_path: str, out_dir: Path) -> str:
    """Render report.json as an aligned text table (share of voice included)."""
    with open(report_path, encoding="utf-8") as f:
        rep = json.load(f)

    m, v = rep["match"], rep["video"]
    duration = float(v.get("duration_seconds") or 0.0)
    lines = [
        "SPONSORLENS — Broadcast sponsor exposure report",
        f"{m['property']} vs {m.get('opponent') or '?'}  ·  source: {m.get('source')}",
        (
            f"Video {v['width']}x{v['height']}, {duration:.0f}s @ {v['src_fps']:.0f} fps  ·  "
            f"sampled {rep['sample_fps']} fps ({rep['sampled_frames']} frames)  ·  "
            f"conf >= {rep['conf_threshold']}"
        ),
        "",
        f"{'SPONSOR':<14}{'PLACEMENT':<10}{'VISIBLE s':>10}{'SHARE %':>9}{'DETECT.':>9}{'AVG AREA %':>12}{'PEAK %':>8}",
        "-" * 72,
    ]
    for s in rep["sponsors"]:
        share = 100.0 * s["visible_seconds"] / duration if duration else 0.0
        lines.append(
            f"{s['sponsor']:<14}{s.get('placement', 'other'):<10}"
            f"{s['visible_seconds']:>10.1f}{share:>9.1f}{s['detections']:>9}"
            f"{s['avg_area_pct']:>12.2f}{s['peak_area_pct']:>8.2f}"
        )
    text = "\n".join(lines) + "\n"
    (out_dir / "report-pretty.txt").write_text(text, encoding="utf-8")
    return text


def main() -> None:
    p = argparse.ArgumentParser(description="Build demo assets for the CV POC")
    p.add_argument("--model", required=True)
    p.add_argument("--frames", default="cv/frames")
    p.add_argument("--report", default="cv/report.json")
    p.add_argument("--out", default="cv/demo-assets")
    p.add_argument("--top", type=int, default=4)
    p.add_argument("--conf", type=float, default=0.35)
    args = p.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    saved = annotate_top_frames(args.model, args.frames, out_dir, args.top, args.conf)
    for name, n, avg_conf in saved:
        print(f"  ✓ {name}  ({n} detections, avg conf {avg_conf:.2f})")

    print()
    print(pretty_report(args.report, out_dir))
    print(f"✓ assets in {out_dir}/")


if __name__ == "__main__":
    main()
