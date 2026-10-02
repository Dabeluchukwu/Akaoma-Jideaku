"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FiGift } from "react-icons/fi";

export default function Intro({ onContinue }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);

    // confetti burst
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#fcd34d", "#fbbf24", "#f59e0b", "#0d9488", "#fef9f3"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#fcd34d", "#fbbf24", "#f59e0b", "#0d9488", "#fef9f3"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-[#94a3b8] text-sm tracking-[0.25em] uppercase mb-10"
      >
        Infinito Senior Man…
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-2xl md:text-3xl font-light mb-14 text-[#fef9f3]"
      >
        I made something for you.
      </motion.h1>

      {/* Gift box */}
      <motion.button
        onClick={handleOpen}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        whileHover={{ scale: opened ? 1 : 1.05 }}
        whileTap={{ scale: opened ? 1 : 0.97 }}
        className="relative cursor-pointer"
        aria-label="Open gift"
      >
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* glow */}
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            style={{ background: "rgba(251,191,36,0.25)" }}
          />

          {/* box body */}
          <motion.div
            animate={
              opened
                ? { y: 10, opacity: 0.9 }
                : { y: [0, -6, 0] }
            }
            transition={
              opened
                ? { duration: 1 }
                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative z-10 w-24 h-24 rounded-md flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
              boxShadow: "0 0 40px rgba(245,158,11,0.45)",
            }}
          >
            <FiGift className="text-[#0a1128] w-10 h-10" />
          </motion.div>

          {/* lid */}
          <AnimatePresence>
            {!opened && (
              <motion.div
                exit={{ y: -60, rotate: -20, opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute top-6 z-20 w-28 h-6 rounded-sm"
                style={{
                  background:
                    "linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%)",
                  boxShadow: "0 0 20px rgba(251,191,36,0.5)",
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* hint / banner */}
      <div className="mt-10 h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-[#94a3b8] text-sm tracking-[0.2em] italic"
            >
              Tap to open
            </motion.p>
          ) : (
            <motion.div
              key="banner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <h2
                className="text-3xl md:text-4xl font-light bg-gradient-to-r from-[#fcd34d] via-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent"
              >
                Happy Birthday, Chief Akaoma Jideaku 🎉
              </h2>

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
        </AnimatePresence>
      </div>
    </div>
  );
}