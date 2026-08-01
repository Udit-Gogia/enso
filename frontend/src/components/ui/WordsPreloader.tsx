// src/components/common/WordsPreloader.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Word = {
  text: string;
  color: string;
};

const WELCOME_WORDS: Word[] = [
  {
    text: "Welcome",
    color: "#7e7de8",
  },
  {
    text: "Bonjour",
    color: "#F26B61",
  },
  {
    text: "¡Hola!",
    color: "#F7C948",
  },
  {
    text: "नमस्ते",
    color: "#5CC67A",
  },
  {
    text: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",
    color: "#F5F5F5",
  },
];

interface WordsPreloaderProps {
  words?: Word[];
  /** ms each word is shown before advancing to the next */
  wordDuration?: number;
  /** extra ms to hold on the final word before the wipe starts */
  holdOnLast?: number;
  /** called once the panel has fully slid off-screen — unmount the preloader here */
  onComplete?: () => void;
}

export function WordsPreloader({
  words = WELCOME_WORDS,
  wordDuration = 650,
  holdOnLast = 400,
  onComplete,
}: WordsPreloaderProps) {
  const [index, setIndex] = useState(0);
  const [wiping, setWiping] = useState(false);

  useEffect(() => {
    if (index < words.length - 1) {
      const t = setTimeout(() => setIndex((i) => i + 1), wordDuration);
      return () => clearTimeout(t);
    }
    // reached the last word — hold briefly, then start the wipe
    const t = setTimeout(() => setWiping(true), wordDuration + holdOnLast);
    return () => clearTimeout(t);
  }, [index, words.length, wordDuration, holdOnLast]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col"
      initial={{ y: 0 }}
      animate={{ y: wiping ? "-100%" : 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (wiping) onComplete?.();
      }}
    >
      <div className="relative flex flex-1 items-center justify-center bg-black">
        <AnimatePresence mode="wait">
          <motion.p
            key={words[index].text}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-bold  md:text-7xl"
            style={{ color: words[index].color }}
          >
            {words[index].text}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Wavy bottom edge — same fill as the panel above it, so there's no
          seam to hide (unlike ScallopDivider, which bridges two different
          colors and needs the negative-margin overlap trick). */}
      <svg
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        className="block h-16 w-full md:h-24"
      >
        <path
          d="M0,0 C25,16 75,-4 100,6 L100,20 L0,20 Z"
          className="fill-black"
        />
      </svg>
    </motion.div>
  );
}
