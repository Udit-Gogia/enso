// PersonaCTA.tsx
import { MoveRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Persona, PersonaLabels } from "./PersonaPanel";

type Props = {
  persona: Persona;
  onConfirm: () => void;
};

export function PersonaCTA({ persona, onConfirm }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={onConfirm}
        aria-describedby="role-permanence-note"
        className={cn(
          "group inline-flex items-center gap-2.5 rounded-lg px-6 py-3",
          "bg-primary text-surface text-[clamp(15px,1vw,18px)] font-semibold tracking-[-0.01em]",
          "shadow-[0_1px_2px_rgba(26,115,232,.24),0_6px_18px_rgba(26,115,232,.22)]",
          "transition-[transform,box-shadow,background-color] duration-200 ease-out",
          "hover:-translate-y-0.5 hover:bg-[#1765CC]",
          "hover:shadow-[0_3px_8px_rgba(26,115,232,.28),0_14px_32px_rgba(26,115,232,.3)]",
          "active:translate-y-0 active:scale-[0.985]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
        )}
      >
        <span>Continue as {PersonaLabels[persona]}</span>
        <MoveRight
          aria-hidden
          className="h-[18px] w-[18px] transition-transform duration-200 ease-out group-hover:translate-x-1"
        />
      </button>

      <p
        id="role-permanence-note"
        className="m-0 flex items-center gap-1.5 text-[clamp(12px,0.9vw,14px)] text-ink/45"
      >
        <Lock aria-hidden className="h-3.5 w-3.5" />
        This choice is permanent - your role can't be changed later.
      </p>
    </div>
  );
}
