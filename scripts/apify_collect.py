"""Daily Instagram KPI collection via Apify (replaces the dead RapidAPI path).

Standalone + additive: reads the `sponsors` table, runs the
apify/instagram-profile-scraper actor once for all handles, and upserts
today's row per sponsor into `sponsor_kpis_daily` (same shape as the
legacy collector, so /dashboard and /demo render it untouched).

Usage:
    cv/.venv/bin/python scripts/apify_collect.py [--dry-run]

Env: APIFY_TOKEN (.env) + NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (.env.local).
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests

REPO_ROOT = Path(__file__).resolve().parent.parent
ACTOR_URL = "https://api.apify.com/v2/acts/apify~instagram-profile-scraper/run-sync-get-dataset-items"
EMV_PER_ENGAGEMENT = 0.07  # same industry placeholder as src/lib/instagram.ts


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


def fetch_profiles(token: str, usernames: list[str]) -> dict[str, dict]:
    """One actor run for all handles. Returns {username_lower: item}."""
    r = requests.post(
        ACTOR_URL,
        params={"token": token, "timeout": 240},
        json={"usernames": usernames},
        timeout=280,
    )
    r.raise_for_status()
    items = r.json()
    if not isinstance(items, list):
        raise RuntimeError(f"unexpected actor output: {str(items)[:200]}")
    return {str(it.get("username", "")).lower(): it for it in items if isinstance(it, dict)}


def kpis_from_item(item: dict) -> dict:
    followers = int(item.get("followersCount") or item.get("followers") or 0)
    posts_total = int(item.get("postsCount") or item.get("posts") or 0)
    latest = item.get("latestPosts") or []

    raw = []
    likes = comments = 0
    for p in latest[:12]:
        if not isinstance(p, dict):
            continue
        p_likes = max(0, int(p.get("likesCount") or 0))
        p_comments = max(0, int(p.get("commentsCount") or 0))
        likes += p_likes
        comments += p_comments
        ts = p.get("timestamp")  # ISO string from Apify
        caption = str(p.get("caption") or "")[:280]
        # Same shape as the legacy collector's `raw` (read by /demo topPosts)
        raw.append(
            {
                "id": str(p.get("id") or p.get("shortCode") or ""),
                "shortcode": str(p.get("shortCode") or ""),
                "likes": p_likes,
                "comments": p_comments,
                "is_video": (p.get("type") == "Video"),
                "timestamp": ts,
                "caption": caption,
            }
        )

    engagements = likes + comments
    er = (
        round((engagements / len(raw) / followers) * 100, 3)
        if followers > 0 and raw
        else 0
    )
    return {
        "followers": followers,
        "posts": posts_total,
        "likes": likes,
        "comments": comments,
        "engagement_rate": er,
        "emv": round(engagements * EMV_PER_ENGAGEMENT, 2),
        "raw": raw,
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="fetch + map, no DB writes")
    args = ap.parse_args()

    load_env()
    token = os.environ.get("APIFY_TOKEN")
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not token or not url or not key:
        raise SystemExit("Missing APIFY_TOKEN / NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY")

    from supabase import create_client

    sb = create_client(url, key)
    sponsors = (
        sb.table("sponsors")
        .select("id, slug, name, instagram_handle")
        .not_.is_("instagram_handle", "null")
        .execute()
        .data
    )
    handles = [s["instagram_handle"].lower() for s in sponsors]
    print(f"{len(sponsors)} comptes à collecter via Apify: {', '.join(handles)}")

    profiles = fetch_profiles(token, handles)
    today = datetime.now(timezone.utc).date().isoformat()

    ok = failed = 0
    for s in sponsors:
        handle = s["instagram_handle"].lower()
        item = profiles.get(handle)
        if not item or item.get("error"):
            failed += 1
            print(f"  ✗ {s['slug']:<14} @{handle} — absent/erreur: {str(item)[:120] if item else 'pas de résultat'}")
            continue
        k = kpis_from_item(item)
        row = {
            "sponsor_id": s["id"],
            "platform": "instagram",
            "date": today,
            "followers": k["followers"],
            "posts": k["posts"],
            "likes": k["likes"],
            "comments": k["comments"],
            "engagement_rate": k["engagement_rate"],
            "emv": k["emv"],
            "raw": k["raw"],
        }
        if not args.dry_run:
            sb.table("sponsor_kpis_daily").upsert(
                row, on_conflict="sponsor_id,platform,date"
            ).execute()
        ok += 1
        print(
            f"  ✓ {s['slug']:<14} @{handle:<22} {k['followers']:>12,} followers"
            f"  ER {k['engagement_rate']:>6.3f}%  EMV ${k['emv']:>10,.2f}  ({len(k['raw'])} posts raw)"
        )

    print(f"\n{ok} ok / {failed} échec(s) — date {today}{' (dry-run, rien écrit)' if args.dry_run else ''}")
    if ok == 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
