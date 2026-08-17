export interface BaseProfile {
  role: "CUSTOMER" | "VENDOR" | "ADMIN";
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  profileComplete: boolean;
  profilePhotoUrl: string | null;
}

export interface VendorProfile extends BaseProfile {
  role: "VENDOR";
  bio: string | null;
  experience: string;
  openTime: string; // "08:00"
  closeTime: string; // "21:00"
  businessName: string;
  categories: string[];
  location: string | null;
  isVerified: boolean;
}

export interface CustomerProfile extends BaseProfile {
  role: "CUSTOMER";
}

export interface AdminProfile extends BaseProfile {
  role: "CUSTOMER";
}

export type UserProfile = VendorProfile | CustomerProfile | AdminProfile;

export type VendorEditableSection =
  | "business"
  | "contact"
  | "categories"
  | "timings";
