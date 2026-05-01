"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowUpRight,
  Camera,
  Eye,
  Heart,
  MessageCircle,
  Radio,
} from "lucide-react";
import { CountUp } from "@/components/CountUp";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const sponsors = [
  { name: "Caja Rural", initials: "CR", color: "#1F7A52", value: 1.84, share: 92 },
  { name: "Macron", initials: "M", color: "#101820", value: 1.42, share: 78 },
  { name: "Digi", initials: "D", color: "#E73B3B", value: 1.06, share: 64 },
  { name: "Cervezas El Águila", initials: "EA", color: "#A87B3A", value: 0.74, share: 48 },
  { name: "Asisa", initials: "A", color: "#0E4A8C", value: 0.51, share: 32 },
];

// 14 weeks of synthetic exposure data — Osasuna pilot proxy.
const weeks = [
  { w: "W1", reach: 1.4, broadcast: 0.9, social: 0.5 },
  { w: "W2", reach: 1.9, broadcast: 1.2, social: 0.7 },
  { w: "W3", reach: 2.6, broadcast: 1.6, social: 1.0 },
  { w: "W4", reach: 2.2, broadcast: 1.3, social: 0.9 },
  { w: "W5", reach: 3.4, broadcast: 2.1, social: 1.3 },
  { w: "W6", reach: 4.1, broadcast: 2.5, social: 1.6 },
  { w: "W7", reach: 3.6, broadcast: 2.2, social: 1.4 },
  { w: "W8", reach: 5.0, broadcast: 3.1, social: 1.9 },
  { w: "W9", reach: 4.4, broadcast: 2.7, social: 1.7 },
  { w: "W10", reach: 5.6, broadcast: 3.4, social: 2.2 },
  { w: "W11", reach: 6.3, broadcast: 3.8, social: 2.5 },
  { w: "W12", reach: 5.8, broadcast: 3.5, social: 2.3 },
  { w: "W13", reach: 7.1, broadcast: 4.3, social: 2.8 },
  { w: "W14", reach: 8.0, broadcast: 4.9, social: 3.1 },
];

const fmtCompactM = (n: number) => `${n.toFixed(1)}M`;

/* -------------------------------------------------------------------------- */
/* Dashboard mockup                                                           */
/* -------------------------------------------------------------------------- */

