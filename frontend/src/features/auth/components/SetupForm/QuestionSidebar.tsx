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
    <div className="h-full flex flex-col bg-white border-r border-border-soft">
      {/* Top — persona badge */}
      <div className="px-6 pt-8 pb-6 border-b border-border-soft">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <span className="text-xs font-bold tracking-widest uppercase text-ink-secondary ">
            {PERSONA_LABEL[persona]} Profile
          </span>
        </div>
        <p className="mt-3 text-xs text-ink-placeholder">
          {answeredCount} of {questions.length} completed
        </p>
        {/* Progress bar */}
        <div className="mt-2 h-0.5 w-full bg-border-soft rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: accent }}
            initial={{ width: 0 }}
            animate={{ width: `${(answeredCount / questions.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question list */}
      <div className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        {questions.map((q, i) => {
          const answered = isAnswered(q.id);
          const isCurrent = i === currentIndex;
          // const isUpcoming = i > currentIndex;

          return (
            <motion.div
              key={q.id}
              animate={{ opacity: answered || isCurrent ? 1 : 0.4 }}
              transition={{ duration: 0.2 }}
              onClick={() => (answered || isCurrent) && onJump(i)}
              className="flex items-start gap-3 px-3 py-2.5 rounded-lg relative transition-colors"
              style={{
                backgroundColor: isCurrent ? "#F0F1F3" : "transparent",
                borderLeft: "2px solid transparent",
                cursor: answered || isCurrent ? "pointer" : "default",
              }}
            >
              {/* Status dot / check */}
              <div
                className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  backgroundColor: answered ? accent : "transparent",
                  border: answered
                    ? "none"
                    : `1.5px solid ${isCurrent ? accent : "#CBD0D8"}`,
                }}
              >
                {answered && <Check size={9} color="white" strokeWidth={3} />}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span
                  className="text-sm leading-snug"
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
                {answered && (
                  <span className="text-xs text-ink-muted truncate max-w-[160px]">
                    {Array.isArray(answers[q.id])
                      ? answers[q.id].join(", ")
                      : typeof answers[q.id] === "object"
                        ? `${answers[q.id].open} – ${answers[q.id].close}`
                        : String(answers[q.id])}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
