import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { BaseProfile } from "../constants/types";

interface UseProfileOptions<T, Section extends string> {
  saveProfileApi?: (profile: T, section: Section) => Promise<void>;
}

export default function useProfile<
  T extends BaseProfile,
  Section extends string,
>(savedProfile: T, options?: UseProfileOptions<T, Section>) {
  const [profile, setProfile] = useState<T>(savedProfile);

  const [editingSections, setEditingSections] = useState<Set<Section>>(
    new Set(),
  );

  const enableEditing = (section: Section) => {
    setEditingSections((prev) => {
      const next = new Set(prev);
      next.add(section);
      return next;
    });
  };

  const stopEditing = (section: Section) => {
    setEditingSections((prev) => {
      const next = new Set(prev);
      next.delete(section);
      return next;
    });
  };

  const isEditingSection = (section: Section) => {
    return editingSections.has(section);
  };

  const updateProfile = (updatedProfile: T) => {
    setProfile(updatedProfile);
  };

  const cancelContactEdit = () => {
    setProfile((prev) => ({
      ...prev,
      phone: savedProfile.phone,
      location: savedProfile.location,
    }));

    stopEditing("contact" as Section);
  };

  const saveProfile = async (section: Section) => {
    try {
      if (options?.saveProfileApi) {
        await options.saveProfileApi(profile, section);
      } else {
        const payload = {
          phone: profile.phone,
          location: profile.location,
          profilePhotoUrl: profile.profilePhotoUrl,
        };

        await api.put("/api/profile/update", payload);
      }

      toast.success("Profile Updated");
      stopEditing(section);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile!");
    }
  };

  return {
    profile,
    editingSections,

    enableEditing,
    stopEditing,
    isEditingSection,

    updateProfile,

    cancelContactEdit,
    saveProfile,
  };
}
