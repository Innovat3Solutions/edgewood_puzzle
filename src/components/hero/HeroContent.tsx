"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroContent() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { y: 24, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-16 pointer-events-none">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto flex flex-col items-center pointer-events-auto"
      >
        <motion.h1 
          variants={item}
          className="font-syne font-extrabold text-[clamp(52px,9vw,112px)] leading-[0.92] tracking-[-0.02em] text-white mb-6 drop-shadow-2xl"
        >
          Piece Together the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold2 to-purple drop-shadow-none glow-text">Universe</span>
        </motion.h1>

        <motion.p 
          variants={item}
          className="font-dm text-lg md:text-2xl text-muted max-w-2xl mb-10 leading-[1.6]"
        >
          Premium American-Made Jigsaw Puzzles from NASA's Most Powerful Telescopes
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Link 
            href="/shop" 
            className="bg-gold hover:bg-gold2 text-navy font-bold text-lg px-8 py-4 rounded btn-hover clip-puzzle-notch w-full sm:w-auto"
          >
            Shop the Collection
          </Link>
          <Link 
            href="/play" 
            className="border-2 border-white text-white hover:border-gold hover:text-gold font-bold text-lg px-8 py-4 rounded transition-all w-full sm:w-auto"
          >
            Try the Puzzle Experience
          </Link>
        </motion.div>

        <motion.div variants={item} className="w-full">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base font-dm font-medium text-white/80 border-t border-border-gold pt-8">
            <span className="flex items-center gap-2">🇺🇸 Made in USA</span>
            <span className="hidden md:block text-gold/30">•</span>
            <span className="flex items-center gap-2">🔭 NASA Licensed</span>
            <span className="hidden md:block text-gold/30">•</span>
            <span className="flex items-center gap-2">🌱 ClimatePartner</span>
            <span className="hidden md:block text-gold/30">•</span>
            <span>300 / 500 / 1000 Pieces</span>
            <span className="hidden sm:block text-gold/30">•</span>
            <span className="hidden sm:block">5+ Collections</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Custom styles just for scoped overrides */}
      <style>{`
        .glow-text {
          filter: drop-shadow(0 0 20px rgba(245, 166, 35, 0.3));
        }
      `}</style>
    </div>
  );
}
