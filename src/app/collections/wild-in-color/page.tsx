import Navbar from "@/components/nav/Navbar";
import CollectionSellThrough from "@/components/shop/CollectionSellThrough";
import { wildInColorPuzzles } from "@/data/puzzles";

export default function WildInColorCollectionPage() {
  const hero = wildInColorPuzzles[0];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0e1416] text-white">
        <section className="relative w-full h-[55vh] min-h-[420px] max-h-[560px] pt-[72px] overflow-hidden">
          <video
            src="/Videos/wild-in-color-hero.mp4"
            poster={hero.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "50% 15%" }}
          />
          <div className="absolute inset-0 bg-black/45" />

          <div
            className="absolute left-0 right-0 text-center text-white font-syne font-bold uppercase"
            style={{
              top: "38%",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "0.1em",
              textShadow: "0 0 40px rgba(0,0,0,0.6)",
            }}
          >
            Wild in Color
          </div>
          <div
            className="absolute left-0 right-0 text-center font-dm uppercase"
            style={{
              top: "calc(38% + clamp(2.5rem, 7vw, 5.5rem) + 0.75rem)",
              fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
              letterSpacing: "0.35em",
              color: "#67e8f9",
            }}
          >
            Saturation, Chroma, Pigment, Joy
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(14,20,22,0) 0%, rgba(14,20,22,0.75) 55%, #0e1416 100%)",
            }}
          />
        </section>

        <CollectionSellThrough
          puzzles={wildInColorPuzzles}
          theme="wild-in-color"
          palette={{
            bg: "#0e1416",
            bgAlt: "#10191e",
            panel: "#162026",
            border: "rgba(244,114,182,0.28)",
            accent: "#f472b6",
            kicker: "#67e8f9",
            muted: "rgba(186,230,253,0.7)",
            text: "#ecfeff",
            ctaBg: "#f472b6",
            ctaText: "#0e1416",
          }}
          featuredKicker="Partner pick"
          featuredDescription="Saturation turned up — a high-chroma nature study printed on warm-white stock so the color sits forward and hits from across the room."
          featuredBullets={[
            "2.4mm premium blue chipboard, warp-resistant",
            "High-chroma inks on warm-white stock — color sits forward",
            "Keepsake box co-designed with Wild in Color, numbered in series",
          ]}
          giftHeadline="Gift the loudest puzzle on the shelf"
          giftBody="Wild in Color prints land instantly — bold, joyful, and impossible to ignore. Perfect for a birthday, a move, a good reason."
        />
      </main>
    </>
  );
}
