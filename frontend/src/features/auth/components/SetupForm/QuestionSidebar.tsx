import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Persona } from "../PersonaPanel";
import { Question } from "./questions";

const PERSONA_ACCENT: Record<Persona, string> = {
  customer: "#1A73E8",
  vendor: "#C5221F",
  admin: "#188038",
};

const PERSONA_LABEL: Record<Persona, string> = {
  customer: "Customer",
  vendor: "Vendor",
  admin: "Admin",
};

interface QuestionSidebarProps {
  persona: Persona;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, any>;
  onJump: (index: number) => void;
}

export function QuestionSidebar({
  persona,
  questions,
  currentIndex,
  answers,
  onJump,
}: QuestionSidebarProps) {
  const accent = PERSONA_ACCENT[persona];

  const isAnswered = (id: string) => {
    const val = answers[id];
    if (val === undefined || val === null || val === "") return false;
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === "object") return val.open && val.close;
    return true;
  };

  const answeredCount = questions.filter((q) => isAnswered(q.id)).length;

  return (
    <div
      className="h-full flex flex-col bg-white border border-slate-200/70 rounded-2xl px-4 pt-4 shadow-[0_2px_8px_rgba(15,23,42,0.04),0_16px_40px_rgba(15,23,42,0.06)]"
      style={
        {
          // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          // height: "-webkit-fill-available",
        }
      }
    >
      {/* Header */}
      <div className="px-6 pt-8 pb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="text-lg font-display font-bold tracking-widest uppercase">
            {PERSONA_LABEL[persona]} Profile
          </span>
        </div>
        <div>
          <p className="mt-3 text-xs text-ink-placeholder">
            {answeredCount} of {questions.length} completed
          </p>
          <div className="mt-2 h-0.5 w-full bg-border-soft rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: accent }}
              initial={{ width: 0 }}
              animate={{
                width: `${(answeredCount / questions.length) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Steps list */}
      <div className="flex-1 px-5 py-5 flex flex-col overflow-y-auto gap-1">
        {questions.map((q, i) => {
          const answered = isAnswered(q.id);
          const isCurrent = i === currentIndex;
          const isUpcoming = i > currentIndex;
          const isClickable = answered || isCurrent;

          return (
            <div key={q.id} className="flex gap-3">
              {/* Left: number/check + vertical line */}
              <div className="flex flex-col items-center gap-1">
                {/* Badge */}
                <motion.div
                  animate={{ opacity: isUpcoming ? 0.4 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 text-xs font-semibold"
                  style={{
                    backgroundColor: answered
                      ? accent
                      : isCurrent
                        ? accent + "15"
                        : "transparent",
                    border: answered
                      ? "none"
                      : `1.5px solid ${isCurrent ? accent : "#CBD0D8"}`,
                    color: answered ? "white" : isCurrent ? accent : "#CBD0D8",
                  }}
                >
                  {answered ? (
                    <Check size={11} strokeWidth={3} color="white" />
                  ) : (
                    i + 1
                  )}
                </motion.div>

                {/* Vertical connector */}
                {i < questions.length - 1 && (
                  <div
                    className="w-px flex-1 my-1 min-h-[20px] rounded-lg"
                    style={{
                      backgroundColor: answered ? accent + "40" : "#E9EAEE",
                    }}
                  />
                )}
              </div>

              {/* Right: label + description */}
              <motion.div
                animate={{ opacity: isUpcoming ? 0.4 : 1 }}
                transition={{ duration: 0.2 }}
                onClick={() => isClickable && onJump(i)}
                className="flex flex-col gap-0.5 pb-5 min-w-0"
                style={{ cursor: isClickable ? "pointer" : "default" }}
              >
                <span
                  className="text-md font-display leading-snug"
                  style={{
                    color: isCurrent
                      ? "#16161D"
                      : answered
                        ? "#3A3D47"
                        : "#80828E",
                    fontWeight: isCurrent ? 600 : 400,
                  }}
                >
                  {q.label}
                </span>
                <span className="text-xs text-ink-placeholder leading-snug">
                  {q.sidebarDescription}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
