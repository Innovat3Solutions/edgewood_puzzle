"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1400&q=80&auto=format&fit=crop",
    alt: "A family at the beach",
  },
  {
    src: "https://images.unsplash.com/photo-1529612700005-e35377bf1415?w=1400&q=80&auto=format&fit=crop",
    alt: "Kids running in a sunlit field",
  },
  {
    src: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1400&q=80&auto=format&fit=crop",
    alt: "A golden retriever in soft light",
  },
  {
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1400&q=80&auto=format&fit=crop",
    alt: "A couple laughing together",
  },
];

const COLS = 7;
const ROWS = 6;

function buildPuzzlePath(cols: number, rows: number): string {
  const cell = 100;
  const tab = cell * 0.18;
  const halfTab = tab / 2;
  const bow = tab * 1.55;

  const flip = (a: number, b: number) => {
    const v = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
    return (v - Math.floor(v) > 0.5 ? 1 : -1);
  };

  let d = "";

  for (let r = 1; r < rows; r++) {
    const y = r * cell;
    d += `M0 ${y}`;
    for (let c = 0; c < cols; c++) {
      const x1 = c * cell;
      const x2 = (c + 1) * cell;
      const xm = (x1 + x2) / 2;
      const dir = flip(c + 0.5, r);
      d += ` L${xm - halfTab} ${y}`;
      d += ` C${xm - halfTab} ${y - dir * bow}, ${xm + halfTab} ${y - dir * bow}, ${xm + halfTab} ${y}`;
      d += ` L${x2} ${y}`;
    }
  }

  for (let c = 1; c < cols; c++) {
    const x = c * cell;
    d += `M${x} 0`;
    for (let r = 0; r < rows; r++) {
      const y1 = r * cell;
      const y2 = (r + 1) * cell;
      const ym = (y1 + y2) / 2;
      const dir = flip(r + 0.5, c + 100);
      d += ` L${x} ${ym - halfTab}`;
      d += ` C${x - dir * bow} ${ym - halfTab}, ${x - dir * bow} ${ym + halfTab}, ${x} ${ym + halfTab}`;
      d += ` L${x} ${y2}`;
    }
  }

  return d;
}

const PUZZLE_PATH = buildPuzzlePath(COLS, ROWS);
const VB_W = COLS * 100;
const VB_H = ROWS * 100;

export default function CustomPromoStrip() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % PHOTOS.length);
    }, 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative overflow-hidden border-y border-[#0E1116]/10"
      style={{
        background:
          "radial-gradient(70% 90% at 8% 50%, rgba(242,106,31,0.10), transparent 60%)," +
          "radial-gradient(60% 80% at 100% 0%, rgba(58,123,213,0.08), transparent 60%)," +
          "#FFFFFF",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-[0.95fr_1.1fr] gap-8 md:gap-14 items-center">
        {/* Visual */}
        <div className="relative">
          <div className="relative aspect-[5/4] rounded-2xl overflow-hidden ring-1 ring-[#0E1116]/10 shadow-[0_30px_60px_-20px_rgba(14,17,22,0.35)] bg-[#0E0E10]">
            {PHOTOS.map((p, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                loading={i === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[900ms] ease-out ${
                  i === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Puzzle-piece overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d={PUZZLE_PATH}
                fill="none"
                stroke="rgba(0,0,0,0.55)"
                strokeWidth={1.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(0 0.7)"
              />
              <path
                d={PUZZLE_PATH}
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={0.9}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x={1.2}
                y={1.2}
                width={VB_W - 2.4}
                height={VB_H - 2.4}
                fill="none"
                stroke="rgba(0,0,0,0.45)"
                strokeWidth={1.8}
                rx={3}
              />
            </svg>

            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/95 text-[#0E1116] text-[10px] font-semibold uppercase tracking-[0.22em] px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F26A1F]" />
              Your photo here
            </span>

            {/* Slide dots */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
              {PHOTOS.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Show photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? "w-6 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Copy */}
        <div>
          <p className="font-dm text-[11px] tracking-[0.32em] uppercase text-[#B7541F] mb-3">
            Custom Studio
          </p>
          <h2
            className="font-syne font-extrabold text-[#0E1116] tracking-[-0.025em] leading-[0.95]"
            style={{ fontSize: "clamp(32px, 4.4vw, 56px)" }}
          >
            Your photo,
            <br />
            <span className="italic font-medium text-[#F26A1F]">in pieces.</span>
          </h2>
          <p className="mt-5 font-dm text-[#55555E] text-base md:text-lg max-w-xl leading-[1.65]">
            Upload an image, pick an orientation and piece count, and we&rsquo;ll
            print it on the same 2.4 mm chipboard as our signature collections,
            cut by hand in the United States.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-dm text-sm text-[#0E1116]/75">
            <span className="inline-flex items-center gap-2">
              <Check size={16} className="text-[#F26A1F]" /> 100, 300, 500, or 1000 pc
            </span>
            <span className="inline-flex items-center gap-2">
              <Check size={16} className="text-[#F26A1F]" /> Landscape or portrait
            </span>
            <span className="inline-flex items-center gap-2">
              <Check size={16} className="text-[#F26A1F]" /> From $24.99
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              href="/custom"
              className="inline-flex items-center gap-2 bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold px-7 py-3.5 rounded-full transition-colors shadow-[0_10px_28px_-6px_rgba(242,106,31,0.55)]"
            >
              Start designing <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/custom"
              className="font-dm text-sm font-bold text-[#0E1116] border-b-2 border-[#0E1116] pb-1 hover:text-[#F26A1F] hover:border-[#F26A1F] transition-colors"
            >
              See how it works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
