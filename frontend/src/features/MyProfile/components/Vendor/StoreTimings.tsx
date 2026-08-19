import { Calendar, Clock } from "lucide-react";
import { VendorProfileMetricProps } from "../../pages/VendorProfilePage";
import { SectionCard } from "../SectionCard";
import { InfoRow } from "../InfoRow";
import {
  formatTime,
  getCurrentMinutes,
  getMinutesFromTime,
  getMinutesUntil,
} from "@/helpers/timeHelpers";

type StoreTimingsProps = VendorProfileMetricProps;

export default function StoreTimings({ profile }: StoreTimingsProps) {
  const isOpenNow =
    getCurrentMinutes() >= getMinutesFromTime(profile.openTime) &&
    getCurrentMinutes() < getMinutesFromTime(profile.closeTime);

  const minutesUntilClose = getMinutesUntil(profile.closeTime);

  const hours = Math.floor(minutesUntilClose / 60);
  const minutes = minutesUntilClose % 60;

  const pendingText =
    hours > 0 ? `Closes in ${hours}h ${minutes}m` : `Closes in ${minutes}m`;

  return (
    <SectionCard
      icon={<Clock size={16} className="text-primary" />}
      iconBg="bg-primary/10"
      title="Store Timings"
      editable
    >
      <InfoRow label="Open Time" value={formatTime(profile.openTime)} />
      <InfoRow
        label="Close Time"
        value={formatTime(profile.closeTime)}
        isLast
      />
      {isOpenNow && (
        <div className="flex items-center gap-2 mt-2 rounded-sm bg-success/10 text-success border font-medium border-ink-placeholder/20 text-sm px-3 py-2">
          <Calendar size={16} strokeWidth={3} />
          <span>Open Now</span>
          <span className="font-bold">·</span>
          <span>{pendingText}</span>
        </div>
      )}
    </SectionCard>
  );
}
