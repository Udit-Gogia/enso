import useServiceCategories from "@/features/auth/hooks/useServiceCategories";
import { useState } from "react";
import { VendorEditableSection, VendorProfile } from "../constants/types";

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
      email: savedProfile.email,
      phone: savedProfile.phone,
      location: savedProfile.location,
    }));
    stopEditing("contact");
  };

  const saveBusinessInfo = async () => {
    const payload = {
      businessName: profile.businessName,
      experience: profile.experience,
    };

    // API CALL TO UPDATE PROFILE
    //await updateVendorProfile(payload);

    stopEditing("business");
  };

  const saveServiceCategories = async () => {
    const payload = {
      categoryCodes: profile.categories,
    };

    // API CALL TO UPDATE PROFILE
    //await updateVendorProfile(payload);

    stopEditing("categories");
  };

  const saveContactInfo = async () => {
    const payload = {
      phone: profile.phone,
      location: profile.location,
    };

    // API CALL TO UPDATE PROFILE
    //await updateVendorProfile(payload);

    stopEditing("contact");
  };

  const saveTimings = async () => {
    const payload = {
      openTime: profile.openTime,
      closeTime: profile.closeTime,
    };

    // API CALL TO UPDATE PROFILE
    //await updateVendorProfile(payload);

    stopEditing("timings");
  };

  const updateProfile = (updatedProfile: VendorProfile) => {
    setProfile(updatedProfile);
  };

  return {
    profile,
    serviceCategories,
    saveBusinessInfo,
    saveContactInfo,
    saveServiceCategories,
    saveTimings,
    cancelBusinessEdit,
    cancelContactEdit,
    cancelServiceCateroryEdit,
    enableEditing,
    updateProfile,
    isEditingSection,
  };
}
