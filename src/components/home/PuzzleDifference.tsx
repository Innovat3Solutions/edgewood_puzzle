import { Truck, ShieldCheck, Award, Heart } from "lucide-react";

const ITEMS = [
  {
    icon: Award,
    title: "American-made craft",
    body: "Printed, cut, and packed in Lafayette, Indiana. Never overseas.",
  },
  {
    icon: ShieldCheck,
    title: "Premium materials",
    body: "Museum-grade chipboard and solid hardwood, finished to last.",
  },
  {
    icon: Truck,
    title: "Most orders ship in 3 days",
    body: "Carbon-neutral shipping on every order over $35.",
  },
  {
    icon: Heart,
    title: "30-day happiness guarantee",
    body: "Unopened returns within 30 days, no questions asked.",
  },
];

export default function PuzzleDifference() {
  return (
    <section className="bg-[#FAF7F2] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="font-dm text-xs md:text-sm tracking-[0.22em] uppercase text-[#B7541F] mb-3">
            The Edgewood difference
          </p>
          <h2
            className="font-syne font-extrabold text-[#0E1116] tracking-[-0.02em]"
            style={{ fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1.1 }}
          >
            Built for the table, made to keep.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map((it) => (
            <div
              key={it.title}
              className="bg-white rounded-xl border border-[#0E1116]/8 p-6 text-center hover:shadow-[0_12px_32px_-12px_rgba(14,17,22,0.18)] transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF1E6] text-[#F26A1F] mb-4">
                <it.icon size={22} />
              </div>
              <h3 className="font-syne font-bold text-[#0E1116] text-lg mb-2">
                {it.title}
              </h3>
              <p className="font-dm text-sm text-[#55555E] leading-relaxed">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
