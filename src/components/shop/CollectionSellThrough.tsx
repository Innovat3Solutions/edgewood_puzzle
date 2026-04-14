import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ShieldCheck,
  Sparkles,
  Truck,
  Leaf,
  Puzzle as PuzzleIcon,
  Ruler,
  Clock,
  Gift,
  Check,
} from "lucide-react";

import PuzzleCard from "@/components/shop/PuzzleCard";
import MobileCarousel from "@/components/ui/MobileCarousel";
import type { Puzzle } from "@/data/puzzles";

type CardTheme =
  | "default"
  | "ron-magill"
  | "butterfly"
  | "laysak"
  | "kia"
  | "wild-in-color";

export type SellThroughPalette = {
  bg: string;
  bgAlt: string;
  panel: string;
  border: string;
  accent: string;
  kicker: string;
  muted: string;
  text: string;
  ctaBg: string;
  ctaText: string;
};

export const brandPalette: SellThroughPalette = {
  bg: "#07091A",
  bgAlt: "#0D1224",
  panel: "#111827",
  border: "rgba(245,166,35,0.22)",
  accent: "#F5A623",
  kicker: "#00C9B1",
  muted: "#8892A4",
  text: "#FFFFFF",
  ctaBg: "#F5A623",
  ctaText: "#07091A",
};

export type CollectionSellThroughProps = {
  puzzles: Puzzle[];
  theme?: CardTheme;
  palette?: SellThroughPalette;
  featuredKicker?: string;
  featuredDescription: string;
  featuredBullets?: string[];
  sizeLabels?: { starter: string; classic: string; master: string };
  sizeBlurbs?: { starter: string; classic: string; master: string };
  giftHeadline?: string;
  giftBody?: string;
};

const trustSignals = [
  { icon: ShieldCheck, label: "Missing-piece guarantee", sub: "Free replacement, for life" },
  { icon: Sparkles, label: "Museum-grade finish", sub: "2.4mm blue chipboard" },
  { icon: Leaf, label: "FSC-certified stock", sub: "Soy-based inks" },
  { icon: Truck, label: "Ships in 48 hours", sub: "Free US shipping over $50" },
];

