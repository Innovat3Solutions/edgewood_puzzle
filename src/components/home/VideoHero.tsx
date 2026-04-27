"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const VIDEOS = [
  "/Videos/ron-magill-hero.mp4",
  "/Videos/wild-in-color-hero.mp4",
  "/Videos/butterfly-hero.mp4",
  "/Videos/kia-hero.mp4",
  "/Videos/gregory-laysak-hero.mp4",
];

const ROTATION_MS = 9000;

export default function VideoHero() {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % VIDEOS.length);
    }, ROTATION_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
    });
  }, [active]);

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "min(820px, 92svh)" }}>
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms]"
          style={{ opacity: i === active ? 1 : 0 }}
          src={src}
          autoPlay={i === 0}
          muted
          loop
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
        />
      ))}

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,17,22,0.55) 0%, rgba(14,17,22,0.35) 40%, rgba(14,17,22,0.65) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-40 pb-24 md:pt-48 md:pb-32" style={{ minHeight: "min(820px, 92svh)" }}>
        <span className="font-dm text-[11px] md:text-xs tracking-[0.32em] uppercase text-white/85 mb-5">
          Edgewood Puzzles · American Made
        </span>

        <h1
          className="font-syne font-extrabold text-white tracking-[-0.02em] leading-[0.95] max-w-5xl"
          style={{ fontSize: "clamp(40px, 6.4vw, 86px)" }}
        >
          Find your next favorite jigsaw puzzle.
        </h1>

        <p
          className="mt-6 font-dm text-white/85 leading-relaxed max-w-2xl"
          style={{ fontSize: "clamp(15px, 1.2vw, 18px)" }}
        >
          Wildlife portraits, hand-finished wood puzzles, and signature artist collections.
          Printed, cut, and packed in Lafayette, Indiana.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold px-7 py-3.5 rounded-full transition-colors shadow-[0_10px_28px_-6px_rgba(242,106,31,0.55)]"
            style={{ fontSize: 15 }}
          >
            Shop Now
          </Link>
          <Link
            href="/custom"
            className="inline-flex items-center border border-white/70 hover:bg-white hover:text-[#0E1116] text-white font-semibold px-7 py-3.5 rounded-full transition-colors backdrop-blur-sm"
            style={{ fontSize: 15 }}
          >
            Custom Photo Puzzle
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show video ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
