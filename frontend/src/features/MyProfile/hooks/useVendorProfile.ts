import useServiceCategories from "@/features/auth/hooks/useServiceCategories";
import { useState } from "react";
import { VendorEditableSection, VendorProfile } from "../constants/types";
import api from "@/lib/axios";
import { toast } from "sonner";

export default function useVendorProfile(savedProfile: VendorProfile) {
  const [profile, setProfile] = useState<VendorProfile>(savedProfile);

  const [editingSections, setEditingSections] = useState<
    Set<VendorEditableSection>
  >(new Set());

  const { serviceCategories } = useServiceCategories("vendor");

  const enableEditing = (section: VendorEditableSection) => {
    setEditingSections((prev) => {
      const next = new Set(prev);
      next.add(section);
      return next;
    });
  };

  const stopEditing = (section: VendorEditableSection) => {
    setEditingSections((prev) => {
      const next = new Set(prev);
      next.delete(section);
      return next;
    });
  };

  const isEditingSection = (section: VendorEditableSection) => {
    return editingSections.has(section);
  };

  const cancelBusinessEdit = () => {
    setProfile((prev) => ({
      ...prev,
      businessName: savedProfile.businessName,
      experience: savedProfile.experience,
    }));

    stopEditing("business");
  };

  const cancelServiceCateroryEdit = () => {
    setProfile((prev) => ({
      ...prev,
      categories: savedProfile.categories,
    }));

    stopEditing("categories");
  };

  const cancelContactEdit = () => {
    setProfile((prev) => ({
      ...prev,
      phone: savedProfile.phone,
      location: savedProfile.location,
    }));
    stopEditing("contact");
  };

  const updateProfile = (updatedProfile: VendorProfile) => {
    setProfile(updatedProfile);
  };

  const saveProfile = async (section: VendorEditableSection) => {
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

    try {
      const response = await api.put("/api/profile/update", payload);

      console.log("Response", response);

      if (response.status === 200) {
        toast.success("Profile Updated");
      }
      stopEditing(section);
    } catch (Exception) {
      toast.error("Failed to update profile!");
    }
  };

  return {
    profile,
    serviceCategories,

    cancelBusinessEdit,
    saveProfile,
    cancelContactEdit,
    cancelServiceCateroryEdit,
    enableEditing,
    updateProfile,
    isEditingSection,
  };
}
