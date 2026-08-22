import SpotlightCard from "@/components/SpotlightCard";
import { ChevronRight, KeyRound, Trash2 } from "lucide-react";

export default function ProfilePageLayout({
  ProfileOverviewChild,
  ProfileInformationChildren,
}: {
  ProfileOverviewChild: React.ReactNode;
  ProfileInformationChildren: React.ReactNode;
}) {
  console.log("Called ProfilePageLayout");
  return (
    <div className="max-w-4xl mx-auto p-8 pt-0 space-y-6 font-sans overflow-x-hidden">
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
        {ProfileOverviewChild}
      </SpotlightCard>

      <div className="grid grid-cols-2 gap-6">{ProfileInformationChildren}</div>

      {/* UI shell only — no backend endpoints for these yet */}
      {}
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
