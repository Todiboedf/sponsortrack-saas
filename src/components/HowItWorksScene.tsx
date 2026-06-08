"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Mail,
  PlugZap,
  ScanSearch,
  ScrollText,
  Signature,
  Workflow,
} from "lucide-react";
function Ribbon() {
  // Decorative cyan beam, pure CSS now (the 3D TubeGeometry version
  // was retired with the rest of the Three.js stack in PR #10).
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 top-1/2 -z-[1] hidden h-px -translate-y-1/2 lg:block"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(184, 151, 90,0.35) 25%, rgba(139, 0, 40,0.40) 55%, rgba(184, 151, 90,0.25) 80%, transparent 100%)",
        boxShadow: "0 0 24px rgba(184, 151, 90,0.18)",
      }}
    />
  );
}

type Phase = 0 | 1 | 2 | 3;

const STEPS: {
  n: string;
  title: string;
  body: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}[] = [
  {
    n: "01",
    title: "Connect",
    body: "Plug your social channels, broadcast feed and CRM. One-click via OAuth, dedicated SDK for everything else.",
    Icon: PlugZap,
  },
  {
    n: "02",
    title: "Detect",
    body: "Our models watch every post and every broadcast frame, attribute exposures to the right sponsor, normalise the numbers.",
    Icon: ScanSearch,
  },
  {
    n: "03",
    title: "Report",
    body: "White-label dashboards refresh in real time. Branded PDF + email recap goes out every Monday at 07:00 local.",
    Icon: ScrollText,
  },
  {
    n: "04",
    title: "Renew",
    body: "Renewal alerts, benchmark scenarios and a contract calendar, so commercial conversations start with evidence.",
    Icon: Workflow,
  },
];

export function HowItWorksScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setPhase(0);
      return;
    }
    let cleanup: (() => void) | undefined;
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      const el = wrap.current;
      if (!el) return;
      const stage = el.querySelector<HTMLDivElement>(".scene-stage");
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=320%",
        pin: stage ?? el,
        pinSpacing: true,
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress;
          const next: Phase = Math.min(3, Math.floor(p * 4)) as Phase;
          setPhase((current) => (current === next ? current : next));
        },
      });
      cleanup = () => st.kill();
    })();
    return () => cleanup?.();
  }, [reduced]);

  return (
    <section
      ref={wrap}
      className="relative"
      style={{ height: reduced ? "auto" : "400vh" }}
      aria-labelledby="how-it-works-heading"
    >
      <div className="scene-stage relative flex items-center" style={{ minHeight: "100svh" }}>
        <Ribbon />
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#B8975A]/35 bg-[#B8975A]/[0.08] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B8975A]">
              <Workflow size={12} />
              How it works
            </span>
            <h2
              id="how-it-works-heading"
              className="font-[family-name:var(--font-display)] text-balance text-4xl font-semibold tracking-[-0.01em] text-[#F4EFE6] sm:text-5xl lg:text-[58px]"
            >
              Four steps from{" "}
              <em className="italic text-gradient-brand">channel chaos</em>{" "}
              to renewed contract.
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <ol className="flex flex-col gap-3">
              {STEPS.map((s, i) => {
                const active = i === phase;
                const past = i < phase;
                return (
                  <li
                    key={s.n}
                    className={`rounded-2xl border p-5 transition-all duration-300 ${
                      active
                        ? "border-[#B8975A]/40 bg-[#0F1A2E]/85 shadow-[0_18px_60px_-30px_rgba(184, 151, 90,0.55)]"
                        : past
                          ? "border-[#F4EFE6]/[0.08] bg-[#0F1A2E]/55 opacity-70"
                          : "border-[#F4EFE6]/[0.06] bg-[#0F1A2E]/40 opacity-55"
                    }`}
                    aria-current={active ? "step" : undefined}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-[family-name:var(--font-mono)] text-[12px] tracking-[0.22em] ${
                          active
                            ? "bg-gradient-to-r from-[#B8975A] to-[#8B0028] bg-clip-text text-transparent"
                            : "text-[#B8975A]"
                        }`}
                      >
                        {s.n}
                      </span>
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${
                          active
                            ? "border-[#B8975A]/55 bg-[#B8975A]/[0.10] text-[#D8BC85]"
                            : "border-[#B8975A]/30 bg-[#B8975A]/[0.08] text-[#B8975A]"
                        }`}
                      >
                        <s.Icon size={15} />
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#F4EFE6]">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-[#F4EFE6]/65">
                      {s.body}
                    </p>
                  </li>
                );
              })}
            </ol>

            <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-[#F4EFE6]/[0.08] bg-[#0A1628]/70 p-6 lg:min-h-[520px] lg:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-grid opacity-[0.04]"
              />
              <AnimatePresence mode="wait" initial={false}>
                {phase === 0 && <ConnectScene key="connect" reduced={!!reduced} />}
                {phase === 1 && <DetectScene key="detect" reduced={!!reduced} />}
                {phase === 2 && <ReportScene key="report" reduced={!!reduced} />}
                {phase === 3 && <RenewScene key="renew" reduced={!!reduced} />}
              </AnimatePresence>
              <div className="absolute bottom-4 left-6 right-6 flex items-center gap-2">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                      i <= phase
                        ? "bg-gradient-to-r from-[#B8975A] to-[#8B0028]"
                        : "bg-[#F4EFE6]/[0.08]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Scenes                                                                     */
/* -------------------------------------------------------------------------- */

const enterEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeMotion = (reduced: boolean) =>
  reduced
    ? ({ initial: false, animate: { opacity: 1 } } as const)
    : ({
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.45, ease: enterEase },
      } as const);

