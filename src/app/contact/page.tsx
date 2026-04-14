import Navbar from "@/components/nav/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-navy text-white px-4">
        <div className="max-w-7xl mx-auto py-12">
          <h1 className="font-syne font-bold text-4xl mb-4 text-gold">Contact</h1>
          <p className="font-dm text-muted">Contact form and FAQ coming soon...</p>
        </div>
      </main>
    </>
  );
}
