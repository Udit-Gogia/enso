import { ServiceCategory } from "@/features/auth/constants/serviceCategoryComponentMap";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function useServiceCategories() {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>(
    [],
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .get("/api/categories/active")
      .then((res) => {
        setServiceCategories(res.data as ServiceCategory[]);
        setLoading(false);
      })
      .catch((err) => {
        const message =
          err.response?.data?.message ?? "Failed to load categories.";
        setError(message);
        setLoading(false);
        toast.error(message, { position: "bottom-right" });
      });
  }, []);

  return {
    serviceCategories,
    loading,
    error,
  };
}
