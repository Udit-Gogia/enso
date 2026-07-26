import PageTransition from "@/components/common/PageTransition";
import { Features } from "@/features/Landing/components/Features";
import { EnsoHero } from "@/features/Landing/components/EnsoHero";
import { ScallopDivider } from "@/components/ui/scallop-divider";

export default function LandingPage() {
  return (
    <PageTransition>
      <div className=" relative w-screen overflow-x-clip">
        <EnsoHero />
        <ScallopDivider fill="#ffffff" />
        <Features />
      </div>
    </PageTransition>
  );
}
