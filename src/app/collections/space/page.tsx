import Navbar from "@/components/nav/Navbar";
import CollectionSellThrough from "@/components/shop/CollectionSellThrough";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";
import { spacePuzzles } from "@/data/puzzles";

export default function SpaceCollectionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy text-white">
        <section className="relative w-full h-[55vh] min-h-[420px] max-h-[560px] pt-[72px]">
          <CosmicParallaxBg
            head="Space"
            text="Nebulae, Eclipses, Deep Field, Cosmos"
            loop={true}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(7,9,26,0) 0%, rgba(7,9,26,0.75) 55%, #07091A 100%)",
            }}
          />
        </section>

        <CollectionSellThrough
          puzzles={spacePuzzles}
          theme="default"
          featuredKicker="Puzzle of the month"
          featuredDescription="A swirling birthplace of stars — precision-cut in violet, cyan, and gold that rewards slow, attentive assembly."
        />
      </main>
    </>
  );
}
