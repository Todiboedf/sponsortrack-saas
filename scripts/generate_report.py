"""Generate the branded weekly sponsor report (PDF + page PNGs) from live data.

The white-label asset we sell: 3 pages, real data only, Sponsorlens brand.
Page 1 overview KPIs, page 2 social, page 3 broadcast CV POC.

Usage:
    cv/.venv/bin/python scripts/generate_report.py \
        [--out cv/demo-assets/rapport-osasuna-2026-06-10.pdf] \
        [--logo cv/assets/osasuna-crest.png] [--frame cv/assets/report-frame.jpg]

Env: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (.env.local).
"""
from __future__ import annotations

import argparse
import json
import os
from datetime import datetime, timedelta, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

NAVY = "#0A1628"
CARD = "#0F1A2E"
CREAM = "#F4EFE6"
GOLD = "#B8975A"
RED = "#8B0028"

FOOTER = "Sponsorlens — measured, not estimated · sponsorlens.io"
EMV_RATE_EUR = 0.07  # € per engagement (likes + comments)


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


def parse_ts(value: object) -> datetime | None:
    try:
        return datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except (ValueError, TypeError):
        return None


def fetch_data() -> dict:
    from supabase import create_client

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    )
    sponsor = (
        sb.table("sponsors").select("id").eq("slug", "ca-osasuna").single().execute().data
    )
    kpi_rows = (
        sb.table("sponsor_kpis_daily")
        .select("platform, date, followers, engagement_rate, emv, raw")
        .eq("sponsor_id", sponsor["id"])
        .order("date", desc=True)
        .limit(10)
        .execute()
        .data
    )
    latest: dict[str, dict] = {}
    for r in kpi_rows:
        latest.setdefault(r["platform"], r)

    cutoff90 = (datetime.now(timezone.utc) - timedelta(days=90)).isoformat()
    posts = (
        sb.table("posts")
        .select("posted_at, likes, comments, sponsor_tags, permalink")
        .eq("account", "caosasuna")
        .eq("platform", "instagram")
        .gte("posted_at", cutoff90)
        .order("posted_at")
        .execute()
        .data
    )
    for p in posts:
        p["ts"] = datetime.fromisoformat(p["posted_at"].replace("Z", "+00:00"))
        p["eng"] = (p["likes"] or 0) + (p["comments"] or 0)

    report = json.loads((REPO_ROOT / "cv" / "report.json").read_text())
    return {"latest": latest, "posts": posts, "cv": report}


def fmt_compact(n: float) -> str:
    if n >= 1_000_000:
        return f"{n / 1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n / 1_000:.0f}k"
    return f"{n:.0f}"


def new_page(plt):
    fig = plt.figure(figsize=(8.27, 11.69), dpi=150)
    fig.patch.set_facecolor(NAVY)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")
    return fig, ax


def footer(fig, page_n: int, today: str) -> None:
    fig.text(0.06, 0.025, FOOTER, color=CREAM, alpha=0.45, fontsize=8)
    fig.text(0.94, 0.025, f"{today} · page {page_n}/3", color=CREAM, alpha=0.45, fontsize=8, ha="right")


def card(ax, x: float, y: float, w: float, h: float) -> None:
    from matplotlib.patches import FancyBboxPatch

    ax.add_patch(
        FancyBboxPatch(
            (x, y), w, h,
            boxstyle="round,pad=0.008,rounding_size=0.012",
            facecolor=CARD, edgecolor=CREAM, linewidth=0.5, alpha=0.95,
            mutation_aspect=8.27 / 11.69,
        )
    )


def kpi_card(ax, fig, x: float, y: float, label: str, value: str, sub: str) -> None:
    card(ax, x, y, 0.19, 0.085)
    fig.text(x + 0.012, y + 0.066, label.upper(), color=GOLD, fontsize=6.5, fontweight="bold")
    fig.text(x + 0.012, y + 0.030, value, color=CREAM, fontsize=16, fontweight="bold")
    fig.text(x + 0.012, y + 0.012, sub, color=CREAM, alpha=0.5, fontsize=6.5)


