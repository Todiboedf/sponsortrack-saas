/**
 * Motion design tokens for Sponsorlens.
 *
 * Principle (Linear-flavoured): motion explains, never decorates.
 * Every animation should prove something about the product —
 * speed, real-time, precision.
 */

import type { Transition } from "motion/react";

/**
 * Cubic-bezier curves used across the site. Always pass via `ease`
 * (motion/react's preferred prop) to keep transitions consistent.
 */
export const easings = {
  /** Default for most animations — smooth deceleration. */
  smooth: [0.32, 0.72, 0, 1] as const,
  /** Element entering the viewport / mounting. */
  enter: [0.16, 1, 0.3, 1] as const,
  /** Element leaving — slightly faster ramp. */
  exit: [0.7, 0, 0.84, 0] as const,
} as const;

/**
 * Reusable spring config for counters, bars, layout transitions.
 * Pass via `transition` prop (motion will type-check `type`).
 */
export const spring: Transition = {
  type: "spring",
  damping: 25,
  stiffness: 120,
};

/**
 * Snappier spring for layout pills (nav active indicator, etc.).
 */
export const layoutSpring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 32,
};

export const durations = {
  fast: 0.2,
  base: 0.4,
  slow: 0.8,
  scrollScene: 1.5,
} as const;

export const staggers = {
  tight: 0.04,
  base: 0.08,
  loose: 0.15,
} as const;

/**
 * Standard fade + slide-up variant pair for entrance animations.
 * Use with motion components + `whileInView` or `animate` props.
 */
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.base, ease: easings.enter },
  },
} as const;

/**
 * Parent variant that staggers child entrances.
 * Pair with `fadeUp` (or any `hidden`/`visible` variant) on direct
 * children to get a staircase reveal.
 */
export const staggerParent = (delayChildren = 0, stagger = staggers.base) =>
  ({
    hidden: {},
    visible: {
      transition: {
        delayChildren,
        staggerChildren: stagger,
      },
    },
  }) as const;
