// import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

import { MagneticDots, Palette } from "@/components/common/MagneticDots";

export type Persona = "customer" | "vendor" | "admin";

// Tweak this to adjust the diagonal slant amount (in pixels)
export const SKEW_PX = 100;
export const GAP = 14;

interface PersonaPanelProps {
  persona: Persona;
  label: string;
  description: string;
  backgroundHex: string;
  position: "left" | "middle" | "right";
  palette: Palette;
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

const COLORS: Record<Persona, [number, number, number][]> = {
  customer: [
    [26, 115, 232],
    [66, 133, 244],
  ],
  vendor: [
    [234, 67, 53],
    [188, 45, 35],
  ],
  admin: [
    [251, 188, 5],
    [249, 171, 0],
  ],
};

export function PersonaPanel({
  persona,
  label,
  position,
  description,
  palette,
  backgroundHex,
}: PersonaPanelProps) {
  return (
    <div
      className="relative flex-1 h-full overflow-hidden"
      style={{
        clipPath: getClipPath(position),
        marginLeft: position !== "left" ? `-${SKEW_PX - GAP}px` : undefined,
      }}
    >
      {/* CanvasRevealEffect background */}
      <div className="absolute inset-0">
        <MagneticDots
          palette={palette}
          intensity={0.25}
          background={backgroundHex}
        />
      </div>

      {/* Label */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center pointer-events-none">
        <p
          className="m-0 max-w-[14ch] text-balance font-display text-[clamp(32px,3vw,60px)] font-bold leading-[1.02] tracking-[-0.035em] text-[#16161D]"
          //  className="font-display font-semibold tracking-widest uppercase text-white text-lg drop-shadow-sm"
        >
          {label}
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
}
