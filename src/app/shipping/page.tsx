import Navbar from "@/components/nav/Navbar";
import Link from "next/link";
import {
  Truck,
  Globe2,
  Gift,
  PackageSearch,
  RotateCcw,
  ShieldAlert,
  Receipt,
  Mail,
} from "lucide-react";

export const metadata = {
  title: "Shipping & Returns | Edgewood Puzzle",
  description:
    "Shipping rates, delivery times, and our 30-day open-box return policy for Edgewood Puzzle Signature Editions.",
};

const sections = [
  {
    id: "us-shipping",
    icon: Truck,
    eyebrow: "United States",
    title: "U.S. Shipping (incl. Alaska & Hawaii)",
    body: (
      <ul className="space-y-2.5 font-dm text-[15px] text-[#55555E] leading-relaxed list-disc pl-5">
        <li>Free standard shipping on all orders over $24.99.</li>
        <li>Orders under $24.99 ship for a flat rate of $8.95.</li>
        <li>
          All orders ship within 1 to 3 business days via USPS Priority Mail or
          UPS Ground (your choice at checkout).
        </li>
        <li>
          Delivery times: 3 to 7 business days after shipment (typically 4 to 6 days
          total from order date).
        </li>
        <li>
          Tracking is provided with every order and sent via email the moment
          your puzzle leaves our studio.
        </li>
      </ul>
    ),
  },
  {
    id: "international",
    icon: Globe2,
    eyebrow: "Worldwide",
    title: "International Shipping",
    body: (
      <div className="space-y-4">
        <p className="font-dm text-[15px] text-[#55555E] leading-[1.75]">
          We ship to most countries worldwide. International orders ship via
          USPS First Class Package International or UPS.
        </p>
        <ul className="space-y-2.5 font-dm text-[15px] text-[#55555E] leading-relaxed list-disc pl-5">
          <li>Shipping cost is calculated at checkout based on destination and weight.</li>
          <li>Delivery times: 7 to 21 business days (varies by country and customs).</li>
          <li>
            You are responsible for any duties, taxes, or import fees charged
            by your country.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "gift-rush",
    icon: Gift,
    eyebrow: "Gifts & rush",
    title: "Gift Orders & Rush Shipping",
    body: (
      <ul className="space-y-2.5 font-dm text-[15px] text-[#55555E] leading-relaxed list-disc pl-5">
        <li>Gift messages are printed on a beautiful card at no extra charge.</li>
        <li>Express shipping (2 to 3 day) is available at checkout for an additional fee.</li>
      </ul>
    ),
  },
  {
    id: "tracking",
    icon: PackageSearch,
    eyebrow: "Tracking",
    title: "Order Tracking & Delays",
    body: (
      <p className="font-dm text-[15px] text-[#55555E] leading-[1.75]">
        You will receive a tracking link by email. If your package is delayed
        or lost, contact us at{" "}
        <a
          href="mailto:support@edgewoodpuzzle.com"
          className="text-[#F26A1F] underline underline-offset-2 hover:text-[#E05A10]"
        >
          support@edgewoodpuzzle.com
        </a>{" "}
        within 30 days of the expected delivery date and we&apos;ll resolve it
        promptly (replacement or full refund).
      </p>
    ),
  },
  {
    id: "returns",
    icon: RotateCcw,
    eyebrow: "Returns",
    title: "Returns & Refunds Policy",
    body: (
      <div className="space-y-6">
        <p className="font-dm text-[15px] text-[#55555E] leading-[1.75]">
          We offer a{" "}
          <strong className="text-[#0E1116]">30-day &ldquo;open-box&rdquo;</strong>{" "}
          return window because we know you&apos;ll want to see (and feel) the
          quality in person.
        </p>
        <div>
          <h4 className="font-syne font-bold text-lg text-[#0E1116] mb-3">
            What can be returned
          </h4>
          <ul className="space-y-2 font-dm text-[15px] text-[#55555E] leading-relaxed list-disc pl-5">
            <li>Unopened, unused puzzles in their original shrink-wrapped condition.</li>
            <li>Return window: 30 days from the date you receive your order.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-syne font-bold text-lg text-[#0E1116] mb-3">
            What cannot be returned
          </h4>
          <ul className="space-y-2 font-dm text-[15px] text-[#55555E] leading-relaxed list-disc pl-5">
            <li>Opened puzzles (once the shrink wrap is removed, the puzzle is considered used).</li>
            <li>Custom or personalized items.</li>
            <li>Puzzles damaged by the customer after delivery.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-syne font-bold text-lg text-[#0E1116] mb-3">
            How to return
          </h4>
          <ol className="space-y-2 font-dm text-[15px] text-[#55555E] leading-relaxed list-decimal pl-5">
            <li>
              Email{" "}
              <a
                href="mailto:support@edgewoodpuzzle.com"
                className="text-[#F26A1F] underline underline-offset-2 hover:text-[#E05A10]"
              >
                support@edgewoodpuzzle.com
              </a>{" "}
              with your order number and reason for return.
            </li>
            <li>We will send you a prepaid return shipping label (for U.S. orders only).</li>
            <li>Ship the unopened puzzle back in its original packaging.</li>
            <li>
              Once we receive and inspect the return, we will issue a full
              refund to your original payment method within 5 to 7 business days.
            </li>
          </ol>
        </div>
        <p className="font-dm text-sm text-[#6A6A73] italic leading-relaxed">
          International customers are responsible for return shipping costs. We
          recommend using a trackable service.
        </p>
      </div>
    ),
  },
  {
    id: "damaged",
    icon: ShieldAlert,
    eyebrow: "Damaged items",
    title: "Damaged or Defective Items",
    body: (
      <p className="font-dm text-[15px] text-[#55555E] leading-[1.75]">
        If your puzzle arrives damaged or with manufacturing defects, contact
        us within 7 days with photos and your order number. We&apos;ll send a
        replacement at no cost to you (or issue a full refund if a replacement
        is not available).
      </p>
    ),
  },
  {
    id: "refunds",
    icon: Receipt,
    eyebrow: "Refunds",
    title: "Refunds",
    body: (
      <ul className="space-y-2.5 font-dm text-[15px] text-[#55555E] leading-relaxed list-disc pl-5">
        <li>Full refund of the purchase price + any applicable taxes.</li>
        <li>
          Original shipping cost is refunded only if the return is due to our
          error (wrong item, damaged on arrival).
        </li>
        <li>Store credit is available as an option if you prefer.</li>
      </ul>
    ),
  },
];

export default function ShippingPage() {
  return (
    <>
      <Navbar variant="light" />

      <main className="pt-[104px] bg-[#FBEADB] text-[#0E1116]">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 md:px-6 pt-14 md:pt-20 pb-10">
          <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#B7541F] mb-5">
            Shipping &amp; Returns Policy
          </p>
          <h1
            className="font-syne font-extrabold tracking-[-0.025em] mb-6"
            style={{ fontSize: "clamp(36px, 5.5vw, 68px)", lineHeight: 1.02 }}
          >
            Safe arrival.
            <br />
            <span className="text-[#F26A1F]">Joyful openings.</span>
          </h1>
          <p className="font-dm text-lg text-[#55555E] leading-[1.75] max-w-2xl">
            At Edgewood Puzzle we want every puzzle to arrive safely and bring
            you joy from the moment you open the box. Below are the details for
            all website orders.
          </p>
          <p className="font-dm text-xs uppercase tracking-[0.24em] text-[#6A6A73] mt-6">
            Last updated: April 14, 2026
          </p>
        </section>

        {/* Anchor nav */}
        <section className="max-w-4xl mx-auto px-4 md:px-6 pb-4">
          <nav className="flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-dm text-xs uppercase tracking-widest px-3.5 py-2 rounded-full border border-[#0E1116]/15 bg-white/60 text-[#0E1116]/80 hover:border-[#F26A1F]/40 hover:text-[#F26A1F] transition"
              >
                {s.eyebrow}
              </a>
            ))}
          </nav>
        </section>

        {/* Sections */}
        <section className="max-w-4xl mx-auto px-4 md:px-6 pb-20">
          <div className="space-y-5 md:space-y-6">
            {sections.map(({ id, icon: Icon, eyebrow, title, body }) => (
              <article
                key={id}
                id={id}
                className="scroll-mt-28 rounded-2xl border border-[#0E1116]/10 bg-white/60 p-6 md:p-8 shadow-[0_12px_32px_-16px_rgba(14,17,22,0.18)]"
              >
                <div className="flex items-start gap-5 mb-5">
                  <div className="w-12 h-12 rounded-full bg-[#F26A1F]/10 border border-[#F26A1F]/30 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#F26A1F]" />
                  </div>
                  <div>
                    <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-[#B7541F] mb-1">
                      {eyebrow}
                    </p>
                    <h2 className="font-syne font-bold text-2xl md:text-[28px] text-[#0E1116] tracking-[-0.01em]">
                      {title}
                    </h2>
                  </div>
                </div>
                <div className="pl-0 md:pl-[68px]">{body}</div>
              </article>
            ))}
          </div>
        </section>

        {/* Sign-off */}
        <section className="bg-[#0E1116] text-[#FBEADB]">
          <div className="max-w-4xl mx-auto px-4 md:px-6 py-20 md:py-24 text-center">
            <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#F26A1F] mb-4">
              One last note
            </p>
            <h2
              className="font-syne font-extrabold tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(28px, 3.8vw, 44px)", lineHeight: 1.15 }}
            >
              We design every Signature Edition to be kept and cherished.
            </h2>
            <p className="font-dm text-[#FBEADB]/75 text-lg leading-[1.8] max-w-2xl mx-auto mb-8">
              Our return rate is very low, but if you have any questions
              before or after ordering, please reach out. We&apos;re real
              people who love puzzles and are happy to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="mailto:support@edgewoodpuzzle.com"
                className="inline-flex items-center gap-2 bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold text-sm px-6 py-3 rounded-full transition shadow-[0_10px_28px_-6px_rgba(242,106,31,0.55)]"
              >
                <Mail size={16} />
                support@edgewoodpuzzle.com
              </a>
              <Link
                href="/about#contact"
                className="inline-flex items-center gap-2 font-dm font-bold text-sm text-[#FBEADB] hover:text-[#F26A1F] transition border-b-2 border-[#FBEADB] hover:border-[#F26A1F] pb-0.5"
              >
                Contact the team
              </Link>
            </div>
            <p className="font-dm text-sm text-[#FBEADB]/50 mt-10">
              Thank you for choosing Edgewood Puzzle.
            </p>
            <p className="font-dm italic text-[#FBEADB]/60">
              The Edgewood Puzzle Team
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
