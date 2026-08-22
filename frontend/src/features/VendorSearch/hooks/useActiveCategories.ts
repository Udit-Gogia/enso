import { ServiceCategory } from "@/features/auth/constants/serviceCategoryComponentMap";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useActiveCategories() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get("/api/categories/active")
      .then((res) => setCategories(res.data as ServiceCategory[]))
      .catch((err) => {
        const message =
          err.response?.data?.message ?? "Failed to load categories.";
        toast.error(message, { position: "bottom-right" });
      })
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}