function ConnectScene({ reduced }: { reduced: boolean }) {
  const platforms = ["IG", "TT", "X", "YT", "FB"];
  return (
    <motion.div
      {...fadeMotion(reduced)}
      className="relative flex h-full min-h-[360px] items-center justify-center"
    >
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#B8975A] absolute left-0 top-0">
        Phase 01 · Connect
      </div>
      <div className="relative h-72 w-72">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#B8975A]/40 bg-[#0F1A2E] text-[#B8975A] shadow-[0_0_60px_rgba(184, 151, 90,0.35)]">
          <Workflow size={22} />
        </span>
        {platforms.map((p, i) => {
          const angle = (i / platforms.length) * Math.PI * 2 - Math.PI / 2;
          const r = 120;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          return (
            <motion.span
              key={p}
              initial={reduced ? false : { x: x * 1.4, y: y * 1.4, opacity: 0 }}
              animate={{ x, y, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#F4EFE6]/15 bg-[#0F1A2E] text-[10px] font-bold text-[#F4EFE6]"
            >
              {p}
            </motion.span>
          );
        })}
        <svg
          aria-hidden
          viewBox="-150 -150 300 300"
          className="absolute inset-0 h-full w-full"
        >
          {platforms.map((p, i) => {
            const angle = (i / platforms.length) * Math.PI * 2 - Math.PI / 2;
            const r = 120;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            return (
              <motion.line
                key={p}
                x1={x}
                y1={y}
                x2={0}
                y2={0}
                stroke="#B8975A"
                strokeWidth="0.6"
                strokeDasharray="3 3"
                opacity="0.5"
                initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.06 }}
              />
            );
          })}
        </svg>
      </div>
    </motion.div>
  );
}

