import { motion } from "framer-motion";

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export default function CircularProgress({
  percentage,
  size = 190,
  strokeWidth = 10,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  const getProgressColors = (percentage: number) => {
    if (percentage >= 75) {
      return {
        stroke: "stroke-success",
        background: "stroke-success-bg",
      };
    }

    if (percentage >= 50) {
      return {
        stroke: "stroke-warning",
        background: "stroke-warning-bg",
      };
    }

    return {
      stroke: "stroke-danger",
      background: "stroke-danger-bg",
    };
  };

  const { stroke, background } = getProgressColors(progress);

  return (
    <div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={background}
          strokeWidth={strokeWidth}
        />

        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </svg>

      {/* Percentage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display text-xl font-semibold tracking-[-0.03em] text-ink-900 ">
          {progress}%
        </span>
      </div>
    </div>
  );
}
