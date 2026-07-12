import { LucideIcon } from "lucide-react";
import { Question } from "../../constants/questions";

import { MultiSelect } from "@/components/ui/MultiSelect";
import { Select } from "@/components/ui/Select";
import { Persona } from "../../constants/types";

type QuestionsWithOptions = "CITIES" | "SERVICE_CATEGORIES";

type Option = {
  code: string;
  name: string;
  icon?: LucideIcon;
  colorClass?: string;
};

interface QuestionInputProps {
  question: Question;
  value: any;
  onChange: (val: any) => void;
  persona: Persona;
  options?: Record<QuestionsWithOptions, Option[]>;
}

export function QuestionInput({
  question,
  value,
  onChange,
  persona,
  options,
}: QuestionInputProps) {
  const baseInput = `w-full px-4 py-3 rounded-xl border border-border-input bg-surface
    text-ink placeholder:text-ink-placeholder text-sm font-sans
    focus:outline-none focus:ring-2 transition-all shadow-[inset_0_1px_2px_rgba(15,23,42,.02)]`;

  if (question.type === "textarea") {
    return (
      <textarea
        autoFocus
        className={`${baseInput} resize-none min-h-[120px]`}
        placeholder={question.placeholder}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (question.type === "tel") {
    return (
      <input
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        autoFocus
        className={baseInput}
        placeholder={question.placeholder ?? "9876543210"}
        value={value ?? ""}
        maxLength={10}
        pattern="[6-9][0-9]{9}"
        onChange={(e) => {
          // Keep only digits
          const digits = e.target.value.replace(/\D/g, "");

          // Limit to 10 digits
          onChange(digits.slice(0, 10));
        }}
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
            autoFocus
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

  if (question.type === "select") {
    console.log("option", options);
    console.log("value", value);

    return (
      <Select
        options={(options?.CITIES ?? []).map((opt) => ({
          code: opt.code,
          name: opt.name,
        }))}
        value={value ?? ""}
        onChange={onChange}
        placeholder={question.placeholder ?? "Search or select..."}
        persona={persona}
      />
    );
  }

  if (question.type === "tags") {
    console.log("option", options);
    console.log("value", value);

    return (
      <MultiSelect
        options={(options?.SERVICE_CATEGORIES ?? []).map((opt) => ({
          code: opt.code,
          name: opt.name,
        }))}
        value={value ?? []}
        onChange={onChange}
        placeholder={question.placeholder ?? "Search or select services..."}
        persona={persona}
      />
    );
  }

  return (
    <input
      type={question.type}
      className={baseInput}
      autoFocus
      placeholder={question.placeholder}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
