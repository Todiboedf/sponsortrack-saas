"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { Color, type PerspectiveCamera, type WebGLRenderer } from "three";
import { Pitch } from "./Pitch";

/* --------------------------------------------------------------------------
 *  DEBUG BUILD — chore(hero/debug)
 *  All logs prefixed [SL/…] for one-click DevTools filtering.
 *  Remove this entire instrumentation block once the root cause is found.
 * -------------------------------------------------------------------------- */

/**
 * R3F Canvas for the broadcast pitch (instrumented).
 *
 * Diagnostic-only edition: keeps the same opaque-canvas + explicit
 * camera setup as the production build, but layers in mount/unmount
 * logs, a verbose `onCreated` dump, a hotpink canary cube outside any
 * Suspense boundary, and `preserveDrawingBuffer: true` so we can sample
 * the WebGL framebuffer with `canvas.toDataURL()` from the console.
 */
export default function PitchCanvas() {
  useEffect(() => {
    console.log("[SL/canvas] PitchCanvas mounted (client)");
    return () => console.log("[SL/canvas] PitchCanvas unmounted");
  }, []);

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
        preserveDrawingBuffer: true, // DEBUG: enables canvas.toDataURL() readback
      }}
      onCreated={(state) => {
        const { gl, camera, scene, size, viewport } = state;
        const perspective = camera as PerspectiveCamera;
        const renderer = gl as WebGLRenderer;

        console.log("[SL/canvas] onCreated — pre", {
          camera: {
            position: camera.position.toArray(),
            rotation: camera.rotation.toArray(),
            isPerspective: perspective.isPerspectiveCamera,
            fov: perspective.fov,
            near: perspective.near,
            far: perspective.far,
          },
          size: { width: size.width, height: size.height },
          viewport: {
            width: viewport.width,
            height: viewport.height,
            dpr: viewport.dpr,
          },
          sceneChildrenPre: scene.children.length,
        });

        const ctx = renderer.getContext();
        console.log("[SL/canvas] renderer + context", {
          rendererClass: renderer.constructor.name,
          contextClass: ctx?.constructor.name ?? "null",
          isWebGL2: renderer.capabilities.isWebGL2,
          maxTextures: renderer.capabilities.maxTextures,
          precision: renderer.capabilities.precision,
          domElement: {
            tag: renderer.domElement.tagName,
            attrWidth: renderer.domElement.width,
            attrHeight: renderer.domElement.height,
            clientWidth: renderer.domElement.clientWidth,
            clientHeight: renderer.domElement.clientHeight,
            isInDOM: typeof document !== "undefined" && document.contains(renderer.domElement),
          },
        });

        renderer.setClearColor(new Color("#060d18"), 1);
        scene.background = new Color("#060d18");
        camera.position.set(0, 22, 50);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();

        console.log("[SL/canvas] onCreated — post", {
          camera: {
            position: camera.position.toArray(),
            rotation: camera.rotation.toArray(),
          },
          sceneChildrenPost: scene.children.length,
          sceneBackground: (scene.background as Color | null)?.getHexString?.() ?? null,
        });
      }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {/* DEBUG canary — sits at (0, 5, 0) directly under the Canvas,
          OUTSIDE the Pitch <Suspense> so we can tell whether the Canvas
          itself draws anything even if the Pitch tree is suspended or
          throws. If neither this cube nor the pitch shows up, the bug
          is at the Canvas / EffectComposer / WebGL layer. If only this
          cube shows up, the bug is inside <Pitch>. */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[10, 10, 10]} />
        <meshBasicMaterial color="hotpink" />
      </mesh>

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
