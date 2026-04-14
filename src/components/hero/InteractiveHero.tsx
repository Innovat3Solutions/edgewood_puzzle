"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

// Jigsaw path generator — 100x100 body. Each side: 0 flat, +1 tab out, -1 tab in.
function piecePath(top: number, right: number, bottom: number, left: number) {
  const eT = (d: number) =>
    d === 0
      ? "h 100"
      : `h 35 c 0,${-d * 8} 5,${-d * 20} 15,${-d * 20} s 15,${d * 12} 15,${d * 20} h 35`;
  const eR = (d: number) =>
    d === 0
      ? "v 100"
      : `v 35 c ${d * 8},0 ${d * 20},5 ${d * 20},15 s ${-d * 12},15 ${-d * 20},15 v 35`;
  const eB = (d: number) =>
    d === 0
      ? "h -100"
      : `h -35 c 0,${d * 8} -5,${d * 20} -15,${d * 20} s -15,${-d * 12} -15,${-d * 20} h -35`;
  const eL = (d: number) =>
    d === 0
      ? "v -100"
      : `v -35 c ${-d * 8},0 ${-d * 20},-5 ${-d * 20},-15 s ${d * 12},-15 ${d * 20},-15 v -35`;
  return `M 0,0 ${eT(top)} ${eR(right)} ${eB(bottom)} ${eL(left)} Z`;
}

const COLORS = [
  { fill: "#3A7BD5", stroke: "#2A5FAA" }, // blue
  { fill: "#F4B82A", stroke: "#CF9A16" }, // yellow
  { fill: "#F26A1F", stroke: "#C85516" }, // orange
  { fill: "#E63B6A", stroke: "#C02A55" }, // pink
  { fill: "#2FB5B8", stroke: "#1E8F92" }, // teal
];

const COLS = 4;
const ROWS = 3;

type Spec = {
  id: number;
  row: number;
  col: number;
  sides: [number, number, number, number];
  color: { fill: string; stroke: string };
};

type Live = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  dragging: boolean;
  dragDx: number;
  dragDy: number;
  size: number;
};

// Pre-composed scatter positions (fraction of container w/h) + initial rotation.
// Tuned to frame the centered "puzzle" wordmark: a top band and a bottom band.
const SCATTER: { x: number; y: number; rot: number }[] = [
  { x: 0.08, y: 0.14, rot: -14 },
  { x: 0.22, y: 0.08, rot: 9 },
  { x: 0.36, y: 0.16, rot: -6 },
  { x: 0.50, y: 0.09, rot: 16 },
  { x: 0.64, y: 0.15, rot: -11 },
  { x: 0.78, y: 0.08, rot: 7 },
  { x: 0.92, y: 0.18, rot: -4 },
  { x: 0.10, y: 0.78, rot: 10 },
  { x: 0.28, y: 0.88, rot: -8 },
  { x: 0.48, y: 0.82, rot: 13 },
  { x: 0.68, y: 0.90, rot: -15 },
  { x: 0.90, y: 0.82, rot: 5 },
];

function buildSpecs(): Spec[] {
  // Random internal edges (+1 or -1). Outer edges flat.
  const vEdges: number[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS - 1 }, () => (Math.random() > 0.5 ? 1 : -1))
  );
  const hEdges: number[][] = Array.from({ length: ROWS - 1 }, () =>
    Array.from({ length: COLS }, () => (Math.random() > 0.5 ? 1 : -1))
  );

  // Color distribution that avoids obvious adjacency clashes.
  const specs: Spec[] = [];
  let id = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const top = r === 0 ? 0 : -hEdges[r - 1][c];
      const bottom = r === ROWS - 1 ? 0 : hEdges[r][c];
      const left = c === 0 ? 0 : -vEdges[r][c - 1];
      const right = c === COLS - 1 ? 0 : vEdges[r][c];
      const color = COLORS[(r * 3 + c * 2) % COLORS.length];
      specs.push({
        id: id++,
        row: r,
        col: c,
        sides: [top, right, bottom, left],
        color,
      });
    }
  }
  return specs;
}

