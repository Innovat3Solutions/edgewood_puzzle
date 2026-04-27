import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

const shop = [
  { href: "/shop", label: "All Puzzles" },
  { href: "/shop?pieces=300", label: "300 Piece" },
  { href: "/shop?pieces=500", label: "500 Piece" },
  { href: "/shop?pieces=1000", label: "1000 Piece" },
];

const collections = [
  { href: "/shop?collection=ron-magill", label: "Ron Magill" },
  { href: "/shop?collection=cherp-studio", label: "Cherp Studio" },
  { href: "/shop?collection=wild-in-color", label: "Wild in Color" },
];

const company = [
  { href: "/about", label: "About Edgewood" },
  { href: "/custom", label: "Custom Puzzle" },
  { href: "/about#contact", label: "Contact" },
];

const support = [
  { href: "/shipping", label: "Shipping & Returns" },
  { href: "/faq", label: "FAQ" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0E1116] text-[#FBEADB]">
      {/* Top band */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-12 lg:gap-10">
          {/* Brand column */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.svg"
                alt="Edgewood Puzzles"
                width={260}
                height={164}
                className="h-16 w-auto brightness-0 invert"
              />
            </Link>
            <p className="font-dm text-[#FBEADB]/70 leading-relaxed max-w-sm mb-6">
              Premium American-made jigsaw puzzles, printed and cut in Lafayette,
              Indiana. Craftsmanship built to last.
            </p>

            <div className="space-y-3 text-sm font-dm text-[#FBEADB]/70">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#F26A1F] shrink-0" />
                Lafayette, Indiana · Ludo Fact USA LLC
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#F26A1F] shrink-0" />
                <a href="mailto:hello@edgewoodpuzzles.com" className="hover:text-[#F26A1F] transition">
                  hello@edgewoodpuzzles.com
                </a>
              </div>
            </div>

          </div>

          {/* Link columns */}
          <FooterColumn title="Shop" items={shop} />
          <FooterColumn title="Collections" items={collections} />
          <FooterColumn title="Company" items={company} />
          <FooterColumn title="Support" items={support} />
        </div>

        {/* Newsletter strip */}
        <div className="mt-16 pt-10 border-t border-[#FBEADB]/10 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-center">
          <div>
            <p className="font-dm text-[11px] uppercase tracking-[0.28em] text-[#F26A1F] mb-2">
              The Edgewood Letter
            </p>
            <h3 className="font-syne font-bold text-2xl text-[#FBEADB]">
              First look at every new drop.
            </h3>
          </div>
          <form className="flex gap-2">
            <input
              type="email"
              required
              placeholder="you@domain.com"
              className="flex-1 bg-white/5 border border-white/15 focus:border-[#F26A1F] text-[#FBEADB] placeholder:text-[#FBEADB]/40 rounded-full px-5 py-3 font-dm text-sm outline-none transition"
            />
            <button
              type="submit"
              className="bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold text-sm px-6 py-3 rounded-full transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#FBEADB]/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs font-dm text-[#FBEADB]/50">
          <p>© {year} Edgewood Puzzles. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-[#F26A1F] transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#F26A1F] transition">
              Terms
            </Link>
            <Link href="/accessibility" className="hover:text-[#F26A1F] transition">
              Accessibility
            </Link>
            <span className="text-[#FBEADB]/30">Made in the USA · 🇺🇸</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="font-dm text-[11px] uppercase tracking-[0.28em] text-[#F26A1F] mb-5">
        {title}
      </p>
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className="font-dm text-sm text-[#FBEADB]/80 hover:text-[#F26A1F] transition"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
