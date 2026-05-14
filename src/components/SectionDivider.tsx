"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Animated SVG line that draws itself when it enters the viewport.
 * Sits between sections to give the page a gentle editorial rhythm
 * without leaning on heavy rules or color.
 */
export function SectionDivider({
  className,
  width = 600,
  delay = 0,
}: {
  className?: string;
  width?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <div
      aria-hidden
      className={`relative mx-auto my-0 flex items-center justify-center ${className ?? ""}`}
      style={{ maxWidth: width }}
    >
      <svg
        width="100%"
        height="14"
        viewBox="0 0 600 14"
        preserveAspectRatio="none"
        className="w-full"
      >
        <motion.path
          d="M 0 7 H 280 M 320 7 H 600"
          fill="none"
          stroke="url(#section-divider-stroke)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{
            pathLength: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.4, delay },
          }}
        />
        <motion.circle
          cx="300"
          cy="7"
          r="2.5"
          fill="#B8975A"
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.35, delay: delay + 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="section-divider-stroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="rgba(244,239,230,0)" />
            <stop offset="0.5" stopColor="rgba(184,151,90,0.55)" />
            <stop offset="1" stopColor="rgba(244,239,230,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
