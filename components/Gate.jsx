"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Gate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = value.trim().toLowerCase();

    if (answer === "infinito") {
      sessionStorage.setItem("unlocked", "true");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex items-center justify-center px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(251,191,36,0.12), transparent 50%), radial-gradient(circle at 80% 80%, rgba(13,148,136,0.12), transparent 50%), linear-gradient(135deg, #0a1128 0%, #1c2541 50%, #0a1128 100%)",
      }}
    >
      <motion.form
        onSubmit={handleSubmit}
        animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[#94a3b8] text-sm mb-6 tracking-[0.2em] uppercase"
        >
          Before we begin…
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl font-light mb-10 bg-gradient-to-r from-[#fcd34d] via-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent"
        >
          What do I call you?
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(false);
            }}
            autoFocus
            className="w-full bg-transparent border-b-2 border-[#94a3b8]/40 focus:border-[#fbbf24] outline-none text-[#fef9f3] text-center py-3 text-lg tracking-widest transition-colors duration-500"
          />

          <p className="text-[#94a3b8]/70 text-xs mt-4 italic">
            It's something I call you every day.
          </p>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#ea580c] text-sm mt-6"
            >
              Hmm, that's not it. Try again.
            </motion.p>
          )}

          <button
            type="submit"
            className="mt-10 px-10 py-2.5 text-sm tracking-[0.2em] text-[#0a1128] font-medium rounded-full transition-all duration-500 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)",
              boxShadow: "0 0 30px rgba(251,191,36,0.4)",
            }}
          >
            ENTER
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}