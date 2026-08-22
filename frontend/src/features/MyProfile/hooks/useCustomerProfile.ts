import api from "@/lib/axios";

import { CustomerEditableSection, CustomerProfile } from "../constants/types";

import useProfile from "./useProfile";

export default function useCustomerProfile(savedProfile: CustomerProfile) {
  const {
    profile,
    enableEditing,
    isEditingSection,
    updateProfile,
    cancelContactEdit,
    saveProfile,
  } = useProfile<CustomerProfile, CustomerEditableSection>(savedProfile, {
    saveProfileApi: async (profile) => {
      const payload = {
        phone: profile.phone,
        location: profile.location,
        profilePhotoUrl: profile.profilePhotoUrl,
      };

      const response = await api.put("/api/profile/update", payload);

      console.log("Customer profile update response:", response);

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
