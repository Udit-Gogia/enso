import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { hasSetupToken, isFirstTimeUser, isLoggedIn } from "@/lib/auth";
import Grainient from "@/components/Grainient";
import EnsoNavbar from "./EnsoNavbar";

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
  // const navigate = useNavigate();

  // const firstTimeUser = isFirstTimeUser();
  // const setupPending = hasSetupToken();
  // const loggedIn = isLoggedIn();

  return (
    <section className="h-screen w-full relative overflow-hidden ">
      {/* Interactive background */}
      <div className="absolute top-0 w-full h-full">
        <Grainient
          color1="#7e7de8"
          color2="#c6c9ff"
          color3="#7e7de8"
          timeSpeed={1}
          blendAngle={120}
          colorBalance={0.1}
          warpStrength={3}
          warpFrequency={5}
          warpSpeed={1.5}
          warpAmplitude={50}
          blendSoftness={0.11}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.075}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={1}
        />
      </div>

      <div className=" absolute left-0 right-0 top-0 z-10" />
      {/* Legibility scrim behind the centered content */}
      <div className=" absolute inset-0" />

      <div className=" relative z-10 flex h-screen flex-col">
        {/* Header */}
        <EnsoNavbar />

        {/* Hero */}
        <motion.main
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col items-start justify-center gap-7 px-24 pb-12 text-start"
        >
          <motion.h1
            variants={item}
            className="m-0 max-w-[14ch] text-balance font-display text-[clamp(46px,6.4vw,80px)] font-normal leading-[1.02] tracking-[-0.035em] text-surface "
          >
            The right people <span className="text-surface">nearby.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="m-0 max-w-[600px] text-[clamp(17px,1.5vw,21px)] leading-[1.6] text-surface"
          >
            Connect with trusted local businesses, skilled individuals, <br />
            and everyday services - all in one place.
          </motion.p>

          <motion.div variants={item} className=" max-w-[200px] w-full mt-1 ">
            <Button
              size="default"
              variant="outline"
              className="border-border-input w-full py-4 text-ink hover:-translate-y-px hover:border-black transition-all duration-200 active:scale-[0.98] rounded-full"
            >
              Explore Enso
            </Button>
          </motion.div>
        </motion.main>
      </div>
    </section>
  );
}
