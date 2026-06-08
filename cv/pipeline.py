"""
Sponsorlens computer-vision pipeline.

  video  ->  sampled frames  ->  YOLO logo detection  ->  per-sponsor screen-time  ->  JSON

Usage:
    python pipeline.py \
        --video match.mp4 \
        --model weights/best.pt \
        --property "Atlético Demo" --opponent "Rivals FC" \
        --sample-fps 2 --conf 0.35 --rate-per-second 9.0 \
        --out report.json

`weights/best.pt` is a YOLO model fine-tuned on your sponsor logos
(see README.md -> "Train a model"). Then upload the report with
`python upload_supabase.py --report report.json`.
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone

from detect import LogoDetector
from screen_time import ExposureAggregator, iter_sampled_frames, video_meta


def run(args: argparse.Namespace) -> dict:
    meta = video_meta(args.video)
    frame_area = float(meta["width"] * meta["height"])
    detector = LogoDetector(args.model, conf=args.conf, device=args.device)
    agg = ExposureAggregator(
        sample_fps=args.sample_fps,
        frame_area_px=frame_area,
        rate_per_second=args.rate_per_second,
    )

    n_frames = 0
    for fr in iter_sampled_frames(args.video, args.sample_fps):
        agg.add_detections(detector.detect_frame(fr.image, fr.index, fr.timestamp))
        n_frames += 1
        if n_frames % 50 == 0:
            print(f"  processed {n_frames} sampled frames...", file=sys.stderr)

    return {
        "match": {
            "property": args.property,
            "opponent": args.opponent,
            "competition": args.competition,
            "match_date": args.match_date,
            "source": args.source,
            "video_label": args.video,
        },
        "video": meta,
        "sample_fps": args.sample_fps,
        "conf_threshold": args.conf,
        "sampled_frames": n_frames,
        "processed_at": datetime.now(timezone.utc).isoformat(),
        "sponsors": agg.results(),
    }


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="Sponsorlens CV exposure pipeline")
    p.add_argument("--video", required=True)
    p.add_argument("--model", required=True, help="path to trained YOLO weights (best.pt)")
    p.add_argument("--out", default="report.json")
    p.add_argument("--sample-fps", type=float, default=2.0, dest="sample_fps")
    p.add_argument("--conf", type=float, default=0.35)
    p.add_argument("--device", default=None, help="cuda:0 | cpu | None (auto)")
    p.add_argument(
        "--rate-per-second",
        type=float,
        default=0.0,
        dest="rate_per_second",
        help="€ media value per visible second (placeholder until audience data is wired)",
    )
    p.add_argument("--property", default="Demo Property")
    p.add_argument("--opponent", default=None)
    p.add_argument("--competition", default=None)
    p.add_argument("--match-date", default=None, dest="match_date")
    p.add_argument(
        "--source",
        default="recorded-broadcast",
        choices=["recorded-broadcast", "in-venue", "owned"],
    )
    return p


def main() -> None:
    args = build_parser().parse_args()
    report = run(args)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print(
        f"✓ wrote {args.out}  "
        f"({len(report['sponsors'])} sponsors, {report['sampled_frames']} sampled frames)"
    )


if __name__ == "__main__":
    main()
