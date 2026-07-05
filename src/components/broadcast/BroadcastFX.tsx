"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Atmospheric broadcast-FX layered over the hero canvas: a faint
 * horizontal scan-line sweep that traverses the hero every ~7 seconds
 * (subtle CRT / capture-card cue). No fabricated data — the fake
 * detection crawl ticker was removed; the real detection video takes
 * its place in the identity rework.
 *
 * Honours prefers-reduced-motion and disappears entirely under it.
 */
export function BroadcastFX() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return <ScanLine />;
}

function ScanLine() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-[2] hidden h-px lg:block"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(184, 151, 90,0.55) 30%, rgba(184, 151, 90,0.85) 50%, rgba(184, 151, 90,0.55) 70%, transparent 100%)",
        boxShadow: "0 0 16px rgba(184, 151, 90,0.35)",
        mixBlendMode: "screen",
      }}
      initial={{ top: "-2%", opacity: 0 }}
      animate={{
        top: ["-2%", "102%", "102%"],
        opacity: [0, 0.55, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.85, 1],
        repeatDelay: 4,
      }}
    />
  );
}

