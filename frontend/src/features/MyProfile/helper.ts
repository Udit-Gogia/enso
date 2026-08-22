import { UserProfile } from "./constants/types";

export function computeCompletion(p: UserProfile) {
  const checks: Record<string, boolean> = {
    "Contact Details": Boolean(p.phone),
    Location: Boolean(p.location),
  };

  if (p.role === "VENDOR") {
    checks["Business Information"] = Boolean(
      p.businessName && p.experience && p.location,
    );

    checks["Store Timings"] = Boolean(p.openTime && p.closeTime);

    checks["Categories & Bio"] = Boolean(p.categories.length > 0 && p.bio);
  }

  const done = Object.values(checks).filter(Boolean).length;
  const total = Object.keys(checks).length;

  return {
    pct: Math.round((done / total) * 100),
    checks,
  };
}
