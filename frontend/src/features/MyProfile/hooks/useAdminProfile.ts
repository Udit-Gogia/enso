import api from "@/lib/axios";

import { AdminEditableSection, AdminProfile } from "../constants/types";

import useProfile from "./useProfile";

export default function useAdminProfile(savedProfile: AdminProfile) {
  const {
    profile,
    enableEditing,
    isEditingSection,
    updateProfile,
    cancelContactEdit,
    saveProfile,
  } = useProfile<AdminProfile, AdminEditableSection>(savedProfile, {
    saveProfileApi: async (profile) => {
      const payload = {
        phone: profile.phone,
        location: profile.location,
        profilePhotoUrl: profile.profilePhotoUrl,
      };

      const response = await api.put("/api/profile/update", payload);

      console.log("Admin profile update response:", response);

      if (response.status !== 200) {
        throw new Error("Failed to update customer profile");
      }
    },
  });

  return {
    profile,

    saveProfile,
    cancelContactEdit,

    enableEditing,
    isEditingSection,
    updateProfile,
  };
}
