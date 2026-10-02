"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Gate from "@/components/Gate";
import Intro from "@/components/Intro";
import Letter from "@/components/Letter";
import Memories from "@/components/Memories";
import Cake from "@/components/Cake";
import Reasons from "@/components/Reasons";
import Closing from "@/components/Closing";
import GiftForm from "@/components/GiftForm";

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [section, setSection] = useState("intro");

  useEffect(() => {
    if (sessionStorage.getItem("unlocked") === "true") {
      setUnlocked(true);
    }
  }, []);

  return (
    <main
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(251,191,36,0.08), transparent 50%), radial-gradient(circle at 80% 80%, rgba(13,148,136,0.08), transparent 50%), linear-gradient(135deg, #0a1128 0%, #1c2541 50%, #0a1128 100%)",
      }}
    >
      <AnimatePresence>
        {!unlocked && <Gate onUnlock={() => setUnlocked(true)} />}
      </AnimatePresence>

      {unlocked && section === "intro" && (
        <Intro onContinue={() => setSection("letter")} />
      )}

      {unlocked && section === "letter" && (
        <Letter onContinue={() => setSection("memories")} />
      )}

      {unlocked && section === "memories" && (
        <Memories onContinue={() => setSection("cake")} />
      )}

      {unlocked && section === "cake" && (
        <Cake onContinue={() => setSection("reasons")} />
      )}

      {unlocked && section === "reasons" && (
        <Reasons onContinue={() => setSection("closing")} />
      )}

      {unlocked && section === "closing" && (
        <Closing onContinue={() => setSection("gift")} />
      )}

      {unlocked && section === "gift" && <GiftForm />}
    </main>
  );
}