"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LETTER_LINES = [
  "Master, Morning sir!",
  "Happy birthday, Infinito.",
  "I've been thinking about what to say to a man who already has a chieftaincy title, a badge, and a nickname that means 'infinite.' What do you give the guy who already carries so much?",
  "So I built you this instead.",
  "Thank you for believing in me, even before I could fully see what I was capable of. You sponsored my trainings, bought me my first laptop, and gave me the opportunity to become the developer I am today. But beyond all that, you gave me a home, food, shelter, love, and the kind of support that money alone could never measure. A huge part of the man I am becoming is because you chose to invest in me.",
  "Sometimes, I wonder if you truly understand how much your sacrifices mean to me. You haven't just helped me learn a skill; you've helped me build a future. And I pray that one day, I become someone who makes you look back at everything you've done for me and smile with pride. I hope I can give you even a fraction of the happiness, comfort, and peace you've given me.",
  "On your birthday, my prayer is that God blesses you beyond anything you could ever ask for. May He reward every sacrifice you've made in silence, replenish every strength you've spent on others, and grant you good health, long life, peace of mind, and unending joy. May doors open for you in places you never imagined, may your efforts never be wasted, and may you always have reasons to smile. May the same God who has used you to be a blessing in my life surround you with blessings of your own.",
  "Thank you for being more than a brother to me. Thank you for being a pillar, a guide, a provider, and one of the greatest blessings God has placed in my life. No website, letter, or gift could ever fully express my gratitude, but I hope this little corner of the internet reminds you of how deeply you are loved and appreciated.",
  "Happy birthday, Master. May your years ahead be filled with everything beautiful that your heart deserves. I love you, and I pray that I make you proud.",
  "Happy birthday, Master. 🕯️",
];

const CHAR_SPEED = 35;      // ms per character
const LINE_PAUSE = 900;     // ms pause between lines
const START_DELAY = 800;    // ms before first line

export default function Letter({ onContinue }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [started, setStarted] = useState(false);
  const containerRef = useRef(null);

  // initial delay before typing starts
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), START_DELAY);
    return () => clearTimeout(t);
  }, []);

  // typing engine
  useEffect(() => {
    if (!started) return;
    if (currentLine >= LETTER_LINES.length) return;

    const line = LETTER_LINES[currentLine];

    if (currentChar < line.length) {
      const t = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, CHAR_SPEED);
      return () => clearTimeout(t);
    }

    // line finished — pause, then move to next line
    const t = setTimeout(() => {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, LINE_PAUSE);
    return () => clearTimeout(t);
  }, [started, currentLine, currentChar]);

  // auto-scroll as text grows
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [currentChar, currentLine]);

  const done = currentLine >= LETTER_LINES.length;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-2xl rounded-2xl p-8 md:p-12"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(251,191,36,0.15)",
          boxShadow: "0 0 60px rgba(251,191,36,0.08)",
          backdropFilter: "blur(8px)",
        }}
      >
        {LETTER_LINES.slice(0, currentLine).map((line, i) => (
          <p
            key={i}
            className={`mb-5 leading-relaxed ${
              i === 0
                ? "text-[#fcd34d] text-lg tracking-wide"
                : i === LETTER_LINES.length - 1
                ? "text-[#fcd34d] text-lg"
                : "text-[#fef9f3] text-base md:text-lg font-light"
            }`}
          >
            {line}
          </p>
        ))}

        {currentLine < LETTER_LINES.length && (
          <p
            className={`mb-5 leading-relaxed ${
              currentLine === 0
                ? "text-[#fcd34d] text-lg tracking-wide"
                : currentLine === LETTER_LINES.length - 1
                ? "text-[#fcd34d] text-lg"
                : "text-[#fef9f3] text-base md:text-lg font-light"
            }`}
          >
            {LETTER_LINES[currentLine].slice(0, currentChar)}
            <span className="inline-block w-[2px] h-[1em] bg-[#fbbf24] ml-1 align-middle animate-pulse" />
          </p>
        )}

        <div ref={containerRef} />

        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-10 flex justify-end"
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
      </motion.div>
    </div>
  );
}