"use client";

import Image from "next/image";
import { vendors } from "@/data/vendors";

export default function VendorCarousel() {
  const loop = [...vendors, ...vendors, ...vendors];
  return (
    <section className="py-20 px-4 bg-[#F4DDC5] overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#B7541F] mb-3">
          Proudly partnered with
        </p>
        <h2 className="font-syne font-bold text-3xl md:text-4xl text-[#0E1116]">
          Artists &amp; studios we work with
        </h2>
      </div>

      <div className="relative">
        <div className="flex gap-6 animate-marquee w-max py-4">
          {loop.map((v, i) => (
            <figure
              key={`${v.slug}-${i}`}
              className="shrink-0 w-60 group"
            >
              <div className="relative h-40 rounded-xl overflow-hidden ring-1 ring-[#0E1116]/10 group-hover:ring-[#0E1116]/40 transition bg-white shadow-[0_4px_16px_rgba(14,17,22,0.06)]">
                <div className="relative w-full h-full flex items-center justify-center p-6">
                  <Image
                    src={v.image}
                    alt={v.name}
                    width={220}
                    height={120}
                    className="max-h-full w-auto object-contain"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-center font-dm text-sm text-[#55555E] group-hover:text-[#0E1116] transition">
                {v.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
