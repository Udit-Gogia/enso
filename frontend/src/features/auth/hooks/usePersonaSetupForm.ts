import { clearSetupToken, getSetupToken, setAccessToken } from "@/lib/token";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Persona } from "../components/ProfilePanel";
import api from "@/lib/axios";

export default function usePersonaSetupForm(persona: Persona) {
  const navigate = useNavigate();

  async function submitSetupForm(answers: Record<string, any>) {
    const setupToken = getSetupToken();

    if (!setupToken) {
      toast.error("Session expired. Please register again.");
      navigate("/register");
      return;
    }

    try {
      // Strip phone — remove +91, spaces, dashes
      const rawPhone = answers["phone"] ?? "";
      const phone = rawPhone.replace(/^\+91\s?/, "").replace(/\s|-/g, "");

      // Build request body based on persona
      const body: Record<string, any> = {
        phone,
        role: persona.toUpperCase(),
        location: answers["location"] ?? null,
      };

      if (persona === "customer") {
        body.preferredLocation = answers["preferredLocation"] ?? null;
      }

      if (persona === "vendor") {
        body.businessName = answers["businessName"] ?? null;
        body.bio = answers["bio"] ?? null;
        body.yearsOfExperience = answers["yearsOfExperience"]
          ? parseInt(answers["yearsOfExperience"])
          : null;
        body.openTime = answers["operatingHours"]?.open ?? null;
        body.closeTime = answers["operatingHours"]?.close ?? null;
        body.categoryCodes = answers["categories"] ?? [];
      }

      if (persona === "admin") {
        body.adminOtp = answers["otp"] ?? null;
      }

      const response = await api.post("/api/profile/setup", body, {
        headers: { Authorization: `Bearer ${setupToken}` },
      });

      // Store access token, clear setup token
      setAccessToken(response.data.token);
      clearSetupToken();

      toast.success("Profile setup complete!");
      navigate("/dashboard"); // change this route when dashboard exists
    } catch (error: any) {
      const message =
        error.response?.data?.message ??
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  }

  function onChangePersona() {
    navigate("/profile-setup");
  }

  return {
    submitSetupForm,
    onChangePersona,
  };
}
