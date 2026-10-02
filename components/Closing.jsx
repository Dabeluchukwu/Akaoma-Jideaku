"use client";

import { motion } from "framer-motion";

export default function Closing({ onContinue }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-[#94a3b8] text-sm tracking-[0.25em] uppercase mb-10"
      >
        Before you go
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1.2 }}
        className="text-2xl md:text-3xl font-light text-[#fef9f3] max-w-xl leading-relaxed mb-8"
      >
        Thanks for being you, Chief.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1.2 }}
        className="text-[#94a3b8] text-base md:text-lg font-light italic max-w-xl leading-relaxed mb-16"
      >
        Not the title. Not the badge. Not the nickname.
        <br />
        Just you.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1.2 }}
        className="text-[#fcd34d] text-lg tracking-wider mb-4"
      >
        Happy birthday, Master.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        className="text-[#94a3b8] text-sm tracking-[0.2em] uppercase mb-20"
      >
        — Your small one
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.2 }}
        onClick={onContinue}
        className="px-8 py-3 text-sm tracking-[0.2em] text-[#fef9f3] rounded-full transition-all duration-500 hover:scale-105"
        style={{
          background:
            "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(13,148,136,0.15) 100%)",
          border: "1px solid rgba(251,191,36,0.3)",
          boxShadow: "0 0 25px rgba(251,191,36,0.15)",
        }}
      >
        One more thing…
      </motion.button>
    </div>
  );
}