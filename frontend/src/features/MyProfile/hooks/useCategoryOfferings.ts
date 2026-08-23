import api from "@/lib/axios";
import { useEffect, useState } from "react";

export interface CategoryOffering {
  id: string;
  code: string;
  name: string;
  categoryCode: string;
  categoryName: string;
}

export default function useCategoryOfferings(categoryCodes: string[]) {
  const [offeringsByCategory, setOfferingsByCategory] = useState<
    Record<string, CategoryOffering[]>
  >({});
  const [loading, setLoading] = useState(false);

  const key = categoryCodes.join(",");

  useEffect(() => {
    if (categoryCodes.length === 0) {
      setOfferingsByCategory({});
      return;
    }
    setLoading(true);
    Promise.all(
      categoryCodes.map((code) =>
        api
          .get<CategoryOffering[]>(`/api/categories/${code}/offerings`)
          .then((res) => [code, res.data] as const),
      ),
    )
      .then((results) => setOfferingsByCategory(Object.fromEntries(results)))
      .finally(() => setLoading(false));
  }, [key]);

  return { offeringsByCategory, loading };
}
