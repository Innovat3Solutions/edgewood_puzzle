import Navbar from "@/components/nav/Navbar";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Heart,
  Palette,
  Mail,
  MapPin,
  Clock,
  AtSign,
} from "lucide-react";

export const metadata = {
  title: "About Edgewood | Our Story & Contact",
  description:
    "Premium Signature Edition jigsaw puzzles that turn extraordinary contemporary art into deeply rewarding 1000-piece experiences. Learn our story and get in touch.",
};

const pillars = [
  {
    icon: Palette,
    title: "Visionary artists",
    body: "We partner with contemporary artists whose work is rich in color, texture, and narrative.",
  },
  {
    icon: Sparkles,
    title: "Obsessive detail",
    body: "From perfect challenge-to-flow balance, to luxurious boxes and elegant interior lid art.",
  },
  {
    icon: Heart,
    title: "A mindful ritual",
    body: "We believe puzzles spark joy, focus, and connection. A pastime made meaningful.",
  },
];

const contactChannels = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@edgewoodpuzzle.com",
    href: "mailto:hello@edgewoodpuzzle.com",
  },
  {
    icon: AtSign,
    label: "Social",
    value: "@edgewoodpuzzle",
    href: "https://instagram.com/edgewoodpuzzle",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "Printed & finished in the USA",
    href: null,
  },
  {
    icon: Clock,
    label: "Reply time",
    value: "Within 1 to 2 business days",
    href: null,
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar variant="light" />

      <main className="pt-[104px] bg-white text-[#0E1116]">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
            <div>
              <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#B7541F] mb-5">
                About Edgewood
              </p>
              <h1
                className="font-syne font-extrabold tracking-[-0.025em] mb-8"
                style={{ fontSize: "clamp(44px, 6.5vw, 84px)", lineHeight: 1.0 }}
              >
                The art of
                <br />
                <span className="italic font-medium text-[#F26A1F]">puzzling.</span>
              </h1>
              <p className="font-dm text-lg md:text-xl text-[#55555E] leading-[1.7] max-w-xl mb-8">
                At Edgewood Puzzle, we craft premium Signature Edition jigsaw
                puzzles that turn extraordinary contemporary art into deeply
                rewarding 1000-piece experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold text-sm px-6 py-3 rounded-full transition shadow-[0_10px_28px_-6px_rgba(242,106,31,0.55)]"
                >
                  Shop Signature Editions <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 font-dm font-bold text-[#0E1116] hover:text-[#F26A1F] transition border-b-2 border-[#0E1116] hover:border-[#F26A1F] pb-1"
                >
                  Get in touch <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden ring-1 ring-[#0E1116]/10 shadow-[0_30px_60px_-15px_rgba(14,17,22,0.25)]">
                <Image
                  src="/puzzles/wild-in-color/Wild in Color_Axelotl_100 pieces_13_25x16_56in.jpg"
                  alt="Signature Edition puzzle artwork"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden md:block w-44 aspect-square rounded-2xl overflow-hidden ring-4 ring-white shadow-[0_20px_40px_rgba(14,17,22,0.25)]">
                <Image
                  src="/puzzles/ron-magill/lion.jpeg"
                  alt="Ron Magill, African Lion"
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Belief section */}
        <section className="bg-[#0E1116] text-[#FBEADB]">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
            <div className="max-w-4xl">
              <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#F26A1F] mb-5">
                What we believe
              </p>
              <h2
                className="font-syne font-extrabold tracking-[-0.02em] mb-8"
                style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.08 }}
              >
                Puzzles are more than a pastime.
                <span className="italic font-medium text-[#F26A1F]"> They are a mindful ritual.</span>
              </h2>
              <p className="font-dm text-lg text-[#FBEADB]/75 leading-[1.8] max-w-3xl">
                That&apos;s why we partner with visionary artists whose work is
                rich in color, texture, and narrative, then design every puzzle
                with obsessive attention to detail: from the perfect balance of
                challenge and flow, to luxurious box packaging, elegant interior
                lid art, and high-quality materials that feel as good as the
                finished piece looks on your wall.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              {pillars.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 hover:border-[#F26A1F]/50 transition"
                >
                  <div className="w-11 h-11 rounded-full bg-[#F26A1F]/15 border border-[#F26A1F]/30 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-[#F26A1F]" />
                  </div>
                  <h3 className="font-syne font-bold text-xl mb-2">{title}</h3>
                  <p className="font-dm text-[#FBEADB]/70 leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[5/4] rounded-2xl overflow-hidden ring-1 ring-[#0E1116]/10 shadow-[0_30px_60px_-15px_rgba(14,17,22,0.25)]">
                <Image
                  src="/puzzles/wild-in-color/Wild in Color_Chameleon_100 pieces_13_25x16_56in.jpg"
                  alt="Contemporary art on the puzzle"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#B7541F] mb-5">
                Made for
              </p>
              <h2
                className="font-syne font-extrabold text-[#0E1116] tracking-[-0.02em] mb-8"
                style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.08 }}
              >
                Those who appreciate beauty, craftsmanship, and the simple
                pleasure of watching an image come together{" "}
                <span className="italic font-medium text-[#F26A1F]">piece by piece.</span>
              </h2>
              <p className="font-dm text-lg text-[#55555E] leading-[1.75] max-w-xl">
                Whether you&apos;re a lifelong puzzler, an art collector, or
                someone searching for a meaningful gift, our puzzles are made
                for you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="bg-white border-t border-[#0E1116]/10 scroll-mt-[120px]"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
            <div>
              <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#B7541F] mb-5">
                Get in touch
              </p>
              <h2
                className="font-syne font-extrabold text-[#0E1116] tracking-[-0.02em] mb-6"
                style={{ fontSize: "clamp(32px, 4.5vw, 56px)", lineHeight: 1.08 }}
              >
                We&apos;d love to{" "}
                <span className="italic font-medium text-[#F26A1F]">hear from you.</span>
              </h2>
              <p className="font-dm text-lg text-[#55555E] leading-[1.75] max-w-md mb-10">
                Questions about a puzzle, an order, wholesale, or a collaboration?
                Send us a note and we&apos;ll get back to you.
              </p>

              <ul className="space-y-5">
                {contactChannels.map(({ icon: Icon, label, value, href }) => {
                  const content = (
                    <>
                      <div className="w-11 h-11 rounded-full bg-[#FFF1E6] border border-[#F26A1F]/20 text-[#F26A1F] flex items-center justify-center shrink-0">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="font-dm text-[11px] uppercase tracking-[0.22em] text-[#B7541F] mb-0.5">
                          {label}
                        </div>
                        <div className="font-syne font-semibold text-[#0E1116]">
                          {value}
                        </div>
                      </div>
                    </>
                  );
                  return (
                    <li key={label} className="flex items-center gap-4">
                      {href ? (
                        <a
                          href={href}
                          className="flex items-center gap-4 group hover:[&_.font-syne]:text-[#F26A1F] transition-colors"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <form
              className="rounded-2xl bg-[#FAF7F2] border border-[#0E1116]/10 p-7 md:p-9"
              action="mailto:hello@edgewoodpuzzle.com"
              method="post"
              encType="text/plain"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <label className="block">
                  <span className="font-dm text-[11px] uppercase tracking-[0.22em] text-[#B7541F] mb-2 block">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-white border border-[#0E1116]/15 focus:border-[#F26A1F] text-[#0E1116] rounded-md px-4 py-3 font-dm outline-none transition"
                  />
                </label>
                <label className="block">
                  <span className="font-dm text-[11px] uppercase tracking-[0.22em] text-[#B7541F] mb-2 block">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-white border border-[#0E1116]/15 focus:border-[#F26A1F] text-[#0E1116] rounded-md px-4 py-3 font-dm outline-none transition"
                  />
                </label>
              </div>
              <label className="block mb-5">
                <span className="font-dm text-[11px] uppercase tracking-[0.22em] text-[#B7541F] mb-2 block">
                  Subject
                </span>
                <input
                  type="text"
                  name="subject"
                  className="w-full bg-white border border-[#0E1116]/15 focus:border-[#F26A1F] text-[#0E1116] rounded-md px-4 py-3 font-dm outline-none transition"
                />
              </label>
              <label className="block mb-6">
                <span className="font-dm text-[11px] uppercase tracking-[0.22em] text-[#B7541F] mb-2 block">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="w-full bg-white border border-[#0E1116]/15 focus:border-[#F26A1F] text-[#0E1116] rounded-md px-4 py-3 font-dm outline-none transition resize-y"
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold text-sm px-6 py-3 rounded-full transition shadow-[0_10px_28px_-6px_rgba(242,106,31,0.55)]"
              >
                Send message <ArrowUpRight size={16} />
              </button>
            </form>
          </div>
        </section>

        {/* Welcome */}
        <section className="relative bg-[#0E1116] text-[#FBEADB] overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(242,106,31,0.18), transparent 45%)," +
                "radial-gradient(circle at 80% 80%, rgba(108,63,199,0.15), transparent 45%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-4 md:px-6 py-24 md:py-32 text-center">
            <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#F26A1F] mb-6">
              Welcome to Edgewood
            </p>
            <h2
              className="font-syne font-extrabold tracking-[-0.025em] mb-10"
              style={{ fontSize: "clamp(40px, 6vw, 76px)", lineHeight: 1.0 }}
            >
              Slow down. Connect.
              <br />
              <span className="italic font-medium text-[#F26A1F]">
                Discover the art of puzzling.
              </span>
            </h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold text-sm px-7 py-3.5 rounded-full transition shadow-[0_12px_32px_-6px_rgba(242,106,31,0.55)]"
            >
              Start a puzzle <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
