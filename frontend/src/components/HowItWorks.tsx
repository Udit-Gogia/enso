import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Post your need",
    description:
      "Describe what you need — publicly for bids or directly to a vendor you trust.",
  },
  {
    number: "02",
    title: "Vendors respond",
    description:
      "Receive offers with pricing, timelines, and solutions tailored to your request.",
  },
  {
    number: "03",
    title: "Get it done",
    description:
      "Accept the best offer, schedule the work, and leave a review.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="px-8 md:px-20 py-24 border-t border-[#222529]"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-[#6c7584] text-sm tracking-[0.2em] uppercase mb-16"
      >
        How it works
      </motion.p>

      <div className="grid md:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex flex-col gap-6"
          >
            <span className="font-display text-5xl text-[#298dff]/20 font-bold">
              {step.number}
            </span>
            <div>
              <h3 className="text-white font-medium text-xl mb-3">
                {step.title}
              </h3>
              <p className="text-[#6c7584] text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
