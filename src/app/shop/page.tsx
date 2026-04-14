import Navbar from "@/components/nav/Navbar";
import PuzzleCard from "@/components/shop/PuzzleCard";
import { puzzles } from "@/data/puzzles";

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-navy text-white px-4">
        <div className="max-w-7xl mx-auto py-12">
          <h1 className="font-syne font-bold text-4xl mb-2 text-gold">Shop</h1>
          <p className="font-dm text-muted mb-10">
            {puzzles.length} puzzles in stock — more collections arriving soon.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {puzzles.map((p) => (
              <PuzzleCard key={p.slug} puzzle={p} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
