import useServiceCategories from "@/features/auth/hooks/useServiceCategories";
import api from "@/lib/axios";

import { VendorEditableSection, VendorProfile } from "../constants/types";

import useProfile from "./useProfile";

export default function useVendorProfile(savedProfile: VendorProfile) {
  const {
    profile,
    enableEditing,
    stopEditing,
    isEditingSection,
    updateProfile,
    cancelContactEdit,
    saveProfile,
  } = useProfile<VendorProfile, VendorEditableSection>(savedProfile, {
    saveProfileApi: async (profile) => {
      const payload = {
        phone: profile.phone,
        location: profile.location,
        profilePhotoUrl: profile.profilePhotoUrl,
        preferredLocation: null,

        bio: profile.bio,
        businessName: profile.businessName,
        yearsOfExperience: profile.experience,

        openTime: profile.openTime,
        closeTime: profile.closeTime,

        categoryCodes: profile.categories,
      };

      const response = await api.put("/api/profile/update", payload);

      console.log("Vendor profile update response:", response);

      if (response.status !== 200) {
        throw new Error("Failed to update vendor profile");
      }
    },
  });

  const { serviceCategories } = useServiceCategories("vendor");

  const cancelBusinessEdit = () => {
    updateProfile({
      ...profile,
      businessName: savedProfile.businessName,
      experience: savedProfile.experience,
    });

    stopEditing("business");
  };

  const cancelServiceCategoryEdit = () => {
    updateProfile({
      ...profile,
      categories: savedProfile.categories,
    });

    stopEditing("categories");
  };

  return {
    profile,
    serviceCategories,

    saveProfile,

    cancelBusinessEdit,
    cancelContactEdit,
    cancelServiceCategoryEdit,

    enableEditing,
    isEditingSection,
    updateProfile,
  };
}
