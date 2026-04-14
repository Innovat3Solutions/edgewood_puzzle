"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const collections = [
  { href: "/collections/space", name: "Space", blurb: "Nebulae & deep field", cover: "/puzzles/space/space-1.jpeg", color: "#F5A623" },
  { href: "/collections/ron-magill", name: "Ron Magill", blurb: "Signature wildlife", cover: "/puzzles/ron-magill/lion.jpeg", color: "#FCD34D" },
  { href: "/collections/butterfly", name: "Butterfly", blurb: "Iridescent wings", cover: "/puzzles/butterfly/butterfly-1.jpeg", color: "#E879F9" },
  { href: "/collections/gregory-laysak", name: "Gregory Laysak", blurb: "Landscape series", cover: "/puzzles/gregory-laysak/laysak-1.jpeg", color: "#FB923C" },
  { href: "/collections/kia", name: "Kevin Kia", blurb: "Studio work", cover: "/puzzles/kia/kia-1.jpeg", color: "#FFFFFF" },
  { href: "/collections/wild-in-color", name: "Wild in Color", blurb: "High-chroma nature", cover: "/puzzles/wild-in-color/wic-1.jpeg", color: "#38BDF8" },
];

const primary = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/story", label: "Our Story" },
  { href: "/artists", label: "Artists" },
  { href: "/contact", label: "Contact" },
];

type Variant = "dark" | "light";

