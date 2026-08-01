import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function Reveal({
  children,
  delay = 0,
  triggerOnView,
}: {
  children: React.ReactNode;
  delay?: number;
  triggerOnView?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  const play = (!triggerOnView || inView) && !shouldReduceMotion;
  return (
    <motion.div
      ref={ref}
      animate={play ? undefined : { opacity: 0 }}
      initial={{
        opacity: 0,
        y: 8,
        filter: "blur(8px)",
      }}
      whileInView={
        play
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          : undefined
      }
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
