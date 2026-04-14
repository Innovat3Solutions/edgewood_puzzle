"use client";

import Image from "next/image";
import type { Puzzle } from "@/data/puzzles";
import { usePuzzlePreview } from "@/components/preview/PuzzlePreviewProvider";
import { Eye } from "lucide-react";

type Theme =
  | "default"
  | "ron-magill"
  | "butterfly"
  | "laysak"
  | "kia"
  | "wild-in-color";

const themes: Record<Theme, {
  card: string;
  imageBg: string;
  title: string;
  subtitle: string;
  meta: string;
  price: string;
  button: string;
}> = {
  default: {
    card: "bg-panel border-border-gold hover:border-gold",
    imageBg: "bg-deep",
    title: "text-white",
    subtitle: "text-muted/80",
    meta: "text-muted",
    price: "text-gold",
    button: "border-white text-white hover:border-gold hover:text-gold",
  },
  "ron-magill": {
    card: "bg-[#15221a]/90 border-emerald-900/60 hover:border-amber-300/70 shadow-lg shadow-black/30",
    imageBg: "bg-[#0e1a12]",
    title: "text-amber-100",
    subtitle: "text-emerald-200/70",
    meta: "text-stone-400",
    price: "text-amber-300",
    button: "border-amber-300/70 text-amber-200 hover:bg-amber-300 hover:text-[#0e1a12]",
  },
  butterfly: {
    card: "bg-[#23122a]/85 border-fuchsia-900/60 hover:border-fuchsia-300/70 shadow-lg shadow-black/30",
    imageBg: "bg-[#1a0f1e]",
    title: "text-fuchsia-100",
    subtitle: "text-violet-200/70",
    meta: "text-violet-200/60",
    price: "text-fuchsia-300",
    button: "border-fuchsia-300/70 text-fuchsia-200 hover:bg-fuchsia-400 hover:text-[#1a0f1e] hover:border-fuchsia-400",
  },
  laysak: {
    card: "bg-[#0F2537]/90 border-[#F27A2E]/30 hover:border-[#F27A2E]/80 shadow-lg shadow-black/40",
    imageBg: "bg-[#081624]",
    title: "text-[#FFE8CC]",
    subtitle: "text-[#FFB347]/80",
    meta: "text-[#9BB8C8]",
    price: "text-[#F27A2E]",
    button: "border-[#F27A2E]/70 text-[#FFE8CC] hover:bg-[#F27A2E] hover:text-[#081624] hover:border-[#F27A2E]",
  },
  kia: {
    card: "bg-[#131317] border-white/10 hover:border-white/40",
    imageBg: "bg-[#0c0c10]",
    title: "text-white",
    subtitle: "text-neutral-400",
    meta: "text-neutral-500",
    price: "text-white",
    button: "border-white/40 text-white hover:bg-white hover:text-[#0c0c10]",
  },
  "wild-in-color": {
    card: "bg-[#10191e]/85 border-cyan-900/50 hover:border-pink-300/70 shadow-lg shadow-black/30",
    imageBg: "bg-[#0e1416]",
    title: "text-cyan-100",
    subtitle: "text-pink-200/70",
    meta: "text-cyan-200/60",
    price: "text-pink-300",
    button: "border-cyan-300/70 text-cyan-200 hover:bg-pink-400 hover:border-pink-400 hover:text-[#0e1416]",
  },
};

export default function PuzzleCard({
  puzzle,
  theme = "default",
}: {
  puzzle: Puzzle;
  theme?: Theme;
}) {
  const t = themes[theme];
  const { open } = usePuzzlePreview();
  const openPreview = () =>
    open({
      image: puzzle.image,
      title: puzzle.title,
      collection: puzzle.subtitle,
      pieces: puzzle.pieces,
    });
  return (
    <div
      className={`group border rounded-lg overflow-hidden transition-all hover:-translate-y-1 ${t.card}`}
    >
      <button
        type="button"
        onClick={openPreview}
        aria-label={`Preview ${puzzle.title}`}
        className={`relative aspect-square w-full overflow-hidden cursor-zoom-in ${t.imageBg}`}
      >
        <Image
          src={puzzle.image}
          alt={puzzle.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white/95 text-[#0E1116] text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <Eye size={14} /> Preview
        </span>
      </button>
      <div className="p-4">
        <h3 className={`font-syne font-bold text-lg ${t.title}`}>{puzzle.title}</h3>
        {puzzle.subtitle && (
          <p className={`font-dm text-xs italic ${t.subtitle}`}>{puzzle.subtitle}</p>
        )}
        <p className={`font-dm text-sm mt-1 ${t.meta}`}>{puzzle.pieces} pieces</p>
        <div className="flex items-center justify-between mt-3">
          <span className={`font-syne font-bold ${t.price}`}>${puzzle.price}</span>
          <button
            className={`text-xs border px-3 py-1.5 rounded transition ${t.button}`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
