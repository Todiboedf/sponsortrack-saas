"""Backfill ~30 days of Instagram posts via Apify into the `posts` table.

Standalone + additive (needs supabase/posts-migration.sql applied once).
Tags each post with the sponsors mentioned in its caption.

Usage:
    cv/.venv/bin/python scripts/apify_backfill_posts.py \
        [--accounts caosasuna,kosner_climatizacion,eneryeti] [--days 30] [--limit 120]

Env: APIFY_TOKEN (.env) + NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (.env.local).
"""
from __future__ import annotations

import argparse
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path

import requests

REPO_ROOT = Path(__file__).resolve().parent.parent
ACTOR_URL = "https://api.apify.com/v2/acts/apify~instagram-post-scraper/run-sync-get-dataset-items"

# caption substring (lowercase) -> canonical sponsor tag
SPONSOR_PATTERNS: dict[str, str] = {
    "kosner": "Kosner",
    "eneryeti": "Eneryeti",
    "nissan": "Nissan",
    "macron": "Macron",
    "san miguel": "SanMiguel",
    "sanmiguel": "SanMiguel",
    "digi": "DIGI",
    "halcon": "Halcon",
    "halcón": "Halcon",
    "toyota": "Toyota",
    "lexus": "Lexus",
    "diario de navarra": "DiarioNavarra",
    "diariodenavarra": "DiarioNavarra",
    "tabar": "Tabar",
}


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


def sponsor_tags(caption: str) -> list[str]:
    low = caption.lower()
    return sorted({tag for pat, tag in SPONSOR_PATTERNS.items() if pat in low})


def parse_ts(value: object) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except ValueError:
        return None


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--accounts", default="caosasuna,kosner_climatizacion,eneryeti")
    ap.add_argument("--days", type=int, default=30)
    ap.add_argument("--limit", type=int, default=120, help="resultsLimit per account")
    args = ap.parse_args()
    accounts = [a.strip().lower() for a in args.accounts.split(",") if a.strip()]

    load_env()
    token = os.environ.get("APIFY_TOKEN")
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not token or not url or not key:
        raise SystemExit("Missing APIFY_TOKEN / NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY")

    cutoff = datetime.now(timezone.utc) - timedelta(days=args.days)
    print(f"Backfill {', '.join(accounts)} — posts depuis {cutoff.date()} (limit {args.limit}/compte)")

    r = requests.post(
        ACTOR_URL,
        params={"token": token, "timeout": 240},
        json={
            "username": accounts,
            "resultsLimit": args.limit,
            "onlyPostsNewerThan": cutoff.date().isoformat(),
        },
        timeout=280,
    )
    r.raise_for_status()
    items = r.json()
    if not isinstance(items, list):
        raise SystemExit(f"unexpected actor output: {str(items)[:200]}")
    print(f"{len(items)} items reçus de l'actor")

    from supabase import create_client

    sb = create_client(url, key)

    rows = []
    skipped = 0
    for it in items:
        if not isinstance(it, dict) or it.get("error"):
            skipped += 1
            continue
        permalink = str(it.get("url") or "")
        account = str(it.get("ownerUsername") or "").lower()
        posted_at = parse_ts(it.get("timestamp"))
        if not permalink or not account:
            skipped += 1
            continue
        if posted_at and posted_at < cutoff:
            skipped += 1
            continue
        caption = str(it.get("caption") or "")
        raw = {
            k: it.get(k)
            for k in ("type", "shortCode", "ownerUsername", "videoViewCount", "videoPlayCount")
            if it.get(k) is not None
        }
        rows.append(
            {
                "account": account,
                "platform": "instagram",
                "posted_at": posted_at.isoformat() if posted_at else None,
                "caption": caption[:2000],
                "likes": max(0, int(it.get("likesCount") or 0)),
                "comments": max(0, int(it.get("commentsCount") or 0)),
                "permalink": permalink,
                "sponsor_tags": sponsor_tags(caption),
                "raw": raw,
            }
        )

    if rows:
        # chunk upserts to stay well under payload limits
        for i in range(0, len(rows), 100):
            sb.table("posts").upsert(
                rows[i : i + 100], on_conflict="platform,permalink"
            ).execute()

    by_account: dict[str, int] = {}
    tagged = 0
    for row in rows:
        by_account[row["account"]] = by_account.get(row["account"], 0) + 1
        if row["sponsor_tags"]:
            tagged += 1
    print(f"{len(rows)} posts upsertés ({skipped} ignorés) — {tagged} avec mention sponsor")
    for acc, n in sorted(by_account.items()):
        print(f"  {acc:<24}{n:>4} posts")


if __name__ == "__main__":
    main()
