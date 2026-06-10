"""Generate cv/demo-assets/insights-social.md from the `posts` table.

Oral-ready numbers for the Group 1 meeting: posting cadence, sponsor-post
engagement uplift, top sponsor posts, mention share per sponsor.

Usage:
    cv/.venv/bin/python scripts/social_insights.py [--account caosasuna] [--days 90]
"""
from __future__ import annotations

import argparse
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent


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
    ap.add_argument("--days", type=int, default=90)
    ap.add_argument("--out", default="cv/demo-assets/insights-social.md")
    args = ap.parse_args()

    load_env()
    from supabase import create_client

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    )
    cutoff = datetime.now(timezone.utc) - timedelta(days=args.days)
    posts = (
        sb.table("posts")
        .select("posted_at, likes, comments, sponsor_tags, permalink")
        .eq("account", args.account)
        .eq("platform", "instagram")
        .gte("posted_at", cutoff.isoformat())
        .order("posted_at")
        .execute()
        .data
    )
    if not posts:
        raise SystemExit(f"aucun post pour @{args.account} sur {args.days} j")

    def eng(p: dict) -> int:
        return (p["likes"] or 0) + (p["comments"] or 0)

    tagged = [p for p in posts if p.get("sponsor_tags")]
    plain = [p for p in posts if not p.get("sponsor_tags")]

    per_week = len(posts) / (args.days / 7)
    avg_tagged = sum(map(eng, tagged)) / len(tagged) if tagged else 0
    avg_plain = sum(map(eng, plain)) / len(plain) if plain else 0
    gap_pct = ((avg_tagged - avg_plain) / avg_plain * 100) if avg_plain else 0

    top5 = sorted(tagged, key=eng, reverse=True)[:5]

    mention_counts: dict[str, int] = {}
    for p in tagged:
        for t in p["sponsor_tags"]:
            mention_counts[t] = mention_counts.get(t, 0) + 1

    sign = "+" if gap_pct >= 0 else ""
    lines = [
        f"# Insights social — @{args.account} (Instagram, {args.days} derniers jours)",
        "",
        f"_Généré le {datetime.now(timezone.utc).date().isoformat()} depuis la table `posts` (collecte Apify)._",
        "",
        "## 1. Cadence de publication",
        "",
        f"- **{len(posts)} posts** en {args.days} jours, soit **{per_week:.1f} posts/semaine** en moyenne.",
        "",
        "## 2. Le chiffre clé — engagement des posts sponsors",
        "",
        f"- Posts **avec** mention sponsor : {len(tagged)} posts, **{avg_tagged:,.0f} engagements moyens**.",
        f"- Posts **sans** mention sponsor : {len(plain)} posts, **{avg_plain:,.0f} engagements moyens**.",
        f"- **Écart : {sign}{gap_pct:.0f}%** pour les posts sponsors.",
        "",
        "## 3. Top 5 posts sponsors",
        "",
        "| Date | Sponsor(s) | Engagements | Lien |",
        "|---|---|---:|---|",
    ]
    for p in top5:
        date = str(p["posted_at"])[:10]
        tags = "+".join(p["sponsor_tags"])
        lines.append(f"| {date} | {tags} | {eng(p):,} | {p['permalink']} |")
    lines += [
        "",
        "## 4. Mentions par sponsor (présence dans le contenu du club)",
        "",
        "| Sponsor | Posts avec mention |",
        "|---|---:|",
    ]
    for tag, n in sorted(mention_counts.items(), key=lambda kv: kv[1], reverse=True):
        lines.append(f"| {tag} | {n} |")
    lines += [
        "",
        "---",
        f"_Méthodologie : mention détectée dans la caption (matching insensible à la casse). "
        f"Engagement = likes + commentaires. Période : {cutoff.date().isoformat()} → aujourd'hui._",
        "",
    ]

    out = REPO_ROOT / args.out
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"✓ {out}")
    print(f"  {len(posts)} posts | {per_week:.1f}/sem | sponsors {len(tagged)} posts, écart {sign}{gap_pct:.0f}%")


if __name__ == "__main__":
    main()
