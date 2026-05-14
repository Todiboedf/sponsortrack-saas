"use client";

import { Canvas } from "@react-three/fiber";
import { RibbonScene } from "./RibbonPath";

export default function RibbonCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <RibbonScene />
    </Canvas>
  );
}
