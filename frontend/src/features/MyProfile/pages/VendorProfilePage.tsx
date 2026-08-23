import { VendorEditableSection, VendorProfile } from "../constants/types";
import useVendorProfile from "../hooks/useVendorProfile";
import BusinessInformation from "../components/Vendor/BusinessInformation";
import ContactInformation from "../components/Vendor/ContactInformation";
import ServiceCategories from "../components/Vendor/ServiceCategories";
import StoreTimings from "../components/Vendor/StoreTimings";
import ProfileCompletion from "../components/Vendor/ProfileCompletion";
import ProfileOverview from "../components/common/ProfileOverview";
import ProfilePageLayout from "../components/common/ProfilePageLayout";
import Offerings from "../components/Vendor/Offerings";

export type VendorProfileMetricProps = {
  profile: VendorProfile;
  enableEditing: (section: VendorEditableSection) => void;
  updateProfile: (updatedProfile: VendorProfile) => void;
  isEditingSection: (section: VendorEditableSection) => boolean;
  saveProfile: (section: VendorEditableSection) => Promise<void>;
};

export function VendorProfilePage({
  savedProfile,
}: {
  savedProfile: VendorProfile;
}) {
  const {
    profile,
    serviceCategories,
    saveProfile,
    cancelBusinessEdit,
    cancelContactEdit,
    cancelServiceCategoryEdit,
    cancelOfferingsEdit,
    enableEditing,
    isEditingSection,
    updateProfile,
  } = useVendorProfile(savedProfile);

  return (
    <ProfilePageLayout
      ProfileOverviewChild={
        <ProfileOverview
          email={profile.email}
          isVerified={profile.isVerified}
          location={profile.location}
          phone={profile.phone}
          role={profile.role}
          username={profile.name}
          bio={profile.bio}
        />
      }
      ProfileInformationChildren={
        <>
          <BusinessInformation
            cancelBusinessEdit={cancelBusinessEdit}
            enableEditing={enableEditing}
            isEditingSection={isEditingSection}
            profile={profile}
            saveProfile={saveProfile}
            updateProfile={updateProfile}
          />

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

          <ServiceCategories
            cancelServiceCategoryEdit={cancelServiceCategoryEdit}
            enableEditing={enableEditing}
            isEditingSection={isEditingSection}
            profile={profile}
            updateProfile={updateProfile}
            saveProfile={saveProfile}
            serviceCategories={serviceCategories}
          />

          <Offerings
            profile={profile}
            updateProfile={updateProfile}
            enableEditing={enableEditing}
            isEditingSection={isEditingSection}
            saveProfile={saveProfile}
            serviceCategories={serviceCategories}
          />

          <StoreTimings
            enableEditing={enableEditing}
            isEditingSection={isEditingSection}
            profile={profile}
            saveProfile={saveProfile}
            updateProfile={updateProfile}
          />

          <ProfileCompletion profile={profile} />
        </>
      }
    />
  );
}
