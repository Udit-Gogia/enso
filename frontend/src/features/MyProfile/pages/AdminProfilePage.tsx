import ProfileOverview from "../components/common/ProfileOverview";
import ProfilePageLayout from "../components/common/ProfilePageLayout";
import ContactInformation from "../components/Vendor/ContactInformation";
import ProfileCompletion from "../components/Vendor/ProfileCompletion";
import { AdminEditableSection, AdminProfile } from "../constants/types";
import useAdminProfile from "../hooks/useAdminProfile";

export type AdminProfileMetricProps = {
  profile: AdminProfile;
  enableEditing: (section: AdminEditableSection) => void;
  updateProfile: (updatedProfile: AdminProfile) => void;
  isEditingSection: (section: AdminEditableSection) => boolean;
  saveProfile: (section: AdminEditableSection) => Promise<void>;
};

export default function AdminProfilePage({
  savedProfile,
}: {
  savedProfile: AdminProfile;
}) {
  const {
    cancelContactEdit,
    enableEditing,
    isEditingSection,
    profile,
    saveProfile,
    updateProfile,
  } = useAdminProfile(savedProfile);

  return (
    <ProfilePageLayout
      ProfileOverviewChild={
        <ProfileOverview
          email={profile.email}
          location={profile.location}
          phone={profile.phone}
          role={profile.role}
          username={profile.name}
        />
      }
      ProfileInformationChildren={
        <>
          <ContactInformation
            cancelContactEdit={cancelContactEdit}
            role="ADMIN"
            props={{
              isEditingSection: isEditingSection,
              enableEditing: enableEditing,
              profile: profile,
              saveProfile: saveProfile,
              updateProfile: updateProfile,
            }}
          />
          <ProfileCompletion profile={profile} />
        </>
      }
    />
  );
}
