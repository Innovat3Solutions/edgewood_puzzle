"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShieldCheck,
  PackageOpen,
  CheckCircle2,
  XCircle,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

type PolicyKey = "policy" | "how";

const canReturn = [
  "Unopened, unused puzzles in their original shrink-wrapped condition.",
  "Return window: 30 days from the date you receive your order.",
];

const cannotReturn = [
  "Opened puzzles (once the shrink wrap is removed, the puzzle is considered used).",
  "Custom or personalized items.",
  "Puzzles damaged by the customer after delivery.",
];

const howSteps = [
  {
    title: "Email us",
    body: (
      <>
        Reach out to{" "}
        <a
          href="mailto:support@edgewoodpuzzle.com"
          className="text-[#F26A1F] underline underline-offset-2 hover:text-[#E05A10]"
        >
          support@edgewoodpuzzle.com
        </a>{" "}
        with your order number and reason for return.
      </>
    ),
  },
  {
    title: "Get a prepaid label",
    body: "We will send you a prepaid return shipping label (U.S. orders only).",
  },
  {
    title: "Ship it back",
    body: "Ship the unopened puzzle back in its original packaging.",
  },
  {
    title: "Receive your refund",
    body: "Once we receive and inspect the return, we issue a full refund to your original payment method within 5 to 7 business days.",
  },
];

