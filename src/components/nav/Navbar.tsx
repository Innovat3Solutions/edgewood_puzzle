"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";

const primary = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/custom", label: "Custom" },
  { href: "/about", label: "About Edgewood" },
];

type Variant = "dark" | "light" | "over-video";

export default function Navbar({ variant = "light" }: { variant?: Variant }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count: cartCount, open: openCart } = useCart();

  // When hero behind nav is dark (e.g. video), use light text until scrolled.
  const overDark = variant === "over-video" && !scrolled;
  const isLight = !overDark;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrolledBg = isLight
    ? "bg-white/95 backdrop-blur-xl border-b border-[#0E1116]/10 shadow-[0_4px_16px_-8px_rgba(14,17,22,0.12)]"
    : "bg-white/95 backdrop-blur-xl border-b border-[#0E1116]/10 shadow-[0_4px_16px_-8px_rgba(14,17,22,0.12)]";

  const linkText = overDark
    ? "text-white/95 hover:text-[#FFB877] drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
    : "text-[#0E1116]/85 hover:text-[#F26A1F]";

  const iconText = overDark
    ? "text-white hover:text-[#FFB877] drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
    : "text-[#0E1116] hover:text-[#F26A1F]";

  const mobileBtn = overDark
    ? "text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]"
    : "text-[#0E1116]";

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[51] bg-[#0E1116] text-white text-[11px] md:text-xs font-dm tracking-[0.18em] uppercase text-center py-2 px-4">
        Order today · Most orders ship within 3 working days · Free U.S. shipping over $35
      </div>
      <header
        className={`fixed top-[34px] md:top-[32px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? scrolledBg : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className={`relative max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-[68px]" : "h-[88px]"
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
                filter: overDark
                  ? "brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.35))"
                  : "brightness(0)",
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
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Cart (${cartCount} ${cartCount === 1 ? "item" : "items"})`}
              className={`relative transition ${iconText}`}
            >
              <ShoppingCart size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#F26A1F] text-white text-[10px] min-w-4 h-4 px-1 flex items-center justify-center rounded-full font-bold">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
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
                Three worlds,
                <br />
                <span className="italic font-medium text-[#F26A1F]">in pieces.</span>
              </h2>

              {/* Primary links */}
              <nav className="flex flex-col gap-3">
                {primary.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-syne font-extrabold text-[#0E1116] hover:text-[#F26A1F] transition text-3xl tracking-[-0.01em]"
                  >
                    {p.label}
                  </Link>
                ))}
              </nav>
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
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openCart();
                }}
                aria-label={`Cart (${cartCount} ${cartCount === 1 ? "item" : "items"})`}
                className="relative text-[#0E1116] p-3.5 rounded-full border border-[#0E1116]/20 bg-white/60 backdrop-blur-sm"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#F26A1F] text-white text-[10px] min-w-4 h-4 px-1 flex items-center justify-center rounded-full font-bold">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
