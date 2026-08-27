import api from "@/lib/axios";
import { useState } from "react";

export interface BookingResult {
  id: string;
  categoryCode: string;
  categoryName: string;
  vendorId: string | null;
  vendorBusinessName: string | null;
  title: string;
  description: string;
  urgency: string;
  address: string;
  serviceOfferings: {
    id: string;
    code: string;
    name: string;
    categoryCode: string;
    categoryName: string;
  }[];
  locality: string;
  city: string;
  state: string;
  pincode: string;
  preferredDate: string;
  preferredTime: string | null;
  estimatedBudget: string | null;
  visibility: "PRIVATE" | "PUBLIC";
  status: string;
  createdAt: string;
}

export interface BookingFormData {
  categoryCode: string;
  vendorId: string;
  title: string;
  description: string;
  serviceOfferingIds: string[];
  urgency: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  preferredDate: string;
  preferredTime: string;
  estimatedBudget: string;
}

export default function useCreateBooking() {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<BookingResult | null>(null);

  async function submitBooking(
    data: BookingFormData,
  ): Promise<BookingResult | null> {
    setSubmitting(true);
    try {
      const res = await api.post<BookingResult>("/api/bookings", {
        categoryCode: data.categoryCode,
        vendorId: data.vendorId || undefined,
        title: data.title,
        description: data.description,
        urgency: data.urgency,
        address: data.address,
        locality: data.locality,
        city: data.city,
        serviceOfferingId: data.serviceOfferingId || undefined,
        state: data.state,
        pincode: data.pincode,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime || undefined,
        estimatedBudget: data.estimatedBudget || undefined,
      });
      setResult(res.data);
      return res.data;
    } finally {
      setSubmitting(false);
    }
  }

  return { submitting, result, submitBooking };
}
