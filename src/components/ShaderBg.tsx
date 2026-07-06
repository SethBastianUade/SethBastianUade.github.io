"use client";

import { useRef } from "react";
import { useShaderBg } from "@/hooks/useShaderBg";

export default function ShaderBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useShaderBg(canvasRef);

  return (
    <div className="shader-bg fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none opacity-40"
      />
      <div className="dot-grid-overlay" />
    </div>
  );
}