export default function CollectionSellThrough({
  puzzles,
  theme = "default",
  palette = brandPalette,
  featuredKicker = "Featured pick",
  featuredDescription,
  featuredBullets = [
    "2.4mm premium blue chipboard, warp-resistant",
    "Matte anti-glare finish, color-true offset print",
    "Linen-wrapped keepsake box with poster reference",
  ],
  sizeLabels = { starter: "Starter", classic: "Classic", master: "Master" },
  sizeBlurbs = {
    starter: "One long evening. A generous gift. Your re-entry into puzzling.",
    classic: "The weekend build. Everyone's favorite. Our best-seller.",
    master: "A week on the table. A centerpiece worth framing.",
  },
  giftHeadline = "Give a weekend worth remembering",
  giftBody = "Edgewood gift cards never expire, arrive instantly, and come with a handwritten note option at checkout.",
}: CollectionSellThroughProps) {
  const featured = puzzles[0];
  const bySize = [
    {
      pieces: 500,
      label: sizeLabels.starter,
      blurb: sizeBlurbs.starter,
      items: puzzles.filter((p) => p.pieces === 500),
    },
    {
      pieces: 1000,
      label: sizeLabels.classic,
      blurb: sizeBlurbs.classic,
      items: puzzles.filter((p) => p.pieces === 1000),
    },
    {
      pieces: 1500,
      label: sizeLabels.master,
      blurb: sizeBlurbs.master,
      items: puzzles.filter((p) => p.pieces === 1500),
    },
  ].filter((g) => g.items.length > 0);

  const cssVars = {
    "--st-bg": palette.bg,
    "--st-bg-alt": palette.bgAlt,
    "--st-panel": palette.panel,
    "--st-border": palette.border,
    "--st-accent": palette.accent,
    "--st-kicker": palette.kicker,
    "--st-muted": palette.muted,
    "--st-text": palette.text,
    "--st-cta-bg": palette.ctaBg,
    "--st-cta-text": palette.ctaText,
  } as CSSProperties;

  return (
    <div style={cssVars} className="text-[var(--st-text)]">
      {/* Trust bar */}
      <section className="border-y border-[var(--st-border)] bg-[var(--st-bg)]">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustSignals.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon className="w-5 h-5 text-[var(--st-accent)] shrink-0 mt-0.5" />
              <div>
                <p className="font-dm font-semibold text-sm text-[var(--st-text)]">{label}</p>
                <p className="font-dm text-xs text-[var(--st-muted)]">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured puzzle */}
      <section className="bg-[var(--st-bg)]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[var(--st-bg-alt)] border border-[var(--st-border)]">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span
                className="absolute top-4 left-4 font-dm font-semibold text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: "var(--st-accent)", color: "var(--st-cta-text)" }}
              >
                Featured
              </span>
            </div>
            <div>
              <p className="font-dm text-sm uppercase tracking-[0.2em] text-[var(--st-kicker)] mb-3">
                {featuredKicker}
              </p>
              <h2 className="font-syne font-bold text-3xl md:text-5xl text-[var(--st-accent)] mb-4">
                {featured.title}
              </h2>
              <p className="font-dm text-lg text-[var(--st-text)]/90 mb-6 leading-relaxed">
                {featuredDescription}
              </p>

              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8">
                <Spec icon={PuzzleIcon} label="Pieces" value={`${featured.pieces}`} />
                <Spec
                  icon={Ruler}
                  label="Finished"
                  value={
                    featured.pieces === 500
                      ? "20 × 14 in"
                      : featured.pieces === 1000
                      ? "26.5 × 19.25 in"
                      : "31.5 × 23.5 in"
                  }
                />
                <Spec
                  icon={Clock}
                  label="Build time"
                  value={
                    featured.pieces === 500
                      ? "4–7 hrs"
                      : featured.pieces === 1000
                      ? "8–14 hrs"
                      : "14–22 hrs"
                  }
                />
              </div>

              <ul className="space-y-2 mb-8">
                {featuredBullets.map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 font-dm text-sm text-[var(--st-text)]/85"
                  >
                    <Check className="w-4 h-4 text-[var(--st-kicker)] shrink-0 mt-0.5" />
                    {line}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4">
                <span className="font-syne font-bold text-3xl text-[var(--st-accent)]">
                  ${featured.price}
                </span>
                <button
                  className="btn-hover font-dm font-semibold px-8 py-3 rounded-md"
                  style={{ background: "var(--st-cta-bg)", color: "var(--st-cta-text)" }}
                >
                  Add to cart
                </button>
                <Link
                  href={`/shop/${featured.slug}`}
                  className="font-dm text-sm text-[var(--st-text)]/80 hover:text-[var(--st-accent)] underline underline-offset-4"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by size */}
      <section className="bg-[var(--st-bg)]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <p className="font-dm text-sm uppercase tracking-[0.2em] text-[var(--st-kicker)] mb-3">
              Shop by size
            </p>
            <h2 className="font-syne font-bold text-4xl text-[var(--st-text)] mb-3">
              Pick your commitment
            </h2>
            <p className="font-dm text-[var(--st-muted)] max-w-2xl mx-auto">
              Every design is offered in three sizes. Same art. Same finish. Different weekend.
            </p>
          </div>

          {bySize.map((group) => (
            <div key={group.pieces} className="mb-14 last:mb-0">
              <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h3 className="font-syne font-bold text-2xl text-[var(--st-accent)]">
                    {group.pieces}-Piece · {group.label}
                  </h3>
                  <p className="font-dm text-sm text-[var(--st-muted)]">{group.blurb}</p>
                </div>
                <span className="font-dm text-xs uppercase tracking-widest text-[var(--st-kicker)]">
                  {group.items.length} designs
                </span>
              </div>
              <MobileCarousel
                items={group.items}
                keyOf={(p) => p.slug}
                itemWidth="70%"
                desktopClassName="hidden md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6"
                render={(p) => <PuzzleCard puzzle={p} theme={theme} />}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Gift CTA */}
      <section className="bg-[var(--st-bg)]">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div
            className="relative overflow-hidden rounded-2xl border border-[var(--st-border)] p-10 md:p-16 text-center"
            style={{
              background:
                "linear-gradient(135deg, var(--st-panel) 0%, var(--st-bg-alt) 60%, var(--st-bg) 100%)",
            }}
          >
            <Gift className="w-10 h-10 text-[var(--st-accent)] mx-auto mb-4" />
            <h2 className="font-syne font-bold text-3xl md:text-5xl text-[var(--st-text)] mb-4">
              {giftHeadline}
            </h2>
            <p className="font-dm text-[var(--st-muted)] max-w-xl mx-auto mb-8">{giftBody}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/shop"
                className="btn-hover font-dm font-semibold px-8 py-3 rounded-md"
                style={{ background: "var(--st-cta-bg)", color: "var(--st-cta-text)" }}
              >
                Shop all puzzles
              </Link>
              <Link
                href="/shop?gift=1"
                className="font-dm font-semibold px-8 py-3 rounded-md border border-[var(--st-text)]/40 text-[var(--st-text)] hover:border-[var(--st-accent)] hover:text-[var(--st-accent)] transition"
              >
                Send a gift card
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-[var(--st-border)] rounded-lg p-3 bg-[var(--st-bg-alt)]/60">
      <Icon className="w-4 h-4 text-[var(--st-kicker)] mb-1.5" />
      <p className="font-dm text-xs text-[var(--st-muted)] uppercase tracking-wider">{label}</p>
      <p className="font-syne font-bold text-[var(--st-text)] text-sm mt-0.5">{value}</p>
    </div>
  );
}

