"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  BufferGeometry,
  CanvasTexture,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  type ShaderMaterial,
  type SRGBColorSpace,
} from "three";
import * as THREE from "three";

const PITCH_W = 105;
const PITCH_H = 68;

/* -------------------------------------------------------------------------- */
/* Procedural striped grass texture                                           */
/* -------------------------------------------------------------------------- */

function useGrassTexture(): CanvasTexture | null {
  return useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    const W = 512;
    const H = 512;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const STRIPES = 14;
    const stripeH = H / STRIPES;
    for (let i = 0; i < STRIPES; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#1d5e30" : "#226833";
      ctx.fillRect(0, i * stripeH, W, stripeH);
    }
    // Subtle noise so the field isn't too flat.
    const img = ctx.getImageData(0, 0, W, H);
    for (let p = 0; p < img.data.length; p += 4) {
      const n = (Math.random() - 0.5) * 12;
      img.data[p] = Math.max(0, Math.min(255, img.data[p] + n));
      img.data[p + 1] = Math.max(0, Math.min(255, img.data[p + 1] + n));
      img.data[p + 2] = Math.max(0, Math.min(255, img.data[p + 2] + n));
    }
    ctx.putImageData(img, 0, 0);
    const tex = new CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    (tex as unknown as { colorSpace?: typeof SRGBColorSpace }).colorSpace = (THREE as unknown as { SRGBColorSpace: typeof SRGBColorSpace }).SRGBColorSpace;
    return tex;
  }, []);
}

/* -------------------------------------------------------------------------- */
/* Pitch lines (single LineSegments draw call)                                */
/* -------------------------------------------------------------------------- */

