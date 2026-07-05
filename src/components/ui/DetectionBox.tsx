"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "gold" | "red";

type Props = {
  children: ReactNode;
  /** Mono uppercase tag rendered like a model detection label, top-left. */
  label?: string;
  tone?: Tone;
  /** Draw corners then label when the box first scrolls into view. */
  animate?: boolean;
  delay?: number;
  className?: string;
};

const TONE = {
  gold: {
    corner: "border-[#B8975A]",
    label: "bg-[#B8975A] text-[#0A1628]",
    edge: "border-[#B8975A]/20",
  },
  red: {
    corner: "border-[#8B0028]",
    label: "bg-[#8B0028] text-[#F4EFE6]",
    edge: "border-[#8B0028]/25",
  },
} as const;

const CORNERS = [
  { pos: "left-[-2px] top-[-2px] border-l-2 border-t-2", origin: "top left" },
  { pos: "right-[-2px] top-[-2px] border-r-2 border-t-2", origin: "top right" },
  { pos: "left-[-2px] bottom-[-2px] border-l-2 border-b-2", origin: "bottom left" },
  { pos: "right-[-2px] bottom-[-2px] border-r-2 border-b-2", origin: "bottom right" },
] as const;

/**
 * The site's identity motif: a computer-vision bounding box. Thin edge,
 * bold corner marks, and a monospace tag — the way the model annotates a
 * sponsor on broadcast footage. Corners draw in first, then the tag, when
 * the box enters the viewport (instant under prefers-reduced-motion; the
 * in-view target always fires so SSR's initial opacity never sticks).
 */
export function DetectionBox({
  children,
  label,
  tone = "gold",
  animate = true,
  delay = 0,
  className,
}: Props) {
  const reduced = useReducedMotion();
  const t = TONE[tone];

  const cornerVariants = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
  const labelVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0 }
        : { duration: 0.3, delay: 0.32, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const frame = (
    <>
      {CORNERS.map((c) => (
        <motion.span
          key={c.pos}
          aria-hidden
          variants={animate ? cornerVariants : undefined}
          style={{ transformOrigin: c.origin }}
          className={cn("absolute h-[18px] w-[18px]", c.pos, t.corner)}
        />
      ))}
      {label && (
        <motion.span
          variants={animate ? labelVariants : undefined}
          className={cn(
            "absolute -top-[11px] left-4 z-10 inline-flex items-center px-1.5 py-[2px] font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.14em]",
            t.label
          )}
        >
          {label}
        </motion.span>
      )}
    </>
  );

  if (!animate) {
    return (
      <div className={cn("relative border", t.edge, className)}>
        {frame}
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : 0.06,
            delayChildren: reduced ? 0 : delay,
          },
        },
      }}
      className={cn("relative border", t.edge, className)}
    >
      {frame}
      {children}
    </motion.div>
  );
}