export function DashboardMockup() {
  const reduced = useReducedMotion();
  const trend = useMemo(() => weeks, []);

  return (
    <div className="relative mx-auto w-full max-w-[1140px]">
      {/* Subtle gold/red ring frame */}
      <div
        aria-hidden
        className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-[#B8975A]/35 via-[#F4EFE6]/[0.04] to-transparent"
      />
      <div className="relative overflow-hidden rounded-[26px] border border-[#F4EFE6]/[0.08] bg-[#0F1A2E] shadow-[0_60px_140px_-50px_rgba(139,0,40,0.55),0_30px_80px_-30px_rgba(184,151,90,0.30)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-[#F4EFE6]/[0.06] bg-[#0A1628] px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F4EFE6]/12" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#F4EFE6]/12" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#F4EFE6]/12" />
          </div>
          <div className="mx-auto flex max-w-xs flex-1 items-center gap-1.5 rounded-md bg-[#F4EFE6]/[0.04] px-3 py-1 text-[11px] text-[#F4EFE6]/45">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2F8F5A]" />
            app.sponsortrack.io / osasuna
          </div>
          <div className="hidden gap-1.5 sm:flex">
            <span className="h-5 w-12 rounded bg-[#F4EFE6]/[0.04]" />
            <span className="h-5 w-5 rounded bg-[#F4EFE6]/[0.04]" />
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-12 gap-0">
          {/* Sidebar */}
          <aside className="col-span-3 hidden border-r border-[#F4EFE6]/[0.06] bg-[#08111F] p-4 lg:block">
            <div className="flex items-center gap-2 rounded-lg border border-[#B8975A]/25 bg-[#B8975A]/[0.06] px-2.5 py-2 text-[12px] text-[#F4EFE6]/85">
              <span className="grid h-6 w-6 place-items-center rounded bg-[#8B0028] text-[10px] font-bold text-[#F4EFE6]">
                CA
              </span>
              <div className="min-w-0 flex-1 truncate font-medium">CA Osasuna</div>
              <ArrowUpRight size={12} className="text-[#B8975A]" />
            </div>
            <nav className="mt-5 flex flex-col gap-0.5">
              {[
                ["Overview", true],
                ["Sponsors", false],
                ["Match-day", false],
                ["Audience", false],
                ["Reports", false],
                ["Prospection", false],
              ].map(([label, active]) => (
                <div
                  key={label as string}
                  className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[12px] ${
                    active
                      ? "bg-[#F4EFE6]/[0.06] text-[#F4EFE6]"
                      : "text-[#F4EFE6]/55"
                  }`}
                >
                  <span className="h-3 w-3 rounded-sm border border-[#F4EFE6]/15" />
                  {label as string}
                </div>
              ))}
            </nav>
            <div className="mt-6 rounded-xl border border-[#F4EFE6]/[0.06] bg-[#F4EFE6]/[0.02] p-3">
              <div className="text-[10px] uppercase tracking-[0.16em] text-[#F4EFE6]/40">
                Season to date
              </div>
              <div className="mt-1 font-[family-name:var(--font-mono)] text-lg font-semibold text-[#F4EFE6]">
                <CountUp to={5.57} prefix="€" suffix="M" decimals={2} duration={1.4} />
              </div>
              <div className="text-[11px] text-[#2F8F5A]">+24% vs prev</div>
            </div>
          </aside>

          {/* Main */}
          <div className="col-span-12 p-5 lg:col-span-9 lg:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#B8975A]">
                  Sponsor performance · Matchday 32
                </div>
                <div className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[#F4EFE6]">
                  Overview
                </div>
              </div>
              <div className="hidden items-center gap-1.5 sm:flex">
                {["7d", "30d", "Season"].map((p, i) => (
                  <span
                    key={p}
                    className={`rounded-md px-2 py-1 text-[11px] ${
                      i === 1
                        ? "bg-[#F4EFE6]/[0.08] text-[#F4EFE6]"
                        : "text-[#F4EFE6]/55"
                    }`}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Kpi
                label="Media value"
                value={<CountUp to={5.57} prefix="€" suffix="M" decimals={2} />}
                delta="+24.2%"
              />
              <Kpi
                label="Impressions"
                value={<CountUp to={284} suffix="M" />}
                delta="+11.6%"
              />
              <Kpi
                label="Engagements"
                value={<CountUp to={2.4} suffix="M" decimals={1} />}
                delta="+18%"
              />
              <Kpi
                label="Logos / match"
                value={<CountUp to={94100} />}
                delta="+6%"
              />
            </div>

            {/* Chart */}
            <div className="mt-4 overflow-hidden rounded-xl border border-[#F4EFE6]/[0.06] bg-[#0A1628]/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[#B8975A]">
                    14-week rolling exposure
                  </div>
                  <div className="font-[family-name:var(--font-display)] text-base font-semibold text-[#F4EFE6]">
                    Media value · € millions
                  </div>
                </div>
                <div className="flex gap-3 text-[11px]">
                  <Legend dot="#8B0028" label="Total reach" />
                  <Legend dot="#B8975A" label="Broadcast" />
                  <Legend dot="#F4EFE6" label="Social" />
                </div>
              </div>
              <div className="mt-3 h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={trend}
                    margin={{ top: 10, right: 8, left: -22, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="dm-reach" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B0028" stopOpacity={0.55} />
                        <stop offset="100%" stopColor="#8B0028" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="dm-broadcast" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B8975A" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#B8975A" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="dm-social" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F4EFE6" stopOpacity={0.30} />
                        <stop offset="100%" stopColor="#F4EFE6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(244,239,230,0.05)" vertical={false} />
                    <XAxis
                      dataKey="w"
                      tick={{ fill: "rgba(244,239,230,0.4)", fontSize: 10 }}
                      axisLine={{ stroke: "rgba(244,239,230,0.08)" }}
                      tickLine={false}
                      interval={1}
                    />
                    <YAxis
                      tick={{ fill: "rgba(244,239,230,0.4)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={36}
                    />
                    <Tooltip
                      cursor={{ stroke: "rgba(184,151,90,0.35)" }}
                      content={<MockTooltip />}
                    />
                    <Area
                      type="monotone"
                      dataKey="reach"
                      stroke="#8B0028"
                      strokeWidth={2}
                      fill="url(#dm-reach)"
                      isAnimationActive={!reduced}
                      animationDuration={1500}
                    />
                    <Area
                      type="monotone"
                      dataKey="broadcast"
                      stroke="#B8975A"
                      strokeWidth={1.6}
                      fill="url(#dm-broadcast)"
                      isAnimationActive={!reduced}
                      animationDuration={1700}
                    />
                    <Area
                      type="monotone"
                      dataKey="social"
                      stroke="#F4EFE6"
                      strokeWidth={1.2}
                      strokeDasharray="3 3"
                      fill="url(#dm-social)"
                      isAnimationActive={!reduced}
                      animationDuration={1900}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sponsor leaderboard + match insight */}
            <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[1.1fr_1fr]">
              <div className="overflow-hidden rounded-xl border border-[#F4EFE6]/[0.06] bg-[#0A1628]/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-[family-name:var(--font-display)] font-semibold text-[#F4EFE6]">
                    Top sponsors
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-[#F4EFE6]/40">
                    Media value · € M
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  {sponsors.map((s, i) => (
                    <li
                      key={s.name}
                      className="flex items-center gap-3 text-[12px]"
                    >
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px] font-bold text-[#F4EFE6]"
                        style={{ background: s.color }}
                      >
                        {s.initials}
                      </span>
                      <span className="w-[110px] shrink-0 truncate font-medium text-[#F4EFE6]/90">
                        {s.name}
                      </span>
                      <div className="flex-1 overflow-hidden rounded-full bg-[#F4EFE6]/[0.06]">
                        <motion.div
                          initial={reduced ? undefined : { width: 0 }}
                          whileInView={{ width: `${s.share}%` }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{
                            duration: 0.9,
                            delay: 0.06 * i,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-1.5 rounded-full bg-gradient-to-r from-[#8B0028] via-[#A00030] to-[#B8975A]"
                        />
                      </div>
                      <span className="w-14 shrink-0 text-right font-[family-name:var(--font-mono)] tabular-nums text-[#F4EFE6]/85">
                        €{s.value.toFixed(2)}M
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#F4EFE6]/[0.06] bg-[#0A1628]/70 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="font-[family-name:var(--font-display)] font-semibold text-[#F4EFE6]">
                    Live match · El Sadar
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8B0028]/45 bg-[#8B0028]/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#F4EFE6]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B0028] opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#8B0028]" />
                    </span>
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  {[
                    { label: "Caja Rural · jersey", t: "26:14", icon: <Camera size={11} /> },
                    { label: "Macron · LED", t: "18:42", icon: <Radio size={11} /> },
                    { label: "Digi · backdrop", t: "11:08", icon: <Eye size={11} /> },
                  ].map((d) => (
                    <div
                      key={d.label}
                      className="rounded-lg border border-[#F4EFE6]/[0.06] bg-[#F4EFE6]/[0.02] p-2.5"
                    >
                      <div className="flex items-center gap-1.5 text-[#B8975A]">
                        {d.icon}
                        <span className="text-[10px] uppercase tracking-[0.14em] text-[#F4EFE6]/55">
                          Detection
                        </span>
                      </div>
                      <div className="mt-1.5 truncate text-[#F4EFE6]">{d.label}</div>
                      <div className="mt-0.5 font-[family-name:var(--font-mono)] tabular-nums text-[#B8975A]">
                        {d.t}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-start gap-3 rounded-lg bg-[#F4EFE6]/[0.03] p-3 text-[11px] leading-relaxed text-[#F4EFE6]/65">
                  <Heart size={12} className="mt-0.5 shrink-0 text-[#B8975A]" />
                  <span>
                    Goal celebration reel just hit{" "}
                    <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#F4EFE6]">
                      18.4M
                    </span>{" "}
                    views — ask renewals for Caja Rural before kick-off Sunday.
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-[#F4EFE6]/55">
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle size={11} /> 12,400 mentions
                  </span>
                  <span>·</span>
                  <span>EMV +€412k since kick-off</span>
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
        className="absolute -left-4 bottom-8 hidden rounded-xl border border-[#B8975A]/35 bg-[#0F1A2E]/95 px-3.5 py-3 shadow-2xl backdrop-blur sm:block"
      >
        <div className="text-[10px] uppercase tracking-[0.18em] text-[#B8975A]">
          Daily report
        </div>
        <div className="mt-1 text-sm font-semibold text-[#F4EFE6]">
          Match-day briefing ready
        </div>
        <div className="text-[11px] text-[#F4EFE6]/55">J+1 · auto-sent 07:00</div>
      </motion.div>

      <motion.div
        initial={reduced ? undefined : { opacity: 0, x: 16, y: -16 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-3 -top-4 hidden rounded-xl border border-[#8B0028]/45 bg-[#0F1A2E]/95 px-3.5 py-3 shadow-2xl backdrop-blur sm:block"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B0028] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#8B0028]" />
          </span>
          <span className="text-[11px] text-[#F4EFE6]/65">Live · Caja Rural</span>
        </div>
        <div className="mt-1 font-[family-name:var(--font-mono)] text-lg font-semibold tabular-nums text-[#F4EFE6]">
          +€412k
        </div>
        <div className="text-[11px] text-[#B8975A]">since kick-off</div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Subcomponents                                                              */
/* -------------------------------------------------------------------------- */

function Kpi({
  label,
  value,
  delta,
}: {
  label: string;
  value: React.ReactNode;
  delta: string;
}) {
  return (
    <div className="rounded-xl border border-[#F4EFE6]/[0.06] bg-[#0A1628]/70 p-3">
      <div className="text-[10px] uppercase tracking-[0.18em] text-[#B8975A]">
        {label}
      </div>
      <div className="mt-1 font-[family-name:var(--font-mono)] text-lg font-semibold tracking-tight text-[#F4EFE6] tabular-nums">
        {value}
      </div>
      <div className="text-[11px] text-[#2F8F5A]">{delta}</div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[#F4EFE6]/55">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  );
}

type TooltipPayload = { name: string; value: number; color: string };

function MockTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-[#B8975A]/35 bg-[#0F1A2E]/95 px-3 py-2 text-[11px] shadow-2xl backdrop-blur">
      {label !== undefined && (
        <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-[#B8975A]">
          {label}
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: p.color }}
            />
            <span className="text-[#F4EFE6]/65 capitalize">{p.name}</span>
            <span className="ml-auto font-[family-name:var(--font-mono)] tabular-nums text-[#F4EFE6]">
              {fmtCompactM(p.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
