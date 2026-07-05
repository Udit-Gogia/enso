import { LucideIcon } from "lucide-react";
import { Question } from "../../constants/questions";
import { Persona } from "../PersonaPanel";

import { MultiSelect } from "@/components/ui/MultiSelect";

interface QuestionInputProps {
  question: Question;
  value: any;
  onChange: (val: any) => void;
  persona: Persona;
  options?: {
    code: string;
    name: string;
    icon?: LucideIcon;
    colorClass?: string;
  }[];
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

  if (question.type === "tags") {
    // const tags: string[] = value ?? [];

    // function addTag() {
    //   const trimmed = tagInput.trim();
    //   if (trimmed && !tags.includes(trimmed)) {
    //     onChange([...tags, trimmed]);
    //   }
    //   setTagInput("");
    // }

    // const [value, setValue] = React.useState<string[]>([]);

    console.log("option", options);
    console.log("value", value);

    return (
      <MultiSelect
        options={(options ?? []).map((opt) => ({
          code: opt.code,
          name: opt.name,
        }))}
        value={value ?? []}
        onChange={onChange}
        placeholder={question.placeholder ?? "Search or select services..."}
        persona={persona}
      />
    );

    // return (
    //   <Combobox items={options} multiple value={value} onValueChange={onChange}>
    //     <ComboboxChips className="border-border-input rounded-xl min-h-[48px] px-3 py-2">
    //       <ComboboxValue>
    //         {(value ?? []).map((item: any) => (
    //           <ComboboxChip
    //             style={{
    //               backgroundColor: accent + "15",
    //               color: accent,
    //               borderColor: accent + "30",
    //             }}
    //             className="bg-[#C5221F]/10 text-[#C5221F] border border-[#C5221F]/20 "
    //             key={item.code}
    //           >
    //             {item.name}
    //           </ComboboxChip>
    //         ))}
    //       </ComboboxValue>
    //       <ComboboxChipsInput placeholder="Search Services..." />
    //     </ComboboxChips>
    //     <ComboboxContent className="border border-border-soft shadow-card rounded-xl bg-white">
    //       <ComboboxEmpty>No items found.</ComboboxEmpty>

    //       <ComboboxList className="bg-white">
    //         {(item) => (
    //           <ComboboxItem
    //             key={item.code}
    //             value={item}
    //             className="rounded-lg px-3 py-2 text-sm text-ink hover:bg-surface-page cursor-pointer"
    //           >
    //             {item.name}
    //           </ComboboxItem>
    //         )}
    //       </ComboboxList>
    //     </ComboboxContent>
    //   </Combobox>
    // );

    // return (
    //   <div className="flex flex-col gap-3">
    //     <div className="flex gap-2">
    //       <input
    //         className={`${baseInput} flex-1`}
    //         placeholder={question.placeholder}
    //         value={tagInput}
    //         onChange={(e) => setTagInput(e.target.value)}
    //         onKeyDown={(e) =>
    //           e.key === "Enter" && (e.preventDefault(), addTag())
    //         }
    //       />
    //       <button
    //         onClick={addTag}
    //         className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors"
    //         style={{ backgroundColor: accent }}
    //       >
    //         Add
    //       </button>
    //     </div>
    //     {tags.length > 0 && (
    //       <div className="flex flex-wrap gap-2">
    //         {tags.map((tag) => (
    //           <span
    //             key={tag}
    //             className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
    //             style={{ backgroundColor: accent + "15", color: accent }}
    //           >
    //             {tag}
    //             <button onClick={() => onChange(tags.filter((t) => t !== tag))}>
    //               <X size={12} />
    //             </button>
    //           </span>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // );
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
