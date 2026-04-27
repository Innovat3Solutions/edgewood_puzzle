"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, ShoppingCart, SlidersHorizontal } from "lucide-react";
import type { Puzzle, Collection, PuzzleVariant } from "@/data/puzzles";
import { usePuzzlePreview } from "@/components/preview/PuzzlePreviewProvider";
import { useCart } from "@/components/cart/CartProvider";
import CustomPromoStrip from "@/components/shop/CustomPromoStrip";

type SortKey = "featured" | "az" | "za" | "pieces-asc" | "pieces-desc";

const COLLECTION_LABEL: Record<Collection, string> = {
  "ron-magill": "Ron Magill",
  "cherp-studio": "Cherp Studio",
  "wild-in-color": "Wild in Color",
};

const COLLECTION_DOT: Record<Collection, string> = {
  "ron-magill": "#FCD34D",
  "cherp-studio": "#6EE7B7",
  "wild-in-color": "#38BDF8",
};

const VALID_COLLECTIONS = new Set<Collection>([
  "ron-magill",
  "cherp-studio",
  "wild-in-color",
]);

export default function ShopGrid({ puzzles }: { puzzles: Puzzle[] }) {
  const { open } = usePuzzlePreview();
  const params = useSearchParams();

  const initialCollection: Collection | "all" = (() => {
    const c = params.get("collection");
    return c && VALID_COLLECTIONS.has(c as Collection) ? (c as Collection) : "all";
  })();
  const initialPieces: number | "all" = (() => {
    const p = params.get("pieces");
    if (!p) return "all";
    const n = Number(p);
    return Number.isFinite(n) && n > 0 ? n : "all";
  })();

  const [collection, setCollection] = useState<Collection | "all">(initialCollection);
  const [pieces, setPieces] = useState<number | "all">(initialPieces);
  const [sort, setSort] = useState<SortKey>("featured");

  const pieceOptions = useMemo(() => {
    const s = new Set<number>();
    puzzles.forEach((p) => p.variants.forEach((v) => s.add(v.pieces)));
    return Array.from(s)
      .filter((n) => n !== 48)
      .sort((a, b) => a - b);
  }, [puzzles]);

  const filtered = useMemo(() => {
    let list = puzzles;
    if (collection !== "all") list = list.filter((p) => p.collection === collection);
    if (pieces !== "all")
      list = list.filter((p) => p.variants.some((v) => v.pieces === pieces));
    const sorted = [...list];
    switch (sort) {
      case "az":         sorted.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "za":         sorted.sort((a, b) => b.title.localeCompare(a.title)); break;
      case "pieces-asc": sorted.sort((a, b) => a.pieces - b.pieces); break;
      case "pieces-desc":sorted.sort((a, b) => b.pieces - a.pieces); break;
    }
    return sorted;
  }, [puzzles, collection, pieces, sort]);

  const reset = () => { setCollection("all"); setPieces("all"); setSort("featured"); };
  const active = collection !== "all" || pieces !== "all" || sort !== "featured";

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
        {/* Subtle dot grid overlay */}
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
        <div className="relative max-w-7xl mx-auto px-6 pt-[120px] md:pt-[140px] pb-14 md:pb-20">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div className="max-w-2xl">
              <div className="font-dm text-[11px] md:text-sm tracking-[0.32em] uppercase text-[#B7541F] mb-4">
                The Shop
              </div>
              <h1
                className="font-syne font-extrabold text-[#0E1116] tracking-[-0.025em] leading-[0.95]"
                style={{ fontSize: "clamp(44px, 7vw, 96px)" }}
              >
                Every puzzle,<br />
                <span className="italic font-medium text-[#F26A1F]">every piece.</span>
              </h1>
              <p className="mt-6 font-dm text-[#55555E] text-base md:text-lg max-w-xl leading-[1.65]">
                The full Edgewood catalog in one place. Signature wildlife,
                wood studio editions, and high-chroma nature. Printed on 2.4mm
                blue chipboard, finished matte, and cut by hand in the United
                States.
              </p>
            </div>

            <div className="flex items-center gap-6 font-dm text-sm text-[#0E1116]/70">
              <div className="flex items-baseline gap-2">
                <span className="font-syne font-extrabold text-[#0E1116] text-4xl md:text-5xl leading-none">
                  {filtered.length}
                </span>
                <span className="uppercase tracking-[0.24em] text-xs">
                  {filtered.length === 1 ? "puzzle" : "puzzles"}
                </span>
              </div>
              <div className="hidden md:block h-10 w-px bg-[#0E1116]/15" />
              <div className="hidden md:block">
                <span className="block uppercase tracking-[0.24em] text-xs text-[#0E1116]/55">
                  Ships from
                </span>
                <span className="font-syne font-bold text-[#0E1116]">
                  Edgewood, NM
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CustomPromoStrip />

      {/* Sticky filter bar */}
      <div
        className="sticky top-[76px] z-30 border-y border-[#0E1116]/10 bg-white/95"
        style={{ backdropFilter: "blur(14px)" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2 text-[#0E1116] font-dm text-sm font-semibold shrink-0">
            <SlidersHorizontal size={16} />
            Filter
          </div>

          <FilterSelect
            value={collection}
            onChange={(v) => setCollection(v as Collection | "all")}
          >
            <option value="all">All collections</option>
            {(Object.keys(COLLECTION_LABEL) as Collection[]).map((c) => (
              <option key={c} value={c}>
                {COLLECTION_LABEL[c]}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            value={pieces === "all" ? "all" : String(pieces)}
            onChange={(v) => setPieces(v === "all" ? "all" : Number(v))}
          >
            <option value="all">Any size</option>
            {pieceOptions.map((n) => (
              <option key={n} value={n}>
                {n} pieces
              </option>
            ))}
          </FilterSelect>

          <div className="ml-auto flex items-center gap-3 shrink-0">
            {active && (
              <button
                onClick={reset}
                className="font-dm text-xs text-[#0E1116]/60 hover:text-[#F26A1F] underline underline-offset-4 transition-colors"
              >
                Clear
              </button>
            )}
            <FilterSelect
              value={sort}
              onChange={(v) => setSort(v as SortKey)}
            >
              <option value="featured">Featured</option>
              <option value="az">Title A → Z</option>
              <option value="za">Title Z → A</option>
              <option value="pieces-asc">Pieces: low → high</option>
              <option value="pieces-desc">Pieces: high → low</option>
            </FilterSelect>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {filtered.length === 0 ? (
          <div className="border-2 border-dashed border-[#0E1116]/15 rounded-2xl py-20 text-center">
            <p className="font-syne font-bold text-[#0E1116] text-2xl mb-2">No puzzles match those filters.</p>
            <p className="font-dm text-[#0E1116]/60 mb-6">Try clearing one of them and see what comes back.</p>
            <button
              onClick={reset}
              className="inline-flex items-center bg-[#0E1116] hover:bg-[#F26A1F] text-white font-semibold px-6 py-3 rounded-full transition-colors"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((p) => (
              <ShopCard
                key={p.slug}
                puzzle={p}
                onPreview={() =>
                  open({
                    slug: p.slug,
                    image: p.image,
                    title: p.title,
                    subtitle: p.subtitle,
                    collection: COLLECTION_LABEL[p.collection],
                    pieces: p.pieces,
                    packaging: p.packaging,
                    variants: p.variants,
                    material: p.material,
                    dimensions: p.dimensions,
                  })
                }
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function FilterSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none font-dm text-sm font-semibold text-[#0E1116] bg-white border border-[#0E1116]/15 rounded-full pl-4 pr-9 py-2 hover:border-[#0E1116]/40 focus:outline-none focus:ring-2 focus:ring-[#F26A1F]/40 cursor-pointer"
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0E1116]/50 text-xs">
        ▾
      </span>
    </div>
  );
}


function ShopCard({
  puzzle,
  onPreview,
}: {
  puzzle: Puzzle;
  onPreview: () => void;
}) {
  const { add: addToCart } = useCart();
  const defaultVariant: PuzzleVariant =
    puzzle.variants.find((v) => v.pieces === puzzle.pieces) ?? puzzle.variants[0];
  const [selectedPieces, setSelectedPieces] = useState<number>(defaultVariant.pieces);
  const selected: PuzzleVariant =
    puzzle.variants.find((v) => v.pieces === selectedPieces) ?? defaultVariant;
  const hasMultipleVariants = puzzle.variants.length > 1;
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(14,17,22,0.06)] hover:shadow-[0_22px_46px_-12px_rgba(14,17,22,0.22)] transition-all duration-300 hover:-translate-y-1">
      <button
        type="button"
        onClick={onPreview}
        aria-label={`Preview ${puzzle.title}`}
        className="relative block w-full aspect-square overflow-hidden bg-[#EDDDCC] cursor-zoom-in"
      >
        <Image
          src={puzzle.image}
          alt={puzzle.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white/95 text-[#0E1116] text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
          <Eye size={14} /> Preview
        </span>
        <span
          className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/95 text-[#0E1116] text-[10px] font-semibold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: COLLECTION_DOT[puzzle.collection] }}
          />
          {COLLECTION_LABEL[puzzle.collection]}
        </span>
      </button>

      <div className="p-5">
        <h3 className="font-syne font-bold text-[#0E1116] text-lg leading-snug">
          {puzzle.title}
        </h3>
        {puzzle.subtitle && (
          <p className="font-dm text-xs italic text-[#6A6A73] mt-0.5">
            {puzzle.subtitle}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2 font-dm text-xs text-[#6A6A73]">
          <span>{selected.pieces} pieces</span>
          {puzzle.material && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#0E1116]/25" />
              <span>{puzzle.material}</span>
            </>
          )}
          {puzzle.dimensions && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#0E1116]/25" />
              <span>{puzzle.dimensions}</span>
            </>
          )}
        </div>

        {hasMultipleVariants && (
          <div className="mt-3">
            <div className="font-dm text-[10px] uppercase tracking-[0.22em] text-[#0E1116]/55 mb-1.5">
              Piece count
            </div>
            <div className="flex flex-wrap gap-1.5">
              {puzzle.variants.map((v) => {
                const isActive = v.pieces === selected.pieces;
                return (
                  <button
                    key={v.pieces}
                    type="button"
                    onClick={() => setSelectedPieces(v.pieces)}
                    aria-pressed={isActive}
                    className={`font-dm text-[11px] font-semibold px-2.5 py-1.5 rounded-full border transition-colors ${
                      isActive
                        ? "bg-[#0E1116] text-white border-[#0E1116]"
                        : "bg-white text-[#0E1116] border-[#0E1116]/15 hover:border-[#0E1116]/45"
                    }`}
                  >
                    {v.pieces} pc · ${v.price.toFixed(2)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#0E1116]/10">
          <span className="font-syne font-extrabold text-[#0E1116] text-xl">
            ${selected.price.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={() =>
              addToCart({
                slug: puzzle.slug,
                title: puzzle.title,
                subtitle: puzzle.subtitle,
                image: puzzle.image,
                collection: COLLECTION_LABEL[puzzle.collection],
                pieces: selected.pieces,
                price: selected.price,
                material: puzzle.material,
                dimensions: puzzle.dimensions,
              })
            }
            aria-label={`Add ${puzzle.title} (${selected.pieces} pc) to cart`}
            className="inline-flex items-center gap-1.5 bg-[#F26A1F] hover:bg-[#E05A10] text-white font-semibold text-xs px-3.5 py-2 rounded-full transition-colors"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
