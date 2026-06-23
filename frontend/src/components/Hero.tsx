import { motion } from "framer-motion"
import ColorBends from "./ColorBends"
import { Button } from "@/components/ui/button"

function ServiceCard({
  delay,
  service,
  vendor,
  price,
  status,
}: {
  delay: number
  service: string
  vendor: string
  price: string
  status: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="pointer-events-auto w-72 rounded-2xl border border-[#222529] bg-[#131518]/80 p-5 backdrop-blur-md"
    >
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white">{service}</p>
          <p className="mt-1 text-xs text-[#6c7584]">{vendor}</p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            status === "New"
              ? "bg-[#298dff]/20 text-[#298dff]"
              : status === "Accepted"
                ? "bg-green-500/20 text-green-400"
                : "bg-[#222529] text-[#6c7584]"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40">Starting from</span>
        <span className="text-sm font-semibold text-white">{price}</span>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center">
      {/* Background */}
      <ColorBends
        className="!absolute inset-0 h-full w-full"
        rotation={90}
        speed={0.2}
        colors={["#A855F7"]}
        transparent
        autoRotate={0}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0.15}
        iterations={1}
        intensity={1.5}
        bandWidth={6}
      />

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-10"
        style={{
          height: "220px",
          background: "linear-gradient(to bottom, transparent, #09090b)",
        }}
      />

      {/* Content — pointer-events-none on wrapper, re-enabled on interactive children */}
      <div className="pointer-events-none relative z-10 flex w-full flex-col items-center justify-between gap-16 px-8 pt-24 md:flex-row md:px-20">
        {/* Left — text */}
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-sm tracking-[0.2em] text-[#6c7584] uppercase"
          >
            Local services, reimagined
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display mb-8 text-6xl leading-tight md:text-8xl"
          >
            <span className="font-normal text-white/50">Your city's</span>
            <br />
            <span className="font-bold text-white">best hands.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-12 max-w-lg text-xl leading-relaxed text-[#a1a7b2]"
          >
            Connect with skilled local vendors. Request, negotiate, get it done.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button className="px-6 py-4">Get started →</Button>
            <Button className="px-6 py-4" variant="outline">
              List your business →
            </Button>
          </motion.div>
        </div>

        {/* Right — floating cards (pointer-events-auto on the card itself) */}
        <div className="relative hidden flex-col gap-4 md:flex">
          <ServiceCard
            delay={0.8}
            service="Fix leaking tap"
            vendor="Ramesh Plumbing Co."
            price="₹350"
            status="New"
          />
          <ServiceCard
            delay={1.0}
            service="Home wiring inspection"
            vendor="Spark Electricals"
            price="₹800"
            status="Accepted"
          />
          <ServiceCard
            delay={1.2}
            service="Math tutoring — Grade 10"
            vendor="Priya Tutors"
            price="₹500/hr"
            status="Scheduled"
          />
        </div>
      </div>
    </section>
  )
}
