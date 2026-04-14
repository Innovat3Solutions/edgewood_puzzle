import Navbar from "@/components/nav/Navbar";
import CollectionSellThrough from "@/components/shop/CollectionSellThrough";
import { gregoryLaysakPuzzles } from "@/data/puzzles";

// Palette extracted from the hero painting — teal water, sunset orange,
// golden suns, deep navy shadows, warm cream highlights.
const PALETTE = {
  bg: "#081624",
  bgAlt: "#0F2537",
  panel: "#163248",
  border: "rgba(242,122,46,0.28)",
  accent: "#F27A2E",
  kicker: "#FFB347",
  muted: "rgba(255,232,204,0.65)",
  text: "#FFE8CC",
  ctaBg: "#F27A2E",
  ctaText: "#081624",
};

export default function GregoryLaysakCollectionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen text-[#FFE8CC]" style={{ background: PALETTE.bg }}>
        <section className="relative w-full h-[55vh] min-h-[420px] max-h-[560px] pt-[72px] overflow-hidden">
          <video
            src="/Videos/gregory-laysak-hero.mp4"
            poster="/puzzles/gregory-laysak/hero.jpeg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "50% 68%" }}
          />
          <div className="absolute inset-0 bg-black/40" />

          <div
            className="absolute left-0 right-0 text-center font-syne font-bold uppercase"
            style={{
              top: "38%",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "0.1em",
              textShadow: "0 0 40px rgba(0,0,0,0.6)",
              color: "#FFE8CC",
            }}
          >
            Gregory Laysak
          </div>
          <div
            className="absolute left-0 right-0 text-center font-dm uppercase"
            style={{
              top: "calc(38% + clamp(2.5rem, 7vw, 5.5rem) + 0.75rem)",
              fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
              letterSpacing: "0.35em",
              color: PALETTE.accent,
            }}
          >
            Long Drives, Patient Light, Oil, Gradient
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(8,22,36,0) 0%, rgba(8,22,36,0.75) 55%, #081624 100%)",
            }}
          />
        </section>

        <CollectionSellThrough
          puzzles={gregoryLaysakPuzzles}
          theme="laysak"
          palette={PALETTE}
          featuredKicker="Curator's pick"
          featuredDescription="A patient landscape chosen for the way it rebuilds under your hands — skies that settle last, rock that locks in first."
          featuredBullets={[
            "2.4mm premium blue chipboard, warp-resistant",
            "Tone-calibrated matte print — sky gradients hold without banding",
            "Keepsake box with location notes and shooting conditions inside",
          ]}
        />
      </main>
    </>
  );
}
