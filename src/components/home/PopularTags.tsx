import Link from "next/link";

const TAGS = [
  { label: "Bestsellers", href: "/shop" },
  { label: "Ron Magill Wildlife", href: "/collections/ron-magill" },
  { label: "Wild in Color", href: "/collections/wild-in-color" },
  { label: "Cherp Studio", href: "/collections/cherp-studio" },
  { label: "500 Piece", href: "/shop?pieces=500" },
  { label: "Wood Puzzles", href: "/shop?pieces=48" },
  { label: "Made in USA", href: "/about" },
];

export default function PopularTags() {
  return (
    <section className="bg-white pt-12 pb-2">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <p className="text-center font-dm text-xs md:text-sm tracking-[0.22em] uppercase text-[#888] mb-5">
          Popular right now
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {TAGS.map((t) => (
            <Link
              key={t.href + t.label}
              href={t.href}
              className="inline-flex items-center font-dm text-sm font-medium text-[#0E1116] bg-[#F4F4F5] hover:bg-[#0E1116] hover:text-white rounded-full px-4 py-2 transition-colors"
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
