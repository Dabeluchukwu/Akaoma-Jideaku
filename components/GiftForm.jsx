"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FiGift, FiCheck } from "react-icons/fi";

export default function GiftForm() {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending" || status === "sent") return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bankName, accountNumber, accountName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Try again.");
        return;
      }

      setStatus("sent");
      fireConfetti();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ["#fcd34d", "#fbbf24", "#f59e0b", "#ea580c", "#0d9488", "#fef9f3"];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
      <AnimatePresence mode="wait">
        {status !== "sent" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex justify-center mb-6"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)",
                  boxShadow: "0 0 30px rgba(251,191,36,0.4)",
                }}
              >
                <FiGift className="text-[#0a1128] w-7 h-7" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl md:text-3xl font-light mb-4 bg-gradient-to-r from-[#fcd34d] via-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent"
            >
              I wanted to give you something real.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-[#94a3b8] text-sm italic mb-10"
            >
              Drop your details below and I'll send it over.
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div>
                <label className="text-[#94a3b8] text-xs tracking-[0.15em] uppercase block mb-2">
                  Bank Name
                </label>
                <input
                  type="text"
                  required
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  disabled={status === "sending"}
                  className="w-full bg-transparent border-b border-[#94a3b8]/30 focus:border-[#fbbf24] outline-none text-[#fef9f3] py-2 transition-colors duration-300"
                  placeholder="e.g. GTBank"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] text-xs tracking-[0.15em] uppercase block mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  maxLength={10}
                  value={accountNumber}
                  onChange={(e) =>
                    setAccountNumber(e.target.value.replace(/\D/g, ""))
                  }
                  disabled={status === "sending"}
                  className="w-full bg-transparent border-b border-[#94a3b8]/30 focus:border-[#fbbf24] outline-none text-[#fef9f3] py-2 tracking-widest transition-colors duration-300"
                  placeholder="10 digits"
                />
              </div>

              <div>
                <label className="text-[#94a3b8] text-xs tracking-[0.15em] uppercase block mb-2">
                  Account Name <span className="italic normal-case">(optional)</span>
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  disabled={status === "sending"}
                  className="w-full bg-transparent border-b border-[#94a3b8]/30 focus:border-[#fbbf24] outline-none text-[#fef9f3] py-2 transition-colors duration-300"
                  placeholder="Name on the account"
                />
              </div>

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#ea580c] text-sm text-center"
                >
                  {errorMsg}
                </motion.p>
              )}

              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-10 py-3 text-sm tracking-[0.2em] text-[#0a1128] font-medium rounded-full transition-all duration-500 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)",
                    boxShadow: "0 0 25px rgba(251,191,36,0.35)",
                  }}
                >
                  {status === "sending" ? "Sending…" : "Send"}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center gap-6 max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, #0d9488 0%, #f59e0b 100%)",
                boxShadow: "0 0 40px rgba(13,148,136,0.5)",
              }}
            >
              <FiCheck className="text-[#fef9f3] w-10 h-10" />
            </motion.div>

            <h2 className="text-2xl md:text-3xl font-light text-[#fcd34d]">
              Got it.
            </h2>

            <p className="text-[#fef9f3] text-base font-light leading-relaxed">
              Check your bank soon.
            </p>

            <p className="text-[#94a3b8] text-sm italic">
              Happy birthday, Master. 🎉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}