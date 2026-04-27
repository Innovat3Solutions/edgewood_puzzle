import { Suspense } from "react";
import Navbar from "@/components/nav/Navbar";
import ShopGrid from "@/components/shop/ShopGrid";
import { puzzles } from "@/data/puzzles";

export default function ShopPage() {
  return (
    <>
      <Navbar variant="light" />
      <main className="min-h-screen bg-white text-[#0E1116]">
        <Suspense fallback={null}>
          <ShopGrid puzzles={puzzles} />
        </Suspense>
      </main>
    </>
  );
}
