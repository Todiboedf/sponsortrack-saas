"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  BufferGeometry,
  CanvasTexture,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  type Points,
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
    const W = 1024;
    const H = 512;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    // Vertical stripes (perpendicular to long pitch axis = mowing
    // across the field, the broadcast-classic look).
    const STRIPES = 16;
    const stripeW = W / STRIPES;
    for (let i = 0; i < STRIPES; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#1d5e30" : "#236b35";
      ctx.fillRect(i * stripeW, 0, stripeW, H);
    }
    // Subtle organic noise so the field isn't too flat.
    const img = ctx.getImageData(0, 0, W, H);
    for (let p = 0; p < img.data.length; p += 4) {
      const n = (Math.random() - 0.5) * 14;
      img.data[p] = Math.max(0, Math.min(255, img.data[p] + n));
      img.data[p + 1] = Math.max(0, Math.min(255, img.data[p + 1] + n));
      img.data[p + 2] = Math.max(0, Math.min(255, img.data[p + 2] + n));
    }
    ctx.putImageData(img, 0, 0);
    const tex = new CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 4;
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
    // Centre spot + penalty spots
    arc(0, 0, 0.25, 0, Math.PI * 2, 16);
    arc(-halfW + 11, 0, 0.25, 0, Math.PI * 2, 16);
    arc(halfW - 11, 0, 0.25, 0, Math.PI * 2, 16);

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
            // Pixel-grid suggestion (vertical stripes)
            float px = step(0.5, fract(vUv.x * 80.0));
            col *= 0.82 + 0.18 * px;
            // Brighter top edge to suggest LED bloom
            float edge = smoothstep(0.7, 1.0, vUv.y);
            col += edge * 0.35;
            // Boost overall intensity so the global Bloom pass picks it up
            col *= 1.35;
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
/* Volumetric spotlight beam (additive cone, custom alpha)                    */
/* -------------------------------------------------------------------------- */

