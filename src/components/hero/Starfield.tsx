"use client";

import { useEffect, useRef } from "react";

class Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  phase: number;
  speed: number;

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.radius = Math.random() * 1.2 + 0.2; // 0.2 - 1.4px
    this.opacity = Math.random() * 0.7 + 0.1; // 0.1 - 0.8
    this.phase = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 0.02 + 0.005;
  }

  draw(ctx: CanvasRenderingContext2D, time: number) {
    // Twinkle using sine wave
    const currentOpacity =
      this.opacity + Math.sin(time * this.speed + this.phase) * 0.2;

    ctx.globalAlpha = Math.max(0, currentOpacity);
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let animationFrameId: number;
    let time = 0;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 3200);
      stars = Array.from({ length: count }, () =>
        new Star(canvas.width, canvas.height)
      );
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;
      stars.forEach((star) => star.draw(ctx, time));
      animationFrameId = requestAnimationFrame(render);
    };

    init();
    render();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(init, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ backgroundColor: "var(--navy)" }}
    />
  );
}
