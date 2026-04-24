"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Eye, Heart, MessageCircle } from "lucide-react";

const sponsors = [
  { name: "Santander", color: "#EC1C23", initials: "S", value: "€3.2M", share: 92 },
  { name: "Adidas", color: "#000000", initials: "A", value: "€2.4M", share: 78 },
  { name: "Emirates", color: "#D71920", initials: "E", value: "€1.8M", share: 64 },
  { name: "Visit Rwanda", color: "#00A650", initials: "V", value: "€1.1M", share: 48 },
  { name: "Hublot", color: "#2B2B2B", initials: "H", value: "€820k", share: 32 },
];

const sparkPath =
  "M0,40 C20,34 35,42 55,28 C78,12 100,30 120,20 C140,10 160,28 180,18 C200,8 220,24 240,10";

export function DashboardMockup() {
  const reduced = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-[1120px]">
      <div
        aria-hidden
        className="absolute -inset-px rounded-[26px] bg-gradient-to-b from-white/20 via-white/[0.04] to-transparent"
      />
      <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0A0A12] shadow-[0_60px_120px_-40px_rgba(124,58,237,0.45),0_30px_80px_-30px_rgba(59,130,246,0.35)]">
        {/* Fake browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#090910] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <div className="mx-auto flex max-w-xs flex-1 items-center gap-1.5 rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-white/45">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            app.sponsortrack.io / dashboard
          </div>
          <div className="hidden gap-1.5 sm:flex">
            <span className="h-5 w-12 rounded bg-white/[0.04]" />
            <span className="h-5 w-5 rounded bg-white/[0.04]" />
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-12 gap-0">
          {/* Sidebar */}
          <aside className="col-span-3 hidden border-r border-white/[0.06] bg-[#08080E] p-4 lg:block">
            <div className="flex items-center gap-2 rounded-lg bg-white/[0.05] px-2.5 py-2 text-[12px] text-white/80">
              <span className="grid h-6 w-6 place-items-center rounded bg-gradient-to-br from-[#A78BFA] to-[#3B82F6] text-[10px] font-bold text-white">
                RM
              </span>
              <div className="min-w-0 flex-1 truncate">Real Madrid CF</div>
              <ArrowUpRight size={12} className="text-white/40" />
            </div>
            <nav className="mt-5 flex flex-col gap-0.5">
              {[
                ["Overview", true],
                ["Sponsors", false],
                ["Matches", false],
                ["Audience", false],
                ["Reports", false],
                ["Prospection", false],
              ].map(([label, active]) => (
                <div
                  key={label as string}
                  className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[12px] ${
                    active ? "bg-white/[0.06] text-white" : "text-white/55"
                  }`}
                >
                  <span className="h-3 w-3 rounded-sm border border-white/15" />
                  {label as string}
                </div>
              ))}
            </nav>
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="text-[10px] uppercase tracking-[0.14em] text-white/40">
                This month
              </div>
              <div className="mt-1 text-lg font-semibold text-white">
                €9.42M
              </div>
              <div className="text-[11px] text-emerald-400">+18% vs prev</div>
            </div>
          </aside>

          {/* Main */}
          <div className="col-span-12 p-5 lg:col-span-9 lg:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                  Sponsor performance · Matchday 27
                </div>
                <div className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white">
                  Overview
                </div>
              </div>
              <div className="hidden items-center gap-1.5 sm:flex">
                {["7d", "30d", "Season"].map((p, i) => (
                  <span
                    key={p}
                    className={`rounded-md px-2 py-1 text-[11px] ${
                      i === 1
                        ? "bg-white/[0.08] text-white"
                        : "text-white/55"
                    }`}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Kpi label="Media value" value="€9.42M" delta="+18.4%" />
              <Kpi label="Impressions" value="412M" delta="+9.1%" />
              <Kpi label="Engagements" value="3.6M" delta="+22%" />
              <Kpi label="Brand logos" value="187k" delta="+12%" />
            </div>

            {/* Chart */}
            <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-white/40">
                    Weekly exposure
                  </div>
                  <div className="font-semibold text-white">Media value trend</div>
                </div>
                <div className="flex gap-3 text-[11px]">
                  <Legend dot="#A78BFA" label="Instagram" />
                  <Legend dot="#3B82F6" label="TikTok" />
                  <Legend dot="#22D3EE" label="X/Twitter" />
                </div>
              </div>
              <div className="mt-4 h-[160px] w-full">
                <svg
                  viewBox="0 0 240 60"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="dm-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#A78BFA" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="dm-grad-2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Violet area */}
                  <motion.path
                    initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    d={sparkPath}
                    fill="none"
                    stroke="#A78BFA"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d={`${sparkPath} L240,60 L0,60 Z`}
                    fill="url(#dm-grad)"
                  />
                  {/* Blue secondary */}
                  <motion.path
                    initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{
                      duration: 1.6,
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    d="M0,48 C25,42 50,48 75,38 C100,28 125,42 150,32 C175,22 200,36 220,28 C230,24 240,26 240,26"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                  {/* Cyan */}
                  <motion.path
                    initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.55 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{
                      duration: 1.6,
                      delay: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    d="M0,54 C30,50 60,54 90,46 C120,38 150,50 180,44 C205,40 225,46 240,40"
                    fill="none"
                    stroke="#22D3EE"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    opacity="0.55"
                    strokeDasharray="2 3"
                  />
                </svg>
              </div>
            </div>

            {/* Sponsor leaderboard */}
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[1.15fr_1fr]">
              <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-semibold text-white">
                    Top sponsors
                  </div>
                  <div className="text-[11px] text-white/40">Media value</div>
                </div>
                <ul className="flex flex-col gap-2">
                  {sponsors.map((s, i) => (
                    <li
                      key={s.name}
                      className="flex items-center gap-3 text-[12px]"
                    >
                      <span
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-md text-[10px] font-bold text-white"
                        style={{ background: s.color }}
                      >
                        {s.initials}
                      </span>
                      <span className="w-24 shrink-0 text-white/85">
                        {s.name}
                      </span>
                      <div className="flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={reduced ? undefined : { width: 0 }}
                          whileInView={{ width: `${s.share}%` }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{
                            duration: 0.9,
                            delay: 0.08 * i,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-1.5 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#3B82F6]"
                        />
                      </div>
                      <span className="w-14 shrink-0 text-right tabular-nums text-white/75">
                        {s.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-semibold text-white">Top post</div>
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
                    viral
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                    <div className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[9px] text-white">
                      0:18
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12px] font-medium text-white">
                      Vinícius Jr. goal celebration w/ Adidas strip
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/50">
                      @realmadrid · Instagram reel
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-white/65">
                      <span className="inline-flex items-center gap-1">
                        <Eye size={12} /> 22.4M
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Heart size={12} /> 3.1M
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle size={12} /> 48k
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-white/[0.03] p-3 text-[11px] leading-relaxed text-white/55">
                  Detected logos: <span className="text-white/80">Adidas (14.2s)</span>,{" "}
                  <span className="text-white/80">Emirates (3.8s)</span>,{" "}
                  <span className="text-white/80">Santander (2.1s)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent cards */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, x: -16, y: 16 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-4 bottom-8 hidden rounded-xl border border-white/10 bg-[#0C0C14]/95 px-3.5 py-3 shadow-2xl backdrop-blur sm:block"
      >
        <div className="text-[10px] uppercase tracking-[0.14em] text-white/40">
          Daily update
        </div>
        <div className="mt-1 text-sm font-semibold text-white">
          Matchday report ready
        </div>
        <div className="text-[11px] text-white/50">J+1 · auto-sent 07:00</div>
      </motion.div>

      <motion.div
        initial={reduced ? undefined : { opacity: 0, x: 16, y: -16 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-3 -top-4 hidden rounded-xl border border-white/10 bg-[#0C0C14]/95 px-3.5 py-3 shadow-2xl backdrop-blur sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] text-white/60">Live · match Bernabéu</span>
        </div>
        <div className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-white tabular-nums">
          +€412k
        </div>
        <div className="text-[11px] text-emerald-400">since kick-off</div>
      </motion.div>
    </div>
  );
}

function Kpi({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-3">
      <div className="text-[10px] uppercase tracking-[0.14em] text-white/40">
        {label}
      </div>
      <div className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-white tabular-nums">
        {value}
      </div>
      <div className="text-[11px] text-emerald-400">{delta}</div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-white/55">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  );
}
