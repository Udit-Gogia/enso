import { VendorProfile } from "./constants/types";

// ---- Client-side completion calc ----
export function computeCompletion(p: VendorProfile) {
  const checks = {
    "Business Information": Boolean(
      p.businessName && p.experience !== null && p.location != null,
    ),
    "Contact Details": Boolean(p.phone),
    "Store Timings": Boolean(p.openTime && p.closeTime),
    "Categories & Bio": Boolean(p.categories.length > 0 && p.bio),
  };
  const done = Object.values(checks).filter(Boolean).length;
  return { pct: Math.round((done / 4) * 100), checks };
}
