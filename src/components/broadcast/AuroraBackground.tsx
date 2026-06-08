"use client";

import { useReducedMotion } from "motion/react";

/**
 * Aurora gradient — two softly blurred brand-colour orbs drifting behind the
 * hero. Deliberately light: 2 orbs (was 4), 80px blur (was 120–140px), no
 * `will-change`, and `contain: paint` so the hero stays cheap to composite on
 * integrated GPUs (the previous 4-orb / 120–140px version could exhaust the
 * GPU process and crash the tab). Animation is pure CSS; honours
 * prefers-reduced-motion.
 *
 * Keyframes (aurora-1 / aurora-2) live in globals.css.
 */
export function AuroraBackground() {
  const reduced = useReducedMotion();
  const anim = (name: string, duration: string) =>
    reduced ? "none" : `${name} ${duration} ease-in-out infinite alternate`;

  return (
    <div
      aria-hidden
      className="aurora-bg pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      style={{ background: "#060D18", contain: "paint" }}
    >
      {/* Gold ember — drifts down-right */}
      <div
        className="absolute rounded-full"
        style={{
          height: "52vh",
          width: "52vw",
          top: "-8%",
          left: "-8%",
          background:
            "radial-gradient(circle, rgba(184,151,90,0.20) 0%, rgba(184,151,90,0) 60%)",
          filter: "blur(80px)",
          animation: anim("aurora-1", "30s"),
        }}
      />
      {/* Red ember — drifts up-right */}
      <div
        className="absolute rounded-full"
        style={{
          height: "48vh",
          width: "48vw",
          bottom: "-12%",
          right: "-6%",
          background:
            "radial-gradient(circle, rgba(139,0,40,0.22) 0%, rgba(139,0,40,0) 60%)",
          filter: "blur(80px)",
          animation: anim("aurora-2", "38s"),
        }}
      />
    </div>
  );
}
