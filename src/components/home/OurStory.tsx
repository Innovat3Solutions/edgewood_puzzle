import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";

const stats = [
  { value: "100%", label: "American made" },
  { value: "6", label: "Artist collections" },
  { value: ".008\"", label: "Board thickness" },
  { value: "14+", label: "Serious puzzlers" },
];

export default function OurStory() {
  return (
    <section className="relative py-24 md:py-32 px-4 bg-[#FBEADB]">
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 lg:gap-20 items-center">
        <div className="relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-[#0E1116]/10 shadow-[0_30px_60px_-15px_rgba(14,17,22,0.25)]">
            <Image
              src="/puzzles/ron-magill/lion.jpeg"
              alt="Wildlife photography from the Ron Magill collection"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden md:block w-40 aspect-square rounded-2xl overflow-hidden ring-4 ring-[#FBEADB] shadow-[0_20px_40px_rgba(14,17,22,0.25)]">
            <Image
              src="/puzzles/butterfly/butterfly-3.jpeg"
              alt="Butterfly collection detail"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#B7541F] mb-4">
            Our Story
          </p>
          <h2
            className="font-syne font-extrabold text-[#0E1116] tracking-[-0.025em] mb-8"
            style={{ fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 1.02 }}
          >
            Craftsmanship,
            <br />
            <span className="text-[#F26A1F]">brought home.</span>
          </h2>

          <div className="font-dm text-lg text-[#55555E] leading-[1.75] space-y-5 mb-10 max-w-xl">
            <p>
              Edgewood Puzzle is dedicated to bringing high-quality craftsmanship
              back to the United States. Our products are proudly produced in
              Lafayette, Indiana, through our manufacturing partner Ludo Fact USA.
            </p>
            <p>
              A great puzzle is more than an image — it&apos;s a tactile
              experience that demands precision, durability, and a perfect
              interlock. That&apos;s what we&apos;ve set out to make.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-dm text-[#55555E] mb-10">
            <MapPin size={16} className="text-[#F26A1F]" />
            <span>Lafayette, Indiana · Ludo Fact USA LLC</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pt-10 border-t border-[#0E1116]/15">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-syne font-extrabold text-3xl text-[#0E1116] mb-1">
                  {s.value}
                </p>
                <p className="font-dm text-xs uppercase tracking-widest text-[#6A6A73]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/story"
            className="inline-flex items-center gap-2 font-dm font-bold text-[#0E1116] hover:text-[#F26A1F] transition border-b-2 border-[#0E1116] hover:border-[#F26A1F] pb-1"
          >
            Read the full story <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
