import { SectionCard } from "../SectionCard";
import { InfoRow } from "../InfoRow";
import { SmoothInput } from "@/components/ui/SmoothInput";
import { Mail } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { CITIES } from "@/constants/cities";
import { BaseProfile, UserRole } from "../../constants/types";

type ContactInformationProps<T extends BaseProfile> = {
  role: UserRole;
  props: {
    profile: T;
    enableEditing: (section: "contact") => void;
    saveProfile: (section: "contact") => void;
    isEditingSection: (section: "contact") => boolean;
    updateProfile: (profile: T) => void;
  };
  cancelContactEdit: () => void;
};

export default function ContactInformation<T extends BaseProfile>({
  props,
  cancelContactEdit,
}: ContactInformationProps<T>) {
  const {
    profile,
    enableEditing,
    saveProfile,
    isEditingSection,
    updateProfile,
  } = props;

  return (
    <SectionCard
      icon={<Mail size={16} className="text-amber " />}
      iconBg="bg-amber/5"
      title="Contact Information"
      editable
      onEditClick={() => enableEditing("contact")}
      onCancelEdit={cancelContactEdit}
      onSaveEdit={() => saveProfile("contact")}
      displayEditActionButton={isEditingSection("contact")}
    >
      <InfoRow label="Email" value={profile.email} />
      <InfoRow
        label="Phone"
        value={profile.phone}
        isEditing={isEditingSection("contact")}
        EditInput={
          <SmoothInput
            value={profile.phone}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            autoFocus
            maxLength={10}
            pattern="[6-9][0-9]{9}"
            placeholder="phone"
            className={`text-sm text-right ${isEditingSection("contact") ? "text-brand-blue-deep" : ""}`}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");

              // Limit to 10 digits
              updateProfile({
                ...profile,
                phone: digits.slice(0, 10),
              });
            }}
          />
        }
      />
      <InfoRow
        label="Location"
        value={profile.location ?? "-"}
        isEditing={isEditingSection("contact")}
        EditInput={
          <Select
            options={CITIES}
            persona="customer"
            containerClassName="!p-0 !focus:outline-none !border-none focus-within:ring-0 text-right"
            dropdownClassName="max-h-40 shadow-card"
            inputClassName="text-brand-blue-deep font-semibold text-right mr-4"
            value={profile.location ?? ""}
            onChange={(city: string) =>
              updateProfile({
                ...profile,
                location: city,
              })
            }
          />
        }
      />
    </SectionCard>
  );
}
