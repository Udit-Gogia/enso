import { CheckCircle2, Info } from "lucide-react";
import { SectionCard } from "../SectionCard";
import CircularProgress from "../CircularProgress";

import { computeCompletion } from "../../helper";
import { VendorProfile } from "../../constants/types";

export default function ProfileCompletion({
  profile,
}: {
  profile: VendorProfile;
}) {
  const { pct, checks } = computeCompletion(profile);
  return (
    <SectionCard
      icon={<Info size={16} className="text-success" />}
      iconBg="bg-green-100"
      title="Profile Completion"
    >
      <div className="flex gap-4 items-center">
        <CircularProgress percentage={pct} size={125} strokeWidth={4} />
        <div>
          <h3 className="font-semibold text-ink-900 mb-2">
            {pct === 100
              ? "Great job! Your profile is complete."
              : "Finish setting up your profile."}
          </h3>
          <ul className="space-y-1">
            {Object.entries(checks).map(([label, done]) => (
              <li
                key={label}
                className={`text-sm flex items-center gap-2 ${done ? "text-success font-medium" : "text-ink-muted"}`}
              >
                <CheckCircle2
                  size={14}
                  fill={done ? "#34a853" : "#fff"}
                  color={done ? "#fff" : "#80828e"}
                />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
