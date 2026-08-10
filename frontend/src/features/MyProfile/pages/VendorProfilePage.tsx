import {
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Clock,
  KeyRound,
  Trash2,
  ChevronRight,
  Briefcase,
  Calendar,
  Store,
  Info,
} from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import { computeCompletion } from "../helper";
import { VendorProfile } from "../constants/types";
import { SectionCard } from "../components/SectionCard";
import { InfoRow } from "../components/InfoRow";

import CircularProgress from "../components/CircularProgress";
import {
  formatDate,
  getCurrentMinutes,
  getMinutesFromTime,
  getMinutesUntil,
} from "@/helpers/timeHelpers";
import { DisplayTags } from "../components/DisplayTags";

export function VendorProfilePage({ profile }: { profile: VendorProfile }) {
  const { pct, checks } = computeCompletion(profile);

  const isOpenNow =
    getCurrentMinutes() >= getMinutesFromTime(profile.openTime) &&
    getCurrentMinutes() < getMinutesFromTime(profile.closeTime);

  const minutesUntilClose = getMinutesUntil(profile.closeTime);

  const hours = Math.floor(minutesUntilClose / 60);
  const minutes = minutesUntilClose % 60;

  const pendingText =
    hours > 0 ? `Closes in ${hours}h ${minutes}m` : `Closes in ${minutes}m`;

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
            <div className="w-28 h-28 rounded-full bg-rose-100 flex items-center justify-center shadow-md shadow-rose-200 border border-rose-200">
              <Briefcase className="text-rose-500" size={44} />
            </div>

            {/* Profile Details */}
            <div className="flex flex-col gap-2 basis-2/3">
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
        <SectionCard
          icon={<Store size={16} className="text-rose-500" />}
          iconBg="bg-rose-100"
          title="Business Information"
        >
          <InfoRow label="Business Name" value={profile.businessName} />
          <InfoRow label="Experience" value={`${profile.experience} years`} />
          <InfoRow label="Member Since" value={formatDate(profile.createdAt)} />
          {/* <InfoRow
            label="Categories"
            value={<DisplayTags tags={profile.categories} theme="vendor" />}
          /> */}
          <InfoRow
            label="Verified"
            value={profile.isVerified ? "Verified" : "Not Verified"}
          />
        </SectionCard>

        <SectionCard
          icon={<Mail size={16} className="text-amber " />}
          iconBg="bg-amber/5"
          title="Contact Information"
        >
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Phone" value={profile.phone} />
          <InfoRow label="Location" value={profile.location ?? "-"} />
        </SectionCard>

        <SectionCard
          icon={<Store size={16} className="text-primary" />}
          iconBg="bg-primary/10"
          title="Service Categories"
          desc="Your profile appears in searches for these categories."
          className="col-span-2"
        >
          <DisplayTags tags={profile.categories} theme="vendor" />
        </SectionCard>

        <SectionCard
          icon={<Clock size={16} className="text-success" />}
          iconBg="bg-green-100"
          title="Store Timings"
        >
          <InfoRow label="Open Time" value={profile.openTime} />
          <InfoRow label="Close Time" value={profile.closeTime} isLast />
          {isOpenNow && (
            <div className="flex items-center gap-2 mt-2 rounded-sm bg-success/10 text-success border font-medium border-ink-placeholder/20 text-sm px-3 py-2">
              <Calendar size={16} strokeWidth={3} />
              <span>Open Now</span>
              <span className="font-bold">·</span>
              <span>{pendingText}</span>
            </div>
          )}
        </SectionCard>

        <SectionCard
          icon={<Info size={16} className="text-brand-blue" />}
          iconBg="bg-brand-blue/10"
          title="Profile Completion"
        >
          <div className="flex gap-4">
            <CircularProgress percentage={pct} size={125} strokeWidth={4} />
            <div>
              <h3 className="font-semibold text-ink-900 mb-2">
                {pct === 100
                  ? "Great job! Your profile is complete."
                  : "Finish setting up your profile."}
              </h3>
              <ul className="space-y-1">
                {Object.entries(checks).map(([label, done]) => (
                  <li
                    key={label}
                    className={`text-sm flex items-center gap-2 ${done ? "text-success font-medium" : "text-ink-muted"}`}
                  >
                    <CheckCircle2
                      size={14}
                      fill={done ? "#34a853" : "#fff"}
                      color={done ? "#fff" : "#80828e"}
                    />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionCard>
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
