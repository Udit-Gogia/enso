import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PersonaPanel } from "./ProfilePanel";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Persona } from "../constants/types";
import EnsoTitle from "@/components/common/EnsoTitle";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/Reveal";
import BlurOutUp from "@/components/smoothui/blur-out-up";
import {
  getPanelDelay,
  PANELS,
  REVEAL_TIMELINE,
} from "../constants/ProfileSelectionConstants";
import { WordsPreloader } from "@/components/ui/WordsPreloader";
import { toSentenceCase } from "@/lib/utils";

export function PersonaSelector() {
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);

  function handlePanelClick(persona: Persona) {
    setSelectedPersona(persona);
  }

  function handleConfirm() {
    navigate(`/profile-setup/${selectedPersona}`);
    setSelectedPersona(null);
  }

  return (
    <>
      <AnimatePresence>
        {!revealed && <WordsPreloader onComplete={() => setRevealed(true)} />}
      </AnimatePresence>

      {revealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex min-h-screen w-full h-full flex-col items-center bg-surface px-4 py-8"
        >
          <header className="flex w-full px-8 items-center justify-between">
            <Reveal delay={REVEAL_TIMELINE.logo} triggerOnView>
              <EnsoTitle className="[&_img]:h-6 [&_img]:w-6 [&_span]:text-2xl" />
            </Reveal>
          </header>

          <div className="flex flex-1 w-full flex-col items-center justify-center">
            <div className="mt-10 flex max-w-2xl flex-col items-center gap-4 text-center mb-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-badge">
                <Sparkles className="h-3.5 w-3.5" />
                <BlurOutUp delay={REVEAL_TIMELINE.badge * 1000} triggerOnView>
                  One platform. Many possibilities.
                </BlurOutUp>
              </span>

              <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
                <BlurOutUp delay={REVEAL_TIMELINE.heading * 1000} triggerOnView>
                  Choose how you'll use Enso.
                </BlurOutUp>
              </h1>
            </div>
          </div>

          <div className="relative flex w-full min-h-[320px] h-full">
            <div className="flex w-full h-full justify-between gap-2 overflow-hidden relative">
              {PANELS.map((p, i) => (
                <motion.div
                  key={p.persona}
                  className="relative h-full basis-1/3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: getPanelDelay(i),
                    duration: REVEAL_TIMELINE.panelDuration,
                    ease: [0.16, 1, 0.3, 1],
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

          <Reveal delay={REVEAL_TIMELINE.button} triggerOnView>
            <div className="flex flex-col w-full max-w-5xl gap-8 bg-white/70 px-6 py-4">
              <div className="flex flex-col items-center justify-center gap-3">
                <Button
                  disabled={!selectedPersona}
                  onClick={handleConfirm}
                  className="min-w-[260px] text-white rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-cta hover:shadow-cta-hover"
                >
                  {selectedPersona
                    ? "Continue as " + toSentenceCase(selectedPersona)
                    : "Select a profile to continue"}{" "}
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
