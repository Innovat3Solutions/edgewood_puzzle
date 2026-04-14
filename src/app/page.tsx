import Navbar from "@/components/nav/Navbar";
import InteractiveHero from "@/components/hero/InteractiveHero";
import PuzzleCards from "@/components/cards/PuzzleCards";
import CollectionShowcase from "@/components/home/CollectionShowcase";
import FeatureHighlights from "@/components/home/FeatureHighlights";
import ProductSpecs from "@/components/home/ProductSpecs";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import VendorCarousel from "@/components/home/VendorCarousel";
import OurStory from "@/components/home/OurStory";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Navbar variant="light" />

      <main className="flex-1 relative">
        <InteractiveHero />
        <PuzzleCards />
        <CollectionShowcase />
        <FeatureHighlights />
        <ProductSpecs />
        <Testimonials />
        <FAQ />
        <VendorCarousel />
        <OurStory />
        <Newsletter />
      </main>
    </>
  );
}
