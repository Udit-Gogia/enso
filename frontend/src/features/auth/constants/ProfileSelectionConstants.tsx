import {
  BarChart3,
  BriefcaseBusinessIcon,
  Calendar,
  Settings,
  Shield,
  ShieldCheck,
  Star,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { PersonaPanelInput } from "./types";
import { Palette } from "@/components/common/MagneticDots";

// Single source of truth for the post-reveal entrance sequence.
// All values in SECONDS, measured from the instant `revealed` becomes
// true. Change a number here — nothing else needs recalculating.
//
// NOTE: Reveal's delay prop takes seconds (confirmed by its existing 0.05
// and 2 values). BlurOutUp's appears to take milliseconds (inferred from
// its existing 100/400 values, not confirmed — I haven't seen its
// source). Bridged below with `* 1000` at the BlurOutUp call sites. If
// that guess is wrong, this is the one place to fix it.
const REVEAL_TIMELINE = {
  logo: 0.05,
  badge: 0.3,
  heading: 0.45,
  headingSettleDuration: 0.5, // how long BlurOutUp's own animation takes
  panelGap: 0.45,
  panelDuration: 0.6,
  button: 2.5,
} as const;

// Panels start once the heading has actually finished settling, plus a
// small breathing gap — not at some fixed guess from page-reveal.
const PANEL_BASE_DELAY =
  REVEAL_TIMELINE.heading + REVEAL_TIMELINE.headingSettleDuration + 0.2;

function getPanelDelay(index: number): number {
  return PANEL_BASE_DELAY + index * REVEAL_TIMELINE.panelGap;
}

const PANEL_STAGGER = {
  baseDelay: 0.3, // seconds after reveal before the first card starts
  gap: 0.15, // seconds between each subsequent card
  duration: 0.6, // seconds each card takes to fade + rise in
};

const TIMELINE = {
  greetingFadeIn: { delay: 0, duration: 400 },
  greetingHold: { delay: 600 },
  bottomBarFadeIn: { delay: 1100, duration: 500 },
  greetingMove: { delay: 1100, duration: 500 },
  panel1FadeIn: { delay: 3000, duration: 600 },
  panel2FadeIn: { delay: 3600, duration: 600 },
  panel3FadeIn: { delay: 4200, duration: 600 },
};

// ─────────────────────────────────────────────────────────────

export const SKEW_PX = 100;
export const GAP = 2;

const PANELS: PersonaPanelInput[] = [
  {
    persona: "customer" as const,
    label: "Customer",
    position: "left" as const,
    description: "Find trusted professionals nearby.",
    palette: "MonoBlue" as Palette,
    backgroundHex: "#1A73E8",
    spotlightColor: "rgba(26, 115, 232, 0.12)",
    Icon: User, // MonoBlue[3]
    features: [
      { icon: ShieldCheck, label: "Verified pros" },
      { icon: Calendar, label: "Easy booking" },
      { icon: Star, label: "Real reviews" },
    ],
  },
  {
    persona: "vendor" as const,
    label: "Vendor",
    position: "middle" as const,
    description: "Grow your business with local customers.",
    palette: "MonoRed" as Palette,
    backgroundHex: "#C5221F",
    spotlightColor: "rgba(197, 34, 31, 0.12)",
    Icon: BriefcaseBusinessIcon, // MonoRed[3]
    features: [
      { icon: TrendingUp, label: "More visibility" },
      { icon: Calendar, label: "Get bookings" },
      { icon: Star, label: "Build reputation" },
    ],
  },
  {
    persona: "admin" as const,
    label: "Admin",
    position: "right" as const,
    description: "Manage and oversee the platform.",
    palette: "MonoGreen" as Palette,
    backgroundHex: "#188038",
    spotlightColor: "rgba(24, 128, 56, 0.12)",
    Icon: Shield, // MonoGreen[3]
    features: [
      { icon: Users, label: "User management" },
      { icon: BarChart3, label: "Insights" },
      { icon: Settings, label: "System control" },
    ],
  },
];

const panelDelays = [
  TIMELINE.panel1FadeIn,
  TIMELINE.panel2FadeIn,
  TIMELINE.panel3FadeIn,
];

export {
  PANELS,
  panelDelays,
  TIMELINE,
  PANEL_STAGGER,
  getPanelDelay,
  REVEAL_TIMELINE,
};
