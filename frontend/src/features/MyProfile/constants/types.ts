export type UserRole = "CUSTOMER" | "VENDOR" | "ADMIN";
export interface BaseProfile {
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  profileComplete: boolean;
  location: string | null;
  profilePhotoUrl: string | null;
}

export interface ServiceOfferingRef {
  id: string;
  code: string;
  name: string;
  categoryCode: string;
  categoryName: string;
}

export interface VendorProfile extends BaseProfile {
  role: "VENDOR";
  bio: string | null;
  experience: string;
  openTime: string; // "08:00"
  closeTime: string; // "21:00"
  businessName: string;
  categories: string[];
  offerings: ServiceOfferingRef[];
  isVerified: boolean;
}

export interface CustomerProfile extends BaseProfile {
  role: "CUSTOMER";
}

export interface AdminProfile extends BaseProfile {
  role: "ADMIN";
}

export type UserProfile = VendorProfile | CustomerProfile | AdminProfile;

export type VendorEditableSection =
  | "business"
  | "contact"
  | "categories"
  | "offerings"
  | "timings";

export type CustomerEditableSection = "contact";

export type AdminEditableSection = "contact";
