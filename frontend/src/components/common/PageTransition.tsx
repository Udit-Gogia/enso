import { motion } from "framer-motion";

export default function PageTransition({
  children,
  slideUp = false,
}: {
  children: React.ReactNode;
  slideUp?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: slideUp ? 40 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: slideUp ? -20 : 0 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
