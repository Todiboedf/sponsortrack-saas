"""Render an annotated detection clip from the highlight (meeting demo asset).

Pass 1 scans the video at low fps to find the densest detection window;
pass 2 re-renders that window frame-by-frame with boxes + a discreet
Sponsorlens banner, then ffmpeg re-encodes to phone-friendly H.264.

Usage:
    cv/.venv/bin/python cv/make_detection_clip.py \
        --video cv/osasuna-highlight.mp4 --model cv/weights/best.pt \
        --conf 0.45 --window 45 --out cv/demo-assets/detection-clip.mp4
    # --start 11 to skip pass 1, --full to annotate the whole video
"""
from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
import tempfile

BANNER = "Sponsorlens - logo detection | recorded broadcast POC"  # ASCII only: cv2.putText garbles non-ASCII
NAVY_BGR = (40, 22, 10)      # #0A1628 in BGR
CREAM_BGR = (230, 239, 244)  # #F4EFE6 in BGR


def find_ffmpeg() -> str:
    cand = os.path.expanduser("~/.local/bin/ffmpeg")
    if os.path.exists(cand):
        return cand
    found = shutil.which("ffmpeg")
    if not found:
        raise SystemExit("ffmpeg introuvable (~/.local/bin/ffmpeg attendu)")
    return found


def densest_window_start(model, video: str, conf: float, window_s: float) -> float:
    """Scan at 2 fps, return the start time (s) of the densest detection window."""
    import cv2

    cap = cv2.VideoCapture(video)
    src_fps = cap.get(cv2.CAP_PROP_FPS) or 25.0
    step = max(1, round(src_fps / 2.0))
    counts: list[int] = []
    idx = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        if idx % step == 0:
            r = model.predict(frame, conf=conf, verbose=False)[0]
            counts.append(len(r.boxes) if r.boxes is not None else 0)
        idx += 1
    cap.release()

    w = max(1, int(window_s * 2))  # samples per window at 2 fps
    if len(counts) <= w:
        return 0.0
    best_start, best_sum = 0, sum(counts[:w])
    cur = best_sum
    for i in range(1, len(counts) - w):
        cur += counts[i + w - 1] - counts[i - 1]
        if cur > best_sum:
            best_sum, best_start = cur, i
    t = best_start / 2.0
    print(f"  fenêtre la plus dense: t={t:.1f}s -> {t + window_s:.1f}s  ({best_sum} détections cumulées @2fps)")
    return t


def render(model, video: str, out_path: str, conf: float, t_start: float, duration: float | None) -> None:
    import cv2

    cap = cv2.VideoCapture(video)
    src_fps = cap.get(cv2.CAP_PROP_FPS) or 25.0
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    n_total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    start_f = int(t_start * src_fps)
    end_f = n_total if duration is None else min(n_total, start_f + int(duration * src_fps))
    cap.set(cv2.CAP_PROP_POS_FRAMES, start_f)

    tmp = tempfile.NamedTemporaryFile(suffix=".mp4", delete=False)
    tmp.close()
    writer = cv2.VideoWriter(
        tmp.name, cv2.VideoWriter_fourcc(*"mp4v"), src_fps, (width, height)
    )

    strip_h = max(30, height // 22)
    font = cv2.FONT_HERSHEY_SIMPLEX
    scale = strip_h / 52.0
    done = 0
    n_frames = end_f - start_f
    for _ in range(n_frames):
        ok, frame = cap.read()
        if not ok:
            break
        r = model.predict(frame, conf=conf, verbose=False)[0]
        img = r.plot(img=frame)

        # discreet bottom banner: semi-transparent navy strip + cream text
        overlay = img.copy()
        cv2.rectangle(overlay, (0, height - strip_h), (width, height), NAVY_BGR, -1)
        img = cv2.addWeighted(overlay, 0.6, img, 0.4, 0)
        cv2.putText(
            img, BANNER, (12, height - strip_h // 3), font, scale, CREAM_BGR, 1, cv2.LINE_AA
        )

        writer.write(img)
        done += 1
        if done % 250 == 0:
            print(f"  {done}/{n_frames} frames rendues...", file=sys.stderr)

    writer.release()
    cap.release()

    ffmpeg = find_ffmpeg()
    subprocess.run(
        [
            ffmpeg, "-y", "-loglevel", "error", "-i", tmp.name,
            "-c:v", "libx264", "-preset", "medium", "-crf", "22",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an",
            out_path,
        ],
        check=True,
    )
    os.unlink(tmp.name)
    size_mb = os.path.getsize(out_path) / 1e6
    print(f"✓ {out_path}  ({done} frames, {done / src_fps:.0f}s, {size_mb:.1f} MB, H.264)")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", default="cv/osasuna-highlight.mp4")
    ap.add_argument("--model", default="cv/weights/best.pt")
    ap.add_argument("--conf", type=float, default=0.45)
    ap.add_argument("--window", type=float, default=45.0, help="clip duration (s)")
    ap.add_argument("--start", type=float, default=None, help="force start time (s), skip scan")
    ap.add_argument("--full", action="store_true", help="annotate the whole video")
    ap.add_argument("--out", default="cv/demo-assets/detection-clip.mp4")
    args = ap.parse_args()

    from ultralytics import YOLO

    model = YOLO(args.model)
    os.makedirs(os.path.dirname(args.out), exist_ok=True)

    if args.full:
        render(model, args.video, args.out, args.conf, 0.0, None)
        return
    t0 = args.start if args.start is not None else densest_window_start(
        model, args.video, args.conf, args.window
    )
    render(model, args.video, args.out, args.conf, t0, args.window)


if __name__ == "__main__":
    main()
