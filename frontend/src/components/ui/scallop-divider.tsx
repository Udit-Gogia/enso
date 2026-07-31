import { useId } from "react";
import { cn } from "@/lib/utils";

export function ScallopDivider({
  fill,
  bumpWidth = 24,
  bumpHeight = 9,
  className,
}: {
  fill: string;
  bumpWidth?: number;
  bumpHeight?: number;
  className?: string;
}) {
  const patternId = useId();
  const margin = 100; // flat pad below the wave so the fill fully covers the seam
  const stripHeight = bumpHeight + margin;
  const w = bumpWidth;
  const h = bumpHeight;

  return (
    <svg
      width="100%"
      height={stripHeight}
      className={cn("relative block", className)}
      style={{ marginTop: -stripHeight }}
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={w}
          height={stripHeight}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M0,${h} C${w / 4},${h} ${w / 4},0 ${w / 2},0 C${(3 * w) / 4},0 ${(3 * w) / 4},${h} ${w},${h} L${w},${stripHeight} L0,${stripHeight} Z`}
            fill={fill}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
