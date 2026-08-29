import { AnimatePresence, motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { ROW_HEIGHT, ScrollColumn } from "./DateInput";
import {
  comboMinutes,
  parseTimeValue,
  PERIOD_MAX_MINUTES,
  toDisplayTime,
  toMinutesSinceMidnight,
  toTimeValue,
} from "@/helpers/timeHelpers";

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES = Array.from({ length: 12 }, (_, i) =>
  String(i * 5).padStart(2, "0"),
);
const PERIODS = ["AM", "PM"] as const;
export type Period = (typeof PERIODS)[number];

interface TimePickerProps {
  value?: string; // "HH:mm", 24-hour
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minTime?: string;
}

export function TimePicker({
  value,
  onChange,
  placeholder = "--:-- --",
  className,
  minTime,
}: TimePickerProps) {
  const minTimeMinutes = minTime ? toMinutesSinceMidnight(minTime) : null;

  const isPeriodDisabled = (p: Period) =>
    minTimeMinutes !== null && PERIOD_MAX_MINUTES[p] < minTimeMinutes;

  const isHourDisabled = (h: number, p: Period) =>
    minTimeMinutes !== null && comboMinutes(h, 55, p) < minTimeMinutes;

  const isMinuteDisabled = (m: number, h: number, p: Period) =>
    minTimeMinutes !== null && comboMinutes(h, m, p) < minTimeMinutes;

  const parsed = parseTimeValue(value);
  const hour12 = parsed?.hour12 ?? 12;
  const minute = parsed?.minute ?? 0;
  const period = parsed?.period ?? "AM";
  const minuteIndex = Math.round(minute / 5) % 12;

  const containerRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);
  const [open, setOpenState] = useState(false);
  const setOpen = (v: boolean) => {
    openRef.current = v;
    setOpenState(v);
  };

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-border-input bg-white px-3 py-2 text-left text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary",
        )}
      >
        <span className={cn(!parsed && "text-ink-placeholder")}>
          {parsed ? toDisplayTime(hour12, minute, period) : placeholder}
        </span>
        <Clock size={16} className="text-ink-placeholder" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-[220px] rounded-xl border border-border-input bg-white p-4 shadow-lg"
          >
            <div className="relative">
              <div
                className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full bg-surface-muted"
                style={{ height: ROW_HEIGHT }}
              />
              <div className="relative grid grid-cols-3">
                <ScrollColumn
                  items={HOURS}
                  selectedIndex={hour12 - 1}
                  onSelect={(i) => onChange(toTimeValue(i + 1, minute, period))}
                  isDisabled={(i) => isHourDisabled(i + 1, period)}
                />
                <ScrollColumn
                  items={MINUTES}
                  selectedIndex={minuteIndex}
                  onSelect={(i) => onChange(toTimeValue(hour12, i * 5, period))}
                  isDisabled={(i) => isMinuteDisabled(i * 5, hour12, period)}
                />
                <ScrollColumn
                  items={[...PERIODS]}
                  selectedIndex={PERIODS.indexOf(period)}
                  onSelect={(i) =>
                    onChange(toTimeValue(hour12, minute, PERIODS[i]))
                  }
                  isDisabled={(i) => isPeriodDisabled(PERIODS[i])}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