export default function ReturnPolicyBar() {
  const [open, setOpen] = useState<PolicyKey | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <section className="bg-[#FBEADB] border-t border-[#0E1116]/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="text-center mb-10">
            <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#B7541F] mb-3">
              Buy with confidence
            </p>
            <h2
              className="font-syne font-extrabold text-[#0E1116] tracking-[-0.02em]"
              style={{ fontSize: "clamp(28px, 3.6vw, 44px)", lineHeight: 1.1 }}
            >
              A 30-day open-box guarantee.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <PolicyCard
              icon={ShieldCheck}
              eyebrow="Policy"
              title="Our Return Policy"
              blurb="What can be returned, refund details, and our promise on damaged items."
              onClick={() => setOpen("policy")}
            />
            <PolicyCard
              icon={PackageOpen}
              eyebrow="How to"
              title="How to Return"
              blurb="The four-step return process, from email to refund."
              onClick={() => setOpen("how")}
            />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-[#0E1116]/70 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={
              open === "policy" ? "Our Return Policy" : "How to Return"
            }
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{
                type: "tween",
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full md:max-w-2xl max-h-[92vh] bg-[#FBEADB] text-[#0E1116] rounded-t-3xl md:rounded-3xl shadow-[0_30px_80px_-10px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-8 py-5 border-b border-[#0E1116]/10 bg-[#FBEADB]">
                <div>
                  <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-[#B7541F] mb-1">
                    {open === "policy" ? "Policy" : "How to"}
                  </p>
                  <h3 className="font-syne font-bold text-2xl text-[#0E1116]">
                    {open === "policy" ? "Our Return Policy" : "How to Return"}
                  </h3>
                </div>
                <button
                  aria-label="Close"
                  onClick={() => setOpen(null)}
                  className="p-2 -mr-2 rounded-full text-[#0E1116] hover:bg-[#0E1116]/5 transition"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="overflow-y-auto px-6 md:px-8 py-7">
                {open === "policy" ? <PolicyBody /> : <HowBody />}
              </div>

              <div className="px-6 md:px-8 py-5 border-t border-[#0E1116]/10 bg-[#FBEADB] flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <a
                  href="mailto:support@edgewoodpuzzle.com"
                  className="inline-flex items-center gap-2 font-dm text-sm font-semibold text-[#0E1116] hover:text-[#F26A1F] transition"
                >
                  <Mail size={16} className="text-[#F26A1F]" />
                  support@edgewoodpuzzle.com
                </a>
                <Link
                  href="/shipping"
                  onClick={() => setOpen(null)}
                  className="inline-flex items-center gap-2 font-dm font-bold text-sm text-[#0E1116] hover:text-[#F26A1F] transition border-b-2 border-[#0E1116] hover:border-[#F26A1F] pb-0.5 self-start sm:self-auto"
                >
                  Read the full shipping & returns policy{" "}
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PolicyCard({
  icon: Icon,
  eyebrow,
  title,
  blurb,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  eyebrow: string;
  title: string;
  blurb: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left rounded-2xl border border-[#0E1116]/15 bg-white/60 hover:bg-white px-6 py-7 md:px-8 md:py-8 transition shadow-[0_12px_32px_-16px_rgba(14,17,22,0.2)] hover:shadow-[0_18px_40px_-14px_rgba(14,17,22,0.28)] hover:border-[#F26A1F]/40"
    >
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-full bg-[#F26A1F]/10 border border-[#F26A1F]/30 flex items-center justify-center shrink-0 group-hover:bg-[#F26A1F]/20 transition">
          <Icon size={20} className="text-[#F26A1F]" />
        </div>
        <div className="flex-1">
          <p className="font-dm text-[10px] uppercase tracking-[0.28em] text-[#B7541F] mb-1.5">
            {eyebrow}
          </p>
          <h3 className="font-syne font-bold text-xl md:text-2xl text-[#0E1116] mb-2 group-hover:text-[#F26A1F] transition">
            {title}
          </h3>
          <p className="font-dm text-[15px] text-[#55555E] leading-relaxed">
            {blurb}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-dm text-sm font-semibold text-[#0E1116] group-hover:text-[#F26A1F] transition">
            View details <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </button>
  );
}

function PolicyBody() {
  return (
    <div className="space-y-8">
      <p className="font-dm text-[15px] md:text-base text-[#55555E] leading-[1.75]">
        We offer a <strong className="text-[#0E1116]">30-day open-box</strong>{" "}
        return window because we know you&apos;ll want to see (and feel) the
        quality in person.
      </p>

      <div>
        <h4 className="font-syne font-bold text-lg text-[#0E1116] mb-3">
          What can be returned
        </h4>
        <ul className="space-y-2.5">
          {canReturn.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 font-dm text-[15px] text-[#55555E] leading-relaxed"
            >
              <CheckCircle2
                size={18}
                className="text-[#2E8B57] shrink-0 mt-0.5"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-syne font-bold text-lg text-[#0E1116] mb-3">
          What cannot be returned
        </h4>
        <ul className="space-y-2.5">
          {cannotReturn.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 font-dm text-[15px] text-[#55555E] leading-relaxed"
            >
              <XCircle size={18} className="text-[#B7541F] shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-[#0E1116] text-[#FBEADB] p-5 md:p-6">
        <h4 className="font-syne font-bold text-lg mb-2">
          Damaged or defective?
        </h4>
        <p className="font-dm text-[15px] text-[#FBEADB]/80 leading-relaxed">
          If your puzzle arrives damaged or with manufacturing defects, contact
          us within 7 days with photos and your order number. We&apos;ll send a
          replacement at no cost (or issue a full refund if a replacement
          isn&apos;t available).
        </p>
      </div>

      <div>
        <h4 className="font-syne font-bold text-lg text-[#0E1116] mb-3">
          Refunds
        </h4>
        <ul className="space-y-2 font-dm text-[15px] text-[#55555E] leading-relaxed list-disc pl-5">
          <li>Full refund of the purchase price plus any applicable taxes.</li>
          <li>
            Original shipping cost is refunded only if the return is due to our
            error (wrong item, damaged on arrival).
          </li>
          <li>Store credit is available as an option if you prefer.</li>
        </ul>
      </div>

      <p className="font-dm text-sm text-[#6A6A73] italic leading-relaxed">
        International customers are responsible for return shipping costs. We
        recommend using a trackable service.
      </p>
    </div>
  );
}

function HowBody() {
  return (
    <div className="space-y-6">
      <p className="font-dm text-[15px] md:text-base text-[#55555E] leading-[1.75]">
        Four simple steps. Our team responds fast. We&apos;re real people who
        love puzzles and are happy to help.
      </p>

      <ol className="space-y-4">
        {howSteps.map((s, i) => (
          <li
            key={s.title}
            className="relative flex gap-4 rounded-2xl border border-[#0E1116]/10 bg-white/60 px-5 py-5"
          >
            <div className="shrink-0 w-10 h-10 rounded-full bg-[#F26A1F] text-white font-syne font-extrabold text-lg flex items-center justify-center">
              {i + 1}
            </div>
            <div>
              <h4 className="font-syne font-bold text-lg text-[#0E1116] mb-1">
                {s.title}
              </h4>
              <p className="font-dm text-[15px] text-[#55555E] leading-relaxed">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-xl border border-[#F26A1F]/30 bg-[#F26A1F]/[0.06] p-5">
        <p className="font-dm text-sm text-[#55555E] leading-relaxed">
          <strong className="text-[#0E1116]">International returns:</strong>{" "}
          Customers outside the U.S. are responsible for return shipping costs.
          We recommend using a trackable service.
        </p>
      </div>
    </div>
  );
}
