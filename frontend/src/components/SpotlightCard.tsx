import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { hexToRgba } from "@/lib/utils";

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  /** Plain hex accent for the selection reveal — kept separate from
   *  spotlightColor, which is tuned low for an ambient/hover glow. */
  accentColor?: string;
  selected?: boolean;
  spotlightPosition?: string;
}

const IDLE_SPOTLIGHT_POSITION = "65% 18%";
// Comfortably bigger than any card's corner-to-corner distance, so the
// reveal always fully covers the card regardless of where it started.
const REVEAL_MAX_RADIUS = 500;

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  style,
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  accentColor = "#ffffff",
  selected = false,
  spotlightPosition,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  // Where the card was last clicked — the reveal grows from (or recedes
  // back to) this point, not the card's center.
  const [revealOrigin, setRevealOrigin] = useState<Position>({ x: 0, y: 0 });

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsActive(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
    setIsActive(false);
  };
  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    setIsActive(true);
  };
  const handleMouseLeave = () => setIsActive(false);

  // Separate from the selection logic living in the parent — this only
  // records *where* the click landed, for the reveal below to grow from.
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setRevealOrigin({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const SPOTLIGHT_POSITION = spotlightPosition ?? IDLE_SPOTLIGHT_POSITION;

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={style}
      className={`relative rounded-3xl border border-neutral-800 bg-transparent overflow-hidden p-8 ${className}`}
    >
      {/* Idle spotlight — fixed top-right, visible at rest */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity: isActive ? 0 : 0.7,
          background: `radial-gradient(circle at ${SPOTLIGHT_POSITION}, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {/* Interactive spotlight — tracks the cursor on hover/focus */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity: isActive ? 1 : 0,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {/* Selection reveal — light spreads out from the click point when
          selected, recedes back to that same point when deselected. */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${revealOrigin.x}px ${revealOrigin.y}px, ${hexToRgba(accentColor, 0.18)} 0%, ${hexToRgba(accentColor, 0.05)} 100%)`,
        }}
        animate={{
          clipPath: selected
            ? `circle(${REVEAL_MAX_RADIUS}px at ${revealOrigin.x}px ${revealOrigin.y}px)`
            : `circle(0px at ${revealOrigin.x}px ${revealOrigin.y}px)`,
        }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
