"use client";

import { motion, useReducedMotion } from "motion/react";
import { GradientOrb } from "@/components/GradientOrb";

/* Real numbers from the public study: share of a recorded 3-minute
 * Osasuna–Alavés highlight each sponsor was visible for (CV model). */
const PORTFOLIO: [string, string][] = [
  ["Kosner", "62%"],
  ["Nissan", "50%"],
  ["Macron", "41%"],
];

/**
 * Two-views split. On view-enter, the club view slides in from the
 * left and the sponsor view from the right, converging to their final
 * side-by-side position. Demonstrates "two views, one source of truth"
 * by literally bringing the two halves together.
 *
 * Reduced motion: short-circuits to the final layout with no slide.
 */
export function TwoViewsConvergence() {
  const reduced = useReducedMotion();
  const enter = (dir: -1 | 1) =>
    reduced
      ? false
      : { x: dir * 80, opacity: 0 };
  const visible = { x: 0, opacity: 1 };

  return (
    <div className="relative">
      <GradientOrb color="red" size={420} className="-right-20 top-10" intensity="soft" />
      <div className="relative grid grid-cols-2 overflow-hidden rounded-2xl border border-[#F4EFE6]/[0.08] bg-[#0F1A2E] shadow-2xl">
        {/* Club view, slides in from the left */}
        <motion.div
          initial={enter(-1)}
          whileInView={visible}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border-r border-[#F4EFE6]/[0.06] p-5"
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B8975A]">
            Club view · CA Osasuna (study)
          </div>
          <div className="mt-2 font-[family-name:var(--font-display)] text-base font-semibold text-[#F4EFE6]">
            % of broadcast · one highlight
          </div>
          <ul className="mt-4 flex flex-col gap-2.5 text-[12px]">
            {PORTFOLIO.map(([n, v]) => (
              <li key={n} className="flex items-center gap-3">
                <span className="flex-1 truncate text-[#F4EFE6]/80">{n}</span>
                <div className="h-1 w-16 overflow-hidden rounded-full bg-[#F4EFE6]/[0.06]">
                  <div
                    style={{ width: v }}
                    className="h-full rounded-full bg-gradient-to-r from-[#8B0028] to-[#B8975A]"
                  />
                </div>
                <span className="w-9 text-right font-[family-name:var(--font-mono)] tabular-nums text-[#F4EFE6]/85">
                  {v}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Sponsor view, slides in from the right */}
        <motion.div
          initial={enter(1)}
          whileInView={visible}
          viewport={{ once: true, margin: "-20%" }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="bg-[#FBF7EF] p-5 text-[#0F1A2E]"
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B0028]">
            Sponsor view · Kosner
          </div>
          <div className="mt-2 font-[family-name:var(--font-display)] text-base font-semibold">
            Brand exposure
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-[#0F1A2E]/10 bg-white p-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#0F1A2E]/55">
                Screen time
              </div>
              <div className="mt-1 font-[family-name:var(--font-mono)] text-base font-semibold tabular-nums">
                120.5s
              </div>
              <div className="text-[10px] text-[#0F1A2E]/45">one highlight</div>
            </div>
            <div className="rounded-lg border border-[#0F1A2E]/10 bg-white p-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#0F1A2E]/55">
                Share of voice
              </div>
              <div className="mt-1 font-[family-name:var(--font-mono)] text-base font-semibold tabular-nums">
                61.9%
              </div>
              <div className="text-[10px] text-[#0F1A2E]/45">of 10 sponsors</div>
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-[#0F1A2E]/10 bg-white p-3 text-[11px] leading-relaxed text-[#0F1A2E]/65">
            The Kosner crest was on screen for{" "}
            <span className="font-semibold text-[#0F1A2E]">120.5 seconds</span>{" "}
            of a 3-minute highlight, measured frame by frame.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
