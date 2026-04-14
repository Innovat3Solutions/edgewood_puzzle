import Navbar from "@/components/nav/Navbar";
import CollectionSellThrough from "@/components/shop/CollectionSellThrough";
import { ronMagillPuzzles } from "@/data/puzzles";

export default function RonMagillCollectionPage() {
  const hero = ronMagillPuzzles.find((p) => p.slug === "ron-lion") ?? ronMagillPuzzles[0];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0e1a12] text-white">
        <section className="relative w-full h-[55vh] min-h-[420px] max-h-[560px] pt-[72px] overflow-hidden">
          <video
            src="/Videos/ron-magill-hero.mp4"
            poster={hero.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "50% 18%" }}
          />
          <div className="absolute inset-0 bg-black/40" />

          <div
            className="absolute left-0 right-0 text-center text-white font-syne font-bold uppercase"
            style={{
              top: "38%",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "0.1em",
              textShadow: "0 0 40px rgba(0,0,0,0.6)",
            }}
          >
            Ron Magill
          </div>
          <div
            className="absolute left-0 right-0 text-center font-dm uppercase"
            style={{
              top: "calc(38% + clamp(2.5rem, 7vw, 5.5rem) + 0.75rem)",
              fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
              letterSpacing: "0.35em",
              color: "#fbbf24",
            }}
          >
            Field Portraits, Wild, Unposed, Alive
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(14,26,18,0) 0%, rgba(14,26,18,0.75) 55%, #0e1a12 100%)",
            }}
          />
        </section>

        <CollectionSellThrough
          puzzles={ronMagillPuzzles}
          theme="ron-magill"
          palette={{
            bg: "#0e1a12",
            bgAlt: "#132418",
            panel: "#15221a",
            border: "rgba(251,191,36,0.22)",
            accent: "#fbbf24",
            kicker: "#6ee7b7",
            muted: "rgba(214,211,209,0.75)",
            text: "#fef3c7",
            ctaBg: "#fbbf24",
            ctaText: "#0e1a12",
          }}
          featuredKicker="Signature pick"
          featuredDescription="A field portrait from four decades of conservation photography — printed to hold the mane's warm light and the eye's quiet weight."
          featuredBullets={[
            "2.4mm premium blue chipboard, warp-resistant",
            "Linen-finish matte print, color-matched to Ron's archive files",
            "Signed keepsake box with species conservation story inside",
          ]}
          giftHeadline="A gift that gives twice"
          giftBody="Every Ron Magill puzzle funds conservation work. Gift one — or a gift card — and it keeps giving after the build is done."
        />
      </main>
    </>
  );
}