export default function Navbar({ variant = "dark" }: { variant?: Variant }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const isLight = variant === "light";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrolledBg = isLight
    ? "bg-[#FBEADB]/85 backdrop-blur-xl border-b border-[#0E1116]/10 shadow-[0_8px_24px_-14px_rgba(14,17,22,0.18)]"
    : "bg-[#0E1116]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]";

  const linkText = isLight
    ? "text-[#0E1116]/85 hover:text-[#F26A1F]"
    : "text-white/90 hover:text-[#F26A1F] drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]";

  const iconText = isLight
    ? "text-[#0E1116] hover:text-[#F26A1F]"
    : "text-white hover:text-[#F26A1F] drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]";

  const mobileBtn = isLight
    ? "text-[#0E1116]"
    : "text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? scrolledBg : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`relative max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-[76px]" : "h-[104px]"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Edgewood Puzzles home">
            <Image
              src="/logo.svg"
              alt="Edgewood Puzzles"
              width={260}
              height={164}
              priority
              className={`w-auto transition-all duration-300 ${
                scrolled ? "h-12" : "h-16"
              }`}
              style={{
                filter: isLight
                  ? "brightness(0)"
                  : "brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.35))",
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className={`hidden lg:flex items-center gap-8 font-dm text-sm font-medium ${isLight ? "text-[#0E1116]/85" : "text-white/90"}`}>
            {primary.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className={`relative transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#F26A1F] after:transition-all ${linkText}`}
              >
                {p.label}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setCollectionsOpen((v) => !v)}
                className={`flex items-center gap-1 transition-colors py-2 ${linkText}`}
                aria-expanded={collectionsOpen}
              >
                Collections
                <ChevronDown
                  size={14}
                  className={`transition-transform ${collectionsOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {collectionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                  >
                    <div className="w-[520px] grid grid-cols-2 gap-1 p-3 bg-white rounded-2xl shadow-[0_20px_60px_-10px_rgba(14,17,22,0.25)] border border-[#0E1116]/10">
                      {collections.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="block px-4 py-3 rounded-lg hover:bg-[#FBEADB] transition group"
                        >
                          <div className="font-syne font-bold text-[#0E1116] group-hover:text-[#F26A1F] transition-colors">
                            {c.name}
                          </div>
                          <div className="font-dm text-xs text-[#6A6A73] mt-0.5">
                            {c.blurb}
                          </div>
                        </Link>
                      ))}
                      <Link
                        href="/collections"
                        className="col-span-2 mt-1 px-4 py-3 text-center font-dm text-sm font-semibold text-[#F26A1F] hover:bg-[#F26A1F] hover:text-white rounded-lg border border-[#F26A1F]/30 transition"
                      >
                        View all collections →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <button
              aria-label="Cart"
              className={`relative transition ${iconText}`}
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-[#F26A1F] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                2
              </span>
            </button>
            <Link
              href="/shop"
              className="inline-flex items-center bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors shadow-[0_8px_24px_-6px_rgba(242,106,31,0.5)]"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile button */}
          <button
            aria-label="Open menu"
            className={`lg:hidden p-2 -mr-2 ${mobileBtn}`}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#FBEADB] flex flex-col overflow-y-auto overflow-x-hidden"
          >
            {/* Ambient color wash — evokes the six collection palettes */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 12% 8%, rgba(245,166,35,0.35), transparent 42%)," +
                  "radial-gradient(circle at 92% 18%, rgba(232,121,249,0.28), transparent 42%)," +
                  "radial-gradient(circle at 88% 78%, rgba(56,189,248,0.22), transparent 45%)," +
                  "radial-gradient(circle at 8% 92%, rgba(251,146,60,0.3), transparent 45%)",
              }}
            />
            {/* Faint paper grain */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(14,17,22,0.6) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
              }}
            />

            {/* Painterly side ribbon (the "artistic bar") */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 bottom-0 left-0 w-[6px]"
              style={{
                background:
                  "linear-gradient(180deg, #F5A623 0%, #FCD34D 18%, #E879F9 38%, #FB923C 58%, #38BDF8 78%, #0E1116 100%)",
              }}
            />

            <div className="relative flex items-center justify-between pl-8 pr-6 h-[88px] border-b border-[#0E1116]/10">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center"
              >
                <Image
                  src="/logo.svg"
                  alt="Edgewood Puzzles"
                  width={260}
                  height={164}
                  className="h-14 w-auto"
                />
              </Link>
              <button
                aria-label="Close menu"
                className="text-[#0E1116] p-2 -mr-2 rounded-full hover:bg-[#0E1116]/5 transition"
                onClick={() => setMobileOpen(false)}
              >
                <X size={28} />
              </button>
            </div>

            <div className="relative flex-1 pl-8 pr-6 pt-7 pb-8 flex flex-col">
              {/* Eyebrow & artful kicker */}
              <p className="font-dm text-[11px] uppercase tracking-[0.32em] text-[#B7541F] mb-2">
                The Gallery
              </p>
              <h2
                className="font-syne font-extrabold text-[#0E1116] tracking-[-0.02em] leading-[0.95] mb-6"
                style={{ fontSize: "clamp(40px, 11vw, 56px)" }}
              >
                Six worlds,
                <br />
                <span className="italic font-medium text-[#F26A1F]">in pieces.</span>
              </h2>

              {/* Primary links row */}
              <nav className="flex flex-wrap gap-x-5 gap-y-2 mb-8 pb-6 border-b border-[#0E1116]/10">
                {primary.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-dm text-sm font-semibold text-[#0E1116]/80 hover:text-[#F26A1F] transition uppercase tracking-wider"
                  >
                    {p.label}
                  </Link>
                ))}
              </nav>

              {/* Collection gallery */}
              <p className="font-dm text-[11px] uppercase tracking-[0.28em] text-[#B7541F] mb-4">
                Collections
              </p>
              <div className="grid grid-cols-2 gap-3">
                {collections.map((c, i) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setMobileOpen(false)}
                    className="group relative block aspect-[4/5] rounded-xl overflow-hidden ring-1 ring-[#0E1116]/10 shadow-[0_8px_24px_-10px_rgba(14,17,22,0.25)]"
                  >
                    <Image
                      src={c.cover}
                      alt={c.name}
                      fill
                      sizes="45vw"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(14,17,22,0) 40%, rgba(14,17,22,0.4) 65%, rgba(14,17,22,0.9) 100%)",
                      }}
                    />
                    {/* Palette swatch */}
                    <span
                      className="absolute top-3 left-3 w-3 h-3 rounded-full ring-2 ring-white/90"
                      style={{ background: c.color }}
                    />
                    <span className="absolute top-3 right-3 font-syne font-bold text-[10px] text-white/80 tracking-widest">
                      0{i + 1}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <div className="font-syne font-bold text-white text-base leading-tight">
                        {c.name}
                      </div>
                      <div className="font-dm text-[11px] text-white/70 mt-0.5 line-clamp-1">
                        {c.blurb}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="relative pl-8 pr-6 pb-10 pt-5 border-t border-[#0E1116]/10 flex items-center gap-3">
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="flex-1 inline-flex items-center justify-center bg-[#F26A1F] text-white font-bold px-6 py-3.5 rounded-full shadow-[0_10px_28px_-6px_rgba(242,106,31,0.55)] transition hover:bg-[#E05A10]"
              >
                Shop Now
              </Link>
              <button
                aria-label="Cart"
                className="relative text-[#0E1116] p-3.5 rounded-full border border-[#0E1116]/20 bg-white/60 backdrop-blur-sm"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-[#F26A1F] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  2
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
