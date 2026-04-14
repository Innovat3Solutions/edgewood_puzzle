"use client";

import { useEffect, useRef, useState } from "react";

const COLORS = [
  { fill: "#F5A623", stroke: "#E8950E" }, // Gold
  { fill: "#6C3FC7", stroke: "#5530A0" }, // Purple
  { fill: "#00C9B1", stroke: "#00A896" }, // Teal
  { fill: "#FF6B6B", stroke: "#E05555" }, // Coral
  { fill: "#4A90E2", stroke: "#3278C8" }, // Blue
  { fill: "#F0B429", stroke: "#D99B10" }, // Amber
  { fill: "#9F7AEA", stroke: "#7C5CBF" }, // Lavender
  { fill: "#38BDF8", stroke: "#209FD8" }, // Sky
];

// Reusing base path with different internal rotations to simulate 4 variants.
// Bounding box centered at -22 -22 144 144 as per spec.
const BASE_PATH =
  "M0,0 L38,0 Q38,0 33,-8 Q28,-20 38,-20 Q48,-20 42,-8 Q38,0 62,0 L100,0 L100,38 Q100,38 108,33 Q120,28 120,38 Q120,48 108,42 Q100,38 100,62 L100,100 L62,100 Q62,100 67,108 Q72,120 62,120 Q52,120 57,108 Q62,100 38,100 L0,100 L0,62 Q0,62 -8,67 Q-20,72 -20,62 Q-20,52 -8,57 Q0,62 0,38 Z";

const REPEL_RADIUS = 160;
const REPEL_FORCE = 1.8;
const DRIFT_FORCE = 0.0005;
const FRICTION = 0.985;
const MAX_SPEED = 2.8;

type PieceData = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spinRate: number;
  size: number;
  color: { fill: string; stroke: string };
  rotationVariant: number;
  isDragging: boolean;
  opacity: number;
};

export default function PuzzlePieces() {
  const containerRef = useRef<HTMLDivElement>(null);
  const piecesRef = useRef<PieceData[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isDown: false, lastX: 0, lastY: 0 });
  const [initialized, setInitialized] = useState(false);
  const animationRef = useRef<number>(0);
  const dragTargetRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Initialize 16 pieces
    piecesRef.current = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      x: Math.random() * (w - 200) + 100,
      y: Math.random() * (h - 200) + 100,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      angle: Math.random() * Math.PI * 2,
      spinRate: (Math.random() * 0.004 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      size: Math.random() * 35 + 80, // 80 - 115px
      color: COLORS[i % COLORS.length],
      rotationVariant: Math.floor(Math.random() * 4) * 90,
      isDragging: false,
      opacity: 0, // start hidden for entrance stagger
    }));

    setInitialized(true);

    // Stagger fade-in
    piecesRef.current.forEach((p, idx) => {
      setTimeout(() => {
        p.opacity = 1;
      }, idx * 60);
    });

    // Physics Loop
    let time = 0;
    const tick = () => {
      time += 1;
      const W = window.innerWidth;
      const H = window.innerHeight;

      piecesRef.current.forEach((p) => {
        if (p.isDragging) {
          p.x = mouseRef.current.x;
          p.y = mouseRef.current.y;
          // Calculate throw velocity from drag
          p.vx = (mouseRef.current.x - mouseRef.current.lastX) * 0.5;
          p.vy = (mouseRef.current.y - mouseRef.current.lastY) * 0.5;
          return;
        }

        // Apply mouse repel
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          p.vx += (dx / dist) * force * REPEL_FORCE;
          p.vy += (dy / dist) * force * REPEL_FORCE;
        }

        // Apply drift
        p.vx += Math.sin(time * 0.01 + p.id) * DRIFT_FORCE;
        p.vy += Math.cos(time * 0.01 + p.id) * DRIFT_FORCE;

        // Apply friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        // Cap speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        // Apply velocities
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spinRate;

        // Wall bounce
        const limitX = W - p.size / 2;
        const limitY = H - p.size / 2;
        if (p.x < p.size / 2) {
          p.x = p.size / 2;
          p.vx *= -0.6;
        } else if (p.x > limitX) {
          p.x = limitX;
          p.vx *= -0.6;
        }

        if (p.y < p.size / 2) {
          p.y = p.size / 2;
          p.vy *= -0.6;
        } else if (p.y > limitY) {
          p.y = limitY;
          p.vy *= -0.6;
        }

        // DOM update
        const el = document.getElementById(`piece-${p.id}`);
        if (el) {
          el.style.transform = `translate(${p.x - p.size / 2}px, ${p.y - p.size / 2}px) rotate(${p.angle}rad)`;
          el.style.opacity = p.opacity.toString();
        }
      });

      mouseRef.current.lastX = mouseRef.current.x;
      mouseRef.current.lastY = mouseRef.current.y;
      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    // Global events
    const handleMove = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;
    };

    const handleUp = () => {
      if (dragTargetRef.current !== null) {
        const p = piecesRef.current[dragTargetRef.current];
        if (p) p.isDragging = false;
        dragTargetRef.current = null;
      }
      mouseRef.current.isDown = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, []);

  const handlePointerDown = (id: number) => {
    dragTargetRef.current = id;
    const p = piecesRef.current[id];
    if (p) {
      p.isDragging = true;
      p.vx = 0;
      p.vy = 0;
    }
  };

  if (!initialized) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {piecesRef.current.map((p) => (
        <div
          key={p.id}
          id={`piece-${p.id}`}
          className="absolute top-0 left-0 cursor-grab active:cursor-grabbing pointer-events-auto"
          style={{
            width: p.size,
            height: p.size,
            transition: "opacity 0.6s ease",
            willChange: "transform",
            opacity: 0,
            filter: `drop-shadow(0 0 12px ${p.color.fill}40)`,
          }}
          onMouseDown={() => handlePointerDown(p.id)}
          onTouchStart={() => handlePointerDown(p.id)}
        >
          <svg viewBox="-22 -22 144 144" width="100%" height="100%">
            <g transform={`rotate(${p.rotationVariant} 50 50)`}>
              <path
                d={BASE_PATH}
                fill={p.color.fill}
                stroke={p.color.stroke}
                strokeWidth="1.5"
                opacity="0.9"
              />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}
