"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
  once?: boolean;
};

/** One-time in-view entrance: opacity + translateY only, ≤500ms. */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
  once = true,
}: Props) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  // whileInView must stay active under prefers-reduced-motion: the server
  // HTML carries the initial opacity-0 inline style (reduced is unknown at
  // SSR time), so disabling the in-view target would leave sections
  // permanently invisible for reduced-motion users. Instant transition instead.
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }
      }
      className={className}
    >
      {children}
    </MotionTag>
  );
}
