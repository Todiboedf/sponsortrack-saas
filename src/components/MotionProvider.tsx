"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Wraps the application in a `MotionConfig` configured to honour the
 * user's `prefers-reduced-motion` setting globally. With
 * `reducedMotion="user"`, every motion/react component that doesn't
 * explicitly override the behaviour will short-circuit its non-essential
 * animations (transforms, scales, rotations) to a static state.
 *
 * Components that still want bespoke reduced-motion handling (e.g.
 * counters that jump to their target, GSAP timelines that skip pinning)
 * keep their own `useReducedMotion` guards on top of this.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
