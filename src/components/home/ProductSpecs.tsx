import Image from "next/image";
import Link from "next/link";
import { Box, Ruler, Grid3x3, Layers } from "lucide-react";

const specs = [
  { icon: Box, label: "Format", value: "500 piece · cardboard" },
  { icon: Ruler, label: "Finished", value: "20\" × 14\"" },
  { icon: Grid3x3, label: "Also available", value: "48 piece · wood 12\" × 12\"" },
  { icon: Layers, label: "Material", value: "Premium chipboard & solid wood" },
];

export default function ProductSpecs() {
  return (
    <section className="relative py-24 md:py-32 px-4 bg-[#F4DDC5]">
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-[#0E1116]/10 shadow-[0_30px_60px_-15px_rgba(14,17,22,0.25)]">
          <Image
            src="/puzzles/ron-magill/lion.jpeg"
            alt="Ron Magill, African Lion"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1116]/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <div>
              <p className="font-dm text-[11px] uppercase tracking-[0.28em] text-white/80">
                Featured
              </p>
              <p className="font-syne font-bold text-white text-xl mt-1">
                Ron Magill, 500 piece
              </p>
            </div>
            <span className="font-syne font-bold text-2xl text-white">$24.99</span>
          </div>
        </div>

        <div>
          <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#B7541F] mb-4">
            Specifications
          </p>
          <h2
            className="font-syne font-extrabold text-[#0E1116] tracking-[-0.025em] mb-6"
            style={{ fontSize: "clamp(36px, 4.5vw, 58px)", lineHeight: 1.05 }}
          >
            Two formats. Built to handle.
          </h2>
          <p className="font-dm text-lg text-[#55555E] leading-relaxed mb-10 max-w-lg">
            Ron Magill&apos;s wildlife portraits come as 500-piece chipboard
            puzzles. Cherp Studio and Wild in Color ship as 48-piece solid-wood
            puzzles. 12&quot; × 12&quot;, edge-sealed and built to last.
          </p>

          <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-6 mb-10 pb-10 border-b border-[#0E1116]/15">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="text-[#F26A1F] mt-0.5 shrink-0" size={18} strokeWidth={1.5} />
                <div>
                  <p className="font-dm text-[10px] uppercase tracking-[0.22em] text-[#6A6A73] mb-1">
                    {label}
                  </p>
                  <p className="font-syne font-bold text-[#0E1116]">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 text-sm font-dm">
            <div>
              <p className="text-[#B7541F] font-bold uppercase tracking-[0.22em] text-[11px] mb-2">
                Safety
              </p>
              <p className="text-[#55555E] leading-relaxed">
                Wood puzzles suitable for age 3+. Cardboard puzzles age 14+ (contains small parts).
              </p>
            </div>
            <div>
              <p className="text-[#B7541F] font-bold uppercase tracking-[0.22em] text-[11px] mb-2">
                Ordering
              </p>
              <p className="text-[#55555E] leading-relaxed">
                Enter your shipping address at checkout for accurate delivery.
              </p>
            </div>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold px-8 py-4 rounded-md shadow-[0_10px_30px_-5px_rgba(242,106,31,0.35)] transition"
          >
            Shop all puzzles
          </Link>
        </div>
      </div>
    </section>
  );
}
