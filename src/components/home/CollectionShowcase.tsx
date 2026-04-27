import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  ronMagillPuzzles,
  cherpStudioPuzzles,
  wildInColorPuzzles,
} from "@/data/puzzles";

type Tile = {
  href: string;
  cover: string;
  eyebrow: string;
  title: string;
  blurb: string;
  count: number;
  area: string;
};

const tiles: Tile[] = [
  {
    href: "/collections/ron-magill",
    cover:
      (ronMagillPuzzles.find((p) => p.slug === "ron-lion") ?? ronMagillPuzzles[0]).image,
    eyebrow: "Signature · 500 piece",
    title: "Ron Magill",
    blurb: "Four decades of wildlife photography, signed at the box.",
    count: ronMagillPuzzles.length,
    area: "md:col-span-2 md:row-span-2",
  },
  {
    href: "/collections/cherp-studio",
    cover: cherpStudioPuzzles[0].image,
    eyebrow: 'Wood · 48 piece · 12"',
    title: "Cherp Studio",
    blurb: "Hand-finished wood puzzles, built to handle and keep.",
    count: cherpStudioPuzzles.length,
    area: "md:col-span-2",
  },
  {
    href: "/collections/wild-in-color",
    cover: wildInColorPuzzles[0].image,
    eyebrow: 'Wood · 48 piece · 12"',
    title: "Wild in Color",
    blurb: "Saturation turned up. Nature at full chroma, on solid wood.",
    count: wildInColorPuzzles.length,
    area: "md:col-span-2",
  },
];

export default function CollectionShowcase() {
  return (
    <section className="relative py-24 md:py-32 px-4 bg-[#FBEADB]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#B7541F] mb-4">
              Three worlds in a box
            </p>
            <h2
              className="font-syne font-extrabold text-[#0E1116] tracking-[-0.025em]"
              style={{ fontSize: "clamp(40px, 5.2vw, 72px)", lineHeight: 1 }}
            >
              Each collection,
              <br />
              its own atmosphere.
            </h2>
          </div>
          <p className="font-dm text-lg text-[#55555E] md:max-w-sm leading-relaxed">
            Signature wildlife from Ron Magill, plus wood 48-piece puzzles from
            Cherp Studio and Wild in Color. Built to handle, built to keep.
          </p>
        </div>

        {/* Mobile: horizontal snap carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {tiles.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group relative block shrink-0 snap-start w-[80%] h-[340px] rounded-2xl overflow-hidden ring-1 ring-[#0E1116]/10 shadow-[0_4px_16px_rgba(14,17,22,0.06)]"
            >
              <Image
                src={t.cover}
                alt={t.title}
                fill
                sizes="80vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(14,17,22,0) 35%, rgba(14,17,22,0.35) 65%, rgba(14,17,22,0.88) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="font-dm text-[11px] tracking-[0.28em] uppercase mb-2 text-white/85">
                  {t.eyebrow} · {t.count} puzzles
                </div>
                <h3 className="font-syne font-bold text-2xl text-white leading-tight">
                  {t.title}
                </h3>
                <p className="font-dm text-sm text-white/80 mt-2 line-clamp-2">{t.blurb}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* md+ : bento grid */}
        <div className="hidden md:grid md:grid-cols-4 md:auto-rows-[280px] md:gap-5">
          {tiles.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`group relative block rounded-2xl overflow-hidden ring-1 ring-[#0E1116]/10 hover:ring-[#0E1116]/40 transition shadow-[0_4px_16px_rgba(14,17,22,0.06)] hover:shadow-[0_24px_48px_rgba(14,17,22,0.18)] ${t.area}`}
            >
              <Image
                src={t.cover}
                alt={t.title}
                fill
                sizes="50vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(14,17,22,0) 35%, rgba(14,17,22,0.35) 65%, rgba(14,17,22,0.88) 100%)",
                }}
              />

              <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/95 flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                <ArrowUpRight size={18} className="text-[#0E1116]" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <div className="font-dm text-[11px] tracking-[0.28em] uppercase mb-2 text-white/85">
                  {t.eyebrow} · {t.count} puzzles
                </div>
                <h3 className="font-syne font-bold text-2xl md:text-3xl text-white leading-tight">
                  {t.title}
                </h3>
                <p className="font-dm text-sm text-white/80 mt-2 max-w-sm line-clamp-2">
                  {t.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 font-dm text-sm font-semibold tracking-wide uppercase text-[#0E1116] border-2 border-[#0E1116] rounded-full px-7 py-3 hover:bg-[#0E1116] hover:text-[#FBEADB] transition"
          >
            Explore every collection <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
