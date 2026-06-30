import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Persona, PersonaPanel } from "./PersonaPanel";
import { Greetings } from "./Greetings";
import { Palette } from "@/components/common/MagneticDots";
import { BriefcaseBusinessIcon, Shield, User } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { PersonaCTA } from "./PersonaSelectionCTA";

// ─── TIMELINE (all values in ms from page load) ──────────────
const TIMELINE = {
  greetingFadeIn: { delay: 0, duration: 400 },
  greetingHold: { delay: 600 },
  bottomBarFadeIn: { delay: 1100, duration: 500 },
  greetingMove: { delay: 1100, duration: 500 },
  panel1FadeIn: { delay: 1700, duration: 600 },
  panel2FadeIn: { delay: 1900, duration: 600 },
  panel3FadeIn: { delay: 2100, duration: 600 },
};

const FLEX: Record<string, number> = {
  customer: 1.05, // slightly wider to compensate for left clip loss
  vendor: 1,
  admin: 0.95, // slightly narrower to compensate for right clip gain
};
// ─────────────────────────────────────────────────────────────

export const SKEW_PX = 100;
export const GAP = 2;

const PANELS = [
  {
    persona: "customer" as const,
    label: "Customer",
    position: "left" as const,
    description: "Book trusted services.",
    palette: "MonoBlue" as Palette,
    backgroundHex: "#F1F7FF",
    icon: <User color="#1A73E8" />, // MonoBlue[3]
  },
  {
    persona: "vendor" as const,
    label: "Vendor",
    position: "middle" as const,
    description: "Grow your business.",
    palette: "MonoRed" as Palette,
    backgroundHex: "#FFF4F3",
    icon: <BriefcaseBusinessIcon color="#C5221F" />, // MonoRed[3]
  },
  {
    persona: "admin" as const,
    label: "Admin",
    position: "right" as const,
    description: "Manage your platform.",
    palette: "MonoGreen" as Palette,
    backgroundHex: "#F3FAF4",
    icon: <Shield color="#188038" />, // MonoGreen[3]
  },
];

const panelDelays = [
  TIMELINE.panel1FadeIn,
  TIMELINE.panel2FadeIn,
  TIMELINE.panel3FadeIn,
];

export function PersonaSelector() {
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [showGreetingCenter, setShowGreetingCenter] = useState(false);
  const [showGreetingBottom, setShowGreetingBottom] = useState(false);
  const [showPanels, setShowPanels] = useState(false);

  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  function handlePanelClick(persona: Persona) {
    setSelectedPersona(persona);
  }

  function handleConfirm() {
    navigate(`/profile-setup/${selectedPersona}`);
    setSelectedPersona(null);
  }

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Step 1 — greeting fades in centered
    timers.push(
      setTimeout(
        () => setShowGreetingCenter(true),
        TIMELINE.greetingFadeIn.delay,
      ),
    );

    // Step 2 — bottom bar fades in, greeting moves down
    timers.push(
      setTimeout(() => {
        setShowBottomBar(true);
        setShowGreetingCenter(false);
        setShowGreetingBottom(true);
      }, TIMELINE.bottomBarFadeIn.delay),
    );

    // Step 3 — panels start fading in
    timers.push(
      setTimeout(() => setShowPanels(true), TIMELINE.panel1FadeIn.delay),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-screen  border border-black flex flex-col">
      {/* ── Row 1: Black persona area ── */}
      <div className="relative flex basis-5/6 min-h-[320px] bg-black">
        {/* Persona panels */}
        <div className="flex w-full h-full bg-black">
          {PANELS.map((p, i) => (
            <motion.div
              key={p.persona}
              className="relative h-full"
              style={{
                marginLeft: i !== 0 ? `-${SKEW_PX - GAP}px` : undefined,
              }}
              initial={{ opacity: 0, flex: FLEX[p.persona] }}
              animate={{
                opacity: showPanels ? 1 : 0,
                flex: selectedPersona === p.persona ? 2 : FLEX[p.persona],
              }}
              transition={{
                delay:
                  (panelDelays[i].delay - TIMELINE.panel1FadeIn.delay) / 1000,
                duration: panelDelays[i].duration / 1000,
                flex: { duration: 0.35, ease: "easeInOut" },
              }}
            >
              <PersonaPanel
                persona={p.persona}
                selectedPersona={selectedPersona}
                label={p.label}
                position={p.position}
                description={p.description}
                palette={p.palette}
                backgroundHex={p.backgroundHex}
                icon={p.icon}
                onClick={() => handlePanelClick(p.persona)}
              />
            </motion.div>
          ))}
        </div>

        {/* Greeting — centered on black, steps 0→1 */}
        <AnimatePresence>
          {showGreetingCenter && (
            <motion.div
              key="greeting-center"
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: TIMELINE.greetingFadeIn.duration / 1000 }}
            >
              <Greetings
                title="Welcome"
                className="[&_p:first-child]:text-white [&_p:last-child]:text-white/60 max-w-xl"
                titleClassName="text-balance font-display text-[clamp(46px,5vw,80px)] font-bold leading-[1.02] tracking-[-0.035em] text-[#16161D] text-surface"
                descriptionClassName="m-0 max-w-[600px] text-[clamp(17px,2vw,21px)] leading-[1.6] text-[#5B5F6B]"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Row 2: White bottom bar ── */}
      <motion.div
        className="bg-surface w-screen shadow-[0_2px_6px_rgba(22,22,29,.04),0_10px_30px_rgba(22,22,29,.08),0_30px_60px_rgba(22,22,29,.06)] basis-1/5 min-h-[100px] flex items-center justify-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: showBottomBar ? 1 : 0 }}
        transition={{ duration: TIMELINE.bottomBarFadeIn.duration / 1000 }}
      >
        <AnimatePresence mode="wait">
          {showGreetingBottom && (
            <motion.div
              key="greeting-bottom"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="group/persona-confirmation"
            >
              {selectedPersona ? (
                <PersonaCTA
                  persona={selectedPersona}
                  onConfirm={handleConfirm}
                />
              ) : (
                <Greetings
                  titleClassName="text-balance font-display text-[clamp(32px,1vw,40px)] font-bold leading-[1.02] tracking-[-0.035em] text-[#16161D]"
                  descriptionClassName="m-0 text-[clamp(12px,1vw,18px)] text-[#5B5F6B]"
                  title="Choose how you'll use Enso."
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
