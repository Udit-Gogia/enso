import { MagneticDots } from "@/components/common/MagneticDots";
import { PersonaPanelProps } from "../constants/types"; // adjust if the name's changed
import SpotlightCard from "@/components/SpotlightCard";
import { cn, hexToRgba } from "@/lib/utils";

export function PersonaPanel({
  persona,
  selected,
  onClick,
}: PersonaPanelProps) {
  const {
    label,
    description,
    palette,
    Icon,
    spotlightColor,
    backgroundHex,
    features,
  } = persona;

  return (
    <div
      className="relative flex-1 h-full overflow-hidden flex items-center justify-center hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <MagneticDots
          palette={palette}
          intensity={2}
          background="#ffffff"
          className="w-full h-full"
        />
      </div>

      <SpotlightCard
        className={cn(
          "rounded-[34px] backdrop-blur-xl border p-8 shadow-lg transition-all duration-300",
          selected
            ? "border-transparent -translate-y-1 scale-[1.02]"
            : "bg-surface/80 border-surface/70",
        )}
        style={
          selected
            ? {
                backgroundColor: hexToRgba(backgroundHex, 0.08),
                boxShadow: `0 0 0 1.5px ${hexToRgba(backgroundHex, 0.9)}, 0 24px 48px -20px ${hexToRgba(backgroundHex, 0.35)}`,
              }
            : undefined
        }
        spotlightColor={spotlightColor}
        accentColor={backgroundHex}
        selected={selected}
      >
        <div className="relative z-10 flex h-full flex-col items-center text-center gap-5">
          <div className="p-4 rounded-full shadow-lg bg-white border border-surface-page">
            {Icon && <Icon color={backgroundHex} size={24} />}
          </div>

          <div className="flex flex-col gap-3 items-center justify-center">
            <p className="m-0 max-w-[14ch] text-balance font-display text-3xl font-bold leading-tight tracking-tight text-ink">
              {label}
            </p>
            <p className="text-sm font-normal font-sans text-ink-body max-w-[27ch]">
              {description}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-center gap-6 pt-4">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2 text-xs font-semibold font-sans text-ink-muted"
              >
                <f.icon color={backgroundHex} size={16} />
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
