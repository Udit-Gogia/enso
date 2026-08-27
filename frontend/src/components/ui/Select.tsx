import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Persona } from "@/features/auth/constants/types";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const PERSONA_ACCENT: Record<Persona, string> = {
  customer: "#7e7de8",
  vendor: "#C5221F",
  admin: "#188038",
};

interface Option {
  code: string;
  name: string;
  icon?: LucideIcon;
  iconColorClass?: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (codes: string) => void;
  placeholder?: string;
  persona: Persona;
  containerClassName?: string;
  parentClassName?: string;
  dropdownClassName?: string;
  inputClassName?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Search or select...",
  persona,
  containerClassName,
  parentClassName,
  dropdownClassName,
  inputClassName,
}: SelectProps) {
  const accent = PERSONA_ACCENT[persona];
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter((opt) =>
    opt.name.toLowerCase().includes(search.toLowerCase()),
  );

  function select(value: string) {
    onChange(value);
    setOpen(false);
    setSearch("");
  }

  const selectedOption = options.find((opt) => opt.name === value);
  const SelectedIcon = selectedOption?.icon;

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col gap-2", parentClassName)}
    >
      <div className="relative">
        {/* Trigger */}
        <div
          className={cn(
            "flex items-center justify-between w-full px-4 py-3 rounded-xl border border-border-input bg-surface text-sm cursor-pointer focus-within:ring-2 transition-all",
            containerClassName,
          )}
          style={{ "--tw-ring-color": accent } as any}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {!open && SelectedIcon && (
              <SelectedIcon
                size={16}
                className={cn("shrink-0", selectedOption?.iconColorClass)}
              />
            )}
            <input
              className={cn(
                "flex-1 bg-transparent outline-none text-ink placeholder:text-ink-placeholder min-w-0",
                inputClassName,
              )}
              placeholder={open ? "Search services..." : placeholder}
              value={search || value}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpen(true);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            />
          </div>
          <ChevronDown
            size={16}
            className="text-ink-muted flex-shrink-0 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div
            className={cn(
              "absolute top-[calc(100%+4px)] left-0 right-0 z-50 bg-white border border-border-soft rounded-xl shadow-card max-h-[220px] overflow-y-auto",
              dropdownClassName,
            )}
          >
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-ink-muted">No city found.</p>
            ) : (
              filtered.map((opt) => {
                const isSelected = value === opt.name;
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.code}
                    onClick={() => select(opt.name)}
                    className="flex items-center justify-between px-3 py-2.5 text-sm cursor-pointer hover:bg-surface-page transition-all hover:pl-4"
                    style={{
                      color: isSelected ? accent : "#16161D",
                      backgroundColor: isSelected ? accent + "15" : "",
                    }}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      {Icon && (
                        <Icon
                          size={14}
                          className={cn("shrink-0", opt.iconColorClass)}
                        />
                      )}
                      <span className="truncate">{opt.name}</span>
                    </span>
                    {isSelected && (
                      <Check
                        size={14}
                        className="shrink-0"
                        style={{ color: accent }}
                      />
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
