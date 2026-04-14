import Navbar from "@/components/nav/Navbar";
import CollectionSellThrough from "@/components/shop/CollectionSellThrough";
import { kiaPuzzles } from "@/data/puzzles";

export default function KiaCollectionPage() {
  const hero = kiaPuzzles[0];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0c0c10] text-white">
        <section className="relative w-full h-[55vh] min-h-[420px] max-h-[560px] pt-[72px] overflow-hidden">
          <video
            src="/Videos/kia-hero.mp4"
            poster={hero.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
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
            Kevin Kia
          </div>
          <div
            className="absolute left-0 right-0 text-center font-dm uppercase text-white/85"
            style={{
              top: "calc(38% + clamp(2.5rem, 7vw, 5.5rem) + 0.75rem)",
              fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
              letterSpacing: "0.35em",
            }}
          >
            Controlled Light, Deliberate Composition, Room to Read
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(12,12,16,0) 0%, rgba(12,12,16,0.75) 55%, #0c0c10 100%)",
            }}
          />
        </section>

        <CollectionSellThrough
          puzzles={kiaPuzzles}
          theme="kia"
          palette={{
            bg: "#0c0c10",
            bgAlt: "#131317",
            panel: "#1a1a20",
            border: "rgba(255,255,255,0.14)",
            accent: "#ffffff",
            kicker: "rgba(212,212,216,0.9)",
            muted: "rgba(163,163,170,0.85)",
            text: "#fafafa",
            ctaBg: "#ffffff",
            ctaText: "#0c0c10",
          }}
          featuredKicker="Studio pick"
          featuredDescription="A controlled-light studio work — deep blacks held without gloss, printed on matte stock chosen specifically for Kia's tonal range."
          featuredBullets={[
            "2.4mm premium blue chipboard, warp-resistant",
            "Matte stock engineered for deep-black retention, zero glare",
            "Minimalist keepsake box — black foil stamp on raw board",
          ]}
        />
      </main>
    </>
  );
}
