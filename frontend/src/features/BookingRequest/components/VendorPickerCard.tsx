import {
  Briefcase,
  CheckCircle2,
  Clock,
  ClockAlert,
  PencilLine,
  Trash2,
} from "lucide-react";
import { VendorSearchResult } from "@/features/VendorSearch/hooks/useVendorSearch";
import { DisplayTags } from "@/features/MyProfile/components/DisplayTags";
import { getOpenStatus } from "@/features/VendorSearch/components/VendorSearchCard";

interface VendorPickerCardProps {
  vendor: VendorSearchResult;
  selected?: boolean;
  onSelect?: () => void;
  selectable?: boolean;
  onChangeVendor?: () => void;
  onRemoveVendor?: () => void;
}

export default function VendorPickerCard({
  vendor,
  selected = false,
  onSelect,
  selectable = true,
  onChangeVendor,
  onRemoveVendor,
}: VendorPickerCardProps) {
  const status = getOpenStatus(vendor.openTime, vendor.closeTime);

  const details = (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <h4 className="font-medium text-ink text-sm truncate">
          {vendor.businessName}
        </h4>
        {vendor.isVerified && (
          <CheckCircle2 size={14} className="text-primary shrink-0" />
        )}
      </div>
      {vendor.location && (
        <p className="text-xs text-ink-muted mt-0.5 font-medium">
          {vendor.location}
        </p>
      )}
      {status && (
        <section className="flex gap-1 items-center my-1">
          {status.isOpen ? (
            <Clock size={12} className="text-success" />
          ) : (
            <ClockAlert size={12} className="text-destructive" />
          )}{" "}
          <p
            className={`text-xs font-medium ${status.isOpen ? "text-success" : "text-destructive"}`}
          >
            {status.label}
          </p>
        </section>
      )}
      <div className="mt-2">
        <DisplayTags
          tags={vendor.categories}
          previewCount={3}
          theme="primary"
        />
      </div>
    </div>
  );

  if (!selectable) {
    return (
      <div className="w-full flex items-start gap-4 p-4 rounded-xl border border-success bg-white">
        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Briefcase size={24} className="text-primary" />
        </div>

        {details}

        <div className="flex items-center gap-2 shrink-0 self-center">
          {onChangeVendor && (
            <button
              type="button"
              onClick={onChangeVendor}
              className="flex items-center gap-1 text-xs font-medium text-primary-deep hover:underline"
            >
              Change
              <PencilLine size={12} />
            </button>
          )}
          {onChangeVendor && onRemoveVendor && (
            <span className="text-border-input">|</span>
          )}
          {onRemoveVendor && (
            <button
              type="button"
              onClick={onRemoveVendor}
              className="flex items-center gap-1 text-xs font-medium text-danger hover:underline"
            >
              Remove
              <Trash2 size={12} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-all ${
        selected
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/30"
      }`}
    >
      <div
        className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
          selected ? "border-primary" : "border-border-input"
        }`}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
      </div>
      {details}
    </button>
  );
}
