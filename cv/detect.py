"""Logo detection on video frames using a fine-tuned YOLO model (Ultralytics).

The heavy `ultralytics` import is done lazily inside `LogoDetector.__init__`, so
this module imports fine on a machine without the dependency (useful for tests
and for the dashboard/codegen side that only needs the `Detection` dataclass).
"""
from __future__ import annotations

from dataclasses import dataclass


@dataclass
class Detection:
    """One detected sponsor logo in one frame."""

    sponsor: str          # class name from the trained model
    confidence: float
    x1: float
    y1: float
    x2: float
    y2: float
    frame_index: int      # index in the source video
    timestamp: float      # seconds into the source video

    @property
    def area_px(self) -> float:
        return max(0.0, self.x2 - self.x1) * max(0.0, self.y2 - self.y1)


class LogoDetector:
    """Thin wrapper around an Ultralytics YOLO model."""

    def __init__(self, model_path: str, conf: float = 0.35, device: str | None = None):
        from ultralytics import YOLO  # lazy: keeps the module importable without the dep

        self.model = YOLO(model_path)
        self.conf = conf
        self.device = device
        # {class_id: class_name} — set when the model was trained (see README / Roboflow)
        self.names: dict[int, str] = dict(self.model.names)

    def detect_frame(self, frame, frame_index: int, timestamp: float) -> list[Detection]:
        results = self.model.predict(
            frame, conf=self.conf, device=self.device, verbose=False
        )
        out: list[Detection] = []
        for r in results:
            boxes = getattr(r, "boxes", None)
            if boxes is None:
                continue
            for b in boxes:
                cls_id = int(b.cls[0])
                x1, y1, x2, y2 = (float(v) for v in b.xyxy[0])
                out.append(
                    Detection(
                        sponsor=self.names.get(cls_id, str(cls_id)),
                        confidence=float(b.conf[0]),
                        x1=x1,
                        y1=y1,
                        x2=x2,
                        y2=y2,
                        frame_index=frame_index,
                        timestamp=timestamp,
                    )
                )
        return out