function SpotlightBeam({
  origin,
  target,
  radius,
  color,
  opacity = 0.35,
}: {
  origin: [number, number, number];
  target: [number, number, number];
  radius: number;
  color: string;
  opacity?: number;
}) {
  const { mid, height, quat } = useMemo(() => {
    const o = new THREE.Vector3(...origin);
    const t = new THREE.Vector3(...target);
    const dir = t.clone().sub(o);
    const h = dir.length();
    const mid = o.clone().add(t).multiplyScalar(0.5);
    // Default cone axis is +Y. Align it with (target - origin).
    const up = new THREE.Vector3(0, 1, 0);
    const dirNorm = dir.clone().normalize();
    // The cone defaults to apex at +Y/2, base at -Y/2 — so we want to
    // orient the +Y axis to point from target to origin (apex at the
    // light, base where it lands).
    const wantedUp = dirNorm.clone().multiplyScalar(-1);
    const quat = new THREE.Quaternion().setFromUnitVectors(up, wantedUp);
    return { mid, height: h, quat };
  }, [origin, target]);

  const shader = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uOpacity: { value: opacity },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          varying vec3 vPos;
          void main() {
            vUv = uv;
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec2 vUv;
          uniform vec3 uColor;
          uniform float uOpacity;
          void main() {
            // Radial fade from cone axis to edge
            float radial = 1.0 - smoothstep(0.0, 0.5, abs(vUv.x - 0.5) * 2.0);
            // Vertical fade — brighter near the light source (top of UV)
            float vert = smoothstep(0.0, 0.85, vUv.y);
            float a = radial * vert * uOpacity;
            gl_FragColor = vec4(uColor, a);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    [color, opacity]
  );

  return (
    <mesh
      position={[mid.x, mid.y, mid.z]}
      quaternion={[quat.x, quat.y, quat.z, quat.w]}
    >
      <coneGeometry args={[radius, height, 32, 1, true]} />
      <primitive object={shader} attach="material" />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/* Lights                                                                     */
/* -------------------------------------------------------------------------- */

function BroadcastLights() {
  return (
    <>
      <ambientLight intensity={0.28} />
      <spotLight
        position={[-30, 80, -10]}
        angle={0.4}
        penumbra={0.5}
        intensity={1.5}
        color="#fff8e1"
      />
      <spotLight
        position={[30, 80, 10]}
        angle={0.4}
        penumbra={0.5}
        intensity={1.5}
        color="#fff8e1"
      />
      <directionalLight position={[20, 40, 60]} intensity={0.32} color="#4a90e2" />
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
/* Tiered stadium silhouette (three concentric flattened tori)                */
/* -------------------------------------------------------------------------- */

function TieredStadium() {
  // Three rings stacked outward + upward suggest tiered seating without
  // the cost of an actual stadium mesh. Each ring is a flat-laid torus.
  const rings = [
    { major: 76, minor: 10, y: 2, color: "#161b27" },
    { major: 82, minor: 14, y: 6, color: "#1a1f2e" },
    { major: 88, minor: 18, y: 11, color: "#1f2436" },
  ];
  return (
    <group>
      {rings.map((r, i) => (
        <mesh
          key={i}
          position={[0, r.y, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[r.major, r.minor, 10, 80]} />
          <meshStandardMaterial color={r.color} roughness={0.95} metalness={0} />
        </mesh>
      ))}
      {/* Inner faint glow ring suggesting concourse lighting */}
      <mesh position={[0, 8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[71, 71.8, 96]} />
        <meshBasicMaterial
          color="#0891b2"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/* Atmospheric dust particles                                                 */
/* -------------------------------------------------------------------------- */

function DustParticles({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 220;
      positions[i * 3 + 1] = Math.random() * 28 + 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 160;
      speeds[i] = 0.04 + Math.random() * 0.08;
    }
    return { positions, speeds };
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.elapsedTime;
    const pos = pointsRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      arr[idx + 1] += speeds[i] * 0.05;
      arr[idx] += Math.sin(t * 0.3 + i) * 0.005;
      if (arr[idx + 1] > 30) arr[idx + 1] = 0.5;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.13}
        color="#bee4ff"
        transparent
        opacity={0.45}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/* DEBUG heartbeat — logs every 60 frames; remove after diagnostic            */
/* -------------------------------------------------------------------------- */

function FrameHeartbeat() {
  const frameRef = useRef(0);
  const { camera, scene, gl } = useThree();
  useFrame(({ clock }) => {
    frameRef.current += 1;
    if (frameRef.current === 1 || frameRef.current % 60 === 0) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      console.log("[SL/pitch] frame", frameRef.current, {
        elapsed: clock.elapsedTime.toFixed(2),
        cameraPos: camera.position.toArray().map((n) => Number(n.toFixed(2))),
        worldDir: dir.toArray().map((n) => Number(n.toFixed(2))),
        rendererCalls: gl.info.render.calls,
        rendererTriangles: gl.info.render.triangles,
        rendererFrame: gl.info.render.frame,
        sceneChildren: scene.children.length,
      });
    }
  });
  return null;
}

/* -------------------------------------------------------------------------- */
/* Composed Pitch scene                                                       */
/* -------------------------------------------------------------------------- */

export function Pitch() {
  const grass = useGrassTexture();
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    console.log("[SL/pitch] Pitch tree mounted (R3F subtree)");
    return () => console.log("[SL/pitch] Pitch tree unmounted");
  }, []);

  // Place LEDs around the perimeter just above the pitch
  const ledY = 0.4;
  const sidePanelHeight = 0.8;
  const panelDepth = 0.05;

  return (
    <group ref={groupRef}>
      <FrameHeartbeat />
      <BroadcastLights />
      <CameraDirector />
      <TieredStadium />

      {/* Pitch plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[PITCH_W, PITCH_H]} />
        <meshStandardMaterial
          color="#1d5e30"
          map={grass ?? undefined}
          roughness={0.85}
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

      {/* Volumetric spotlight beams — visible cones from the rig down
          to the pitch. Apex at the lamp, base at the lit pool. */}
      <SpotlightBeam
        origin={[-30, 80, -10]}
        target={[-12, 0, -4]}
        radius={26}
        color="#fff8e1"
        opacity={0.28}
      />
      <SpotlightBeam
        origin={[30, 80, 10]}
        target={[12, 0, 4]}
        radius={26}
        color="#fff8e1"
        opacity={0.28}
      />

      <DustParticles />
    </group>
  );
}
