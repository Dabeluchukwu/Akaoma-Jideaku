"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const REASONS = [
  "Because you go above and beyond for your loved ones.",
  "Because you always make me feel like everything is possible and nothing can stop me as long as i am with you.",
  "Because you have always shown me nothing but unconditional love, even when i misbehave(and i know i misbehave a lot😅).",
  "Because you make 'showing up' look easy, even when it isn't.",
  "Because you always give more than you take.",
  "Because you are INFINITO SENIOR MAN!!!!.",
];

export default function Reasons({ onContinue }) {
  const [flipped, setFlipped] = useState(Array(REASONS.length).fill(false));
  const [seen, setSeen] = useState(Array(REASONS.length).fill(false));

  const toggle = (i) => {
    setFlipped((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });

    // mark as seen the first time it is flipped open
    setSeen((prev) => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  const allSeen = seen.every(Boolean);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-[#94a3b8] text-sm tracking-[0.25em] uppercase mb-4 text-center"
      >
        A few reasons
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-2xl md:text-3xl font-light mb-4 text-center bg-gradient-to-r from-[#fcd34d] via-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent"
      >
        Why you're worth celebrating
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-[#94a3b8] text-sm italic mb-16 text-center"
      >
        Tap each card to flip it.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
        {REASONS.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
            className="relative h-48 cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={() => toggle(i)}
          >
            <motion.div
              animate={{ rotateY: flipped[i] ? 180 : 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* front */}
              <div
                className="absolute inset-0 rounded-xl flex items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  background:
                    "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(245,158,11,0.05) 100%)",
                  border: "1px solid rgba(251,191,36,0.25)",
                  boxShadow: "0 0 30px rgba(251,191,36,0.1)",
                }}
              >
                <p className="text-[#fcd34d] text-sm tracking-[0.3em] uppercase">
                  Reason #{i + 1}
                </p>
              </div>

              {/* back */}
              <div
                className="absolute inset-0 rounded-xl flex items-center justify-center p-6"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background:
                    "linear-gradient(135deg, rgba(13,148,136,0.15) 0%, rgba(251,191,36,0.08) 100%)",
                  border: "1px solid rgba(13,148,136,0.3)",
                  boxShadow: "0 0 30px rgba(13,148,136,0.15)",
                }}
              >
                <p className="text-[#fef9f3] text-base font-light leading-relaxed text-center">
                  {reason}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {allSeen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-16"
        >
          <button
            onClick={onContinue}
            className="px-8 py-2.5 text-sm tracking-[0.2em] text-[#0a1128] font-medium rounded-full transition-all duration-500 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)",
              boxShadow: "0 0 25px rgba(251,191,36,0.35)",
            }}
          >
            Continue →
          </button>
        </motion.div>
      )}
    </div>
  );
}