function DetectScene({ reduced }: { reduced: boolean }) {
  const boxes = [
    { left: "14%", top: "55%", w: "22%", h: "10%", label: "Northwind · 0.96", color: "#8B0028" },
    { left: "46%", top: "55%", w: "16%", h: "10%", label: "Vertex · 0.92", color: "#8B0028" },
    { left: "68%", top: "55%", w: "14%", h: "10%", label: "Lumina · 0.74", color: "#B8975A" },
  ];
  return (
    <motion.div
      {...fadeMotion(reduced)}
      className="relative flex h-full min-h-[360px] items-center justify-center"
    >
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#B8975A] absolute left-0 top-0">
        Phase 02 · Detect
      </div>
      <div className="relative aspect-[16/9] w-full max-w-md overflow-hidden rounded-xl border border-[#F4EFE6]/[0.08] bg-gradient-to-b from-[#0F1A2E] to-[#060D18]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(31,122,82,0.45)_0%,transparent_60%)]" />
        <svg
          viewBox="0 0 320 180"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <ellipse cx="160" cy="120" rx="40" ry="14" stroke="rgba(244,239,230,0.18)" fill="none" />
          <rect
            x="40"
            y="98"
            width="240"
            height="14"
            fill="rgba(184,151,90,0.18)"
            stroke="rgba(184,151,90,0.55)"
          />
        </svg>
        {boxes.map((b, i) => (
          <motion.div
            key={b.label}
            initial={reduced ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.35,
              delay: 0.2 + i * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute border-2"
            style={{
              left: b.left,
              top: b.top,
              width: b.w,
              height: b.h,
              borderColor: b.color,
            }}
          >
            <span
              className="absolute -top-5 left-0 whitespace-nowrap rounded px-1 py-0.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#F4EFE6]"
              style={{ background: b.color }}
            >
              {b.label}
            </span>
          </motion.div>
        ))}
        <div className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-[#0A1628]/80 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[#F4EFE6]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B0028] opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#8B0028]" />
          </span>
          Live
        </div>
      </div>
    </motion.div>
  );
}

function ReportScene({ reduced }: { reduced: boolean }) {
  const lines = [
    { w: "70%", label: "Methodology · MVE 3.1" },
    { w: "92%", label: "Northwind · €1.84M" },
    { w: "82%", label: "Vertex · €1.42M" },
    { w: "64%", label: "Lumina · €1.06M" },
    { w: "54%", label: "Bravo Lager · €0.74M" },
    { w: "44%", label: "Meridian · €0.51M" },
  ];
  return (
    <motion.div
      {...fadeMotion(reduced)}
      className="relative flex h-full min-h-[360px] items-center justify-center"
    >
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#B8975A] absolute left-0 top-0">
        Phase 03 · Report
      </div>
      <div className="relative w-full max-w-md rounded-xl border border-[#0F1A2E]/15 bg-[#FBF7EF] p-6 text-[#0F1A2E] shadow-[0_30px_70px_-30px_rgba(184,151,90,0.45)]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#8B0028]">
              Northwind · Q2 2026
            </div>
            <div className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold">
              Sponsorship report
            </div>
          </div>
          <FileText size={20} className="text-[#0F1A2E]/55" />
        </div>
        <div className="mt-5 flex flex-col gap-2">
          {lines.map((l, i) => (
            <motion.div
              key={l.label}
              initial={reduced ? false : { opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: l.w }}
              transition={{
                duration: 0.45,
                delay: 0.15 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-2 overflow-hidden rounded-full border border-[#0F1A2E]/10 bg-white px-2.5 py-1.5 text-[11px]"
              style={{ width: l.w }}
            >
              <span className="font-[family-name:var(--font-mono)] tabular-nums text-[#8B0028]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate text-[#0F1A2E]/80">{l.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#0F1A2E]/45">
          <span>Auto-generated · Monday 07:00</span>
          <span>Page 1 / 12</span>
        </div>
      </div>
    </motion.div>
  );
}

function RenewScene({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      {...fadeMotion(reduced)}
      className="relative flex h-full min-h-[360px] items-center justify-center"
    >
      <div className="text-[11px] uppercase tracking-[0.22em] text-[#B8975A] absolute left-0 top-0">
        Phase 04 · Renew
      </div>
      <div className="relative grid w-full max-w-md grid-cols-[1fr_auto_1fr] items-center gap-4">
        <motion.div
          initial={reduced ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E]/85 p-4"
        >
          <Mail size={20} className="text-[#B8975A]" />
          <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#B8975A]">
            Renewal email
          </div>
          <div className="mt-1 text-[13px] text-[#F4EFE6]">
            Sent · Northwind Q2 recap
          </div>
          <div className="mt-1 text-[11px] text-[#F4EFE6]/55">
            Open rate 100% · 14:32
          </div>
        </motion.div>
        <ArrowRight size={16} className="text-[#B8975A]" />
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl border border-[#B8975A]/40 bg-gradient-to-br from-[#0F1A2E] to-[#0A1628] p-4 shadow-[0_0_40px_rgba(184, 151, 90,0.35)]"
        >
          <Signature size={20} className="text-[#D8BC85]" />
          <div className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[#B8975A]">
            Contract signed
          </div>
          <div className="mt-1 text-[13px] text-[#F4EFE6]">
            +€680k · 2-year renewal
          </div>
          <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#2F8F5A]">
            <CheckCircle2 size={11} /> Closed Wed 14:08
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
