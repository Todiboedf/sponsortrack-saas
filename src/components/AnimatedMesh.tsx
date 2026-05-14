"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Sponsorlens animated mesh — three deeply blurred orbs orbiting on
 * intertwined Lissajous-flavoured paths. Sits behind hero sections to
 * give the page a quiet sense of motion without competing for attention.
 *
 * Performance: pointer-events: none, transform-only animation, will-change
 * hinted on each orb. Honours prefers-reduced-motion by staying still.
 */
export function AnimatedMesh({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "soft";
}) {
  const reduced = useReducedMotion();
  const opacity = variant === "soft" ? 0.28 : 0.4;
  const easeLoop = "easeInOut" as const;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      style={{ contain: "paint" }}
    >
      <Orb
        color="#1e3a8a"
        opacity={opacity}
        reduced={!!reduced}
        ease={easeLoop}
        keyframesX={["-12%", "18%", "-6%", "22%", "-12%"]}
        keyframesY={["-10%", "14%", "28%", "-4%", "-10%"]}
        duration={26}
        size={520}
        delay={0}
      />
      <Orb
        color="#0891b2"
        opacity={opacity}
        reduced={!!reduced}
        ease={easeLoop}
        keyframesX={["72%", "44%", "84%", "56%", "72%"]}
        keyframesY={["18%", "62%", "30%", "76%", "18%"]}
        duration={32}
        size={460}
        delay={4}
      />
      <Orb
        color="#7c3aed"
        opacity={opacity * 0.75}
        reduced={!!reduced}
        ease={easeLoop}
        keyframesX={["30%", "60%", "10%", "50%", "30%"]}
        keyframesY={["80%", "30%", "55%", "10%", "80%"]}
        duration={22}
        size={400}
        delay={2}
      />
    </div>
  );
}

function Orb({
  color,
  opacity,
  reduced,
  ease,
  keyframesX,
  keyframesY,
  duration,
  size,
  delay,
}: {
  color: string;
  opacity: number;
  reduced: boolean;
  ease: "easeInOut";
  keyframesX: string[];
  keyframesY: string[];
  duration: number;
  size: number;
  delay: number;
}) {
  if (reduced) {
    return (
      <div
        className="absolute"
        style={{
          left: keyframesX[0],
          top: keyframesY[0],
          width: size,
          height: size,
          opacity,
          filter: "blur(120px)",
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
        }}
      />
    );
  }
  return (
    <motion.div
      animate={{ x: keyframesX, y: keyframesY }}
      transition={{
        duration,
        repeat: Infinity,
        ease,
        repeatType: "loop",
        delay,
      }}
      className="absolute"
      style={{
        width: size,
        height: size,
        opacity,
        filter: "blur(120px)",
        borderRadius: "50%",
        background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`,
        willChange: "transform",
      }}
    />
  );
}
