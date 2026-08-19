import {
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  KeyRound,
  Trash2,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import { VendorEditableSection, VendorProfile } from "../constants/types";
import useVendorProfile from "../hooks/useVendorProfile";
import BusinessInformation from "../components/Vendor/BusinessInformation";
import ContactInformation from "../components/Vendor/ContactInformation";
import ServiceCategories from "../components/Vendor/ServiceCategories";
import StoreTimings from "../components/Vendor/StoreTimings";
import ProfileCompletion from "../components/Vendor/ProfileCompletion";

export type VendorProfileMetricProps = {
  profile: VendorProfile;
  enableEditing: (section: VendorEditableSection) => void;
  updateProfile: (updatedProfile: VendorProfile) => void;
  isEditingSection: (section: VendorEditableSection) => boolean;
};

export function VendorProfilePage({
  savedProfile,
}: {
  savedProfile: VendorProfile;
}) {
  const {
    profile,
    serviceCategories,
    saveBusinessInfo,
    saveContactInfo,
    saveServiceCategories,
    cancelBusinessEdit,
    cancelContactEdit,
    cancelServiceCateroryEdit,
    enableEditing,
    isEditingSection,
    updateProfile,
  } = useVendorProfile(savedProfile);

  return (
    <div className="max-w-4xl mx-auto p-8 pt-0 space-y-6 font-sans">
      <div className="relative">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse 720px 300px at 50% 48%, rgba(255,255,255,.9), rgba(255,255,255,0) 68%)",
          }}
        />
        <div className="relative z-20">
          <h1 className="text-2xl font-bold text-ink-900">My Profile</h1>
          <p className="text-ink-muted text-sm ">
            Manage your personal and business information
          </p>
        </div>
      </div>

      <SpotlightCard
        // spotlightColor="rgba(197, 34, 31, 0.2)"
        className="border border-surface-page shadow-md bg-white"
        spotlightPosition="50% -100%"
      >
        <div className="rounded-2xl p-4 flex items-start justify-between">
          <div className="flex items-start gap-6">
            {/* Logo */}
            <div className="max-w-28 h-28 basis-1/3 rounded-full bg-rose-100 flex items-center justify-center shadow-md shadow-rose-200 border border-rose-200">
              <Briefcase className="text-rose-500" size={44} />
            </div>

            {/* Profile Details */}
            <div className="flex flex-col gap-2 ">
              <span className="bg-rose-100 w-fit px-2 py-1 rounded-2xl text-xs text-rose-500 font-medium hadow-md shadow-rose-200 border border-rose-200">
                Vendor
              </span>
              <div className="flex items-center gap-2 ">
                <h2 className="text-xl font-bold text-ink-900">
                  {profile.name}
                </h2>
                {profile.isVerified && (
                  <CheckCircle2 className="text-primary" size={18} />
                )}
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold font-sans text-ink-muted">
                <span className="flex items-center gap-3 ">
                  <Mail size={14} />
                  {profile.email}
                </span>
                <span className="text-ink-placeholder/40">|</span>
                <span className="flex items-center gap-[6px] ">
                  <Phone size={14} />
                  {profile.phone}
                </span>
                <span className="text-ink-placeholder/40">|</span>
                <span className="flex items-center gap-[6px] ">
                  <MapPin size={14} />
                  {profile.location ?? "-"}
                </span>
              </div>
              {profile.bio && (
                <div className="text-xs  rounded-md text-ink-muted font-medium  mt-2 bg-ink-placeholder/5 px-4 py-3 border border-ink-placeholder/30 flex gap-3 items-center">
                  <svg
                    width="16"
                    height="16"
                    fontWeight={"500"}
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M36.2815 18C21.1111 32.6963 14 48.3407 14 62.3259C14 73.7037 22.5333 82 31.0667 82C38.6519 82 44.8148 75.837 44.8148 68.2519C44.8148 58.5333 37.7037 53.5555 27.2741 53.5555C27.2741 41.9407 30.8296 35.0667 41.9704 23.6889L36.2815 18ZM75.8667 18C60.6963 32.6963 53.5852 48.3407 53.5852 62.3259C53.5852 73.7037 62.1185 82 70.6519 82C78.237 82 84.4 75.837 84.4 68.2519C84.4 58.5333 77.2889 53.5555 66.8593 53.5555C66.8593 41.9407 70.4148 35.0667 81.5556 23.6889L75.8667 18Z"
                      fill="#80828e"
                    />
                  </svg>
                  {profile.bio}
                </div>
              )}
            </div>
          </div>
        </div>
      </SpotlightCard>

      <div className="grid grid-cols-2 gap-6">
        <BusinessInformation
          cancelBusinessEdit={cancelBusinessEdit}
          enableEditing={enableEditing}
          isEditingSection={isEditingSection}
          profile={profile}
          saveBusinessInfo={saveBusinessInfo}
          updateProfile={updateProfile}
        />

        <ContactInformation
          cancelContactEdit={cancelContactEdit}
          isEditingSection={isEditingSection}
          enableEditing={enableEditing}
          profile={profile}
          saveContactInfo={saveContactInfo}
          updateProfile={updateProfile}
        />

        <ServiceCategories
          cancelServiceCateroryEdit={cancelServiceCateroryEdit}
          enableEditing={enableEditing}
          isEditingSection={isEditingSection}
          profile={profile}
          updateProfile={updateProfile}
          saveServiceCategories={saveServiceCategories}
          serviceCategories={serviceCategories}
        />

        <StoreTimings
          enableEditing={enableEditing}
          isEditingSection={isEditingSection}
          profile={profile}
          updateProfile={updateProfile}
        />

        <ProfileCompletion profile={profile} />
      </div>

      {/* UI shell only — no backend endpoints for these yet */}
      <div className="rounded-2xl bg-white p-6 border border-surface-page shadow-md">
        <h3 className="font-semibold text-ink-900 mb-4">Account Actions</h3>
        {[
          {
            icon: <KeyRound size={16} />,
            label: "Change Password",
            desc: "Update your password to keep your account secure.",
          },
          {
            icon: <Trash2 size={16} className="text-red-600" />,
            label: "Delete Account",
            desc: "Permanently delete your account and all data.",
            danger: true,
          },
        ].map((action) => (
          <button
            key={action.label}
            className="w-full flex items-center justify-between py-3 border-t border-border first:border-0 text-left hover:bg-surface-page/70"
          >
            <div className="flex items-center gap-3 ">
              <span className={action.danger ? "text-red-600" : "text-ink-500"}>
                {action.icon}
              </span>
              <div>
                <div
                  className={`text-sm font-medium ${action.danger ? "text-red-600" : "text-ink-900"}`}
                >
                  {action.label}
                </div>
                <div
                  className={`text-xs  ${action.danger ? "text-red-600" : "text-ink-muted"}`}
                >
                  {" "}
                  {action.desc}
                </div>
              </div>
            </div>
            <ChevronRight size={16} className="text-ink-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
