"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const CANDLE_COUNT = 5;

export default function Cake({ onContinue }) {
  const [lit, setLit] = useState(Array(CANDLE_COUNT).fill(true));
  const [smoking, setSmoking] = useState(Array(CANDLE_COUNT).fill(false));
  const [blownOut, setBlownOut] = useState(false);

  const handleBlow = () => {
    if (blownOut) return;

    // blow out candles one at a time
    lit.forEach((_, i) => {
      setTimeout(() => {
        // flame goes out
        setLit((prev) => {
          const next = [...prev];
          next[i] = false;
          return next;
        });

        // smoke appears just after the flame starts exiting
        setTimeout(() => {
          setSmoking((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 200);
      }, i * 250);
    });

    // after all candles are out, fire confetti + show done state
    const totalTime = CANDLE_COUNT * 250 + 400;
    setTimeout(() => {
      setBlownOut(true);
      fireConfetti();
    }, totalTime);
  };

  const fireConfetti = () => {
    const duration = 2500;
    const end = Date.now() + duration;

    const colors = ["#fcd34d", "#fbbf24", "#f59e0b", "#ea580c", "#0d9488", "#fef9f3"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.8 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.8 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-[#94a3b8] text-sm tracking-[0.25em] uppercase mb-4"
      >
        One more thing before you go
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-2xl md:text-3xl font-light mb-16 bg-gradient-to-r from-[#fcd34d] via-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent"
      >
        Make a wish, Chief.
      </motion.h2>

      {/* Cake */}
      <motion.button
        onClick={handleBlow}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        whileHover={{ scale: blownOut ? 1 : 1.03 }}
        whileTap={{ scale: blownOut ? 1 : 0.98 }}
        className="relative cursor-pointer"
        aria-label="Blow out the candles"
      >
        <div className="relative flex flex-col items-center">
          {/* Candles + flames + smoke */}
          <div className="flex gap-6 mb-1">
            {lit.map((isLit, i) => (
              <div key={i} className="relative flex flex-col items-center">
                {/* flame / smoke zone */}
                <div className="relative h-10 w-6 flex items-end justify-center">
                  {/* flame */}
                  <AnimatePresence>
                    {isLit && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                          opacity: 1,
                          scale: [1, 1.08, 1],
                          y: [0, -1, 0],
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0,
                          y: -25,
                        }}
                        transition={{
                          opacity: { duration: 0.4 },
                          scale: { duration: 0.4 },
                          y: { duration: 0.4 },
                          // infinite flicker only while lit
                          ...(isLit && {
                            scale: {
                              duration: 0.6,
                              repeat: Infinity,
                              repeatType: "reverse",
                            },
                            y: {
                              duration: 0.8,
                              repeat: Infinity,
                              repeatType: "reverse",
                            },
                          }),
                        }}
                        className="w-2 h-4 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 70%, #fef9f3 0%, #fcd34d 40%, #f59e0b 100%)",
                          boxShadow: "0 0 15px rgba(251,191,36,0.8)",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* smoke puff */}
                  <AnimatePresence>
                    {smoking[i] && (
                      <motion.div
                        initial={{ opacity: 0.5, scale: 0.4, y: 0, x: 0 }}
                        animate={{
                          opacity: 0,
                          scale: 1.6,
                          y: -30,
                          x: [0, 4, -3, 2, 0],
                        }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute bottom-0 w-3 h-3 rounded-full pointer-events-none"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(220,220,220,0.7) 0%, rgba(220,220,220,0) 70%)",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* candle stick */}
                <div
                  className="w-1.5 h-10 rounded-sm"
                  style={{
                    background:
                      "linear-gradient(180deg, #fcd34d 0%, #f59e0b 100%)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Cake body */}
          <div className="relative">
            <div
              className="w-56 h-10 rounded-t-lg"
              style={{
                background:
                  "linear-gradient(180deg, #fef9f3 0%, #fcd34d 100%)",
              }}
            />
            <div className="flex justify-around -mt-1 px-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-4 rounded-b-full"
                  style={{
                    background:
                      "linear-gradient(180deg, #fcd34d 0%, #f59e0b 100%)",
                  }}
                />
              ))}
            </div>
            <div
              className="w-56 h-20 rounded-b-lg"
              style={{
                background:
                  "linear-gradient(180deg, #f59e0b 0%, #ea580c 100%)",
                boxShadow: "0 10px 40px rgba(245,158,11,0.35)",
              }}
            />
          </div>
        </div>
      </motion.button>

      {/* instruction / result */}
      <div className="mt-12 h-24 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!blownOut ? (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-[#94a3b8] text-sm tracking-[0.2em] italic"
            >
              Click to blow out the candles
            </motion.p>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center gap-6"
            >
              <p className="text-[#fcd34d] text-xl font-light">
                Wish granted. 🕯️
              </p>
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