"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { usePuzzlePreview } from "@/components/preview/PuzzlePreviewProvider";

type Card = {
  id: string;
  title: string;
  collection: string;
  href: string;
  image: string;
  pieces: string;
};

// Hand-curated alternation across collections for visual rhythm.
const CARDS: Card[] = [
  { id: "lion",       title: "African Lion",     collection: "Ron Magill",    href: "/collections/ron-magill",    image: "/puzzles/ron-magill/lion.jpeg",              pieces: "500 pieces" },
  { id: "wic-tigers", title: "Tigers",           collection: "Wild in Color", href: "/collections/wild-in-color", image: "/puzzles/wild-in-color/Wild in Color_tigers_100 pieces_13_25x16_56in.jpg", pieces: "500 pieces" },
  { id: "cherp-rp",   title: "Red Panda",        collection: "Cherp Studio",  href: "/collections/cherp-studio",  image: "/puzzles/cherp-studio/CherpStudio_RedPanda_19_25x26_625in.jpg",            pieces: "500 pieces" },
  { id: "elephant",   title: "African Elephant", collection: "Ron Magill",    href: "/collections/ron-magill",    image: "/puzzles/ron-magill/elephant.jpeg",                                        pieces: "500 pieces" },
  { id: "wic-axo",    title: "Axolotl",          collection: "Wild in Color", href: "/collections/wild-in-color", image: "/puzzles/wild-in-color/Wild in Color_Axelotl_100 pieces_13_25x16_56in.jpg", pieces: "500 pieces" },
  { id: "panda",      title: "Giant Panda",      collection: "Ron Magill",    href: "/collections/ron-magill",    image: "/puzzles/ron-magill/giant-panda.jpeg",                                     pieces: "500 pieces" },
  { id: "cherp-tig",  title: "Tiger (Wood)",     collection: "Cherp Studio",  href: "/collections/cherp-studio",  image: "/puzzles/cherp-studio/CherpStudio_WOOD_Tiger_12x12in_REV.jpg",             pieces: "48 pieces · wood" },
  { id: "leopard",    title: "African Leopard",  collection: "Ron Magill",    href: "/collections/ron-magill",    image: "/puzzles/ron-magill/leopard.jpeg",           pieces: "500 pieces" },
];

export default function PuzzleCards() {
  const { open } = usePuzzlePreview();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 32 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step * 1.5, behavior: "smooth" });
  };

  return (
    <section className="bg-[#FBEADB] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="font-dm text-[11px] md:text-sm tracking-[0.28em] uppercase text-[#B7541F]">
              The Collection
            </span>
            <h2
              className="font-syne font-extrabold text-[#0E1116] tracking-[-0.025em] mt-2"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1 }}
            >
              Pieces worth slowing down for.
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/collections"
              className="font-dm text-sm font-semibold text-[#0E1116] border-b-2 border-[#0E1116] pb-0.5 hover:text-[#F26A1F] hover:border-[#F26A1F] transition-colors"
            >
              See every collection →
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={!canLeft}
                aria-label="Scroll left"
                className="w-11 h-11 rounded-full border-2 border-[#0E1116] text-[#0E1116] flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#0E1116] hover:text-[#FBEADB] transition"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={!canRight}
                aria-label="Scroll right"
                className="w-11 h-11 rounded-full border-2 border-[#0E1116] text-[#0E1116] flex items-center justify-center disabled:opacity-25 disabled:cursor-not-allowed hover:bg-[#0E1116] hover:text-[#FBEADB] transition"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-clip">
        <div
          ref={scrollerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 puzzle-scroller"
          style={{
            paddingLeft: "max(1rem, calc((100% - 80rem) / 2 + 1.5rem))",
            paddingRight: "max(1rem, calc((100% - 80rem) / 2 + 1.5rem))",
          }}
        >
          {CARDS.map((card) => (
            <button
              key={card.id}
              data-card
              onClick={() =>
                open({
                  image: card.image,
                  title: card.title,
                  collection: card.collection,
                  pieces: card.pieces,
                })
              }
              className="group relative text-left bg-white rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-shadow focus:outline-none focus:ring-2 focus:ring-[#F26A1F] focus:ring-offset-2 focus:ring-offset-[#FBEADB] shrink-0 w-[78vw] sm:w-[340px] md:w-[380px] snap-start"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#EDDDCC]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 78vw, 380px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white/95 text-[#0E1116] text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  <Eye size={14} /> Preview
                </span>
              </div>
              <div className="p-5">
                <div className="font-dm text-[11px] tracking-[0.22em] uppercase text-[#B7541F] mb-1.5">
                  {card.collection}
                </div>
                <div className="font-syne font-bold text-[#0E1116] text-lg leading-snug">
                  {card.title}
                </div>
                <div className="font-dm text-sm text-[#6A6A73] mt-1">{card.pieces}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .puzzle-scroller::-webkit-scrollbar { display: none; }
        .puzzle-scroller { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
