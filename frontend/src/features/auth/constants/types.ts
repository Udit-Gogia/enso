import { Palette } from "@/components/common/MagneticDots";
import { LucideIcon } from "lucide-react";

export type Persona = "customer" | "vendor" | "admin";

export const PersonaLabels: Record<Persona, String> = {
  admin: "Admin",
  customer: "Customer",
  vendor: "Vendor",
};

export interface PersonaPanelProps {
  persona: PersonaPanelInput;
  onClick: () => void;
  selected: boolean;
}

export const PERSONA_ACCENT: Record<Persona, string> = {
  customer: "#1A73E8",
  vendor: "#C5221F",
  admin: "#188038",
};

export const PERSONA_LABEL: Record<Persona, string> = {
  customer: "Customer",
  vendor: "Vendor",
  admin: "Admin",
};

type PersonaFeature = {
  icon: LucideIcon;
  label: string;
};

export type PersonaPanelInput = {
  persona: Persona;
  label: string;
  position: "left" | "middle" | "right";
  description: string;
  palette: Palette;
  backgroundHex: string;
  spotlightColor: `rgba(${number}, ${number}, ${number}, ${number})`;
  Icon: LucideIcon;
  features: PersonaFeature[];
};
