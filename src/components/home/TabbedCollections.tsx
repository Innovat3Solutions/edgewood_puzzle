"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import {
  puzzles,
  ronMagillPuzzles,
  cherpStudioPuzzles,
  wildInColorPuzzles,
  type Puzzle,
} from "@/data/puzzles";
import { usePuzzlePreview } from "@/components/preview/PuzzlePreviewProvider";
import { useCart } from "@/components/cart/CartProvider";

type TabKey = "best" | "ron" | "cherp" | "wild";

const TABS: { key: TabKey; label: string }[] = [
  { key: "best", label: "Bestsellers" },
  { key: "ron", label: "Ron Magill" },
  { key: "cherp", label: "Cherp Studio" },
  { key: "wild", label: "Wild in Color" },
];

const BEST_SLUGS = new Set([
  "ron-lion",
  "ron-elephant",
  "ron-leopard",
  "ron-giant-panda",
  "wic-tigers",
  "wic-axolotl",
  "cherp-red-panda",
  "cherp-tiger-wood",
]);

function pickBestsellers(): Puzzle[] {
  const matched = puzzles.filter((p) => BEST_SLUGS.has(p.slug));
  if (matched.length >= 8) return matched.slice(0, 8);
  return [...matched, ...puzzles.filter((p) => !BEST_SLUGS.has(p.slug))].slice(0, 8);
}

export default function TabbedCollections() {
  const [tab, setTab] = useState<TabKey>("best");
  const { open } = usePuzzlePreview();
  const { add: addToCart } = useCart();

  const items = useMemo<Puzzle[]>(() => {
    switch (tab) {
      case "ron":
        return ronMagillPuzzles.slice(0, 8);
      case "cherp":
        return cherpStudioPuzzles.slice(0, 8);
      case "wild":
        return wildInColorPuzzles.slice(0, 8);
      case "best":
      default:
        return pickBestsellers();
    }
  }, [tab]);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="font-syne font-extrabold text-[#0E1116] tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.05 }}
          >
            Browse our most-loved puzzles
          </h2>
          <p className="mt-3 font-dm text-[#55555E] text-base md:text-lg">
            {puzzles.length} puzzles in stock. Printed and finished in the USA.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#0E1116]/10 w-full max-w-3xl">
            {TABS.map((t) => {
              const isActive = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`relative font-dm text-sm md:text-[15px] font-semibold px-4 md:px-5 py-3 transition-colors ${
                    isActive ? "text-[#F26A1F]" : "text-[#0E1116]/70 hover:text-[#0E1116]"
                  }`}
                >
                  {t.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-px h-0.5 transition-opacity ${
                      isActive ? "bg-[#F26A1F] opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((p) => (
            <div key={p.slug} className="group text-left">
              <button
                type="button"
                onClick={() =>
                  open({
                    slug: p.slug,
                    image: p.image,
                    title: p.title,
                    subtitle: p.subtitle,
                    collection: collectionLabel(p.collection),
                    pieces: p.pieces,
                    packaging: p.packaging,
                    variants: p.variants,
                    material: p.material,
                    dimensions: p.dimensions,
                  })
                }
                aria-label={`Preview ${p.title}`}
                className="relative block w-full aspect-square overflow-hidden rounded-lg bg-[#F4F4F5] focus:outline-none focus:ring-2 focus:ring-[#F26A1F] focus:ring-offset-2 cursor-zoom-in"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </button>
              <div className="pt-3">
                <div className="font-dm text-[11px] tracking-[0.18em] uppercase text-[#888] mb-1">
                  {collectionLabel(p.collection)}
                </div>
                <div className="font-dm font-semibold text-[#0E1116] text-sm md:text-[15px] leading-snug line-clamp-2">
                  {p.title}
                </div>
                <div className="flex items-center justify-between gap-2 mt-2">
                  <span className="font-dm font-bold text-[#0E1116] text-sm md:text-[15px]">
                    ${p.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        slug: p.slug,
                        title: p.title,
                        subtitle: p.subtitle,
                        image: p.image,
                        collection: collectionLabel(p.collection),
                        pieces: p.pieces,
                        price: p.price,
                        material: p.material,
                        dimensions: p.dimensions,
                      })
                    }
                    aria-label={`Add ${p.title} to cart`}
                    className="inline-flex items-center gap-1.5 bg-[#F26A1F] hover:bg-[#E05A10] text-white font-semibold text-xs px-3 py-1.5 rounded-full transition-colors shadow-[0_6px_16px_-6px_rgba(242,106,31,0.55)]"
                  >
                    <ShoppingCart size={13} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={tabHref(tab)}
            className="inline-flex items-center font-dm text-sm font-semibold text-[#0E1116] border border-[#0E1116] hover:bg-[#0E1116] hover:text-white rounded-full px-6 py-3 transition-colors"
          >
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
}

function tabHref(tab: TabKey): string {
  switch (tab) {
    case "ron":
      return "/shop?collection=ron-magill";
    case "cherp":
      return "/shop?collection=cherp-studio";
    case "wild":
      return "/shop?collection=wild-in-color";
    default:
      return "/shop";
  }
}

function collectionLabel(c: Puzzle["collection"]): string {
  switch (c) {
    case "ron-magill":
      return "Ron Magill";
    case "cherp-studio":
      return "Cherp Studio";
    case "wild-in-color":
      return "Wild in Color";
  }
}
