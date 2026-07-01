import { useParams, Navigate } from "react-router-dom";
import PageTransition from "@/components/common/PageTransition";
import { PersonaSetupForm } from "@/features/auth/components/SetupForm/PersonaSetupForm";
import { Persona } from "@/features/auth/components/PersonaPanel";

const VALID_PERSONAS = ["customer", "vendor", "admin"];

export default function ProfileSetupForm() {
  const { persona } = useParams<{ persona: string }>();

  if (!persona || !VALID_PERSONAS.includes(persona)) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageTransition>
      <PersonaSetupForm persona={persona as Persona} />
    </PageTransition>
  );
}
