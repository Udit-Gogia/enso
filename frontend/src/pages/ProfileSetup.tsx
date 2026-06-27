import PageTransition from "@/components/common/PageTransition";
import { PersonaSelector } from "@/features/auth/components/PersonaSelector";

export default function ProfileSetup() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-screen h-screen">
          <PersonaSelector />
        </div>
      </div>
    </PageTransition>
  );
}
