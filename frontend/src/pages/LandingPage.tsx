import PageTransition from "@/components/common/PageTransition";
import { EnsoHero } from "@/features/Landing/components/EnsoHero";

export default function LandingPage() {
  return (
    <PageTransition>
      <div className="w-screen h-full overflow-y-scroll overflow-x-hidden">
        <EnsoHero />
      </div>
    </PageTransition>
  );
}
