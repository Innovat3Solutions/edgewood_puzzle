import { Star, Quote } from "lucide-react";
import MobileCarousel from "@/components/ui/MobileCarousel";

const quotes = [
  {
    body:
      "The fit is unreal. Every piece drops in with a click. You can feel the difference the moment you open the box.",
    name: "Marguerite D.",
    role: "1,000-piece Space",
  },
  {
    body:
      "A gorgeous object before you even start. The Ron Magill box is already on my shelf, face out.",
    name: "Ben O.",
    role: "Ron Magill signature",
  },
  {
    body:
      "Finished the Butterfly collection over a long weekend with my kids. Looks framed-worthy.",
    name: "Priya S.",
    role: "Butterfly",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-28 px-4 bg-[#FBEADB]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <div>
            <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#B7541F] mb-4">
              Puzzler Notes
            </p>
            <h2
              className="font-syne font-extrabold text-[#0E1116] tracking-[-0.025em]"
              style={{ fontSize: "clamp(36px, 4.5vw, 56px)", lineHeight: 1.05 }}
            >
              The tables where our
              <br />
              puzzles get finished.
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="fill-[#F26A1F] text-[#F26A1F]"
              />
            ))}
            <span className="font-dm text-sm text-[#55555E] ml-2">
              4.9 average across collections
            </span>
          </div>
        </div>

        <MobileCarousel
          items={quotes}
          keyOf={(q) => q.name}
          desktopClassName="hidden md:grid md:grid-cols-3 md:gap-6"
          render={(q) => (
            <figure
              className="relative h-full p-8 rounded-2xl bg-white border border-[#0E1116]/10 hover:border-[#F26A1F]/50 shadow-[0_4px_16px_rgba(14,17,22,0.06)] hover:shadow-[0_20px_40px_rgba(14,17,22,0.12)] transition"
            >
              <Quote
                className="text-[#F26A1F]/30 absolute top-6 right-6"
                size={32}
                strokeWidth={1.5}
              />
              <blockquote className="font-dm text-[#0E1116]/90 leading-[1.7] text-lg mb-6">
                {q.body}
              </blockquote>
              <figcaption className="pt-6 border-t border-[#0E1116]/10">
                <p className="font-syne font-bold text-[#0E1116]">{q.name}</p>
                <p className="font-dm text-xs uppercase tracking-widest text-[#6A6A73] mt-1">
                  {q.role}
                </p>
              </figcaption>
            </figure>
          )}
        />
      </div>
    </section>
  );
}
