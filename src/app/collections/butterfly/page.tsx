import Navbar from "@/components/nav/Navbar";
import CollectionSellThrough from "@/components/shop/CollectionSellThrough";
import { butterflyPuzzles } from "@/data/puzzles";

export default function ButterflyCollectionPage() {
  const hero = butterflyPuzzles[0];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#1a0f1e] text-white">
        <section className="relative w-full h-[55vh] min-h-[420px] max-h-[560px] pt-[72px] overflow-hidden">
          <video
            src="/Videos/butterfly-hero.mp4"
            poster={hero.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "50% 28%" }}
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
            Butterfly
          </div>
          <div
            className="absolute left-0 right-0 text-center font-dm uppercase"
            style={{
              top: "calc(38% + clamp(2.5rem, 7vw, 5.5rem) + 0.75rem)",
              fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
              letterSpacing: "0.35em",
              color: "#e879f9",
            }}
          >
            Iridescent Wings, Structural Color, Pigment, Shimmer
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(26,15,30,0) 0%, rgba(26,15,30,0.75) 55%, #1a0f1e 100%)",
            }}
          />
        </section>

        <CollectionSellThrough
          puzzles={butterflyPuzzles}
          theme="butterfly"
          palette={{
            bg: "#1a0f1e",
            bgAlt: "#23122a",
            panel: "#2a1733",
            border: "rgba(232,121,249,0.25)",
            accent: "#e879f9",
            kicker: "#c4b5fd",
            muted: "rgba(221,214,254,0.7)",
            text: "#fbcfe8",
            ctaBg: "#e879f9",
            ctaText: "#1a0f1e",
          }}
          featuredKicker="Curator's pick"
          featuredDescription="A macro-lensed study that preserves every wing scale — iridescent shifts that change as the light moves across the finished piece."
          featuredBullets={[
            "2.4mm premium blue chipboard, warp-resistant",
            "Macro-print detail on warm-matte stock — wing scales resolve at arm's length",
            "Linen-wrapped keepsake box with species card and magnet closure",
          ]}
        />
      </main>
    </>
  );
}
