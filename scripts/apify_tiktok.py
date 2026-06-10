"""TikTok KPI collection via Apify (clockworks/tiktok-scraper) -> sponsor_kpis_daily.

Standalone + additive. Maps the latest videos of a profile to the same KPI
shape as the Instagram collectors (platform='tiktok'), so /dashboard and the
/demo trend render it without any UI change.

Usage:
    cv/.venv/bin/python scripts/apify_tiktok.py [--handle caosasuna] [--sponsor-slug ca-osasuna]

Env: APIFY_TOKEN (.env) + NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (.env.local).
"""
from __future__ import annotations

import argparse
import os
from datetime import datetime, timezone
from pathlib import Path

import requests

REPO_ROOT = Path(__file__).resolve().parent.parent
ACTOR_URL = "https://api.apify.com/v2/acts/clockworks~tiktok-scraper/run-sync-get-dataset-items"
EMV_PER_ENGAGEMENT = 0.07


def load_env() -> None:
    for name in (".env", ".env.local"):
        p = REPO_ROOT / name
        if not p.exists():
            continue
        for line in p.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--handle", default="caosasuna")
    ap.add_argument("--sponsor-slug", default="ca-osasuna", dest="sponsor_slug")
    ap.add_argument("--videos", type=int, default=12)
    args = ap.parse_args()

    load_env()
    token = os.environ.get("APIFY_TOKEN")
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not token or not url or not key:
        raise SystemExit("Missing APIFY_TOKEN / NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY")

    r = requests.post(
        ACTOR_URL,
        params={"token": token, "timeout": 240},
        json={
            "profiles": [args.handle],
            "resultsPerPage": args.videos,
            "profileScrapeSections": ["videos"],
            "shouldDownloadVideos": False,
            "shouldDownloadCovers": False,
            "shouldDownloadSubtitles": False,
        },
        timeout=280,
    )
    r.raise_for_status()
    items = [it for it in r.json() if isinstance(it, dict) and not it.get("error")]
    if not items:
        raise SystemExit(f"aucune vidéo renvoyée pour @{args.handle}")
    print(f"{len(items)} vidéos reçues pour @{args.handle}")

    author = (items[0].get("authorMeta") or {}) if items else {}
    followers = int(author.get("fans") or 0)
    videos_total = int(author.get("video") or 0)

    raw = []
    likes = comments = 0
    for v in items[: args.videos]:
        v_likes = max(0, int(v.get("diggCount") or 0))
        v_comments = max(0, int(v.get("commentCount") or 0))
        likes += v_likes
        comments += v_comments
        raw.append(
            {
                "id": str(v.get("id") or ""),
                "shortcode": str(v.get("id") or ""),
                "likes": v_likes,
                "comments": v_comments,
                "is_video": True,
                "timestamp": v.get("createTimeISO"),
                "caption": str(v.get("text") or "")[:280],
                "plays": int(v.get("playCount") or 0),
                "permalink": str(v.get("webVideoUrl") or ""),
            }
        )

    engagements = likes + comments
    er = round((engagements / len(raw) / followers) * 100, 3) if followers and raw else 0
    today = datetime.now(timezone.utc).date().isoformat()

    from supabase import create_client

    sb = create_client(url, key)
    sponsor = (
        sb.table("sponsors").select("id, slug").eq("slug", args.sponsor_slug).single().execute().data
    )
    sb.table("sponsors").update({"tiktok_handle": args.handle}).eq("id", sponsor["id"]).execute()
    sb.table("sponsor_kpis_daily").upsert(
        {
            "sponsor_id": sponsor["id"],
            "platform": "tiktok",
            "date": today,
            "followers": followers,
            "posts": videos_total,
            "likes": likes,
            "comments": comments,
            "engagement_rate": er,
            "emv": round(engagements * EMV_PER_ENGAGEMENT, 2),
            "raw": raw,
        },
        on_conflict="sponsor_id,platform,date",
    ).execute()

    print(
        f"  ✓ {args.sponsor_slug} tiktok @{args.handle}  {followers:,} followers  "
        f"{videos_total} vidéos  ER {er}%  ({len(raw)} vidéos raw) — date {today}"
    )


if __name__ == "__main__":
    main()