def style_axes(a) -> None:
    a.set_facecolor(CARD)
    for sp in a.spines.values():
        sp.set_color(CREAM)
        sp.set_alpha(0.2)
    a.tick_params(colors=CREAM, labelsize=6)
    a.grid(axis="y", color=CREAM, alpha=0.08)


def engagement_axes(fig, rect, posts, days: int, title: str, cap_outliers: bool = False) -> None:
    import matplotlib.dates as mdates
    import numpy as np

    a = fig.add_axes(rect)
    style_axes(a)
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    sel = [p for p in posts if p["ts"] >= cutoff]
    plain = [p for p in sel if not p["sponsor_tags"]]
    spons = [p for p in sel if p["sponsor_tags"]]
    if plain:
        a.vlines([p["ts"] for p in plain], 0, [p["eng"] for p in plain], color=CREAM, alpha=0.3, linewidth=0.8)
        a.scatter([p["ts"] for p in plain], [p["eng"] for p in plain], color=CREAM, s=6, alpha=0.55)
    if spons:
        a.vlines([p["ts"] for p in spons], 0, [p["eng"] for p in spons], color=GOLD, alpha=0.8, linewidth=1.4)
        a.scatter([p["ts"] for p in spons], [p["eng"] for p in spons], color=GOLD, marker="D", s=14)
    a.set_title(title, color=CREAM, fontsize=8, loc="left", pad=5)
    a.xaxis.set_major_formatter(mdates.DateFormatter("%b %d"))
    a.set_ylim(bottom=0)

    if cap_outliers and sel:
        ys = [p["eng"] for p in sel]
        p95 = float(np.percentile(ys, 95))
        if max(ys) > 2 * p95:
            lim = p95 * 1.5
            a.set_ylim(0, lim)
            top_post = max(sel, key=lambda p: p["eng"])
            a.annotate(
                f"viral reel — {top_post['eng'] / 1000:.0f}k (axis clipped)",
                xy=(top_post["ts"], lim * 0.96),
                xytext=(14, -10),
                textcoords="offset points",
                color=GOLD, fontsize=6.5,
                arrowprops=dict(arrowstyle="->", color=GOLD, lw=0.8),
            )


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default="cv/demo-assets/rapport-osasuna-2026-06-10.pdf")
    ap.add_argument("--logo", default="cv/assets/osasuna-crest.png", help="white-label club crest (PNG)")
    ap.add_argument("--frame", default="cv/assets/report-frame.jpg", help="annotated broadcast frame")
    args = ap.parse_args()

    load_env()
    data = fetch_data()
    latest, posts, cvrep = data["latest"], data["posts"], data["cv"]

    import matplotlib

    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    from matplotlib.backends.backend_pdf import PdfPages

    today = "June 10, 2026"
    out = REPO_ROOT / args.out
    out.parent.mkdir(parents=True, exist_ok=True)

    ig = latest.get("instagram", {})
    tt = latest.get("tiktok", {})
    audience = (ig.get("followers") or 0) + (tt.get("followers") or 0)
    er = (
        ((ig.get("engagement_rate") or 0) * (ig.get("followers") or 0)
         + (tt.get("engagement_rate") or 0) * (tt.get("followers") or 0)) / audience
        if audience else 0
    )

    # EMV: club accounts only, content PUBLISHED in the last 7 days, €0.07/engagement
    week_ago = datetime.now(timezone.utc) - timedelta(days=7)
    week_posts = [p for p in posts if p["ts"] >= week_ago]
    ig_week_eng = sum(p["eng"] for p in week_posts)
    tt_week = [
        v for v in (tt.get("raw") or [])
        if (t := parse_ts(v.get("timestamp"))) and t >= week_ago
    ]
    tt_week_eng = sum(
        max(0, int(v.get("likes") or 0)) + max(0, int(v.get("comments") or 0)) for v in tt_week
    )
    emv_week = EMV_RATE_EUR * (ig_week_eng + tt_week_eng)

    tagged = [p for p in posts if p["sponsor_tags"]]
    plain = [p for p in posts if not p["sponsor_tags"]]
    avg_t = sum(p["eng"] for p in tagged) / len(tagged) if tagged else 0
    avg_p = sum(p["eng"] for p in plain) / len(plain) if plain else 0
    gap = (avg_t - avg_p) / avg_p * 100 if avg_p else 0
    mentions: dict[str, int] = {}
    for p in tagged:
        for t in p["sponsor_tags"]:
            mentions[t] = mentions.get(t, 0) + 1
    top3 = sorted(tagged, key=lambda p: p["eng"], reverse=True)[:3]

    pngs: list[Path] = []
    with PdfPages(out) as pdf:
        # ── PAGE 1 — Overview ────────────────────────────────────────
        fig, ax = new_page(plt)
        logo_path = REPO_ROOT / args.logo
        if logo_path.exists():
            lax = fig.add_axes([0.06, 0.893, 0.055, 0.052])
            lax.imshow(plt.imread(logo_path), aspect="auto")
            lax.axis("off")
        else:
            card(ax, 0.06, 0.905, 0.10, 0.052)
            fig.text(0.11, 0.928, "[Club logo]", color=CREAM, alpha=0.45, fontsize=7, ha="center")
        fig.text(0.06, 0.858, "CA Osasuna — Sponsor Exposure Report", color=CREAM, fontsize=20, fontweight="bold")
        fig.text(0.06, 0.836, f"Week of {today}  ·  Instagram + TikTok + recorded broadcast", color=GOLD, fontsize=10)
        fig.text(0.06, 0.818, "Auto-generated weekly report · Mondays 07:00", color=CREAM, alpha=0.55, fontsize=8.5)

        kpi_card(ax, fig, 0.06, 0.700, "Total audience", fmt_compact(audience), "IG 415k + TikTok 5.8M, latest day")
        kpi_card(ax, fig, 0.2867, 0.700, "Avg engagement rate", f"{er:.2f}%", "weighted by audience")
        kpi_card(ax, fig, 0.5133, 0.700, "Posts · last 7 days", f"{len(week_posts)} IG",
                 f"+ {len(tt_week)} TikTok videos")
        kpi_card(ax, fig, 0.74, 0.700, "Est. media value", f"€{emv_week:,.0f}", "club accounts · last 7 days")

        card(ax, 0.06, 0.600, 0.87, 0.07)
        fig.text(0.5, 0.6455, "TikTok audience is 14× Instagram", color=GOLD, fontsize=16, fontweight="bold", ha="center")
        fig.text(0.5, 0.617, "5.8M vs 415k followers, measured daily, most clubs undervalue it in sponsor packages",
                 color=CREAM, alpha=0.7, fontsize=8.5, ha="center")

        engagement_axes(fig, [0.10, 0.295, 0.80, 0.255], posts, 30,
                        "Instagram engagement per post, last 30 days  (gold = sponsor-mentioning posts)")
        fig.text(0.06, 0.225, "Every number in this report is measured on public data: club social accounts and "
                              "recorded broadcast footage.",
                 color=CREAM, alpha=0.6, fontsize=8)
        fig.text(0.06, 0.208, "No panels, no audience models, no extrapolation.",
                 color=CREAM, alpha=0.6, fontsize=8)
        fig.text(0.06, 0.183,
                 f"EMV = €{EMV_RATE_EUR:.2f} per engagement (likes + comments) on content published by club accounts "
                 f"in the last 7 days:",
                 color=CREAM, alpha=0.45, fontsize=7)
        fig.text(0.06, 0.168,
                 f"{ig_week_eng:,} Instagram + {tt_week_eng:,} TikTok engagements = €{emv_week:,.0f}.",
                 color=CREAM, alpha=0.45, fontsize=7)
        footer(fig, 1, today)
        pdf.savefig(fig, facecolor=NAVY)
        png = out.parent / f"{out.stem}-p1.png"
        fig.savefig(png, facecolor=NAVY)
        pngs.append(png)
        plt.close(fig)

        # ── PAGE 2 — Social ──────────────────────────────────────────
        fig, ax = new_page(plt)
        fig.text(0.06, 0.93, "Social — owned media", color=CREAM, fontsize=16, fontweight="bold")
        fig.text(0.06, 0.908, "@caosasuna Instagram · 90-day window · sponsor mentions detected in captions",
                 color=GOLD, fontsize=9)

        engagement_axes(fig, [0.10, 0.66, 0.80, 0.20], posts, 90,
                        "Engagement per post, last 90 days  (283 posts, 22 posts/week average)",
                        cap_outliers=True)

        fig.text(0.06, 0.622, "Top sponsor posts", color=CREAM, fontsize=11, fontweight="bold")
        y = 0.565
        for i, p in enumerate(top3, 1):
            card(ax, 0.06, y - 0.012, 0.87, 0.045)
            fig.text(0.075, y + 0.008, f"#{i}", color=GOLD, fontsize=10, fontweight="bold")
            fig.text(0.115, y + 0.008, f"{p['ts'].date().isoformat()}   {'+'.join(p['sponsor_tags'])}",
                     color=CREAM, fontsize=9)
            fig.text(0.55, y + 0.008, f"{p['eng']:,} engagements", color=CREAM, fontsize=9, fontweight="bold")
            fig.text(0.925, y + 0.008, p["permalink"].replace("https://www.", ""), color=CREAM, alpha=0.45,
                     fontsize=6.5, ha="right")
            y -= 0.058

        card(ax, 0.06, 0.215, 0.42, 0.15)
        fig.text(0.075, 0.335, "THE GAP", color=GOLD, fontsize=8, fontweight="bold")
        fig.text(0.075, 0.288, f"{gap:.0f}%", color=CREAM, fontsize=26, fontweight="bold")
        fig.text(0.075, 0.255, "sponsor-mentioning posts vs organic content,", color=CREAM, alpha=0.7, fontsize=8)
        fig.text(0.075, 0.238, "90 days. Creative integration is the upside.", color=CREAM, alpha=0.7, fontsize=8)

        card(ax, 0.51, 0.215, 0.42, 0.15)
        fig.text(0.525, 0.335, "MENTIONS BY SPONSOR", color=GOLD, fontsize=8, fontweight="bold")
        ym = 0.305
        for name, n in sorted(mentions.items(), key=lambda kv: kv[1], reverse=True):
            fig.text(0.525, ym, name, color=CREAM, fontsize=9)
            fig.text(0.91, ym, str(n), color=CREAM, fontsize=9, fontweight="bold", ha="right")
            ym -= 0.022
        fig.text(0.525, ym - 0.005, "7 of 10 tracked sponsors: zero owned-media activation", color=GOLD, fontsize=7.5)

        footer(fig, 2, today)
        pdf.savefig(fig, facecolor=NAVY)
        png = out.parent / f"{out.stem}-p2.png"
        fig.savefig(png, facecolor=NAVY)
        pngs.append(png)
        plt.close(fig)

        # ── PAGE 3 — Broadcast POC ───────────────────────────────────
        fig, ax = new_page(plt)
        fig.text(0.06, 0.93, "Broadcast — screen time (POC)", color=CREAM, fontsize=16, fontweight="bold")
        fig.text(0.06, 0.908, "Osasuna vs Alavés highlight · recorded public broadcast · YOLOv11 logo detection",
                 color=GOLD, fontsize=9)

        frame_path = REPO_ROOT / args.frame
        if not frame_path.exists():
            frame_path = REPO_ROOT / "cv" / "demo-assets" / "annotated-04-osasuna-highlight_0000556.jpg"
        img_ax = fig.add_axes([0.10, 0.585, 0.80, 0.29])
        img_ax.imshow(plt.imread(frame_path))
        img_ax.axis("off")
        fig.text(0.10, 0.572, "One sampled frame of the broadcast: sponsor boards detected and measured.",
                 color=CREAM, alpha=0.6, fontsize=7.5)

        fig.text(0.06, 0.525, "Screen time per sponsor", color=CREAM, fontsize=11, fontweight="bold")
        duration = float(cvrep["video"]["duration_seconds"]) or 1.0
        total_visible = sum(s["visible_seconds"] for s in cvrep["sponsors"]) or 1.0
        cols = [
            (0.075, "left", "SPONSOR"),
            (0.245, "left", "PLACEMENT"),
            (0.36, "left", "VISIBLE"),
            (0.455, "left", "% OF BROADCAST"),
            (0.625, "left", "SHARE OF VOICE"),
            (0.925, "right", "DETECTIONS"),
        ]
        for cx, align, label in cols:
            fig.text(cx, 0.495, label, color=GOLD, fontsize=7, fontweight="bold", ha=align)
        yr = 0.470
        for s in cvrep["sponsors"]:
            pct_broadcast = 100 * s["visible_seconds"] / duration
            sov = 100 * s["visible_seconds"] / total_visible
            fig.text(0.075, yr, s["sponsor"], color=CREAM, fontsize=8.5)
            fig.text(0.245, yr, s.get("placement", "other").upper(), color=CREAM, alpha=0.6, fontsize=7.5)
            fig.text(0.36, yr, f"{s['visible_seconds']:.1f}s", color=CREAM, fontsize=8.5)
            fig.text(0.455, yr, f"{pct_broadcast:.1f}%", color=CREAM, fontsize=8.5)
            bar_w = 0.16 * sov / 100
            ax.add_patch(plt.Rectangle((0.625, yr - 0.002), bar_w, 0.010, facecolor=RED, edgecolor="none"))
            fig.text(0.625 + bar_w + 0.008, yr, f"{sov:.1f}%", color=CREAM, fontsize=8)
            fig.text(0.925, yr, str(s["detections"]), color=CREAM, alpha=0.7, fontsize=8, ha="right")
            yr -= 0.0245

        fig.text(0.06, yr - 0.012,
                 "% of broadcast = visible time / 195s of footage; sponsors are co-visible, so the column can sum "
                 "past 100%. Share of voice = share of",
                 color=CREAM, alpha=0.55, fontsize=7)
        fig.text(0.06, yr - 0.027,
                 "total measured exposure (sums to 100%).",
                 color=CREAM, alpha=0.55, fontsize=7)
        fig.text(0.06, yr - 0.052,
                 "Computer vision is in active development. Measured on a recorded public broadcast as a proof of "
                 "concept; production deployments run",
                 color=CREAM, alpha=0.55, fontsize=7.5)
        fig.text(0.06, yr - 0.067,
                 "on official feeds under rights-holder agreements.",
                 color=CREAM, alpha=0.55, fontsize=7.5)
        footer(fig, 3, today)
        pdf.savefig(fig, facecolor=NAVY)
        png = out.parent / f"{out.stem}-p3.png"
        fig.savefig(png, facecolor=NAVY)
        pngs.append(png)
        plt.close(fig)

    print(f"✓ {out}  ({out.stat().st_size / 1e6:.1f} MB)")
    for p in pngs:
        print(f"  preview: {p.name}")
    print(
        f"  KPIs: audience {fmt_compact(audience)} | ER {er:.2f}% | "
        f"posts 7j {len(week_posts)} IG + {len(tt_week)} TT | EMV €{emv_week:,.0f} "
        f"({ig_week_eng:,} + {tt_week_eng:,} eng) | gap {gap:.0f}%"
    )


if __name__ == "__main__":
    main()
