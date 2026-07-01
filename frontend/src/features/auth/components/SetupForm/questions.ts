import { Persona } from "../PersonaPanel";

export interface Question {
  id: string;
  label: string; // shown in sidebar
  type: "text" | "tel" | "number" | "textarea" | "time-range" | "tags" | "otp";
  placeholder?: string;
  description?: string;
}

export const QUESTIONS: Record<Persona, Question[]> = {
  customer: [
    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "+91 98765 43210",
      description: "We'll use this to confirm bookings.",
    },
    {
      id: "location",
      label: "Your City",
      type: "text",
      placeholder: "e.g. Pune",
      description: "Which city are you based in?",
    },
    {
      id: "preferredLocation",
      label: "Preferred Area",
      type: "text",
      placeholder: "e.g. Baner, Kothrud",
      description: "Where do you usually need services?",
    },
  ],
  vendor: [
    {
      id: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "+91 98765 43210",
      description: "Customers will use this to reach you.",
    },
    {
      id: "location",
      label: "Your City",
      type: "text",
      placeholder: "e.g. Pune",
      description: "Which city do you operate in?",
    },
    {
      id: "businessName",
      label: "Business Name",
      type: "text",
      placeholder: "e.g. Sharma Electricals",
      description: "What's your business or trade name?",
    },
    {
      id: "bio",
      label: "About You",
      type: "textarea",
      placeholder:
        "Tell customers what you do and why they should choose you...",
      description: "A short description shown on your profile.",
    },
    {
      id: "yearsOfExperience",
      label: "Experience",
      type: "number",
      placeholder: "e.g. 5",
      description: "How many years have you been doing this?",
    },
    {
      id: "operatingHours",
      label: "Operating Hours",
      type: "time-range",
      description: "When are you available for bookings?",
    },
    {
      id: "tags",
      label: "Services Offered",
      type: "tags",
      placeholder: "e.g. Wiring, Repairs",
      description: "Add the services you provide.",
    },
  ],
  admin: [
    {
      id: "otp",
      label: "Admin OTP",
      type: "otp",
      placeholder: "Enter your OTP",
      description:
        "Enter the OTP pre-set for your email to claim admin access.",
    },
  ],
};