function PitchLines() {
  const geometry = useMemo(() => {
    const points: number[] = [];
    const push = (x1: number, z1: number, x2: number, z2: number) => {
      const y = 0.02;
      points.push(x1, y, z1, x2, y, z2);
    };
    const arc = (
      cx: number,
      cz: number,
      r: number,
      start: number,
      end: number,
      segments = 48
    ) => {
      for (let i = 0; i < segments; i++) {
        const t1 = start + ((end - start) * i) / segments;
        const t2 = start + ((end - start) * (i + 1)) / segments;
        push(cx + Math.cos(t1) * r, cz + Math.sin(t1) * r, cx + Math.cos(t2) * r, cz + Math.sin(t2) * r);
      }
    };

    const halfW = PITCH_W / 2;
    const halfH = PITCH_H / 2;
    // Outer rectangle
    push(-halfW, -halfH, halfW, -halfH);
    push(halfW, -halfH, halfW, halfH);
    push(halfW, halfH, -halfW, halfH);
    push(-halfW, halfH, -halfW, -halfH);
    // Midline
    push(0, -halfH, 0, halfH);
    // Centre circle
    arc(0, 0, 9.15, 0, Math.PI * 2);
    // Penalty boxes (40.32 wide × 16.5 deep) — at each end along x
    const penaltyDeep = 16.5;
    const penaltyHalf = 40.32 / 2;
    // Left
    push(-halfW, -penaltyHalf, -halfW + penaltyDeep, -penaltyHalf);
    push(-halfW + penaltyDeep, -penaltyHalf, -halfW + penaltyDeep, penaltyHalf);
    push(-halfW + penaltyDeep, penaltyHalf, -halfW, penaltyHalf);
    // Right
    push(halfW, -penaltyHalf, halfW - penaltyDeep, -penaltyHalf);
    push(halfW - penaltyDeep, -penaltyHalf, halfW - penaltyDeep, penaltyHalf);
    push(halfW - penaltyDeep, penaltyHalf, halfW, penaltyHalf);
    // Goal boxes (18.32 wide × 5.5 deep)
    const goalDeep = 5.5;
    const goalHalf = 18.32 / 2;
    push(-halfW, -goalHalf, -halfW + goalDeep, -goalHalf);
    push(-halfW + goalDeep, -goalHalf, -halfW + goalDeep, goalHalf);
    push(-halfW + goalDeep, goalHalf, -halfW, goalHalf);
    push(halfW, -goalHalf, halfW - goalDeep, -goalHalf);
    push(halfW - goalDeep, -goalHalf, halfW - goalDeep, goalHalf);
    push(halfW - goalDeep, goalHalf, halfW, goalHalf);
    // Corner arcs r=1
    arc(-halfW, -halfH, 1, 0, Math.PI / 2);
    arc(halfW, -halfH, 1, Math.PI / 2, Math.PI);
    arc(halfW, halfH, 1, Math.PI, Math.PI * 1.5);
    arc(-halfW, halfH, 1, Math.PI * 1.5, Math.PI * 2);

    const geom = new BufferGeometry();
    geom.setAttribute("position", new Float32BufferAttribute(points, 3));
    return geom;
  }, []);

  const material = useMemo(
    () => new LineBasicMaterial({ color: "#f4efe6", transparent: true, opacity: 0.85 }),
    []
  );

  return (
    <primitive
      object={
        new LineSegments(geometry, material) as unknown as THREE.Object3D
      }
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Goals (3 posts + crossbar each)                                            */
/* -------------------------------------------------------------------------- */

function Goal({ x }: { x: number }) {
  const goalWidth = 7.32;
  const goalHeight = 2.44;
  const postR = 0.06;
  const sign = Math.sign(x);
  return (
    <group position={[x, 0, 0]}>
      {/* Left post */}
      <mesh position={[0, goalHeight / 2, -goalWidth / 2]}>
        <cylinderGeometry args={[postR, postR, goalHeight, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>
      {/* Right post */}
      <mesh position={[0, goalHeight / 2, goalWidth / 2]}>
        <cylinderGeometry args={[postR, postR, goalHeight, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>
      {/* Crossbar */}
      <mesh position={[0, goalHeight, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[postR, postR, goalWidth, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>
      {/* Back support */}
      <mesh position={[sign * 1.5, goalHeight / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[postR * 0.8, postR * 0.8, goalWidth, 8]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* LED panel with cycling shader                                              */
/* -------------------------------------------------------------------------- */

const LED_COLORS = [
  new THREE.Color("#0891b2"), // cyan
  new THREE.Color("#7c3aed"), // violet
  new THREE.Color("#f97316"), // orange
];

function LedPanel({
  position,
  size,
  rotationY = 0,
  phase = 0,
}: {
  position: [number, number, number];
  size: [number, number, number];
  rotationY?: number;
  phase?: number;
}) {
  const material = useRef<ShaderMaterial>(null);

  const shader = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPhase: { value: phase },
          uColorA: { value: LED_COLORS[0] },
          uColorB: { value: LED_COLORS[1] },
          uColorC: { value: LED_COLORS[2] },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec2 vUv;
          uniform float uTime;
          uniform float uPhase;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform vec3 uColorC;

          void main() {
            // 8-second cycle through 3 colors
            float t = mod(uTime * 0.125 + uPhase, 1.0); // 1/8 = 0.125
            vec3 col;
            if (t < 0.333) {
              col = mix(uColorA, uColorB, t / 0.333);
            } else if (t < 0.666) {
              col = mix(uColorB, uColorC, (t - 0.333) / 0.333);
            } else {
              col = mix(uColorC, uColorA, (t - 0.666) / 0.334);
            }
            // Pixel grid suggestion (vertical stripes)
            float px = step(0.5, fract(vUv.x * 80.0));
            col *= 0.85 + 0.15 * px;
            // Brighter top edge to suggest LED bloom
            float edge = smoothstep(0.7, 1.0, vUv.y);
            col += edge * 0.25;
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    [phase]
  );

  useFrame((_, dt) => {
    if (shader.uniforms.uTime) shader.uniforms.uTime.value += dt;
  });

  return (
    <mesh position={position} rotation={[0, rotationY, 0]}>
      <boxGeometry args={size} />
      <primitive
        ref={material}
        object={shader}
        attach="material"
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/* Lights                                                                     */
/* -------------------------------------------------------------------------- */

function BroadcastLights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <spotLight
        position={[-30, 80, -10]}
        angle={0.4}
        penumbra={0.5}
        intensity={1.4}
        color="#fff8e1"
      />
      <spotLight
        position={[30, 80, 10]}
        angle={0.4}
        penumbra={0.5}
        intensity={1.4}
        color="#fff8e1"
      />
      <directionalLight position={[20, 40, 60]} intensity={0.35} color="#4a90e2" />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Slow camera orbital + breathing                                            */
/* -------------------------------------------------------------------------- */

function CameraDirector() {
  const { camera } = useThree();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Slow orbital sweep around y axis, very subtle
    const angle = Math.sin(t * 0.05) * 0.18; // ±10°
    const radius = 50 + Math.sin(t * (Math.PI * 2) / 12) * 2; // breathing z 48-52
    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.position.y = 22 + Math.cos(t * 0.08) * 0.6;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* -------------------------------------------------------------------------- */
/* Stadium silhouette (flattened torus)                                       */
/* -------------------------------------------------------------------------- */

function Stadium() {
  return (
    <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[78, 14, 12, 64]} />
      <meshStandardMaterial color="#1a1f2e" roughness={0.95} />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/* Composed Pitch scene                                                       */
/* -------------------------------------------------------------------------- */

export function Pitch() {
  const grass = useGrassTexture();
  const groupRef = useRef<Group>(null);

  // Place LEDs around the perimeter just above the pitch
  const ledY = 0.4;
  const sidePanelHeight = 0.8;
  const panelDepth = 0.05;

  return (
    <group ref={groupRef}>
      <BroadcastLights />
      <CameraDirector />
      <Stadium />

      {/* Pitch plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[PITCH_W, PITCH_H]} />
        <meshStandardMaterial
          color="#1d5e30"
          map={grass ?? undefined}
          roughness={0.8}
        />
      </mesh>

      <PitchLines />
      <Goal x={-PITCH_W / 2} />
      <Goal x={PITCH_W / 2} />

      {/* LED perimeter (long sides + behind goals) */}
      <LedPanel
        position={[0, ledY, -PITCH_H / 2 - 0.6]}
        size={[PITCH_W, sidePanelHeight, panelDepth]}
        phase={0}
      />
      <LedPanel
        position={[0, ledY, PITCH_H / 2 + 0.6]}
        size={[PITCH_W, sidePanelHeight, panelDepth]}
        phase={0.33}
      />
      <LedPanel
        position={[-PITCH_W / 2 - 0.6, ledY, 0]}
        size={[panelDepth, sidePanelHeight, PITCH_H]}
        phase={0.66}
      />
      <LedPanel
        position={[PITCH_W / 2 + 0.6, ledY, 0]}
        size={[panelDepth, sidePanelHeight, PITCH_H]}
        phase={0.5}
      />
    </group>
  );
}
