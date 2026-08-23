import { useState } from "react";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Button } from "@/components/ui/button";
import { VendorProfile, ServiceOfferingRef } from "../../constants/types";
import {
  CATEGORY_HOVER_CLASSES,
  ServiceCategory,
} from "@/features/auth/constants/serviceCategoryComponentMap";
import useCategoryOfferings from "../../hooks/useCategoryOfferings";
import api from "@/lib/axios";
import { toast } from "sonner";
import { SERVICE_CATEGORY_META } from "@/features/auth/constants/serviceCategoryComponentMap";
import { Modal } from "@/components/common/Modal";

interface OfferingsManagerModalProps {
  open: boolean;
  onClose: () => void;
  profile: VendorProfile;
  serviceCategories: ServiceCategory[];
  onSaved: (updatedOfferings: ServiceOfferingRef[]) => void;
}

export default function OfferingsManagerModal({
  open,
  onClose,
  profile,
  serviceCategories,
  onSaved,
}: OfferingsManagerModalProps) {
  const [activeCategoryCode, setActiveCategoryCode] = useState<string | null>(
    null,
  );
  const [draftSelectedIds, setDraftSelectedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const { offeringsByCategory, loading } = useCategoryOfferings(
    open ? profile.categories : [],
  );

  const categoryNameByCode = new Map(
    serviceCategories.map((c) => [c.code, c.name]),
  );

  function selectedCountForCategory(code: string) {
    const categoryOfferings = offeringsByCategory[code] ?? [];
    return profile.offerings.filter((o) =>
      categoryOfferings.some((av) => av.id === o.id),
    ).length;
  }

  function openCategory(code: string) {
    const categoryOfferings = offeringsByCategory[code] ?? [];
    console.log({
      profileOfferingIds: profile.offerings.map((o) => o.id),
      categoryOfferingIds: categoryOfferings.map((o) => o.id),
    });
    const preSelected = profile.offerings
      .filter((o) => categoryOfferings.some((av) => av.id === o.id))
      .map((o) => o.id);
    setDraftSelectedIds(preSelected);
    setActiveCategoryCode(code);
  }

  function backToCategories() {
    setActiveCategoryCode(null);
    setDraftSelectedIds([]);
  }

  async function handleSaveCategory() {
    if (!activeCategoryCode) return;
    const categoryOfferings = offeringsByCategory[activeCategoryCode] ?? [];

    // Keep every selected offering from OTHER categories untouched; replace
    // only this category's slice with the current draft.
    const untouchedFromOtherCategories = profile.offerings.filter(
      (o) => !categoryOfferings.some((av) => av.id === o.id),
    );
    const newlySelectedInThisCategory = categoryOfferings.filter((o) =>
      draftSelectedIds.includes(o.id),
    );
    const mergedOfferings = [
      ...untouchedFromOtherCategories,
      ...newlySelectedInThisCategory,
    ];

    setSaving(true);
    try {
      // Sending only offeringIds works cleanly because the backend DTO uses
      // JsonNullable — fields left out of this body stay untouched server-side,
      // same mechanism the rest of the profile-update flow already relies on.
      await api.put("/api/profile/update", {
        offeringIds: mergedOfferings.map((o) => o.id),
      });
      onSaved(mergedOfferings);
      toast.success("Offerings updated");
      backToCategories();
    } catch (err) {
      toast.error("Failed to save offerings");
    } finally {
      setSaving(false);
    }
  }

  const activeCategoryOfferings = activeCategoryCode
    ? (offeringsByCategory[activeCategoryCode] ?? [])
    : [];

  return (
    <Modal
      open={open}
      onClose={() => {
        backToCategories();
        onClose();
      }}
      title={
        activeCategoryCode
          ? (categoryNameByCode.get(activeCategoryCode) ?? activeCategoryCode)
          : "Manage services & products"
      }
    >
      {loading ? (
        <p className="text-ink-muted text-sm">Loading categories...</p>
      ) : !activeCategoryCode ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 h-full">
          {profile.categories.map((code) => {
            const meta = SERVICE_CATEGORY_META[code];
            const Icon = meta?.icon;
            const hoverClasses = meta
              ? (CATEGORY_HOVER_CLASSES[meta.colorClass] ??
                "hover:bg-surface-page hover:border-primary/40")
              : "hover:bg-surface-page hover:border-primary/40";

            return (
              <button
                key={code}
                type="button"
                onClick={() => openCategory(code)}
                className={`flex flex-col items-start gap-1 p-4 rounded-xl border border-border transition-all text-left ${hoverClasses}`}
              >
                {Icon && (
                  <span className="w-8 h-8 rounded-lg  flex items-center justify-center mb-1">
                    <Icon size={16} className={meta.colorClass} />
                  </span>
                )}
                <span className="font-medium text-ink text-sm">
                  {categoryNameByCode.get(code) ?? code}
                </span>
                <span className="text-xs text-ink-muted">
                  {selectedCountForCategory(code)} selected
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setDraftSelectedIds(
                  draftSelectedIds.length === activeCategoryOfferings.length
                    ? []
                    : activeCategoryOfferings.map((o) => o.id),
                )
              }
              className="text-xs font-medium text-primary hover:underline"
            >
              {draftSelectedIds.length === activeCategoryOfferings.length
                ? "Deselect all"
                : "Select all"}
            </button>
            <span className="text-xs text-ink-muted">
              {draftSelectedIds.length} of {activeCategoryOfferings.length}{" "}
              selected
            </span>
          </div>

          <MultiSelect
            options={activeCategoryOfferings.map((o) => ({
              code: o.id,
              name: o.name,
            }))}
            value={draftSelectedIds}
            onChange={setDraftSelectedIds}
            placeholder="Search or select services..."
            persona="customer"
            dropdownClassName="relative z-20"
          />

          <div className="flex justify-end gap-2 mt-2">
            <Button
              variant="outline"
              onClick={backToCategories}
              disabled={saving}
              className="flex items-center gap-2 text-sm font-medium text-ink 
                              disabled:pointer-events-none border border-ink-muted/20
                             hover:bg-ink-muted/5 px-6 py-2.5 rounded-xl active:scale-[0.97] transition-all hover:shadow-xs"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSaveCategory}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                               text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] hover:shadow-xl"
              style={{ backgroundColor: "#16161D" }}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
