import { useState } from "react";
import { ChevronRight, Package } from "lucide-react";
import { SectionCard } from "../SectionCard";
import { VendorProfileMetricProps } from "../../pages/VendorProfilePage";
import { ServiceCategory } from "@/features/auth/constants/serviceCategoryComponentMap";
import OfferingsManagerModal from "./OfferingsManagerModal";
import OfferingsTable, { CATEGORY_FILTER_ALL } from "./OfferingsTable";

import { ServiceOfferingRef } from "../../constants/types";
import { Modal } from "@/components/common/Modal";

type OfferingsProps = VendorProfileMetricProps & {
  serviceCategories: ServiceCategory[];
};

const PREVIEW_LIMIT = 10;

export default function Offerings({
  profile,
  serviceCategories,
  updateProfile,
}: OfferingsProps) {
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);

  const [previewSearch, setPreviewSearch] = useState("");
  const [previewCategory, setPreviewCategory] = useState(CATEGORY_FILTER_ALL);

  const [viewAllSearch, setViewAllSearch] = useState("");
  const [viewAllCategory, setViewAllCategory] = useState(CATEGORY_FILTER_ALL);

  function handleSaved(updatedOfferings: ServiceOfferingRef[]) {
    updateProfile({ ...profile, offerings: updatedOfferings });
  }

  const totalOfferings = (profile.offerings ?? []).length;

  return (
    <SectionCard
      icon={<Package size={16} className="text-brand-blue" />}
      iconBg="bg-brand-blue/10"
      title="Services & Products Offered"
      desc="The services and products you currently offer to customers - click the pencil to update."
      className="col-span-2"
      editable
      onEditClick={() => setIsManagerOpen(true)}
    >
      {totalOfferings === 0 ? (
        <span className="text-danger text-xs font-semibold">
          Select at least 1 offering so customers know exactly what you provide.
        </span>
      ) : (
        <div className="mt-4">
          <OfferingsTable
            offerings={profile.offerings}
            searchFilter={previewSearch}
            onSearchChange={setPreviewSearch}
            categoryFilter={previewCategory}
            onCategoryChange={setPreviewCategory}
            limit={PREVIEW_LIMIT}
          />
          {totalOfferings > PREVIEW_LIMIT && (
            <button
              type="button"
              onClick={() => setIsViewAllOpen(true)}
              className="mt-3 flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all {totalOfferings} services
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      )}

      <OfferingsManagerModal
        open={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        profile={profile}
        serviceCategories={serviceCategories}
        onSaved={handleSaved}
      />

      <Modal
        open={isViewAllOpen}
        onClose={() => setIsViewAllOpen(false)}
        title="All services & products offered"
      >
        <OfferingsTable
          offerings={profile.offerings}
          searchFilter={viewAllSearch}
          onSearchChange={setViewAllSearch}
          categoryFilter={viewAllCategory}
          onCategoryChange={setViewAllCategory}
        />
      </Modal>
    </SectionCard>
  );
}
