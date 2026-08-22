import ProfileOverview from "../components/common/ProfileOverview";
import ProfilePageLayout from "../components/common/ProfilePageLayout";
import ContactInformation from "../components/Vendor/ContactInformation";
import ProfileCompletion from "../components/Vendor/ProfileCompletion";
import { CustomerEditableSection, CustomerProfile } from "../constants/types";
import useCustomerProfile from "../hooks/useCustomerProfile";

export type CustomerProfileMetricProps = {
  profile: CustomerProfile;
  enableEditing: (section: CustomerEditableSection) => void;
  updateProfile: (updatedProfile: CustomerProfile) => void;
  isEditingSection: (section: CustomerEditableSection) => boolean;
  saveProfile: (section: CustomerEditableSection) => Promise<void>;
};

export default function CustomerProfilePage({
  savedProfile,
}: {
  savedProfile: CustomerProfile;
}) {
  const {
    cancelContactEdit,
    enableEditing,
    isEditingSection,
    profile,
    saveProfile,
    updateProfile,
  } = useCustomerProfile(savedProfile);

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
            role="VENDOR"
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
