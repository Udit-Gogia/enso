import { useState } from "react";
import { X } from "lucide-react";
import { Question } from "./questions";
import { Persona } from "../PersonaPanel";

const PERSONA_ACCENT: Record<Persona, string> = {
  customer: "#1A73E8",
  vendor: "#C5221F",
  admin: "#188038",
};

interface QuestionInputProps {
  question: Question;
  value: any;
  onChange: (val: any) => void;
  persona: Persona;
}

export function QuestionInput({
  question,
  value,
  onChange,
  persona,
}: QuestionInputProps) {
  const accent = PERSONA_ACCENT[persona];
  const [tagInput, setTagInput] = useState("");

  const baseInput = `w-full px-4 py-3 rounded-xl border border-border-input bg-surface
    text-ink placeholder:text-ink-placeholder text-sm font-sans
    focus:outline-none focus:ring-2 transition-all shadow-[inset_0_1px_2px_rgba(15,23,42,.02)]`;

  if (question.type === "textarea") {
    return (
      <textarea
        className={`${baseInput} resize-none min-h-[120px]`}
        placeholder={question.placeholder}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (question.type === "time-range") {
    const open = value?.open ?? "";
    const close = value?.close ?? "";
    return (
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-medium text-ink-muted">Opens at</label>
          <input
            type="time"
            className={baseInput}
            value={open}
            onChange={(e) => onChange({ open: e.target.value, close })}
          />
        </div>
        <span className="text-ink-muted mt-5">→</span>
        <div className="flex flex-col gap-1.5 flex-1">
          <label className="text-xs font-medium text-ink-muted">
            Closes at
          </label>
          <input
            type="time"
            className={baseInput}
            value={close}
            onChange={(e) => onChange({ open, close: e.target.value })}
          />
        </div>
      </div>
    );
  }

  if (question.type === "tags") {
    const tags: string[] = value ?? [];

    function addTag() {
      const trimmed = tagInput.trim();
      if (trimmed && !tags.includes(trimmed)) {
        onChange([...tags, trimmed]);
      }
      setTagInput("");
    }

    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            className={`${baseInput} flex-1`}
            placeholder={question.placeholder}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
          />
          <button
            onClick={addTag}
            className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: accent }}
          >
            Add
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: accent + "15", color: accent }}
              >
                {tag}
                <button onClick={() => onChange(tags.filter((t) => t !== tag))}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Work on OTP INPUT
  // if (question.type === "otp") {
  //   return (
  //     <div >
  //       <InputOTP maxLength={6} >
  //         <InputOTPGroup>
  //           <InputOTPSlot index={0} />
  //           <InputOTPSlot index={1} />
  //           <InputOTPSlot index={2} />
  //           <InputOTPSlot index={3} />
  //           <InputOTPSlot index={4} />
  //           <InputOTPSlot index={5} />
  //         </InputOTPGroup>
  //       </InputOTP>
  //     </div>
  //   );
  // }

  return (
    <input
      type={question.type}
      className={baseInput}
      placeholder={question.placeholder}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
