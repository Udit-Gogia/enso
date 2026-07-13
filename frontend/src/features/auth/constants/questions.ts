import { Persona } from "./types";

export interface Question {
  id: string;
  label: string;
  sidebarDescription: string;
  type:
    | "text"
    | "tel"
    | "number"
    | "textarea"
    | "time-range"
    | "tags"
    | "otp"
    | "select";
  placeholder?: string;
  description?: string;
  isOptional?: boolean;
}

export const COMMON_QUESTIONS: Question[] = [
  {
    id: "signup",
    label: "Signup",
    sidebarDescription: "Signup Completed",
    type: "text",
    placeholder: "",
    description: "You've already signed up",
  },
  {
    id: "persona-selection",
    label: "Profile Selection",
    sidebarDescription: "Profile Selected",
    type: "text",
    placeholder: "",
    description: "Profile Selected.",
  },
];

export const QUESTIONS: Record<Persona, Question[]> = {
  customer: [
    {
      id: "phone",
      label: "Phone Number",
      sidebarDescription: "For booking confirmations",
      type: "tel",
      isOptional: true,
      placeholder: "+91 98765 43210",
      description: "We'll use this to confirm bookings.",
    },
    {
      id: "location",
      label: "Your City",
      sidebarDescription: "Where you need services",
      type: "select",
      placeholder: "e.g. Pune",
      description: "Which city are you based in?",
    },
    {
      id: "preferredLocation",
      label: "Preferred Area",
      sidebarDescription: "Your go-to neighbourhood",
      type: "text",
      placeholder: "e.g. Baner, Kothrud",
      description: "Where do you usually need services?",
    },
  ],
  vendor: [
    {
      id: "phone",
      label: "Phone Number",
      sidebarDescription: "How customers reach you",
      type: "tel",
      placeholder: "+91 98765 43210",
      description: "Customers will use this to reach you.",
    },
    {
      id: "businessName",
      label: "Business Name",
      sidebarDescription: "Your brand or trade name",
      type: "text",
      placeholder: "e.g. Sharma Electricals",
      description: "What's your business or trade name?",
    },
    {
      id: "location",
      label: "Your City",
      sidebarDescription: "Where you operate",
      type: "text",
      placeholder: "e.g. Pune",
      description: "Which city do you operate in?",
    },
    {
      id: "bio",
      label: "About You",
      sidebarDescription: "Shown on your public profile",
      type: "textarea",
      placeholder:
        "Tell customers what you do and why they should choose you...",
      description: "A short description shown on your profile.",
    },
    {
      id: "operatingHours",
      label: "Operating Hours",
      sidebarDescription: "Your daily availability",
      type: "time-range",
      description: "When are you available for bookings?",
    },
    {
      id: "categories",
      label: "Services Offered",
      sidebarDescription: "What you specialise in",
      type: "tags",
      placeholder: "e.g. Wiring, Repairs",
      description: "Add the services you provide.",
    },
  ],
  admin: [
    {
      id: "phone",
      label: "Phone Number",
      sidebarDescription: "For Account recovery",
      type: "tel",
      isOptional: true,
      placeholder: "+91 98765 43210",
      description: "Customers will use this to reach you.",
    },
    {
      id: "otp",
      label: "Admin OTP",
      sidebarDescription: "Verify your admin access",
      type: "otp",
      placeholder: "Enter your OTP",
      description:
        "Enter the OTP pre-set for your email to claim admin access.",
    },
  ],
};
