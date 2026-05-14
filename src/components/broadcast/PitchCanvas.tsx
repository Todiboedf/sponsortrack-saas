"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { Color } from "three";
import { Pitch } from "./Pitch";

/**
 * R3F Canvas for the broadcast pitch.
 *
 * Defensive rendering setup:
 *  - `alpha: false` keeps the canvas fully opaque so a frame where the
 *    scene hasn't rendered yet doesn't show as a transparent hole.
 *  - The default camera is configured via the `camera` prop so its
 *    position is set at construction time — no Drei `makeDefault`
 *    re-mount race that would override an `onCreated` lookAt.
 *  - `onCreated` sets the renderer clear color (matching the navy
 *    backdrop) AND forces the camera to look at the origin before the
 *    first render — the default camera orientation faces -Z from its
 *    position, which from [0, 22, 50] aims toward [0, 22, 0] and drops
 *    the pitch (y=0) out of the FOV 35° frustum on frame 0.
 *  - `frameloop="always"` is explicit to avoid any tooling default
 *    flipping to "demand".
 *  - Inner Suspense absorbs lazy texture / Pitch loading so the canvas
 *    never gets stuck on a thrown promise.
 *
 * Bloom is the only postprocessing pass — vignette and DoF are CSS
 * over the canvas (per brief) so the GPU bill stays bounded.
 */
export default function PitchCanvas() {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.5]}
      frameloop="always"
      camera={{ fov: 35, position: [0, 22, 50], near: 1, far: 400 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        preserveDrawingBuffer: false,
      }}
      onCreated={({ gl, camera, scene }) => {
        gl.setClearColor(new Color("#060d18"), 1);
        scene.background = new Color("#060d18");
        camera.position.set(0, 22, 50);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
      }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <Suspense fallback={null}>
        <Pitch />
      </Suspense>
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
