// import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { motion } from "framer-motion";
import { MagneticDots, Palette } from "@/components/common/MagneticDots";
import { SKEW_PX } from "./PersonaSelector";

export type Persona = "customer" | "vendor" | "admin";

// Tweak this to adjust the diagonal slant amount (in pixels)
// export const SKEW_PX = 100;
// export const GAP = 14;

interface PersonaPanelProps {
  persona: Persona;
  label: string;
  description: string;
  selectedPersona: Persona | null;
  backgroundHex: string;
  position: "left" | "middle" | "right";
  palette: Palette;
  onClick: () => void;
  icon: JSX.Element;
}

function getClipPath(position: "left" | "middle" | "right"): string {
  const s = SKEW_PX;
  switch (position) {
    case "left":
      // top-right extends out, bottom-right pulls in
      return `polygon(0% 0%, 100% 0%, calc(100% - ${s}px) 100%, 0% 100%)`;
    case "middle":
      // both edges slant same direction
      return `polygon(${s}px 0%, 100% 0%, calc(100% - ${s}px) 100%, 0% 100%)`;
    case "right":
      // top-left pulls in, bottom-left extends out
      return `polygon(${s}px 0%, 100% 0%, 100% 100%, 0% 100%)`;
  }
}

export function PersonaPanel({
  label,
  persona,
  position,
  selectedPersona,
  description,
  palette,
  backgroundHex,
  icon,
  onClick,
}: PersonaPanelProps) {
  return (
    <div
      className="relative flex-1 h-full overflow-hidden flex items-center justify-center"
      style={{
        clipPath: getClipPath(position),
      }}
      onClick={onClick}
    >
      {!!selectedPersona && persona != selectedPersona && (
        <motion.div
          className="absolute inset-0 bg-black/40 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
      )}
      {/* CanvasRevealEffect background */}
      <div className="absolute inset-0">
        <MagneticDots
          palette={palette}
          intensity={0.25}
          background={backgroundHex}
          className="w-full h-full"
        />
      </div>

      {/* Label */}
      <div
        className={`relative z-10 h-fit flex flex-col items-center justify-center pointer-events-none gap-2 rounded-full p-6`}
        style={{ backgroundColor: backgroundHex }}
      >
        <div className="p-4 rounded-full shadow-lg bg-white border border-[#EEF2F6] ">
          {icon}
        </div>

        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="m-0 max-w-[14ch] text-balance font-display text-[clamp(32px,3vw,60px)] font-bold leading-[1.02] tracking-[-0.035em] text-[#16161D]">
            {label}
          </p>
          <p className="m-0 max-w-[600px] text-[clamp(14px,1.25vw,21px)] leading-[1.6] text-[#5B5F6B] font-display font-light ">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
