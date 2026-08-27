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
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: slideUp ? -12 : 0 }}
      transition={{
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
