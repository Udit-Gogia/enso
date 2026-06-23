import { motion } from "framer-motion";

const categories = [
  { name: "Plumbing", icon: "🔧" },
  { name: "Electrical", icon: "⚡" },
  { name: "Carpentry", icon: "🪵" },
  { name: "Tutoring", icon: "📚" },
  { name: "Cleaning", icon: "✨" },
  { name: "Cooking", icon: "🍳" },
  { name: "Gardening", icon: "🌿" },
  { name: "Moving", icon: "📦" },
];

export default function Categories() {
  return (
    <section className="relative px-8 md:px-20 py-24 bg-[#09090b]">
      {/* Top fade — blends in from Hero above */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "160px",
          background: "linear-gradient(to bottom, transparent, #09090b)",
          transform: "translateY(-100%)",
        }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-[#6c7584] text-sm tracking-[0.2em] uppercase mb-12"
      >
        Browse categories
      </motion.p>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4, borderColor: "rgba(41, 141, 255, 0.4)" }}
            className="flex-shrink-0 flex flex-col items-center gap-3 px-8 py-6 bg-[#131518] border border-[#222529] rounded-2xl cursor-pointer transition-colors duration-300"
          >
            <span className="text-2xl">{cat.icon}</span>
            <span className="text-[#a1a7b2] text-sm whitespace-nowrap">
              {cat.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
