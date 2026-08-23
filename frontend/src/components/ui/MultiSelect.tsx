import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown, X } from "lucide-react";
import { Persona } from "@/features/auth/constants/types";
import { cn } from "@/lib/utils";

const PERSONA_ACCENT: Record<Persona, string> = {
  customer: "#1A73E8",
  vendor: "#C5221F",
  admin: "#188038",
};

interface Option {
  code: string;
  name: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (codes: string[]) => void;
  placeholder?: string;
  persona: Persona;
  containerClassName?: string;
  dropdownClassName?: string;
  inputClassName?: string;
  displayChips?: boolean;
  autoFocus?: boolean;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Search or select...",
  persona,
  containerClassName,
  displayChips = true,
  autoFocus = false,
  inputClassName,
}: MultiSelectProps) {
  const accent = PERSONA_ACCENT[persona];
  const [open, setOpen] = useState(autoFocus);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownRect, setDropdownRect] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        !(dropdownRef.current && dropdownRef.current.contains(target))
      ) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownRect({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [open]);

  const filtered = options.filter((opt) =>
    opt.name.toLowerCase().includes(search.toLowerCase()),
  );

  function toggle(code: string) {
    if (value.includes(code)) {
      onChange(value.filter((c) => c !== code));
    } else {
      onChange([...value, code]);
    }
  }

  function remove(code: string) {
    onChange(value.filter((c) => c !== code));
  }

  const selectedOptions = options.filter((opt) => value.includes(opt.code));

  return (
    <div ref={containerRef} className="relative flex flex-col gap-2">
      <div className="relative">
        <div
          className={cn(
            "flex items-center justify-between w-full px-4 py-3 rounded-xl border border-border-input bg-surface text-sm cursor-pointer focus-within:ring-2 transition-all",
            containerClassName,
          )}
          style={{ "--tw-ring-color": accent } as any}
          onClick={() => setOpen((prev) => !prev)}
        >
          <input
            className={cn(
              "flex-1 bg-transparent outline-none text-ink placeholder:text-ink-placeholder",
              inputClassName,
            )}
            placeholder={open ? "Search services..." : placeholder}
            value={search}
            autoFocus={autoFocus}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          />
          <ChevronDown
            size={16}
            className="text-ink-muted flex-shrink-0 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>

        {open &&
          dropdownRect &&
          createPortal(
            <div
              ref={dropdownRef}
              style={{
                position: "fixed",
                top: dropdownRect.top,
                left: dropdownRect.left,
                width: dropdownRect.width,
              }}
              className="thin-scrollbar z-[60] bg-white border border-border-soft rounded-xl shadow-card max-h-[220px] overflow-y-auto"
            >
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-sm text-ink-muted">
                  No services found.
                </p>
              ) : (
                filtered.map((opt) => {
                  const isSelected = value.includes(opt.code);
                  return (
                    <div
                      key={opt.code}
                      onClick={() => toggle(opt.code)}
                      className="flex items-center justify-between px-3 py-2.5 text-sm cursor-pointer hover:bg-surface-page transition-all hover:pl-4"
                      style={{
                        color: isSelected ? accent : "#16161D",
                        fontWeight: isSelected ? 500 : 400,
                      }}
                    >
                      <span>{opt.name}</span>
                      {isSelected && (
                        <Check size={14} style={{ color: accent }} />
                      )}
                    </div>
                  );
                })
              )}
            </div>,
            document.body,
          )}
      </div>
      {displayChips && selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {selectedOptions.map((opt) => (
            <span
              key={opt.code}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border"
              style={{
                backgroundColor: accent + "12",
                color: accent,
                borderColor: accent + "30",
              }}
            >
              {opt.name}
              <button
                type="button"
                onClick={() => remove(opt.code)}
                className="hover:opacity-70 transition-opacity"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
