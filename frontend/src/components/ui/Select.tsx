import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Persona } from "@/features/auth/constants/types";

const PERSONA_ACCENT: Record<Persona, string> = {
  customer: "#1A73E8",
  vendor: "#C5221F",
  admin: "#188038",
};

interface Option {
  code: string;
  name: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (codes: string) => void;
  placeholder?: string;
  persona: Persona;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Search or select...",
  persona,
}: SelectProps) {
  const accent = PERSONA_ACCENT[persona];
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
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

  const selectedOptions = options.filter((opt) => value.includes(opt.code));
  console.log({ selectedOptions });
  console.log("persona at select", persona, accent);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-2">
      <div className="relative">
        {/* Trigger */}
        <div
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl 
                   border border-border-input bg-surface text-sm cursor-pointer
                   focus-within:ring-2 transition-all"
          style={{ focusWithinRingColor: accent } as any}
          onClick={() => setOpen((prev) => !prev)}
        >
          <input
            className="flex-1 bg-transparent outline-none text-ink placeholder:text-ink-placeholder"
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
          <ChevronDown
            size={16}
            className="text-ink-muted flex-shrink-0 transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 
                        bg-white border border-border-soft rounded-xl shadow-card 
                        max-h-[220px] overflow-y-auto"
          >
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-ink-muted">No city found.</p>
            ) : (
              filtered.map((opt) => {
                const isSelected = value === opt.name;
                return (
                  <div
                    key={opt.code}
                    onClick={() => select(opt.name)}
                    className={`flex items-center justify-between px-3 py-2.5 
                             text-sm cursor-pointer hover:bg-surface-page transition-all hover:pl-4 `}
                    style={{
                      color: isSelected ? accent : "#16161D",
                      backgroundColor: isSelected ? accent + "15" : "",
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
          </div>
        )}
      </div>
      {/* Selected chips */}
      {/* {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1">
          {selectedOptions.map((opt) => (
            <span
              key={opt.code}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full 
                         text-xs font-medium border"
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
      )} */}
    </div>
  );
}
