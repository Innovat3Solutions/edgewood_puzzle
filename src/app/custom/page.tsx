import Navbar from "@/components/nav/Navbar";
import CustomPuzzleBuilder from "@/components/custom/CustomPuzzleBuilder";

export const metadata = {
  title: "Custom Photo Puzzle | Edgewood Puzzles",
  description:
    "Turn your photo into a premium American-made jigsaw puzzle. Pick orientation and piece count. Printed on 2.4 mm chipboard and cut by hand in Edgewood, NM.",
};

export default function CustomPuzzlePage() {
  return (
    <>
      <Navbar variant="light" />
      <main className="min-h-screen bg-white">
        <CustomPuzzleBuilder />
      </main>
    </>
  );
}
