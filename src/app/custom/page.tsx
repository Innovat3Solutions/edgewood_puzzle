import Navbar from "@/components/nav/Navbar";
import CustomPuzzleBuilder from "@/components/custom/CustomPuzzleBuilder";

export const metadata = {
  title: "Custom Photo Puzzle | Edgewood Puzzles",
  description:
    "Turn your photo into a premium American-made jigsaw puzzle. Pick orientation and piece count. Printed on 2.4 mm chipboard and cut by hand in Edgewood, NM.",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CustomPuzzlePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialName = typeof params.full_name === "string" ? params.full_name : "";
  const initialEmail = typeof params.email === "string" ? params.email : "";

  return (
    <>
      <Navbar variant="light" />
      <main className="min-h-screen bg-white">
        <CustomPuzzleBuilder initialName={initialName} initialEmail={initialEmail} />
      </main>
    </>
  );
}
