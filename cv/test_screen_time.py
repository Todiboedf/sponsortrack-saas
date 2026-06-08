"""Pure-stdlib tests for the screen-time aggregation.

Runs without opencv/ultralytics (those are imported lazily elsewhere):
    python3 cv/test_screen_time.py
"""
from detect import Detection
from screen_time import ExposureAggregator


def make(sponsor: str, frame: int, ts: float, x2: float = 100.0, y2: float = 100.0) -> Detection:
    # box from (0,0) to (x2,y2); default 100x100 = 10_000 px
    return Detection(
        sponsor=sponsor, confidence=0.9, x1=0.0, y1=0.0, x2=x2, y2=y2,
        frame_index=frame, timestamp=ts,
    )


def test_visible_seconds_counts_unique_frames() -> None:
    agg = ExposureAggregator(sample_fps=2.0, frame_area_px=1_000_000.0)  # 1000x1000 frame
    # Northwind in sampled frames 0, 2, 4 -> 3 unique frames / 2fps = 1.5s
    agg.add_detections([make("Northwind", 0, 0.0), make("Northwind", 2, 1.0), make("Northwind", 4, 2.0)])
    # a duplicate detection in an already-counted frame must NOT add screen-time
    agg.add_detections([make("Northwind", 4, 2.0)])
    res = {r["sponsor"]: r for r in agg.results()}
    assert res["Northwind"]["visible_seconds"] == 1.5, res
    assert res["Northwind"]["detections"] == 4, res
    assert res["Northwind"]["first_seen_seconds"] == 0.0
    assert res["Northwind"]["last_seen_seconds"] == 2.0


def test_area_pct_and_sort_order() -> None:
    agg = ExposureAggregator(sample_fps=1.0, frame_area_px=1_000_000.0)
    agg.add_detections([make("Vertex", 0, 0.0)])                          # 1 frame  -> 1.0s
    agg.add_detections([make("Lumina", 0, 0.0), make("Lumina", 1, 1.0)])  # 2 frames -> 2.0s
    res = agg.results()
    assert res[0]["sponsor"] == "Lumina", "results must sort by visible_seconds desc"
    v = {r["sponsor"]: r for r in res}
    assert abs(v["Vertex"]["avg_area_pct"] - 1.0) < 1e-6, v   # 10_000 / 1_000_000 = 1%
    assert abs(v["Vertex"]["visible_seconds"] - 1.0) < 1e-6


def test_media_value() -> None:
    agg = ExposureAggregator(sample_fps=2.0, frame_area_px=1_000_000.0, rate_per_second=10.0)
    agg.add_detections([make("Bravo", 0, 0.0), make("Bravo", 2, 1.0)])    # 2 frames / 2fps = 1.0s
    r = agg.results()[0]
    assert r["visible_seconds"] == 1.0, r
    assert r["est_media_value"] == 10.0, r


if __name__ == "__main__":
    tests = [(n, f) for n, f in list(globals().items()) if n.startswith("test_") and callable(f)]
    for name, fn in tests:
        fn()
        print(f"  ✓ {name}")
    print(f"All {len(tests)} CV aggregation tests passed.")
