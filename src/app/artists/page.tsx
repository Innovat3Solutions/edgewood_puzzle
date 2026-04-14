import Navbar from "@/components/nav/Navbar";

export default function ArtistsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-navy text-white px-4">
        <div className="max-w-7xl mx-auto py-12">
          <h1 className="font-syne font-bold text-4xl mb-4 text-gold">Artists</h1>
          <p className="font-dm text-muted">Profiles for Ron Magill, Gregory Laysak, Kevin Kia coming soon...</p>
        </div>
      </main>
    </>
  );
}
