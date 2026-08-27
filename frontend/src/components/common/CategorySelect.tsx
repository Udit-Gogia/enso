import { Select } from "@/components/ui/Select";
import { Persona } from "@/features/auth/constants/types";
import { SERVICE_CATEGORY_META } from "@/features/auth/constants/serviceCategoryComponentMap";
import useActiveCategories from "@/features/VendorSearch/hooks/useActiveCategories";

interface CategorySelectProps {
  value: string; // category code, not display name
  onChange: (code: string) => void;
  placeholder?: string;
  persona: Persona;
  containerClassName?: string;
  parentClassName?: string;
}

export function CategorySelect({
  value,
  onChange,
  placeholder = "Select a category",
  persona,
  containerClassName,
  parentClassName,
}: CategorySelectProps) {
  const { categories } = useActiveCategories();

  const options = categories.map((c) => {
    const meta = SERVICE_CATEGORY_META[c.code];
    return {
      code: c.code,
      name: c.name,
      icon: meta?.icon,
      iconColorClass: meta?.colorClass,
    };
  });

  const selectedName = categories.find((c) => c.code === value)?.name ?? "";

  return (
    <Select
      options={options}
      value={selectedName}
      onChange={(name) => {
        const match = categories.find((c) => c.name === name);
        onChange(match?.code ?? "");
      }}
      placeholder={placeholder}
      persona={persona}
      containerClassName={containerClassName}
      parentClassName={parentClassName}
    />
  );
}
