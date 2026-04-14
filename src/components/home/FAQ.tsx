const faqs = [
  {
    q: "How do the piece counts compare?",
    a: "500 pieces is a relaxed evening or two. 1000 pieces is the classic weekend build. 1500 pieces is a week-long centerpiece you won't want to take apart.",
  },
  {
    q: "What are the finished dimensions?",
    a: "500pc → 20 × 14 in. 1000pc → 26.5 × 19.25 in. 1500pc → 31.5 × 23.5 in. Every box lists exact millimeters.",
  },
  {
    q: "I lost a piece. What now?",
    a: "Email us with your order number and we'll cut and ship a replacement free of charge — as long as Edgewood exists, your puzzle is complete.",
  },
  {
    q: "Can I frame the finished puzzle?",
    a: "Yes. The matte finish photographs well and takes glue or peel-and-stick sheets cleanly. Standard frame sizes fit all three piece counts.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders ship from Indiana within 48 hours. US delivery is 3–5 business days, free over $50. International shipping is available at checkout.",
  },
];

export default function FAQ() {
  return (
    <section className="relative py-24 md:py-32 px-4 bg-[#FBEADB]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-dm text-[11px] md:text-sm uppercase tracking-[0.28em] text-[#B7541F] mb-4">
            Questions
          </p>
          <h2
            className="font-syne font-extrabold text-[#0E1116] tracking-[-0.025em]"
            style={{ fontSize: "clamp(36px, 4.5vw, 60px)", lineHeight: 1.05 }}
          >
            Before you commit to a build.
          </h2>
        </div>
        <div className="divide-y divide-[#0E1116]/15 border-y border-[#0E1116]/15">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-syne font-bold text-xl text-[#0E1116] pr-6">
                  {f.q}
                </span>
                <span className="text-[#F26A1F] text-2xl shrink-0 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="font-dm text-[#55555E] mt-4 leading-[1.75] max-w-3xl">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
