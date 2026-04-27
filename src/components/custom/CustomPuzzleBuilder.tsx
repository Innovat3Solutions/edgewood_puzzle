"use client";

import { useEffect, useMemo, useRef, useState, useId } from "react";
import { Upload, X, Check, ShoppingCart, Image as ImageIcon, RotateCcw, ShieldCheck, Truck, Sparkles } from "lucide-react";

type Orientation = "landscape" | "portrait";

type Variant = {
  pieces: number;
  price: number;
  dims: string;
  grid: { landscape: [number, number]; portrait: [number, number] };
};

const VARIANTS: Variant[] = [
  { pieces: 100,  price: 24.99, dims: '13" × 9.25"',     grid: { landscape: [12, 8],  portrait: [8, 12]  } },
  { pieces: 300,  price: 29.99, dims: '18" × 13"',       grid: { landscape: [20, 15], portrait: [15, 20] } },
  { pieces: 500,  price: 34.99, dims: '19.25" × 14.5"',  grid: { landscape: [25, 20], portrait: [20, 25] } },
  { pieces: 1000, price: 39.99, dims: '26.625" × 19.25"', grid: { landscape: [40, 25], portrait: [25, 40] } },
];

function buildPuzzlePath(cols: number, rows: number): string {
  const cell = 100;
  const tab = cell * 0.18;
  const halfTab = tab / 2;
  const bow = tab * 1.55;

  // Deterministic pseudo-random tab direction so it feels organic but stable.
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

export default function CustomPuzzleBuilder() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<Orientation>("landscape");
  const [variantIdx, setVariantIdx] = useState<number>(2); // 500 pc default
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const variant = VARIANTS[variantIdx];
  const [cols, rows] = variant.grid[orientation];
  const aspect = orientation === "landscape" ? 3 / 2 : 2 / 3;

  const puzzlePath = useMemo(() => buildPuzzlePath(cols, rows), [cols, rows]);

  useEffect(() => {
    return () => {
      if (photo && photo.startsWith("blob:")) URL.revokeObjectURL(photo);
    };
  }, [photo]);

  const acceptFile = (file: File | null | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (photo && photo.startsWith("blob:")) URL.revokeObjectURL(photo);
    setPhoto(URL.createObjectURL(file));
    setPhotoName(file.name);
  };

  const clearPhoto = () => {
    if (photo && photo.startsWith("blob:")) URL.revokeObjectURL(photo);
    setPhoto(null);
    setPhotoName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    acceptFile(e.target.files?.[0]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    acceptFile(e.dataTransfer.files?.[0]);
  };

  return (
    <>
      {/* Hero header */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(60% 70% at 15% 0%, rgba(242,106,31,0.18), transparent 60%)," +
            "radial-gradient(55% 65% at 95% 0%, rgba(58,123,213,0.14), transparent 60%)," +
            "radial-gradient(40% 60% at 70% 100%, rgba(230,59,106,0.10), transparent 60%)," +
            "#FFFFFF",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(14,17,22,0.15) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 pt-[120px] md:pt-[140px] pb-10 md:pb-14">
          <div className="font-dm text-[11px] md:text-sm tracking-[0.32em] uppercase text-[#B7541F] mb-4">
            Custom Studio
          </div>
          <h1
            className="font-syne font-extrabold text-[#0E1116] tracking-[-0.025em] leading-[0.95]"
            style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
          >
            Your photo,<br />
            <span className="italic font-medium text-[#F26A1F]">in pieces.</span>
          </h1>
          <p className="mt-6 font-dm text-[#55555E] text-base md:text-lg max-w-xl leading-[1.65]">
            Upload an image, pick an orientation and piece count, and we&rsquo;ll print
            it on the same 2.4 mm blue chipboard as our signature collections,
            cut by hand in Edgewood, New Mexico.
          </p>
        </div>
      </section>

      {/* Builder */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-6 pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 md:gap-14">
            {/* LEFT — preview */}
            <div className="lg:sticky lg:top-[100px] self-start">
              <div className="font-dm text-[11px] tracking-[0.28em] uppercase text-[#B7541F] mb-3">
                Live Preview
              </div>
              <PuzzlePreview
                photo={photo}
                aspect={aspect}
                cols={cols}
                rows={rows}
                puzzlePath={puzzlePath}
                onUploadClick={() => fileInputRef.current?.click()}
                onDrop={onDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                dragOver={dragOver}
              />

              <div className="mt-4 flex items-center justify-between font-dm text-xs text-[#0E1116]/55">
                <span>
                  {cols} × {rows} grid · {variant.pieces} pieces · {variant.dims}
                </span>
                {photo && (
                  <button
                    type="button"
                    onClick={clearPhoto}
                    className="inline-flex items-center gap-1.5 hover:text-[#F26A1F] transition-colors"
                  >
                    <RotateCcw size={12} /> Replace photo
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT — configurator */}
            <div className="flex flex-col gap-8">
              {/* Step 1 — upload */}
              <div>
                <StepHeader index={1} label="Upload your photo" done={!!photo} />
                <input
                  ref={fileInputRef}
                  id={inputId}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={onFileChange}
                />
                {photo ? (
                  <div className="flex items-center gap-3 bg-white rounded-xl border border-[#0E1116]/10 p-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#EDDDCC] shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-dm text-sm font-semibold text-[#0E1116] truncate">
                        {photoName ?? "Your photo"}
                      </div>
                      <div className="font-dm text-xs text-[#6A6A73]">
                        Looks great. Drop another to replace.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearPhoto}
                      aria-label="Remove photo"
                      className="text-[#0E1116]/60 hover:text-[#F26A1F] p-2"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor={inputId}
                    onDrop={onDrop}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    className={`flex items-center gap-4 rounded-xl border-2 border-dashed p-4 cursor-pointer transition-colors ${
                      dragOver
                        ? "border-[#F26A1F] bg-[#F26A1F]/5"
                        : "border-[#0E1116]/20 bg-white hover:border-[#0E1116]/45"
                    }`}
                  >
                    <span className="w-12 h-12 rounded-lg bg-[#FBEADB] flex items-center justify-center text-[#F26A1F] shrink-0">
                      <Upload size={20} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-dm text-sm font-semibold text-[#0E1116]">
                        Drop a photo here, or click to browse
                      </span>
                      <span className="block font-dm text-xs text-[#6A6A73] mt-0.5">
                        JPG or PNG · 3000 px or larger recommended
                      </span>
                    </span>
                  </label>
                )}
              </div>

              {/* Step 2 — orientation */}
              <div>
                <StepHeader index={2} label="Choose orientation" />
                <div className="grid grid-cols-2 gap-3">
                  <OrientationOption
                    selected={orientation === "landscape"}
                    onClick={() => setOrientation("landscape")}
                    label="Landscape"
                    aspect={3 / 2}
                  />
                  <OrientationOption
                    selected={orientation === "portrait"}
                    onClick={() => setOrientation("portrait")}
                    label="Portrait"
                    aspect={2 / 3}
                  />
                </div>
              </div>

              {/* Step 3 — piece count */}
              <div>
                <StepHeader index={3} label="Pick a piece count" />
                <div className="grid grid-cols-2 gap-3">
                  {VARIANTS.map((v, i) => (
                    <button
                      key={v.pieces}
                      type="button"
                      onClick={() => setVariantIdx(i)}
                      className={`text-left rounded-xl border p-4 transition-all ${
                        variantIdx === i
                          ? "border-[#0E1116] bg-white shadow-[0_8px_24px_-12px_rgba(14,17,22,0.25)]"
                          : "border-[#0E1116]/15 bg-white/70 hover:border-[#0E1116]/45"
                      }`}
                    >
                      <div className="flex items-baseline justify-between">
                        <span className="font-syne font-extrabold text-[#0E1116] text-2xl leading-none">
                          {v.pieces}
                        </span>
                        <span className="font-dm text-xs uppercase tracking-[0.2em] text-[#0E1116]/55">
                          pc
                        </span>
                      </div>
                      <div className="font-dm text-xs text-[#6A6A73] mt-1">
                        {v.dims}
                      </div>
                      <div className="font-syne font-bold text-[#0E1116] mt-3">
                        ${v.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing + CTA */}
              <div className="rounded-2xl bg-[#0E1116] text-white p-6 mt-2 shadow-[0_18px_40px_-16px_rgba(14,17,22,0.55)]">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <div className="font-dm text-[11px] uppercase tracking-[0.28em] text-white/55">
                      Total
                    </div>
                    <div className="font-syne font-extrabold text-4xl leading-none mt-1">
                      ${variant.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right font-dm text-xs text-white/65 leading-snug">
                    {variant.pieces} pc · {orientation === "landscape" ? "Landscape" : "Portrait"}
                    <br />
                    Ships in 5 to 7 business days
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!photo}
                  className={`mt-5 w-full inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-full transition-colors ${
                    photo
                      ? "bg-[#F26A1F] hover:bg-[#E05A10] text-white shadow-[0_10px_28px_-6px_rgba(242,106,31,0.55)]"
                      : "bg-white/15 text-white/50 cursor-not-allowed"
                  }`}
                >
                  <ShoppingCart size={18} />
                  {photo ? "Add to cart" : "Upload a photo to continue"}
                </button>
              </div>

              {/* Reassurance row */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <Reassurance icon={<ShieldCheck size={18} />} title="2.4 mm board" sub="Premium chipboard" />
                <Reassurance icon={<Sparkles size={18} />} title="Matte finish" sub="No glare" />
                <Reassurance icon={<Truck size={18} />} title="USA made" sub="Edgewood, NM" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StepHeader({ index, label, done }: { index: number; label: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center font-syne font-bold text-[11px] ${
          done ? "bg-[#0E1116] text-[#FBEADB]" : "bg-[#0E1116]/10 text-[#0E1116]"
        }`}
      >
        {done ? <Check size={12} /> : index}
      </span>
      <span className="font-syne font-bold text-[#0E1116] text-lg">{label}</span>
    </div>
  );
}

function OrientationOption({
  selected,
  onClick,
  label,
  aspect,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  aspect: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-4 flex items-center gap-4 transition-all ${
        selected
          ? "border-[#0E1116] bg-white shadow-[0_8px_24px_-12px_rgba(14,17,22,0.25)]"
          : "border-[#0E1116]/15 bg-white/70 hover:border-[#0E1116]/45"
      }`}
      aria-pressed={selected}
    >
      <span
        className={`block rounded-md ${selected ? "bg-[#F26A1F]" : "bg-[#0E1116]/25"}`}
        style={{
          width: aspect >= 1 ? 36 : 24,
          height: aspect >= 1 ? 24 : 36,
        }}
      />
      <span className="font-dm text-sm font-semibold text-[#0E1116]">{label}</span>
    </button>
  );
}

function Reassurance({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl bg-white/70 border border-[#0E1116]/10 p-3">
      <div className="text-[#F26A1F] flex justify-center mb-1">{icon}</div>
      <div className="font-syne font-bold text-[#0E1116] text-sm leading-tight">{title}</div>
      <div className="font-dm text-[11px] text-[#6A6A73] mt-0.5">{sub}</div>
    </div>
  );
}

function PuzzlePreview({
  photo,
  aspect,
  cols,
  rows,
  puzzlePath,
  onUploadClick,
  onDrop,
  onDragOver,
  onDragLeave,
  dragOver,
}: {
  photo: string | null;
  aspect: number;
  cols: number;
  rows: number;
  puzzlePath: string;
  onUploadClick: () => void;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  dragOver: boolean;
}) {
  const w = cols * 100;
  const h = rows * 100;
  // Stroke scales with cell size — keep it visually consistent across piece counts.
  const stroke = Math.max(0.6, Math.min(1.4, 60 / Math.max(cols, rows)));

  return (
    <div className="relative">
      {/* soft ground shadow */}
      <div
        aria-hidden
        className="absolute -inset-x-6 -bottom-4 h-12 rounded-full blur-2xl opacity-60"
        style={{ background: "rgba(14,17,22,0.18)" }}
      />
      <button
        type="button"
        onClick={photo ? undefined : onUploadClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`relative block w-full overflow-hidden rounded-[14px] transition-all ${
          photo ? "cursor-default" : "cursor-pointer"
        } ${dragOver ? "ring-4 ring-[#F26A1F]/40" : ""}`}
        style={{
          aspectRatio: aspect,
          background: photo
            ? "#0E0E10"
            : "repeating-linear-gradient(45deg, #F4DEC4 0 14px, #EFD5B6 14px 28px)",
          boxShadow:
            "0 30px 60px -28px rgba(14,17,22,0.45), 0 1px 0 rgba(255,255,255,0.6) inset, 0 0 0 1px rgba(14,17,22,0.08)",
        }}
        aria-label={photo ? "Custom puzzle preview" : "Upload a photo to preview"}
      >
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt="Your custom puzzle"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <span className="w-16 h-16 rounded-full bg-white/85 flex items-center justify-center text-[#F26A1F] shadow-[0_8px_24px_-10px_rgba(14,17,22,0.35)]">
              <ImageIcon size={26} />
            </span>
            <span className="mt-4 font-syne font-bold text-[#0E1116] text-lg md:text-xl">
              Drop your photo to preview
            </span>
            <span className="mt-1 font-dm text-sm text-[#0E1116]/60">
              You&rsquo;ll see it tiled into real puzzle pieces.
            </span>
          </div>
        )}

        {/* Puzzle piece grid overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <filter id="puzzleEmboss" x="-2%" y="-2%" width="104%" height="104%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
            </filter>
          </defs>
          {/* shadow lines underneath */}
          <path
            d={puzzlePath}
            fill="none"
            stroke="rgba(0,0,0,0.55)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#puzzleEmboss)"
            transform={`translate(0 ${stroke * 0.4})`}
          />
          {/* highlight lines on top */}
          <path
            d={puzzlePath}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={stroke * 0.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* outer puzzle border */}
          <rect
            x={stroke}
            y={stroke}
            width={w - stroke * 2}
            height={h - stroke * 2}
            fill="none"
            stroke="rgba(0,0,0,0.45)"
            strokeWidth={stroke * 1.4}
            rx={stroke * 2}
          />
        </svg>
      </button>
    </div>
  );
}
