import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  Clock,
  MapPin,
  Pencil,
  Send,
  ShieldCheck,
  ChevronDown,
  IndianRupee,
} from "lucide-react";

import { cn } from "@/lib/utils";
import TruncatedValue from "@/components/ui/TruncatedValue";
import { Button } from "@/components/ui/button";

function formatDisplayDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function formatDisplayTime(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return hhmm;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

function formatBudget(value: string): string {
  const n = Number(value);
  if (!value || Number.isNaN(n)) return "Not specified";
  return `₹${n.toLocaleString("en-IN")}`;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export interface RequestPreviewProps {
  categoryLabel: string;
  offeringsLabel?: string;
  title: string;
  requirement: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  preferredDate: string;
  preferredTime: string;
  estimatedBudget: string;
  urgencyLabel: string;
  urgencyDescription: string;
  UrgencyIcon: LucideIcon;
  urgencyIconColor: string;
  urgencyBg: string;
  vendorName: string | null;
  submitting: boolean;
  onBack: () => void;
  onEditVendor: () => void;
  onSubmit: () => void;
}

export default function RequestPreview({
  categoryLabel,
  offeringsLabel,
  title,
  requirement,
  address,
  locality,
  city,
  state,
  pincode,
  preferredDate,
  preferredTime,
  estimatedBudget,
  urgencyLabel,
  urgencyDescription,
  UrgencyIcon,
  urgencyIconColor,
  urgencyBg,
  vendorName,
  submitting,
  onBack,
  onEditVendor,
  onSubmit,
}: RequestPreviewProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto w-full">
      {/* <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-semibold text-ink-muted hover:text-ink-body mb-5"
      >
        <ArrowLeft size={14} />
        Back to edit
      </button> */}

      <div className="bg-white rounded-2xl border border-border shadow-md overflow-hidden">
        {/* Hero */}
        <div className="px-7 pt-7 pb-6">
          <div className="flex items-center gap-2 mb-3.5 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary-deep">
              {categoryLabel}
            </span>
            <span
              className={cn(
                "flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full",
                urgencyBg,
                urgencyIconColor,
              )}
            >
              <UrgencyIcon size={12} />
              {urgencyLabel} - {urgencyDescription}
            </span>
          </div>
          <h1 className="text-xl font-bold text-ink leading-snug">{title}</h1>
        </div>

        {/* Vendor */}
        {vendorName && (
          <div className="mx-7 mb-5 flex items-center gap-3 bg-surface-page rounded-xl px-3.5 py-3">
            <div className="w-9 h-9 rounded-lg bg-success/10 text-success-deep flex items-center justify-center font-bold text-xs shrink-0">
              {getInitials(vendorName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-ink-muted">
                Sending directly to
              </p>
              <p className="text-sm font-semibold text-ink truncate">
                {vendorName}
              </p>
            </div>
            <button
              type="button"
              onClick={onEditVendor}
              className="flex items-center gap-1 text-xs font-semibold text-primary-deep shrink-0"
            >
              <Pencil size={12} />
              Change
            </button>
          </div>
        )}

        {/* Quick facts */}
        <div className="mx-7 mb-6 grid grid-cols-4 divide-x divide-border rounded-xl border border-border overflow-hidden">
          {[
            {
              Icon: CalendarClock,
              label: "Date",
              value: formatDisplayDate(preferredDate),
            },
            {
              Icon: Clock,
              label: "Time",
              value: formatDisplayTime(preferredTime),
            },
            { Icon: MapPin, label: "Area", value: locality || city },
            {
              Icon: IndianRupee,
              label: "Budget",
              value: formatBudget(estimatedBudget),
            },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="text-center py-3 px-2">
              <Icon size={16} className="text-ink-placeholder mx-auto mb-1.5" />
              <p className="text-[10px] font-semibold text-ink-muted uppercase tracking-wide">
                {label}
              </p>
              <TruncatedValue value={value} />
            </div>
          ))}
        </div>

        {/* Perforation */}
        <div className="relative border-t-2 border-dashed border-border-input mx-0">
          <span className="absolute -left-[9px] -top-[9px] h-[18px] w-[18px] rounded-full bg-surface-page" />
          <span className="absolute -right-[9px] -top-[9px] h-[18px] w-[18px] rounded-full bg-surface-page" />
        </div>

        {/* Full details accordion */}
        <div className="mx-7 mt-5">
          <button
            type="button"
            onClick={() => setDetailsOpen((v) => !v)}
            className="w-full flex items-center justify-between py-2.5 text-sm font-semibold text-ink-secondary"
          >
            {detailsOpen ? "Hide full details" : "Show full details"}
            <ChevronDown
              size={16}
              className={cn(
                "text-ink-placeholder transition-transform",
                detailsOpen && "rotate-180",
              )}
            />
          </button>
          <div
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-out",
              detailsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <div className="pb-2 space-y-3">
                {offeringsLabel && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide mb-1">
                      Offerings
                    </p>
                    <p className="text-sm text-ink leading-relaxed">
                      {offeringsLabel}
                    </p>
                  </div>
                )}
                <div className="pt-3 border-t border-border">
                  <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide mb-1">
                    Requirement
                  </p>
                  <p className="text-sm text-ink leading-relaxed whitespace-pre-line">
                    {requirement}
                  </p>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-[11px] font-semibold text-ink-muted uppercase tracking-wide mb-1">
                    Full address
                  </p>
                  <p className="text-sm text-ink leading-relaxed">
                    {[address, locality, city, state]
                      .filter(Boolean)
                      .join(", ")}
                    {pincode ? ` - ${pincode}` : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="mx-7 mt-6 pt-5 border-t border-border">
          <p className="text-xs font-bold text-ink-muted  tracking-wide mb-3.5">
            What happens next
          </p>
          <div className="relative">
            <div className="absolute top-[14px] left-4 right-4 h-px bg-border-input" />
            <div className="relative grid grid-cols-3">
              {[
                {
                  Icon: Send,
                  title: "Request sent",
                  desc: "The vendor is notified right away",
                },
                {
                  Icon: Clock,
                  title: "Vendor responds",
                  desc: "Confirms availability and final price",
                },
                {
                  Icon: CheckCircle2,
                  title: "Confirmed",
                  desc: "You get a confirmation with the details",
                },
              ].map(({ Icon, title: stepTitle, desc }) => (
                <div
                  key={stepTitle}
                  className="flex flex-col items-center text-center px-1"
                >
                  <div className="bg-white rounded-full p-[3px] mb-2">
                    <div className="w-[22px] h-[22px] rounded-full bg-primary/10 text-primary-deep flex items-center justify-center">
                      <Icon size={12} />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-ink leading-snug">
                    {stepTitle}
                  </p>
                  <p className="text-[11px] text-ink-muted mt-0.5 leading-snug">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terms note */}
        <div className="mx-7 mt-5 flex items-center gap-2.5 bg-primary/5 rounded-lg px-3.5 py-3 text-xs text-ink-body">
          <ShieldCheck size={15} className="text-primary-deep shrink-0" />
          By submitting, you agree to our{" "}
          <a href="#" className="text-primary-deep font-semibold underline">
            terms and conditions
          </a>
          .
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-2.5 px-7 pt-5 pb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-ink 
                              disabled:pointer-events-none border border-ink-muted/20
                             hover:bg-ink-muted/5 px-6 py-2.5 rounded-xl active:scale-[0.97] transition-all hover:shadow-sm basis-1/4"
          >
            <ArrowLeft size={15} />
            Edit request
          </Button>
          <Button
            onClick={onSubmit}
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                               text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] hover:shadow-xl w-full bg-ink"
          >
            {submitting ? "Submitting..." : "Submit request"}
          </Button>
        </div>
      </div>
    </div>
  );
}
