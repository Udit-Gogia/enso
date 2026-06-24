import { motion, type Variants } from "framer-motion";
import ensoLogo from "../assets/logo/Enso.svg";
// import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MagneticDots } from "@/components/MagneticDots";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const navLinks = ["How it works", "Join Enso"];

// const categories = [
//   { label: "Professionals Verified", color: "#5B5F6B" },
//   { label: "Every Job Reviewed", color: "#5B5F6B" },
//   { label: "Available Locally", color: "#34A853" },
// ];

// const avatars = ["#4285F4", "#EA4335", "#34A853", "#FBBC05"];

export function EnsoHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Interactive background */}
      <MagneticDots
        palette="Google"
        intensity={1}
        className="absolute inset-0 h-full w-full"
      />

      {/* Legibility scrim behind the centered content */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 720px 460px at 50% 48%, rgba(255,255,255,.9), rgba(255,255,255,0) 68%)",
        }}
      />

      <div className="pointer-events-none relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="flex items-end justify-between px-6 py-6 sm:px-10 lg:px-16">
          <div className="pointer-events-auto flex items-center gap-3">
            <img src={ensoLogo} alt="Enso Logo" className="h-6 w-6" />
            <span className="font-display text-2xl font-bold tracking-tight text-[#16161D]">
              Enso
            </span>
          </div>

          <nav className="pointer-events-auto hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[15px] font-medium text-[#5B5F6B] transition-colors hover:text-[#16161D]"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="pointer-events-auto flex items-center gap-4">
            <a
              href="#"
              className="text-[15px] font-semibold text-[#16161D] hover:opacity-70"
            >
              Log in
            </a>
            <Button variant="dark" className="hover:-translate-y-px">
              Create account
            </Button>
          </div>
        </header>

        {/* Hero */}
        <motion.main
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col items-center justify-center gap-7 px-6 pb-12 text-center"
        >
          {/* <motion.div
            variants={item}
            className="pointer-events-auto inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#E6E7EB] bg-white px-4 py-2 text-[13.5px] font-semibold text-[#16161D] shadow-[0_4px_14px_-6px_rgba(22,22,29,.12)]"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-[#34A853]" />
            Now live in 8 cities
          </motion.div> */}

          <motion.h1
            variants={item}
            className="m-0 max-w-[14ch] text-balance font-display text-[clamp(46px,6.4vw,80px)] font-bold leading-[1.02] tracking-[-0.035em] text-[#16161D]"
          >
            The right people <span className="text-[#1a73e8]">nearby.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="m-0 max-w-[600px] text-[clamp(17px,1.5vw,21px)] leading-[1.6] text-[#5B5F6B]"
          >
            Connect with trusted local businesses, skilled individuals, and
            everyday services - all in one place.
          </motion.p>

          <motion.div
            variants={item}
            className="pointer-events-auto mt-1 flex flex-wrap items-center justify-center gap-3.5"
          >
            <Button
              size="lg"
              className="bg-[#1a73e8] shadow-[0_14px_30px_-10px_rgba(26,115,232,.65)] hover:-translate-y-0.5 hover:bg-[#1666c8] hover:shadow-[0_20px_38px_-10px_rgba(26,115,232,.75)]"
            >
              Explore Enso
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#DADBE2] hover:-translate-y-0.5 hover:border-[#1a73e8]"
            >
              Join Enso
            </Button>
          </motion.div>

          {/* <motion.div
            variants={item}
            className="pointer-events-auto mt-2 flex max-w-[660px] flex-wrap justify-center"
          >
            {categories.map((c, index) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full  px-3 py-2 text-[14.5px] font-medium text-[#3A3D47] transition-colors="
              >
                {c.label}
                {index !== categories.length - 1 && (
                  <span
                    className="h-[7px] w-[7px] rounded-full ml-3"
                    style={{ background: c.color }}
                  />
                )}
              </span>
            ))}
          </motion.div> */}
        </motion.main>
      </div>
    </section>
  );
}
