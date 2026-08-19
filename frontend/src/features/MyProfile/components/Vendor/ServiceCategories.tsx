import { Store } from "lucide-react";
import { SectionCard } from "../SectionCard";
import { DisplayTags } from "../DisplayTags";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { ServiceCategory } from "@/features/auth/constants/serviceCategoryComponentMap";
import { VendorProfileMetricProps } from "../../pages/VendorProfilePage";

type ServiceCategoriesProps = VendorProfileMetricProps & {
  cancelServiceCateroryEdit: () => void;
  saveServiceCategories: () => Promise<void>;
  serviceCategories: ServiceCategory[];
};

export default function ServiceCategories({
  profile,
  serviceCategories,
  enableEditing,
  cancelServiceCateroryEdit,
  saveServiceCategories,
  isEditingSection,
  updateProfile,
}: ServiceCategoriesProps) {
  return (
    <SectionCard
      icon={<Store size={16} className="text-brand-blue" />}
      iconBg="bg-brand-blue/10"
      title="Service Categories"
      desc="Your profile appears in searches for these categories."
      className="col-span-2"
      editable
      onEditClick={() => enableEditing("categories")}
      onCancelEdit={cancelServiceCateroryEdit}
      onSaveEdit={saveServiceCategories}
      displayEditActionButton={isEditingSection("categories")}
    >
      <DisplayTags
        tags={profile.categories}
        noTagMessage="Select atleast 1 service category to appear in search result."
      />
      {isEditingSection("categories") ? (
        <MultiSelect
          options={(serviceCategories ?? []).map((opt) => ({
            code: opt.code,
            name: opt.name,
          }))}
          value={profile.categories ?? []}
          onChange={(value) => {
            updateProfile({
              ...profile,
              categories: value,
            });
          }}
          autoFocus
          placeholder={"Search or select services..."}
          persona={"customer"}
          containerClassName="!focus:outline-none focus-within:ring-0 text-right  mt-4 border-2 px-3 py-2 border-brand-blue"
          displayChips={false}
          dropdownClassName="max-h-40 shadow-card !text-primary"
          inputClassName="text-brand-blue-deep "
        />
      ) : (
        <></>
      )}
    </SectionCard>
  );
}
