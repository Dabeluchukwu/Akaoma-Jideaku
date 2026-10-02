"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const MEMORIES = [
  {
    src: "/photos/1.jpg",
    caption: "The day we first met.",
  },
  {
    src: "/photos/2.jpg",
    caption: "That laugh I'll never forget.",
  },
  {
    src: "/photos/3.jpg",
    caption: "You, showing up like always.",
  },
  {
    src: "/photos/4.jpg",
    caption: "Chief in the making.",
  },
  {
    src: "/photos/5.jpg",
    caption: "A moment only we understand.",
  },
  {
    src: "/photos/6.jpg",
    caption: "Still my favorite person.",
  },
];

export default function Memories({ onContinue }) {
  return (
    <div className="min-h-screen px-6 py-24 max-w-4xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-[#94a3b8] text-sm tracking-[0.25em] uppercase text-center mb-4"
      >
        A few moments
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-2xl md:text-3xl font-light text-center mb-20 bg-gradient-to-r from-[#fcd34d] via-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent"
      >
        Worth remembering
      </motion.h2>

      <div className="space-y-24">
        {MEMORIES.map((memory, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`flex flex-col ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-8`}
          >
            {/* Photo */}
            <div className="relative w-full md:w-1/2">
              <div
                className="absolute -inset-4 rounded-2xl blur-2xl"
                style={{ background: "rgba(251,191,36,0.12)" }}
              />
              <div
                className="relative rounded-xl overflow-hidden"
                style={{
                  border: "1px solid rgba(251,191,36,0.2)",
                  boxShadow: "0 0 40px rgba(251,191,36,0.15)",
                }}
              >
                <Image
                  src={memory.src}
                  alt={memory.caption}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Caption */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <p
                className="text-[#fef9f3] text-lg md:text-xl font-light italic leading-relaxed"
                style={{ fontFamily: "var(--font-handwriting, inherit)" }}
              >
                "{memory.caption}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-24 flex justify-center"
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
    </div>
  );
}