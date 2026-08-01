import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonaPanel } from "./ProfilePanel";
import { Greetings } from "./Greetings";

import { ArrowRight, Sparkles } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Persona } from "../constants/types";

import EnsoTitle from "@/components/common/EnsoTitle";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import BlurOutUp from "@/components/smoothui/blur-out-up";
import {
  panelDelays,
  PANELS,
  TIMELINE,
} from "../constants/ProfileSelectionConstants";

export function PersonaSelector() {
  const [showGreetingCenter, setShowGreetingCenter] = useState(false);

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
        setShowGreetingCenter(false);
      }, TIMELINE.bottomBarFadeIn.delay),
    );

    // Step 3 — panels start fading in
    timers.push(
      setTimeout(() => setShowPanels(true), TIMELINE.panel1FadeIn.delay),
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showGreetingCenter && (
          <motion.div
            key="greeting-center"
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none w-full h-full"
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
      {!showGreetingCenter && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: TIMELINE.greetingFadeIn.delay / 1000,
          }}
          className="flex min-h-screen w-full h-full flex-col items-center bg-surface px-4 py-8"
        >
          <header className="flex w-full px-8 items-center justify-between">
            <Reveal delay={0.05} triggerOnView>
              <EnsoTitle className="[&_img]:h-6 [&_img]:w-6 [&_span]:text-2xl" />
            </Reveal>
          </header>
          <div className="flex flex-1 w-full flex-col items-center justify-center">
            <div className="mt-10 flex max-w-2xl flex-col items-center gap-4 text-center mb-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-badge">
                <Sparkles className="h-3.5 w-3.5" />
                <BlurOutUp delay={100} triggerOnView>
                  One platform. Many possibilities.
                </BlurOutUp>
              </span>

              <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
                <BlurOutUp delay={400} triggerOnView>
                  Choose how you'll use Enso.
                  {/* <span className="bg-gradient-to-r from-primary to-brand-blue bg-clip-text text-transparent"></span> */}
                </BlurOutUp>
              </h1>
            </div>
          </div>
          {/* ── Row 1: Black persona area ── */}
          <div className="relative flex w-full min-h-[320px] h-full ">
            {/* Persona panels */}
            <div className="flex w-full h-full justify-between gap-2 overflow-hidden relative">
              {PANELS.map((p, i) => (
                <motion.div
                  key={p.persona}
                  className="relative h-full basis-1/3"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: showPanels ? 1 : 0,
                  }}
                  transition={{
                    delay:
                      (panelDelays[i].delay - TIMELINE.panel1FadeIn.delay) /
                      1000,
                    duration: panelDelays[i].duration / 1000,
                  }}
                >
                  <PersonaPanel
                    persona={p}
                    selected={selectedPersona === p.persona}
                    onClick={() => handlePanelClick(p.persona)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <Reveal delay={2}>
            <div className=" flex flex-col w-full max-w-5xl gap-8 bg-white/70 px-6 py-4">
              <div className="flex flex-col items-center justify-center gap-3">
                <Button
                  disabled={!selectedPersona}
                  onClick={handleConfirm}
                  className="min-w-[260px] text-white rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-cta hover:shadow-cta-hover"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Reveal>
        </motion.div>
      )}
    </>
  );
}
