import { Palette } from "@/components/common/MagneticDots";

export type Persona = "customer" | "vendor" | "admin";

export const PersonaLabels: Record<Persona, String> = {
  admin: "Admin",
  customer: "Customer",
  vendor: "Vendor",
};

export interface PersonaPanelProps {
  persona: Persona;
  label: string;
  description: string;
  selectedPersona: Persona | null;
  backgroundHex: string;
  position: "left" | "middle" | "right";
  palette: Palette;
  onClick: () => void;
  icon: JSX.Element;
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
