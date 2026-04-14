import { Sparkles, Leaf, ShieldCheck, Scissors } from "lucide-react";
import MobileCarousel from "@/components/ui/MobileCarousel";

const features = [
  {
    n: "01",
    icon: Scissors,
    title: "Made in the USA",
    body: "Pressed, cut, and boxed in Lafayette, Indiana by our partner Ludo Fact USA.",
  },
  {
    n: "02",
    icon: Sparkles,
    title: "Precision Interlock",
    body: ".008 puzzle board with a matte finish — every piece seats with a reassuring click.",
  },
  {
    n: "03",
    icon: Leaf,
    title: "ClimatePartner Certified",
    body: "Every box funds verified climate protection projects. Finish the puzzle, leave a mark.",
  },
  {
    n: "04",
    icon: ShieldCheck,
    title: "Built for Serious Puzzlers",
    body: "Rated 14+. Designed for quiet evenings, long weekends, and the people who finish what they start.",
  },
];

export default function FeatureHighlights() {
  return (
    <section className="relative py-24 md:py-32 px-4 bg-[#FBEADB] border-t border-[#0E1116]/10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16">
          <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#B7541F] mb-4">
            Why Edgewood
          </p>
          <h2
            className="font-syne font-extrabold text-[#0E1116] tracking-[-0.025em]"
            style={{ fontSize: "clamp(36px, 4.5vw, 60px)", lineHeight: 1.05 }}
          >
            Small details that earn their place on your table.
          </h2>
        </div>

        <MobileCarousel
          items={features}
          keyOf={(f) => f.title}
          desktopClassName="hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-px md:bg-[#0E1116]/10 md:rounded-2xl md:overflow-hidden md:border md:border-[#0E1116]/10"
          render={({ n, icon: Icon, title, body }) => (
            <div className="group relative h-full p-8 rounded-2xl md:rounded-none border border-[#0E1116]/10 md:border-0 bg-[#FBEADB] hover:bg-white transition-colors">
              <div className="flex items-start justify-between mb-10">
                <span className="font-syne font-bold text-[#0E1116]/30 text-sm tracking-widest">
                  {n}
                </span>
                <Icon
                  className="text-[#F26A1F] group-hover:scale-110 transition-transform"
                  size={22}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-syne font-bold text-xl text-[#0E1116] mb-3 leading-tight">
                {title}
              </h3>
              <p className="font-dm text-sm text-[#55555E] leading-relaxed">{body}</p>
            </div>
          )}
        />
      </div>
    </section>
  );
}
