import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
      style={{
        background: "linear-gradient(to bottom, #000000 60%, transparent)",
      }}
    >
      <span className="font-display text-xl text-white tracking-wide">
        ensō
      </span>
      <div className="flex items-center gap-6">
        <a
          href="#how-it-works"
          className="text-sm text-[#6c7584] hover:text-white transition-colors duration-300"
        >
          How it works
        </a>
        <button className="text-sm px-5 py-2 bg-[#298dff] text-white rounded-full hover:bg-[#1a7ae8] transition-all duration-300">
          Sign in
        </button>
      </div>
    </motion.nav>
  );
}
