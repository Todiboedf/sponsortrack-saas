"""Export evenly-spaced frames from a video, for annotation (Roboflow, etc.).

    python dump_frames.py --video clip.mp4 --fps 0.5 --out frames/     # 1 frame / 2s
    python dump_frames.py --video clip.mp4 --every 30 --out frames/    # 1 frame / 30 src frames
    python dump_frames.py --video clip.mp4 --fps 1 --max 300           # cap at 300 frames
"""
from __future__ import annotations

import argparse
import os


def main() -> None:
    p = argparse.ArgumentParser(description="Export frames from a video for labeling")
    p.add_argument("--video", required=True)
    p.add_argument("--out", default="frames")
    g = p.add_mutually_exclusive_group()
    g.add_argument("--every", type=int, help="save 1 frame every N source frames")
    g.add_argument("--fps", type=float, help="save this many frames per second")
    p.add_argument("--max", type=int, default=0, help="stop after N saved frames (0 = no limit)")
    args = p.parse_args()

    import cv2

    cap = cv2.VideoCapture(args.video)
    if not cap.isOpened():
        raise SystemExit(f"Could not open video: {args.video}")
    src_fps = cap.get(cv2.CAP_PROP_FPS) or 25.0

    if args.fps:
        step = max(1, round(src_fps / max(0.01, args.fps)))
    elif args.every:
        step = max(1, args.every)
    else:
        step = max(1, round(src_fps))  # default ≈ 1 frame / second

    os.makedirs(args.out, exist_ok=True)
    stem = os.path.splitext(os.path.basename(args.video))[0]
    idx = saved = 0
    try:
        while True:
            ok, frame = cap.read()
            if not ok:
                break
            if idx % step == 0:
                cv2.imwrite(os.path.join(args.out, f"{stem}_{idx:07d}.jpg"), frame)
                saved += 1
                if args.max and saved >= args.max:
                    break
            idx += 1
    finally:
        cap.release()

    print(f"✓ saved {saved} frames to {args.out}/  (1 every {step} source frames)")


if __name__ == "__main__":
    main()
