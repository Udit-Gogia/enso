// DatePicker.tsx
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
  getDaysGrid,
  isMonthFullyDisabled,
  parseISO,
  toDisplay,
  toISO,
  toYearMonth,
} from "@/helpers/timeHelpers";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const ROW_HEIGHT = 40;

interface DatePickerProps {
  value?: string; // "yyyy-mm-dd"
  onChange: (value: string) => void;
  minDate?: string;
  maxDate?: string;
  placeholder?: string;
  className?: string;
}

export function ScrollColumn({
  items,
  selectedIndex,
  onSelect,
  isDisabled,
}: {
  items: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  isDisabled?: (index: number) => boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const targetTop = selectedIndex * ROW_HEIGHT; // was: selectedIndex * ROW_HEIGHT - ROW_HEIGHT * 2
    if (!hasMounted.current) {
      el.scrollTop = targetTop;
      hasMounted.current = true;
    } else {
      el.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  }, [selectedIndex]); // was: []

  return (
    <div
      ref={containerRef}
      className="no-scrollbar h-[200px] overflow-y-auto"
      style={{
        scrollSnapType: "y mandatory",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 35%, black 65%, transparent 100%)",
      }}
    >
      <div style={{ height: ROW_HEIGHT * 2 }} />
      {items.map((label, i) => {
        const disabled = isDisabled?.(i) ?? false;
        return (
          <button
            key={label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(i)}
            className={cn(
              "flex w-full items-center justify-center text-sm transition-colors",
              disabled
                ? "cursor-not-allowed text-ink-placeholder/40"
                : i === selectedIndex
                  ? "font-semibold text-ink"
                  : "text-ink-placeholder hover:text-ink",
            )}
            style={{ height: ROW_HEIGHT, scrollSnapAlign: "center" }}
          >
            {label}
          </button>
        );
      })}
      <div style={{ height: ROW_HEIGHT * 2 }} />
    </div>
  );
}

function MonthYearList({
  cursor,
  minDate,
  maxDate,
  onSelectMonth,
  onSelectYear,
}: {
  cursor: Date;
  minDate?: string;
  maxDate?: string;
  onSelectMonth: (month: number) => void;
  onSelectYear: (year: number) => void;
}) {
  const years = Array.from(
    { length: 121 },
    (_, i) => cursor.getFullYear() - 60 + i,
  );
  const minParsed = minDate ? parseISO(minDate) : null;
  const maxParsed = maxDate ? parseISO(maxDate) : null;

  return (
    <div className="relative h-[200px]">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 rounded-full bg-surface-muted" />
      <div className="relative grid h-full grid-cols-2">
        <ScrollColumn
          items={MONTH_NAMES}
          selectedIndex={cursor.getMonth()}
          onSelect={onSelectMonth}
          isDisabled={(i) =>
            isMonthFullyDisabled(cursor.getFullYear(), i, minDate, maxDate)
          }
        />
        <ScrollColumn
          items={years.map(String)}
          selectedIndex={years.indexOf(cursor.getFullYear())}
          onSelect={(i) => onSelectYear(years[i])}
          isDisabled={(i) =>
            (minParsed !== null && years[i] < minParsed.getFullYear()) ||
            (maxParsed !== null && years[i] > maxParsed.getFullYear())
          }
        />
      </div>
    </div>
  );
}

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "dd-mm-yyyy",
  className,
}: DatePickerProps) {
  const selected = parseISO(value);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"days" | "months">("days");
  const [cursor, setCursor] = useState(() => selected ?? new Date());
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const cursorYM = toYearMonth(cursor);
  const minYM = minDate ? toYearMonth(parseISO(minDate)!) : null;
  const maxYM = maxDate ? toYearMonth(parseISO(maxDate)!) : null;
  const canGoPrev = minYM === null || cursorYM > minYM;
  const canGoNext = maxYM === null || cursorYM < maxYM;

  const todayISO = toISO(new Date());

  useEffect(() => {
    if (!open) setView("days");
  }, [open]);

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

  const changeMonth = (delta: number) => {
    setDirection(delta);
    setCursor(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1),
    );
  };

  const selectDay = (date: Date) => {
    onChange(toISO(date));
    setOpen(false);
  };

  const cells = getDaysGrid(cursor.getFullYear(), cursor.getMonth());

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-md border border-border-input bg-white px-3 py-2 text-left text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary",
        )}
      >
        <span className={cn(!selected && "text-ink-placeholder")}>
          {selected ? toDisplay(selected) : placeholder}
        </span>
        <CalendarIcon size={16} className="text-ink-placeholder" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-[300px] rounded-xl border border-border-input bg-white p-4 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  setView((v) => (v === "days" ? "months" : "days"))
                }
                className="flex items-center gap-1 text-base font-semibold text-ink"
              >
                {MONTH_NAMES[cursor.getMonth()]} {cursor.getFullYear()}
                <ChevronDown
                  size={16}
                  className={cn(
                    "transition-transform",
                    view === "months" && "rotate-180",
                  )}
                />
              </button>
              {view === "days" && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => canGoPrev && changeMonth(-1)}
                    disabled={!canGoPrev}
                    className={cn(
                      "rounded p-1 hover:bg-surface-muted",
                      !canGoPrev &&
                        "cursor-not-allowed opacity-30 hover:bg-transparent",
                    )}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => canGoNext && changeMonth(1)}
                    disabled={!canGoNext}
                    className={cn(
                      "rounded p-1 hover:bg-surface-muted",
                      !canGoNext &&
                        "cursor-not-allowed opacity-30 hover:bg-transparent",
                    )}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>

            {view === "days" ? (
              <motion.div
                key={`${cursor.getFullYear()}-${cursor.getMonth()}`}
                initial={{ x: direction * 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.18 }}
              >
                <div className="mb-2 grid grid-cols-7">
                  {WEEKDAYS.map((d) => (
                    <div
                      key={d}
                      className="text-center text-[11px] font-medium text-ink-placeholder"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-1">
                  {cells.map((date, i) => {
                    if (!date) return <div key={i} />;
                    const iso = toISO(date);
                    const isSelected = selected && toISO(selected) === iso;
                    const isToday = iso === todayISO;
                    const disabled = Boolean(
                      (minDate && iso < minDate) || (maxDate && iso > maxDate),
                    );
                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={disabled}
                        onClick={() => selectDay(date)}
                        className={cn(
                          "mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm",
                          isSelected
                            ? "bg-primary font-semibold text-white"
                            : isToday
                              ? "ring-1 ring-primary font-semibold text-primary"
                              : "hover:bg-surface-muted",
                          disabled &&
                            "cursor-not-allowed opacity-30 hover:bg-transparent",
                        )}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <MonthYearList
                cursor={cursor}
                minDate={minDate}
                maxDate={maxDate}
                onSelectMonth={(m) => {
                  setCursor((prev) => new Date(prev.getFullYear(), m, 1));
                  setView("days");
                }}
                onSelectYear={(y) => {
                  setCursor((prev) => new Date(y, prev.getMonth(), 1));
                  setView("days");
                }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
