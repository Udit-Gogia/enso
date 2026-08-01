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

const TIMELINE = {
  greetingFadeIn: { delay: 0, duration: 400 },
  greetingHold: { delay: 600 },
  bottomBarFadeIn: { delay: 1100, duration: 500 },
  greetingMove: { delay: 1100, duration: 500 },
  panel1FadeIn: { delay: 1800, duration: 600 },
  panel2FadeIn: { delay: 2200, duration: 600 },
  panel3FadeIn: { delay: 2600, duration: 600 },
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

export { PANELS, panelDelays, TIMELINE };
