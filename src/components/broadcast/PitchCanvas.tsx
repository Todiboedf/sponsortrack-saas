"use client";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { Pitch } from "./Pitch";

/**
 * R3F Canvas for the broadcast pitch. Static perspective camera at
 * fov=35, positioned for the classic broadcast angle; orbital motion
 * is driven from inside the scene (CameraDirector).
 *
 * Postprocessing keeps to Bloom alone — the vignette and depth-of-field
 * cues from the original brief are faked in CSS over the canvas to keep
 * the GPU cost bounded on mid-range laptops.
 *
 * Caller is responsible for sizing the wrapper and lazy-loading via
 * next/dynamic with { ssr: false }.
 */
export default function PitchCanvas() {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <PerspectiveCamera makeDefault fov={35} position={[0, 22, 50]} near={1} far={400} />
      <Pitch />
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.25}
          mipmapBlur
          kernelSize={KernelSize.LARGE}
        />
      </EffectComposer>
    </Canvas>
  );
}
