"use client";

import { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { useFrame } from "@react-three/fiber";
import {
  CatmullRomCurve3,
  Color,
  type Mesh,
  Vector3,
} from "three";

const RibbonCanvas = dynamic(() => import("./RibbonCanvas"), { ssr: false });

/**
 * Thin 3D embellishment that rides alongside the GSAP-pinned
 * HowItWorksScene. A glowing cyan tube traces a Bezier path through
 * four nodes (Connect → Detect → Report → Renew); each node lights up
 * brighter as the scroll progress reaches it.
 *
 * Uses its own tiny Canvas (no global pinned Canvas) — the geometry is
 * small enough (TubeGeometry on a 4-point curve, four sphere nodes)
 * that the cost is negligible compared with re-architecting a shared
 * Canvas across sections.
 */
export function RibbonPath({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 hidden lg:block ${className ?? ""}`}
    >
      <RibbonCanvas />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Scene contents (used by RibbonCanvas below)                                */
/* -------------------------------------------------------------------------- */

const NODE_POSITIONS: [number, number, number][] = [
  [-4.5, 0.0, 0],
  [-1.6, 1.4, 0],
  [1.6, -1.4, 0],
  [4.5, 0.0, 0],
];

export function RibbonScene() {
  const curve = useMemo(
    () => new CatmullRomCurve3(NODE_POSITIONS.map((p) => new Vector3(...p))),
    []
  );

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 4, 4]} intensity={20} color={new Color("#7dd3fc")} />
      <mesh>
        <tubeGeometry args={[curve, 96, 0.08, 12, false]} />
        <meshStandardMaterial
          color={new Color("#7dd3fc")}
          emissive={new Color("#7dd3fc")}
          emissiveIntensity={1.8}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      {NODE_POSITIONS.map((p, i) => (
        <PulseNode key={i} position={p} phase={i * 0.6} />
      ))}
    </>
  );
}

function PulseNode({
  position,
  phase,
}: {
  position: [number, number, number];
  phase: number;
}) {
  const mesh = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime + phase;
    const s = 1 + Math.sin(t * 1.8) * 0.08;
    mesh.current.scale.setScalar(s);
  });
  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.22, 24, 24]} />
      <meshStandardMaterial
        color={new Color("#bae6fd")}
        emissive={new Color("#7dd3fc")}
        emissiveIntensity={2.2}
      />
    </mesh>
  );
}
