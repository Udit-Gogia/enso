import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Persona } from "../PersonaPanel";
import { QUESTIONS } from "./questions";
import { QuestionSidebar } from "./QuestionSidebar";
import { QuestionInput } from "./QuestionInput";
import { MagneticDots } from "@/components/common/MagneticDots";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { clearSetupToken, getSetupToken, setAccessToken } from "@/lib/token";
import api from "@/lib/axios";

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

  const navigate = useNavigate();

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

  function handleJump(index: number) {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }

  function onChangePersona() {
    navigate("/profile-setup");
  }

  async function handleSubmit() {
    const setupToken = getSetupToken();

    if (!setupToken) {
      toast.error("Session expired. Please register again.");
      navigate("/register");
      return;
    }

    try {
      // Strip phone — remove +91, spaces, dashes
      const rawPhone = answers["phone"] ?? "";
      const phone = rawPhone.replace(/^\+91\s?/, "").replace(/\s|-/g, "");

      // Build request body based on persona
      const body: Record<string, any> = {
        phone,
        role: persona.toUpperCase(),
        location: answers["location"] ?? null,
      };

      if (persona === "customer") {
        body.preferredLocation = answers["preferredLocation"] ?? null;
      }

      if (persona === "vendor") {
        body.businessName = answers["businessName"] ?? null;
        body.bio = answers["bio"] ?? null;
        body.yearsOfExperience = answers["yearsOfExperience"]
          ? parseInt(answers["yearsOfExperience"])
          : null;
        body.openTime = answers["operatingHours"]?.open ?? null;
        body.closeTime = answers["operatingHours"]?.close ?? null;
        body.tags = answers["tags"] ?? [];
      }

      if (persona === "admin") {
        body.adminOtp = answers["otp"] ?? null;
      }

      const response = await api.post("/api/profile/setup", body, {
        headers: { Authorization: `Bearer ${setupToken}` },
      });

      // Store access token, clear setup token
      setAccessToken(response.data.token);
      clearSetupToken();

      toast.success("Profile setup complete!");
      navigate("/dashboard"); // change this route when dashboard exists
    } catch (error: any) {
      const message =
        error.response?.data?.message ??
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden relative">
      {/* MagneticDots — full page background */}
      <div className="absolute inset-0">
        <MagneticDots palette="Google" intensity={0.2} />
      </div>

      {/* Progress bar — full width, sits at very top */}
      <div className="relative z-10 h-0.5 w-full bg-black/5 flex-shrink-0">
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

      {/* Main content row */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Left: Sidebar ── */}
        <div className="flex-shrink-0 w-[340px] relative z-10 py-6 pl-6">
          <QuestionSidebar
            persona={persona}
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            onJump={handleJump}
            onChangePersona={onChangePersona}
          />
        </div>

        {/* ── Right: Question card ── */}
        <div className="flex-1 relative flex flex-col overflow-hidden">
          <div className="relative z-10 flex-1 flex items-center justify-center px-10">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_12px_32px_rgba(15,23,42,0.06),0_32px_64px_rgba(15,23,42,0.08)] border border-slate-200/80 px-10 py-10">
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
                  className="flex flex-col gap-6"
                >
                  {/* Step counter */}
                  <p className="text-xs font-medium text-ink-placeholder tracking-wide">
                    {String(currentIndex + 1).padStart(2, "0")} /{" "}
                    {String(questions.length).padStart(2, "0")}
                  </p>

                  {/* Question */}
                  <div className="flex flex-col gap-1.5">
                    <h2 className="font-display text-[clamp(24px,2.5vw,36px)] font-bold text-ink leading-tight tracking-tight">
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

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6">
                <Button
                  variant="ghost"
                  onClick={goBack}
                  disabled={isFirst}
                  className="flex items-center gap-2 text-sm font-medium text-ink 
                             disabled:opacity-0 disabled:pointer-events-none border border-ink-muted/20
                             hover:bg-ink-muted/5 px-6 py-2.5 rounded-xl active:scale-[0.97] transition-all"
                >
                  <ArrowLeft size={15} />
                  Back
                </Button>

                {isLast ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                               text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]"
                    style={{ backgroundColor: "#16161D" }}
                  >
                    Complete Setup
                  </Button>
                ) : (
                  <Button
                    onClick={goNext}
                    disabled={!canProceed}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                               text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]"
                    style={{ backgroundColor: "#16161D" }}
                  >
                    Next
                    <ArrowRight size={15} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
