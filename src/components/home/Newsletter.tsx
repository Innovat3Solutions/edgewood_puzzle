import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-[#0E1116]">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #F26A1F 0, transparent 40%), radial-gradient(circle at 85% 80%, #FBEADB 0, transparent 45%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F26A1F]/40 bg-[#F26A1F]/10 mb-6">
          <Mail size={14} className="text-[#F26A1F]" />
          <span className="font-dm text-xs uppercase tracking-[0.28em] text-[#F26A1F]">
            The Edgewood Letter
          </span>
        </div>

        <h2
          className="font-syne font-extrabold text-[#FBEADB] tracking-[-0.025em] mb-5"
          style={{ fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1.05 }}
        >
          First look at every new drop.
        </h2>
        <p className="font-dm text-lg text-[#FBEADB]/70 max-w-xl mx-auto mb-10 leading-relaxed">
          A short monthly note from our studio. New collections, artist stories,
          and early access for subscribers — no noise.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="you@domain.com"
            className="flex-1 bg-white/5 border border-white/15 focus:border-[#F26A1F] text-white placeholder:text-white/40 rounded-md px-4 py-3 font-dm outline-none transition"
          />
          <button
            type="submit"
            className="bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold px-6 py-3 rounded-md transition shadow-[0_10px_30px_-5px_rgba(242,106,31,0.45)]"
          >
            Subscribe
          </button>
        </form>

        <p className="font-dm text-xs text-[#FBEADB]/50 mt-4">
          We&apos;ll never share your address. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
