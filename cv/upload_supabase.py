"""Upload a CV report.json into Supabase (cv_matches + cv_sponsor_exposure).

Needs the same Supabase project as the Next app. Set in cv/.env (or the shell):
    NEXT_PUBLIC_SUPABASE_URL
    SUPABASE_SERVICE_ROLE_KEY     (server-side only — never commit it)

Usage:
    python upload_supabase.py --report report.json
"""
from __future__ import annotations

import argparse
import json
import os


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--report", required=True)
    args = p.parse_args()

    try:
        from dotenv import load_dotenv

        load_dotenv()
    except ImportError:
        pass

    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not url or not key:
        raise SystemExit(
            "Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY "
            "(set them in cv/.env or the shell)."
        )

    from supabase import create_client

    sb = create_client(url, key)

    with open(args.report, encoding="utf-8") as f:
        report = json.load(f)

    m = report["match"]
    match_row = (
        sb.table("cv_matches")
        .insert(
            {
                "property": m.get("property"),
                "opponent": m.get("opponent"),
                "competition": m.get("competition"),
                "match_date": m.get("match_date"),
                "source": m.get("source"),
                "video_label": m.get("video_label"),
                "duration_seconds": report.get("video", {}).get("duration_seconds"),
                "sample_fps": report.get("sample_fps"),
            }
        )
        .execute()
    )
    match_id = match_row.data[0]["id"]

    rows = [
        {
            "match_id": match_id,
            "sponsor": s["sponsor"],
            "placement": s.get("placement", "other"),
            "visible_seconds": s["visible_seconds"],
            "detections": s["detections"],
            "avg_area_pct": s["avg_area_pct"],
            "peak_area_pct": s["peak_area_pct"],
            "first_seen_seconds": s["first_seen_seconds"],
            "last_seen_seconds": s["last_seen_seconds"],
            "est_media_value": s["est_media_value"],
        }
        for s in report.get("sponsors", [])
    ]
    if rows:
        sb.table("cv_sponsor_exposure").insert(rows).execute()

    print(f"✓ uploaded match {match_id} with {len(rows)} sponsor rows")


if __name__ == "__main__":
    main()
