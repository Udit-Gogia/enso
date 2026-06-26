import PageTransition from "@/components/common/PageTransition";
import { EnsoHero } from "@/features/Landing/components/EnsoHero";

export default function LandingPage() {
  return (
    <PageTransition>
      <EnsoHero />
    </PageTransition>
  );
}
