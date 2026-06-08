"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Sponsorlens animated mesh, two softly blurred brand orbs drifting behind
 * lower sections to give a quiet sense of motion. Deliberately light: 2 orbs
 * (was 3), 70px blur (was 120px), no `will-change`, and `contain: paint`, so it
 * stays cheap to composite on integrated GPUs. Honours prefers-reduced-motion.
 */
export function AnimatedMesh({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "soft";
}) {
  const reduced = useReducedMotion();
  const opacity = variant === "soft" ? 0.22 : 0.3;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={{ contain: "paint" }}
    >
      <Orb
        color="#142238"
        opacity={opacity}
        reduced={!!reduced}
        keyframesX={["-12%", "18%", "-12%"]}
        keyframesY={["-10%", "16%", "-10%"]}
        duration={30}
        size={460}
        delay={0}
      />
      <Orb
        color="#8B0028"
        opacity={opacity * 0.7}
        reduced={!!reduced}
        keyframesX={["64%", "40%", "64%"]}
        keyframesY={["22%", "60%", "22%"]}
        duration={36}
        size={400}
        delay={3}
      />
    </div>
  );
}

function Orb({
  color,
  opacity,
  reduced,
  keyframesX,
  keyframesY,
  duration,
  size,
  delay,
}: {
  color: string;
  opacity: number;
  reduced: boolean;
  keyframesX: string[];
  keyframesY: string[];
  duration: number;
  size: number;
  delay: number;
}) {
  const base = {
    width: size,
    height: size,
    opacity,
    filter: "blur(70px)",
    borderRadius: "50%",
    background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
  } as const;

  if (reduced) {
    return (
      <div
        className="absolute"
        style={{ left: keyframesX[0], top: keyframesY[0], ...base }}
      />
    );
  }
  return (
    <motion.div
      animate={{ x: keyframesX, y: keyframesY }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "loop",
        delay,
      }}
      className="absolute"
      style={base}
    />
  );
}
