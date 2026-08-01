"use client";
import React, { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  header,
  content,
  contentClassName,
  vhPerCard = 75,
  backdrop,
}: {
  header?: React.ReactNode;
  content: {
    title: React.ReactNode;
    description: string;
    accent: string;
    accentDeep: string;
    content?: React.ReactNode;
  }[];
  backdrop?: React.ReactNode;
  contentClassName?: string;
  vhPerCard?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastIndexRef = useRef(0);
  const [activeCard, setActiveCard] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      content.length - 1,
      Math.floor(latest * content.length),
    );
    if (index !== lastIndexRef.current) {
      setDirection(index > lastIndexRef.current ? 1 : -1);
      lastIndexRef.current = index;
      setActiveCard(index);
    }
  });

  const active = content[activeCard];

  const textVariants = {
    enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 24 : -24 }),
    center: { opacity: 1, y: 0 },
    exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -24 : 24 }),
  };

  return (
    <div
      ref={containerRef}
      style={{ height: `${content.length * vhPerCard}vh` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col">
        {backdrop && <div className="absolute inset-0 -z-10">{backdrop}</div>}

        <div className="relative pointer-events-none">{header}</div>

        <div className="flex h-[80vh] items-center justify-between px-24 pointer-events-none overflow-x-clip">
          <div className="relative max-w-2xl">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
              style={{
                width: "1600px",
                height: "1000px",
                background:
                  "radial-gradient(ellipse 720px 460px at 50% 48%, rgba(255,255,255,.9), rgba(255,255,255,0) 68%)",
              }}
            />
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeCard}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <h2 className="font-display text-3xl font-bold text-ink">
                    {active.title}
                  </h2>
                  <p className="text-secondary text-lg mt-10 max-w-sm text-justify">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.div
            animate={{
              background: `linear-gradient(135deg, ${active.accent}, ${active.accentDeep})`,
            }}
            transition={{ duration: 0.4 }}
            className={cn(
              "hidden w-[34vw] aspect-[4/3] items-center justify-center overflow-hidden rounded-md lg:flex",
              contentClassName,
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {active.content ?? null}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
