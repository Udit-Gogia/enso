import api from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";

export interface VendorSearchResult {
  vendorId: string;
  businessName: string;
  bio: string;
  phone: string;
  email: string;
  location: string;
  openTime: string | null;
  closeTime: string | null;
  categories: string[];
  profilePhotoUrl: string | null;
  isVerified: boolean;
}

interface VendorSearchPage {
  content: VendorSearchResult[];
  totalElements: number;
  totalPages: number;
  number: number;
}

export default function useVendorSearch() {
  const [results, setResults] = useState<VendorSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function search(params: {
    name?: string;
    category?: string;
    location?: string;
    page?: number;
  }) {
    setLoading(true);
    try {
      const res = await api.get<VendorSearchPage>("/api/vendors/search", {
        params: {
          name: params.name || undefined,
          category: params.category || undefined,
          location: params.location || undefined,
          page: params.page ?? 0,
          size: 10,
        },
      });
      setResults(res.data.content);
      setHasSearched(true);
    } catch (err: any) {
      const message = err.response?.data?.message ?? "Vendor search failed.";
      toast.error(message, { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  }

  return { results, loading, hasSearched, search };
}
