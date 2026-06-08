"""Sample video frames and aggregate per-sponsor exposure (screen-time).

`cv2` (opencv) is imported lazily inside the functions that need it, so this
module stays importable for unit tests of the aggregation logic alone.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Iterator


@dataclass
class FrameRef:
    index: int
    timestamp: float
    image: object  # numpy ndarray (BGR frame from opencv)


def video_meta(video_path: str) -> dict:
    import cv2

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Could not open video: {video_path}")
    fps = cap.get(cv2.CAP_PROP_FPS) or 25.0
    n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 0)
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 0)
    cap.release()
    return {
        "src_fps": fps,
        "frame_count": n,
        "width": w,
        "height": h,
        "duration_seconds": (n / fps) if fps else 0.0,
    }


def iter_sampled_frames(video_path: str, sample_fps: float) -> Iterator[FrameRef]:
    """Yield ~`sample_fps` frames per second from the video."""
    import cv2

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Could not open video: {video_path}")
    src_fps = cap.get(cv2.CAP_PROP_FPS) or 25.0
    step = max(1, round(src_fps / max(0.1, sample_fps)))
    idx = 0
    try:
        while True:
            ok, frame = cap.read()
            if not ok:
                break
            if idx % step == 0:
                yield FrameRef(index=idx, timestamp=idx / src_fps, image=frame)
            idx += 1
    finally:
        cap.release()


@dataclass
class _SponsorAccum:
    sponsor: str
    detections: int = 0
    frames_present: set = field(default_factory=set)
    area_pct_sum: float = 0.0
    peak_area_pct: float = 0.0
    first_seen: float | None = None
    last_seen: float | None = None

    def add(self, area_pct: float, timestamp: float, frame_index: int) -> None:
        self.detections += 1
        self.frames_present.add(frame_index)
        self.area_pct_sum += area_pct
        self.peak_area_pct = max(self.peak_area_pct, area_pct)
        self.first_seen = timestamp if self.first_seen is None else min(self.first_seen, timestamp)
        self.last_seen = timestamp if self.last_seen is None else max(self.last_seen, timestamp)


class ExposureAggregator:
    """Accumulates detections across frames into per-sponsor screen-time."""

    def __init__(self, sample_fps: float, frame_area_px: float, rate_per_second: float = 0.0):
        self.sample_fps = max(0.1, sample_fps)
        self.frame_area_px = max(1.0, frame_area_px)
        self.rate_per_second = rate_per_second
        self._by_sponsor: dict[str, _SponsorAccum] = {}

    def add_detections(self, detections) -> None:
        for d in detections:
            area_pct = 100.0 * d.area_px / self.frame_area_px
            acc = self._by_sponsor.setdefault(d.sponsor, _SponsorAccum(d.sponsor))
            acc.add(area_pct, d.timestamp, d.frame_index)

    def results(self) -> list[dict]:
        out: list[dict] = []
        for acc in self._by_sponsor.values():
            # one sampled frame ≈ 1/sample_fps seconds of visibility
            visible_seconds = len(acc.frames_present) / self.sample_fps
            avg_area = (acc.area_pct_sum / acc.detections) if acc.detections else 0.0
            out.append(
                {
                    "sponsor": acc.sponsor,
                    "detections": acc.detections,
                    "visible_seconds": round(visible_seconds, 2),
                    "avg_area_pct": round(avg_area, 3),
                    "peak_area_pct": round(acc.peak_area_pct, 3),
                    "first_seen_seconds": round(acc.first_seen, 2) if acc.first_seen is not None else None,
                    "last_seen_seconds": round(acc.last_seen, 2) if acc.last_seen is not None else None,
                    "est_media_value": round(visible_seconds * self.rate_per_second, 2),
                }
            )
        out.sort(key=lambda r: r["visible_seconds"], reverse=True)
        return out
