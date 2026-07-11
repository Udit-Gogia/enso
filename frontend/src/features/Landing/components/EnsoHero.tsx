import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MagneticDots } from "@/components/common/MagneticDots";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { hasSetupToken, isFirstTimeUser, isLoggedIn } from "@/lib/auth";

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

export function EnsoHero() {
  const navigate = useNavigate();

  const firstTimeUser = isFirstTimeUser();
  const setupPending = hasSetupToken();
  const loggedIn = isLoggedIn();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Interactive background */}
      <MagneticDots
        palette="Google"
        intensity={1}
        className="absolute inset-0 h-full w-full"
      />
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-10"
        style={{
          height: "120px",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0) 100%)",
        }}
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
        <Navbar />

        {/* Hero */}
        <motion.main
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col items-center justify-center gap-7 px-6 pb-12 text-center"
        >
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
              className="bg-primary text-white shadow-cta hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-cta transition-all duration-200"
            >
              Explore Enso
            </Button>
            {(firstTimeUser || !loggedIn) && !setupPending && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/register")}
                className="border-border-input text-ink hover:-translate-y-0.5 hover:border-primary hover:text-primary transition-all duration-200 active:scale-[0.98]"
              >
                Join Enso
              </Button>
            )}
          </motion.div>
        </motion.main>
      </div>
    </section>
  );
}
