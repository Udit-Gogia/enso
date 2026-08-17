import { VendorProfile } from "./constants/types";

export function computeCompletion(p: VendorProfile) {
  console.log("p is", p);
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
