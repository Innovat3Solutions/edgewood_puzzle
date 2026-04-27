import Navbar from "@/components/nav/Navbar";
import VideoHero from "@/components/home/VideoHero";
import TabbedCollections from "@/components/home/TabbedCollections";
import PuzzleDifference from "@/components/home/PuzzleDifference";
import VendorCarousel from "@/components/home/VendorCarousel";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Navbar variant="over-video" />

      <main className="flex-1 relative bg-white">
        <VideoHero />
        <TabbedCollections />
        <PuzzleDifference />
        <VendorCarousel />
        <Newsletter />
      </main>
    </>
  );
}
