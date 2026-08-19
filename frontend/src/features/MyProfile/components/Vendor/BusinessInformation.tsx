import { Store } from "lucide-react";
import { SectionCard } from "../SectionCard";
import { InfoRow } from "../InfoRow";
import { SmoothInput } from "@/components/ui/SmoothInput";
import { formatDate } from "@/helpers/timeHelpers";
import { VendorProfileMetricProps } from "../../pages/VendorProfilePage";
import { VendorEditableSection } from "../../constants/types";

type BusinessInformationProps = VendorProfileMetricProps & {
  cancelBusinessEdit: () => void;
};

export default function BusinessInformation({
  profile,
  enableEditing,
  cancelBusinessEdit,
  saveProfile,
  isEditingSection,
  updateProfile,
}: BusinessInformationProps) {
  return (
    <SectionCard
      icon={<Store size={16} className="text-rose-500" />}
      iconBg="bg-rose-100"
      editable
      title="Business Information"
      onEditClick={() => enableEditing("business")}
      onCancelEdit={cancelBusinessEdit}
      onSaveEdit={() => saveProfile("business")}
      displayEditActionButton={isEditingSection("business")}
    >
      <InfoRow
        label="Business Name"
        value={profile.businessName}
        isEditing={isEditingSection("business")}
        EditInput={
          <SmoothInput
            value={profile.businessName}
            type="text"
            placeholder="Business Name"
            className={`text-sm text-right ${isEditingSection("business") ? "text-brand-blue-deep" : ""} h-min`}
            autoFocus
            onChange={(e) => {
              updateProfile({
                ...profile,
                businessName: e.target.value,
              });
            }}
          />
        }
      />
      <InfoRow
        label="Experience"
        value={`${profile.experience} years`}
        isEditing={isEditingSection("business")}
        EditInput={
          <SmoothInput
            value={profile.experience}
            type="number"
            allowDecimal
            placeholder="Experience in years"
            className={`text-sm text-right ${isEditingSection("business") ? "text-brand-blue-deep" : ""}`}
            onChange={(e) =>
              updateProfile({
                ...profile,
                experience: e.target.value,
              })
            }
          />
        }
      />
      <InfoRow label="Member Since" value={formatDate(profile.createdAt)} />
      <InfoRow
        label="Verified"
        value={profile.isVerified ? "Verified" : "Not Verified"}
      />
    </SectionCard>
  );
}