export default function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<Spec[]>([]);
  const livesRef = useRef<Live[]>([]);
  const frameRef = useRef(0);
  const draggingIdRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  const computeLayout = useCallback((resetPositions: boolean) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    // Piece size scales with viewport — bumped up a notch.
    const base = Math.min(rect.width, rect.height * 1.4);
    const size = Math.max(130, Math.min(230, base / 7.5));

    // Compute the no-go rect around the centered copy.
    let safe: { top: number; bottom: number; left: number; right: number } | null = null;
    if (copyRef.current) {
      const copy = copyRef.current.getBoundingClientRect();
      const pad = 18;
      safe = {
        top: copy.top - rect.top - pad,
        bottom: copy.bottom - rect.top + pad,
        left: copy.left - rect.left - pad,
        right: copy.right - rect.left + pad,
      };
    }

    specsRef.current.forEach((spec, i) => {
      const slot = SCATTER[i % SCATTER.length];
      let homeX = slot.x * rect.width;
      let homeY = slot.y * rect.height;

      if (safe) {
        const half = size / 2;
        const overlapsX = homeX + half > safe.left && homeX - half < safe.right;
        const overlapsY = homeY + half > safe.top && homeY - half < safe.bottom;
        if (overlapsX && overlapsY) {
          // Push the piece to whichever side of the safe zone is closer.
          const safeCenterY = (safe.top + safe.bottom) / 2;
          if (homeY < safeCenterY) {
            homeY = safe.top - half;
          } else {
            homeY = safe.bottom + half;
          }
        }
      }

      // Keep inside the container.
      const pad = size / 2 + 6;
      homeX = Math.max(pad, Math.min(rect.width - pad, homeX));
      homeY = Math.max(pad, Math.min(rect.height - pad, homeY));

      const live = livesRef.current[i];
      if (!live) {
        livesRef.current[i] = {
          x: homeX,
          y: homeY,
          vx: 0,
          vy: 0,
          rot: slot.rot,
          dragging: false,
          dragDx: 0,
          dragDy: 0,
          size,
        };
      } else {
        live.size = size;
        if (resetPositions) {
          live.x = homeX;
          live.y = homeY;
          live.vx = 0;
          live.vy = 0;
          live.rot = slot.rot;
        }
      }
    });
  }, []);

  // Initial mount — generate specs, place pieces assembled.
  useEffect(() => {
    specsRef.current = buildSpecs();
    livesRef.current = [];
    computeLayout(true);
    setReady(true);

    const onResize = () => computeLayout(true);
    window.addEventListener("resize", onResize);

    // Recompute when the copy block's size changes (font load, responsive shift).
    // Only during initial ~2s window so later user drags aren't snapped back.
    const ro = copyRef.current ? new ResizeObserver(() => computeLayout(true)) : null;
    if (ro && copyRef.current) ro.observe(copyRef.current);
    const roTimer = window.setTimeout(() => ro?.disconnect(), 2000);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(roTimer);
      ro?.disconnect();
    };
  }, [computeLayout]);

  // Animation loop.
  useEffect(() => {
    if (!ready) return;
    const tick = () => {
      const el = containerRef.current;
      if (el) {
        const { width, height } = el.getBoundingClientRect();
        livesRef.current.forEach((live, i) => {
          const spec = specsRef.current[i];
          if (!spec) return;

          if (!live.dragging) {
            live.x += live.vx;
            live.y += live.vy;
            live.vx *= 0.9;
            live.vy *= 0.9;
            if (Math.abs(live.vx) < 0.05) live.vx = 0;
            if (Math.abs(live.vy) < 0.05) live.vy = 0;

            const pad = live.size * 0.4;
            if (live.x < pad) { live.x = pad; live.vx = Math.abs(live.vx) * 0.4; }
            if (live.x > width - pad) { live.x = width - pad; live.vx = -Math.abs(live.vx) * 0.4; }
            if (live.y < pad) { live.y = pad; live.vy = Math.abs(live.vy) * 0.4; }
            if (live.y > height - pad) { live.y = height - pad; live.vy = -Math.abs(live.vy) * 0.4; }
          }

          const node = document.getElementById(`ihp-${spec.id}`);
          if (node) {
            const scale = live.dragging ? 1.05 : 1;
            node.style.width = `${live.size}px`;
            node.style.height = `${live.size}px`;
            node.style.transform = `translate(${live.x - live.size / 2}px, ${live.y - live.size / 2}px) rotate(${live.rot}deg) scale(${scale})`;
            node.style.zIndex = live.dragging ? "60" : "30";
          }
        });
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [ready]);

  // Pointer handlers.
  useEffect(() => {
    if (!ready) return;
    const onMove = (e: PointerEvent) => {
      const id = draggingIdRef.current;
      if (id === null) return;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const live = livesRef.current[id];
      const prevX = live.x;
      const prevY = live.y;
      live.x = px - live.dragDx;
      live.y = py - live.dragDy;
      live.vx = live.x - prevX;
      live.vy = live.y - prevY;
    };
    const onUp = () => {
      const id = draggingIdRef.current;
      if (id === null) return;
      const live = livesRef.current[id];
      live.dragging = false;
      draggingIdRef.current = null;
      document.body.style.userSelect = "";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [ready]);

  const onPieceDown = (i: number) => (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const live = livesRef.current[i];
    live.dragging = true;
    live.dragDx = px - live.x;
    live.dragDy = py - live.y;
    live.vx = 0;
    live.vy = 0;
    draggingIdRef.current = i;
    document.body.style.userSelect = "none";
  };

  const resetPuzzle = () => {
    computeLayout(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        background: "#FBEADB",
        minHeight: "100svh",
      }}
    >
      {/* Centered copy — pieces scatter around it */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 md:pt-[104px] pb-16 pointer-events-none"
        style={{ minHeight: "100svh" }}
      >
        <div ref={copyRef} className="flex flex-col items-center pointer-events-none w-full max-w-full">
        <span className="font-dm text-[11px] md:text-sm tracking-[0.28em] uppercase text-[#B7541F] mb-6 pointer-events-auto">
          Edgewood Puzzles
        </span>

        <h1
          className="font-syne font-extrabold text-[#0E1116] leading-[0.88] tracking-[-0.045em] max-w-full"
          style={{ fontSize: "clamp(64px, 20vw, 340px)" }}
        >
          puzzle
        </h1>

        <p
          className="mt-6 font-syne font-semibold text-[#1A1D26] max-w-full"
          style={{ fontSize: "clamp(20px, 2.3vw, 32px)", lineHeight: 1.2 }}
        >
          Puzzles worth the weekend.
        </p>

        <p
          className="mt-4 font-dm text-[#55555E] leading-[1.65] max-w-[92vw] md:max-w-[56ch]"
          style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}
        >
          American-made jigsaws on 2.4mm blue chipboard, printed with soy-based
          inks and finished matte so the art holds from the first piece to the
          last. Six collections — deep-space telescopy, signature wildlife,
          butterflies, landscapes, studio portraiture, and color-forward
          nature — all built to the same museum-grade standard.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <Link
            href="/shop"
            className="inline-flex items-center bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold px-7 py-3.5 rounded-md shadow-[0_10px_24px_rgba(242,106,31,0.35)] transition-colors"
            style={{ fontSize: 17 }}
          >
            Start Building
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-5 text-xs font-dm text-[#8A8A93] pointer-events-auto px-4">
          <span className="hidden md:inline">Drag a piece. Break it apart. Put it back.</span>
          <button
            onClick={resetPuzzle}
            className="underline underline-offset-4 hover:text-[#F26A1F] transition-colors"
          >
            Reset
          </button>
        </div>
        </div>
      </div>

      {/* Interactive pieces */}
      {ready &&
        specsRef.current.map((p, i) => (
          <div
            key={p.id}
            id={`ihp-${p.id}`}
            onPointerDown={onPieceDown(i)}
            className="absolute top-0 left-0 pointer-events-none md:pointer-events-auto md:cursor-grab md:active:cursor-grabbing md:touch-none"
            style={{
              width: livesRef.current[i]?.size ?? 180,
              height: livesRef.current[i]?.size ?? 180,
              willChange: "transform",
              zIndex: 30,
              transition: "filter 180ms ease",
            }}
          >
            <svg
              viewBox="-25 -25 150 150"
              width="100%"
              height="100%"
              style={{
                filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.16))",
                overflow: "visible",
                display: "block",
              }}
            >
              <path
                d={piecePath(p.sides[0], p.sides[1], p.sides[2], p.sides[3])}
                fill={p.color.fill}
                stroke={p.color.stroke}
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ))}
    </div>
  );
}
