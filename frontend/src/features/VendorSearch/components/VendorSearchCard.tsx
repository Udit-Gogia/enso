import {
  Briefcase,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { VendorSearchResult } from "../hooks/useVendorSearch";
import SpotlightCard from "@/components/SpotlightCard";
import { DisplayTags } from "@/features/MyProfile/components/DisplayTags";

import {
  formatTime,
  getMinutesFromTime,
  getCurrentMinutes,
} from "@/helpers/timeHelpers";

export function getOpenStatus(
  openTime: string | null,
  closeTime: string | null,
): { label: string; isOpen: boolean } | null {
  if (!openTime || !closeTime) return null;

  const nowMinutes = getCurrentMinutes();
  const openMinutes = getMinutesFromTime(openTime);
  const closeMinutes = getMinutesFromTime(closeTime);

  const isOpen =
    closeMinutes > openMinutes &&
    nowMinutes >= openMinutes &&
    nowMinutes < closeMinutes;

  return {
    isOpen,
    label: isOpen
      ? `Open until ${formatTime(closeTime)}`
      : `Opens at ${formatTime(openTime)}`,
  };
}

interface VendorSearchCardProps {
  vendor: VendorSearchResult;
}

export default function VendorSearchCard({ vendor }: VendorSearchCardProps) {
  const status = getOpenStatus(vendor.openTime, vendor.closeTime);
  return (
    <SpotlightCard
      className="border border-surface-page shadow-md bg-white"
      spotlightPosition="50% -100%"
    >
      <div className="rounded-2xl  flex flex-col h-full">
        {/* Header: fixed-size avatar + role badge + name */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center bg-primary/10 border border-primary/20">
            <Briefcase className="text-primary" size={24} />
          </div>

          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <h3 className="text-base font-bold text-ink truncate">
                {vendor.businessName}
              </h3>

              {vendor.isVerified && (
                <CheckCircle2 className="text-primary shrink-0" size={16} />
              )}
            </div>
            {status && (
              <span
                className={`flex items-center gap-1 mt-1 text-xs font-semibold ${
                  status.isOpen ? "text-success" : "text-ink-muted"
                }`}
              >
                <Clock size={12} className="shrink-0" />
                {status.label}
              </span>
            )}
            {/* TODO: Add Profile Rating */}
          </div>
        </div>

        {/* Contact row: wraps onto a new line instead of overflowing/cutting off */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs font-medium text-ink-muted">
          <span className="flex items-center gap-1 min-w-0">
            <Mail size={12} className="shrink-0" />
            <span className="truncate max-w-[160px]">{vendor.email}</span>
          </span>
          <span className="flex items-center gap-1">
            <Phone size={12} className="shrink-0" />
            {vendor.phone}
          </span>
          {vendor.location && (
            <span className="flex items-center gap-1">
              <MapPin size={12} className="shrink-0" />
              {vendor.location}
            </span>
          )}
        </div>

        {/* Bio: clamped to 2 lines so it can't stretch the card's height unpredictably */}
        {/* {vendor.bio && (
          <p className="text-xs text-ink-muted mt-3 line-clamp-2">
            {vendor.bio}
          </p>
        )} */}

        {/* Categories: pinned to the bottom via mt-auto, so every card ends flush regardless of content above */}
        <div className="flex flex-wrap gap-1 mt-auto pt-3">
          <DisplayTags tags={vendor.categories} previewCount={3} />
        </div>
      </div>
    </SpotlightCard>
  );
}
