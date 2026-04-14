import Navbar from "@/components/nav/Navbar";
import Link from "next/link";
import Image from "next/image";
import {
  spacePuzzles,
  ronMagillPuzzles,
  butterflyPuzzles,
  gregoryLaysakPuzzles,
  kiaPuzzles,
  wildInColorPuzzles,
} from "@/data/puzzles";

type Tile = {
  href: string;
  cover: string;
  eyebrow: string;
  eyebrowClass: string;
  title: string;
  titleClass: string;
  scrim: string;
  border: string;
};

const tiles: Tile[] = [
  {
    href: "/collections/space",
    cover: spacePuzzles[0].image,
    eyebrow: `${spacePuzzles.length} puzzles`,
    eyebrowClass: "text-teal",
    title: "Space",
    titleClass: "text-gold",
    scrim: "from-navy via-navy/40 to-transparent",
    border: "border-border-gold hover:border-gold",
  },
  {
    href: "/collections/ron-magill",
    cover: (ronMagillPuzzles.find((p) => p.slug === "ron-lion") ?? ronMagillPuzzles[0]).image,
    eyebrow: `Signature · ${ronMagillPuzzles.length} puzzles`,
    eyebrowClass: "text-amber-300",
    title: "Ron Magill",
    titleClass: "text-amber-200",
    scrim: "from-[#0e1a12] via-[#0e1a12]/40 to-transparent",
    border: "border-border-gold hover:border-amber-300",
  },
  {
    href: "/collections/butterfly",
    cover: butterflyPuzzles[0].image,
    eyebrow: `${butterflyPuzzles.length} puzzles`,
    eyebrowClass: "text-fuchsia-300",
    title: "Butterfly",
    titleClass: "text-fuchsia-200",
    scrim: "from-[#1a0f1e] via-[#1a0f1e]/40 to-transparent",
    border: "border-border-gold hover:border-fuchsia-300",
  },
  {
    href: "/collections/gregory-laysak",
    cover: gregoryLaysakPuzzles[0].image,
    eyebrow: `Landscape · ${gregoryLaysakPuzzles.length} puzzles`,
    eyebrowClass: "text-orange-300",
    title: "Gregory Laysak",
    titleClass: "text-amber-200",
    scrim: "from-[#1a140d] via-[#1a140d]/40 to-transparent",
    border: "border-border-gold hover:border-orange-300",
  },
  {
    href: "/collections/kia",
    cover: kiaPuzzles[0].image,
    eyebrow: `Studio · ${kiaPuzzles.length} puzzles`,
    eyebrowClass: "text-neutral-300",
    title: "Kevin Kia",
    titleClass: "text-white",
    scrim: "from-[#0c0c10] via-[#0c0c10]/40 to-transparent",
    border: "border-white/20 hover:border-white/60",
  },
  {
    href: "/collections/wild-in-color",
    cover: wildInColorPuzzles[0].image,
    eyebrow: `Partner · ${wildInColorPuzzles.length} puzzles`,
    eyebrowClass: "text-cyan-300",
    title: "Wild in Color",
    titleClass: "text-pink-200",
    scrim: "from-[#0e1416] via-[#0e1416]/40 to-transparent",
    border: "border-border-gold hover:border-pink-300",
  },
];

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-navy text-white px-4">
        <div className="max-w-7xl mx-auto py-12">
          <h1 className="font-syne font-bold text-4xl mb-4 text-gold">Collections Hub</h1>
          <p className="font-dm text-muted mb-10">Browse all theme collections.</p>

          {/* Mobile: horizontal carousel */}
          <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {tiles.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={`group relative block shrink-0 snap-start w-[78%] aspect-[4/5] overflow-hidden rounded-lg border transition ${t.border}`}
              >
                <Image
                  src={t.cover}
                  alt={`${t.title} collection`}
                  fill
                  sizes="78vw"
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${t.scrim}`} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className={`font-dm text-xs uppercase tracking-[0.2em] mb-1 ${t.eyebrowClass}`}>
                    {t.eyebrow}
                  </p>
                  <h2 className={`font-syne font-bold text-2xl ${t.titleClass}`}>{t.title}</h2>
                </div>
              </Link>
            ))}
          </div>

          {/* md+ : grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {tiles.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={`group relative block aspect-[4/5] overflow-hidden rounded-lg border transition ${t.border}`}
              >
                <Image
                  src={t.cover}
                  alt={`${t.title} collection`}
                  fill
                  sizes="33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${t.scrim}`} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className={`font-dm text-xs uppercase tracking-[0.2em] mb-1 ${t.eyebrowClass}`}>
                    {t.eyebrow}
                  </p>
                  <h2 className={`font-syne font-bold text-3xl ${t.titleClass}`}>{t.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
