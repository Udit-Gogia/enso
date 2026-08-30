import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { VendorSearchResult } from "@/features/VendorSearch/hooks/useVendorSearch";
import VendorPickerCard from "./VendorPickerCard";
import { Modal } from "@/components/common/Modal";

interface VendorPickerModalProps {
  open: boolean;
  onClose: () => void;
  vendors: VendorSearchResult[];
  loading: boolean;
  onConfirm: (vendor: VendorSearchResult) => void;
}

export default function VendorPickerModal({
  open,
  onClose,
  vendors,
  loading,
  onConfirm,
}: VendorPickerModalProps) {
  const [search, setSearch] = useState("");
  const [pendingSelection, setPendingSelection] =
    useState<VendorSearchResult | null>(null);

  const filtered = vendors.filter((v) =>
    v.businessName.toLowerCase().includes(search.toLowerCase()),
  );

  function handleClose() {
    setPendingSelection(null);
    setSearch("");
    onClose();
  }

  return (
    <Modal open={open} onClose={handleClose} title="Select a vendor">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            type="text"
            placeholder="Search by business name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border-input text-sm"
          />
        </div>

        <div className="flex flex-col gap-2 max-h-[380px] overflow-y-auto thin-scrollbar">
          {loading ? (
            <p className="text-sm text-ink-muted py-6 text-center">
              Searching...
            </p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-ink-muted py-6 text-center">
              No vendors found in this category yet.
            </p>
          ) : (
            filtered.map((v) => (
              <VendorPickerCard
                key={v.vendorId}
                vendor={v}
                selected={pendingSelection?.vendorId === v.vendorId}
                onSelect={() => setPendingSelection(v)}
              />
            ))
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button
            variant="outline"
            onClick={handleClose}
            type="button"
            className="flex items-center gap-2 text-sm font-medium text-ink 
                              disabled:pointer-events-none border border-ink-muted/20
                             hover:bg-ink-muted/5 px-6 py-2.5 rounded-xl active:scale-[0.97] transition-all hover:shadow-md"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (pendingSelection) {
                onConfirm(pendingSelection);
                handleClose();
              }
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold
                               text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] hover:shadow-xl bg-ink"
            disabled={!pendingSelection}
            type="button"
          >
            Select Vendor
          </Button>
        </div>
      </div>
    </Modal>
  );
}
