import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LayoutGrid, Package as PackageIcon } from "lucide-react";
import { ServiceOfferingRef } from "../../constants/types";
import { SERVICE_CATEGORY_META } from "@/features/auth/constants/serviceCategoryComponentMap";
import { SmoothInput } from "@/components/ui/SmoothInput";
import { Select } from "@/components/ui/Select";

export const CATEGORY_FILTER_ALL = "All categories";

interface OfferingsTableProps {
  offerings: ServiceOfferingRef[];
  searchFilter: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  limit?: number;
}

export default function OfferingsTable({
  offerings,
  searchFilter,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  limit,
}: OfferingsTableProps) {
  const uniqueCategories = Array.from(
    new Map(offerings.map((o) => [o.categoryCode, o.categoryName])),
  );

  const filtered = offerings.filter((o) => {
    const matchesSearch = o.name
      .toLowerCase()
      .includes(searchFilter.toLowerCase());
    const matchesCategory =
      categoryFilter === CATEGORY_FILTER_ALL ||
      o.categoryName === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const visible = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-3">
        <SmoothInput
          type="text"
          name="search services"
          placeholder="Filter services..."
          value={searchFilter}
          onChange={(e) => onSearchChange(e.target.value)}
          wrapperClassName="basis-3/4"
          className="px-3 py-2 rounded-lg border border-border-input text-sm flex-1 min-w-[160px] w-full"
        />

        <Select
          value={categoryFilter}
          onChange={onCategoryChange}
          containerClassName="px-3 py-2 rounded-lg border border-border-input text-sm "
          parentClassName="flex-auto"
          options={[
            { code: "", name: CATEGORY_FILTER_ALL },
            ...uniqueCategories.map(([code, name]) => ({ code, name })),
          ]}
          persona="customer"
        />
      </div>

      <div className="border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader className="bg-surface-page/50">
            <TableRow>
              <TableHead>
                <span className="flex items-center gap-1.5 ml-3">
                  <LayoutGrid size={12} /> Category
                </span>
              </TableHead>
              <TableHead>
                <span className="flex items-center gap-1.5">
                  <PackageIcon size={12} /> Service / Product
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.map((o) => {
              const meta = SERVICE_CATEGORY_META[o.categoryCode];
              const Icon = meta?.icon;
              return (
                <TableRow key={o.id}>
                  <TableCell className="text-ink-body py-2">
                    <span className="flex items-center gap-2">
                      {Icon && (
                        <span className="w-6 h-6 rounded-md  flex items-center justify-center shrink-0">
                          <Icon size={13} className={meta.colorClass} />
                        </span>
                      )}
                      {o.categoryName}
                    </span>
                  </TableCell>
                  <TableCell className="text-ink-secondary font-medium">
                    {o.name}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filtered.length === 0 ? (
          <p className="px-4 py-6 text-sm text-ink-muted text-center">
            No matches.
          </p>
        ) : (
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-surface-page/50 text-xs text-ink-muted border-t border-border">
            <PackageIcon size={12} />
            Showing{" "}
            <span className="font-semibold text-ink">
              {visible.length}
            </span> of{" "}
            <span className="font-semibold text-ink">{filtered.length}</span>{" "}
            selected services
          </div>
        )}
      </div>
    </div>
  );
}
