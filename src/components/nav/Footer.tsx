import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

const InstagramIcon = (p: { size?: number }) => (
  <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = (p: { size?: number }) => (
  <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const YoutubeIcon = (p: { size?: number }) => (
  <svg width={p.size ?? 16} height={p.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
  </svg>
);

const shop = [
  { href: "/shop", label: "All Puzzles" },
  { href: "/shop?pieces=500", label: "500 Piece" },
  { href: "/shop?pieces=1000", label: "1,000 Piece" },
  { href: "/shop?pieces=1500", label: "1,500 Piece" },
  { href: "/shop?gift=true", label: "Gift Cards" },
];

const collections = [
  { href: "/collections/space", label: "Space" },
  { href: "/collections/ron-magill", label: "Ron Magill" },
  { href: "/collections/butterfly", label: "Butterfly" },
  { href: "/collections/gregory-laysak", label: "Gregory Laysak" },
  { href: "/collections/kia", label: "Kevin Kia" },
  { href: "/collections/wild-in-color", label: "Wild in Color" },
];

const company = [
  { href: "/story", label: "Our Story" },
  { href: "/artists", label: "Artists" },
  { href: "/play", label: "Play" },
  { href: "/contact", label: "Contact" },
  { href: "/press", label: "Press" },
];

const support = [
  { href: "/shipping", label: "Shipping & Returns" },
  { href: "/faq", label: "FAQ" },
  { href: "/care", label: "Puzzle Care" },
  { href: "/lost-piece", label: "Lost a Piece?" },
  { href: "/wholesale", label: "Wholesale" },
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

            <div className="flex items-center gap-3 mt-6">
              {[
                { href: "https://instagram.com", icon: InstagramIcon, label: "Instagram" },
                { href: "https://facebook.com", icon: FacebookIcon, label: "Facebook" },
                { href: "https://youtube.com", icon: YoutubeIcon, label: "YouTube" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-[#FBEADB]/20 flex items-center justify-center hover:border-[#F26A1F] hover:text-[#F26A1F] transition"
                >
                  <Icon size={16} />
                </a>
              ))}
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
