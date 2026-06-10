"""Render the 30-day engagement chart (sponsor posts highlighted) from `posts`.

Output: cv/demo-assets/social-engagement-30d.png (brand palette, meeting-ready).

Usage:
    cv/.venv/bin/python scripts/social_chart.py [--account caosasuna] [--days 30]
"""
from __future__ import annotations

import argparse
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

NAVY = "#0A1628"
CREAM = "#F4EFE6"
GOLD = "#B8975A"


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
    ap.add_argument("--account", default="caosasuna")
    ap.add_argument("--days", type=int, default=30)
    ap.add_argument("--out", default="cv/demo-assets/social-engagement-30d.png")
    args = ap.parse_args()

    load_env()
    from supabase import create_client

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    )
    cutoff = (datetime.now(timezone.utc) - timedelta(days=args.days)).isoformat()
    posts = (
        sb.table("posts")
        .select("posted_at, likes, comments, sponsor_tags")
        .eq("account", args.account)
        .eq("platform", "instagram")
        .gte("posted_at", cutoff)
        .order("posted_at")
        .execute()
        .data
    )
    if not posts:
        raise SystemExit(f"aucun post en base pour @{args.account} — lancer apify_backfill_posts.py d'abord")

    import matplotlib

    matplotlib.use("Agg")
    import matplotlib.dates as mdates
    import matplotlib.pyplot as plt

    plain: list[tuple[datetime, int]] = []
    spons: list[tuple[datetime, int, str]] = []
    for p in posts:
        ts = datetime.fromisoformat(p["posted_at"].replace("Z", "+00:00"))
        eng = (p["likes"] or 0) + (p["comments"] or 0)
        tags = p.get("sponsor_tags") or []
        if tags:
            spons.append((ts, eng, "+".join(tags)))
        else:
            plain.append((ts, eng))

    fig, ax = plt.subplots(figsize=(14, 7), dpi=150)
    fig.patch.set_facecolor(NAVY)
    ax.set_facecolor(NAVY)

    if plain:
        xs, ys = [d for d, _ in plain], [e for _, e in plain]
        ax.vlines(xs, 0, ys, color=CREAM, alpha=0.30, linewidth=1.0, zorder=2)
        ax.scatter(xs, ys, color=CREAM, marker="o", s=26, alpha=0.55, zorder=3, label="Posts")
    if spons:
        xs, ys = [d for d, _, _ in spons], [e for _, e, _ in spons]
        ax.vlines(xs, 0, ys, color=GOLD, alpha=0.75, linewidth=1.8, zorder=4)
        ax.scatter(
            xs, ys, color=GOLD, marker="D", s=58, zorder=5,
            label="Posts mentioning a sponsor",
        )
        top = max(spons, key=lambda t: t[1])
        ax.annotate(
            f"{top[2]} — {top[1]:,} engagements",
            xy=(top[0], top[1]),
            xytext=(0, 14),
            textcoords="offset points",
            ha="center",
            color=GOLD,
            fontsize=10,
            fontweight="bold",
        )

    ax.set_title(
        f"@{args.account} — Instagram engagement, last {args.days} days   "
        f"({len(posts)} posts, {len(spons)} mentioning sponsors)",
        color=CREAM, fontsize=14, pad=16, fontweight="bold",
    )
    ax.set_ylabel("Likes + comments per post", color=CREAM)
    ax.set_ylim(bottom=0)
    ax.tick_params(colors=CREAM, labelsize=9)
    for spine in ax.spines.values():
        spine.set_color(CREAM)
        spine.set_alpha(0.25)
    ax.xaxis.set_major_formatter(mdates.DateFormatter("%b %d"))
    ax.grid(axis="y", color=CREAM, alpha=0.08)
    ax.legend(
        facecolor=NAVY, edgecolor=CREAM, labelcolor=CREAM, framealpha=0.3, loc="upper left"
    )

    out = REPO_ROOT / args.out
    out.parent.mkdir(parents=True, exist_ok=True)
    fig.tight_layout()
    fig.savefig(out, facecolor=NAVY)
    print(f"✓ {out}  ({len(posts)} posts, {len(spons)} sponsorisés)")


if __name__ == "__main__":
    main()
