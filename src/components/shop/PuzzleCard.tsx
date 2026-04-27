"use client";

import Image from "next/image";
import type { Puzzle } from "@/data/puzzles";
import { usePuzzlePreview } from "@/components/preview/PuzzlePreviewProvider";
import { useCart } from "@/components/cart/CartProvider";
import { Eye } from "lucide-react";

type Theme = "default" | "ron-magill" | "cherp-studio" | "wild-in-color";

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
  "cherp-studio": {
    card: "bg-[#17322a]/90 border-emerald-900/50 hover:border-emerald-300/70 shadow-lg shadow-black/30",
    imageBg: "bg-[#0f1a16]",
    title: "text-emerald-100",
    subtitle: "text-emerald-200/70",
    meta: "text-emerald-200/60",
    price: "text-emerald-300",
    button: "border-emerald-300/70 text-emerald-200 hover:bg-emerald-300 hover:text-[#0f1a16]",
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
  const { add: addToCart } = useCart();
  const openPreview = () =>
    open({
      slug: puzzle.slug,
      image: puzzle.image,
      title: puzzle.title,
      subtitle: puzzle.subtitle,
      collection: puzzle.subtitle,
      pieces: puzzle.pieces,
      packaging: puzzle.packaging,
      variants: puzzle.variants,
      material: puzzle.material,
      dimensions: puzzle.dimensions,
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
          <span className={`font-syne font-bold ${t.price}`}>${puzzle.price.toFixed(2)}</span>
          <button
            type="button"
            onClick={() =>
              addToCart({
                slug: puzzle.slug,
                title: puzzle.title,
                subtitle: puzzle.subtitle,
                image: puzzle.image,
                collection: puzzle.subtitle,
                pieces: puzzle.pieces,
                price: puzzle.price,
                material: puzzle.material,
                dimensions: puzzle.dimensions,
              })
            }
            className={`text-xs border px-3 py-1.5 rounded transition ${t.button}`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
