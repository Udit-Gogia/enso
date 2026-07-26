import {
  BadgeCheck,
  Clock,
  Wrench,
  Sparkles,
  Scissors,
  Zap,
  Paintbrush,
  Hammer,
} from "lucide-react";

export const FEATURES_CONTENT = [
  {
    title: (
      <>
        <span className="text-success-deep">Verified vendors</span>, not
        guesswork
      </>
    ),
    accent: "#34A853",
    accentDeep: "#1E8E3E",
    description:
      "Every vendor profile shows what matters before you reach out — business name, years of experience, and a verified badge once Enso's confirmed they're legit. No more hoping a stranger from a classifieds listing actually shows up.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-full max-w-[260px] rounded-2xl bg-white p-5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-slate-200" />
            <div className="tracking-wide">
              <p className="text-sm font-semibold text-ink">
                Rohan's Plumbing Co.
              </p>
              <p className="text-xs text-ink-muted">4.5 yrs experience</p>
            </div>
          </div>
          <div className="mt-4 flex w-fit items-center gap-1.5 rounded-full bg-success-bg px-3 py-1.5">
            <BadgeCheck className="h-4 w-4 text-success-deep" />
            <span className="text-xs font-medium text-success-deep">
              Verified vendor
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: (
      <>
        <span className="text-[#2A56C6]">Every category</span>, one place
      </>
    ),
    accent: "#4285F4",
    accentDeep: "#2A56C6",
    description:
      "Enso organizes vendors across dozens of service categories, from home repairs to personal care. Pick a category and see who's actually available in it, instead of scrolling through listings that don't match what you need.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <div className="grid w-full max-w-[280px] grid-cols-3 gap-3">
          {[Wrench, Sparkles, Scissors, Zap, Paintbrush, Hammer].map(
            (Icon, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-xl bg-white/95 p-4 shadow-md"
              >
                <Icon className="h-5 w-5 text-[#4285F4]" />
              </div>
            ),
          )}
        </div>
      </div>
    ),
  },
  {
    title: (
      <>
        Know when they're <span className="text-[#0F766E]">actually open</span>
      </>
    ),
    accent: "#0D9488",
    accentDeep: "#0F766E",
    description:
      "Vendors set real opening and closing hours on their profile, visible right on their card. You know if someone's open before you send a message, instead of a back-and-forth just to find out.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-full max-w-[260px] rounded-2xl bg-white p-5 shadow-xl">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-ink">Today's hours</p>
            <span className="flex items-center gap-1.5 rounded-full bg-success-bg px-2.5 py-1 text-xs font-medium text-success-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Open now
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm text-ink-body">
            <Clock className="h-4 w-4" />
            <span>9:00 AM to 7:00 PM</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: (
      <>
        <span className="text-[#5F5ED4]">One app</span>, three different jobs
      </>
    ),
    accent: "#7e7de8",
    accentDeep: "#5F5ED4",
    description:
      "A customer browsing for a vendor needs a different screen than a vendor managing their profile, and an admin verifying accounts needs something different again. Enso gives each role its own dashboard, built for what they're actually there to do.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex w-full max-w-[260px] rounded-full bg-white p-1 shadow-xl">
          {["Customer", "Vendor", "Admin"].map((role, i) => (
            <div
              key={role}
              className={`flex-1 rounded-full px-3 py-2 text-center text-xs font-medium transition ${
                i === 0 ? "bg-[#7e7de8] text-white" : "text-ink"
              }`}
            >
              {role}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: (
      <>
        <span className="text-[#B45309]">Send a request</span>, get a booking
      </>
    ),
    accent: "#F9AB00",
    accentDeep: "#B45309",
    description:
      "You don't just message a vendor and hope. You send a request for a service — and the moment the vendor accepts it, it becomes a confirmed booking you can both see and track. No wondering if a conversation actually turned into a job.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-full max-w-[240px] rounded-2xl bg-white/70 p-4 shadow-lg">
            <p className="text-xs font-medium text-ink-muted">Request sent</p>
            <p className="mt-1 text-sm font-semibold text-ink-secondary">
              Deep clean · Sat, 10 AM
            </p>
          </div>
          <div className="h-5 w-px bg-white/50" />
          <div className="w-full max-w-[240px] rounded-2xl bg-white p-4 shadow-xl">
            <div className="flex items-center gap-1.5 text-success-deep">
              <BadgeCheck className="h-4 w-4" />
              <p className="text-xs font-medium">Booking confirmed</p>
            </div>
            <p className="mt-1 text-sm font-semibold text-ink">
              Deep clean · Sat, 10 AM
            </p>
          </div>
        </div>
      </div>
    ),
  },
];
