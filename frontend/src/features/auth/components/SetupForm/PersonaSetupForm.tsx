import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Persona } from "../PersonaPanel";
import { QUESTIONS } from "./questions";
import { QuestionSidebar } from "./QuestionSidebar";
import { QuestionInput } from "./QuestionInput";
import { Button } from "@/components/ui/button";

const PERSONA_ACCENT: Record<Persona, string> = {
  customer: "#1A73E8",
  vendor: "#C5221F",
  admin: "#188038",
};

interface PersonaSetupFormProps {
  persona: Persona;
}

export function PersonaSetupForm({ persona }: PersonaSetupFormProps) {
  const questions = QUESTIONS[persona];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [direction, setDirection] = useState<1 | -1>(1);

  const accent = PERSONA_ACCENT[persona];
  const current = questions[currentIndex];
  const currentAnswer = answers[current.id];

  const isAnswered = (id: string) => {
    const val = answers[id];
    if (val === undefined || val === null || val === "") return false;
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === "object") return val.open && val.close;
    return true;
  };

  const canProceed = isAnswered(current.id);
  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;

  function goNext() {
    if (!canProceed) return;
    setDirection(1);
    setCurrentIndex((i) => i + 1);
  }

  function goBack() {
    setDirection(-1);
    setCurrentIndex((i) => i - 1);
  }

  function handleSubmit() {
    console.log("Submit", answers);
  }

  function handleJump(index: number) {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }

  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* ── Left: Sidebar ── */}
      <div className="w-[260px] flex-shrink-0 overflow-y-auto">
        <QuestionSidebar
          persona={persona}
          questions={questions}
          currentIndex={currentIndex}
          answers={answers}
          onJump={handleJump}
        />
      </div>

      {/* ── Right: Question panel ── */}
      <div
        className="flex-1 flex flex-col bg-white overflow-hidden h-screen"
        style={{ height: "calc(100vh - 4px)" }}
      >
        {/* Top progress bar */}
        <div className="h-1 w-full bg-white flex-shrink-0">
          <motion.div
            className="h-full"
            style={{ backgroundColor: accent }}
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + (canProceed ? 1 : 0)) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Main content — vertically centered */}
        <div className="flex-1 flex items-center justify-start px-16 overflow-hidden">
          <div className="w-full max-w-xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 28 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -28 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                className="flex flex-col gap-8"
              >
                {/* Step counter — neutral, small */}
                <p className="text-xs font-medium text-ink-placeholder tracking-wide">
                  {String(currentIndex + 1).padStart(2, "0")} /{" "}
                  {String(questions.length).padStart(2, "0")}
                </p>

                {/* Question */}
                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-[clamp(28px,3vw,40px)] font-bold text-ink leading-tight tracking-tight">
                    {current.label}
                  </h2>
                  {current.description && (
                    <p className="text-sm text-ink-muted leading-relaxed">
                      {current.description}
                    </p>
                  )}
                </div>

                {/* Input */}
                <QuestionInput
                  question={current}
                  value={currentAnswer}
                  onChange={(val) =>
                    setAnswers((prev) => ({ ...prev, [current.id]: val }))
                  }
                  persona={persona}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="flex-shrink-0 px-16 py-6 border-t border-border-soft flex items-center justify-between">
          <Button
            onClick={goBack}
            variant={"outline"}
            disabled={isFirst}
            className="flex items-center gap-1.5 text-sm font-medium hover:bg-[#F0F1F3] px-6 py-2.5 rounded-xl text-ink transition-colors disabled:opacity-0 disabled:pointer-events-none active:scale-[0.98]"
          >
            <ArrowLeft size={15} />
            Back
          </Button>

          {isLast ? (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                         text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed
                         shadow-cta active:scale-[0.98]"
              style={{ backgroundColor: "#16161D" }}
            >
              Complete Setup
            </Button>
          ) : (
            <Button
              onClick={goNext}
              disabled={!canProceed}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                         text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
              style={{ backgroundColor: "#16161D" }}
            >
              Next
              <ArrowRight size={15} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
