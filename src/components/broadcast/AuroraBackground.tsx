"use client";

import { useReducedMotion } from "motion/react";

/**
 * Aurora gradient — four large blurred orbs drifting on independent CSS
 * keyframe loops behind the hero. Animation is pure CSS; this component
 * only decides whether to attach the `animation` property based on the
 * user's prefers-reduced-motion preference.
 *
 * Keyframes (aurora-1/2/3/4) live in globals.css.
 *
 * The wrapper carries the `.aurora-bg` class so a single media query in
 * globals.css can dim the orbs on small viewports without re-rendering.
 */
export function AuroraBackground() {
  const reduced = useReducedMotion();
  const anim = (name: string, duration: string) =>
    reduced ? "none" : `${name} ${duration} ease-in-out infinite alternate`;

  return (
    <div
      aria-hidden
      className="aurora-bg pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      style={{ background: "#060D18" }}
    >
      {/* Cyan — drifts down-right */}
      <div
        className="absolute rounded-full"
        style={{
          height: "60vh",
          width: "60vw",
          top: "-10%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(125,211,252,0.35) 0%, rgba(125,211,252,0) 60%)",
          filter: "blur(120px)",
          animation: anim("aurora-1", "28s"),
          willChange: reduced ? undefined : "transform",
        }}
      />
      {/* Violet — drifts up-right */}
      <div
        className="absolute rounded-full"
        style={{
          height: "55vh",
          width: "55vw",
          bottom: "-15%",
          left: "10%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.30) 0%, rgba(167,139,250,0) 60%)",
          filter: "blur(120px)",
          animation: anim("aurora-2", "35s"),
          willChange: reduced ? undefined : "transform",
        }}
      />
      {/* Gold ember — drifts left-down */}
      <div
        className="absolute rounded-full"
        style={{
          height: "45vh",
          width: "45vw",
          top: "30%",
          left: "40%",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.18) 0%, rgba(251,191,36,0) 60%)",
          filter: "blur(140px)",
          animation: anim("aurora-3", "42s"),
          willChange: reduced ? undefined : "transform",
        }}
      />
      {/* Red ember — drifts left-down */}
      <div
        className="absolute rounded-full"
        style={{
          height: "40vh",
          width: "40vw",
          top: "10%",
          right: "-5%",
          background:
            "radial-gradient(circle, rgba(239,68,68,0.20) 0%, rgba(239,68,68,0) 60%)",
          filter: "blur(120px)",
          animation: anim("aurora-4", "50s"),
          willChange: reduced ? undefined : "transform",
        }}
      />
    </div>
  );
}
