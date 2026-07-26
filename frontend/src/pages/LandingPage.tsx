import PageTransition from "@/components/common/PageTransition";
import { Features } from "@/features/Landing/components/Features";
import { EnsoHero } from "@/features/Landing/components/EnsoHero";

export default function LandingPage() {
  return (
    <PageTransition>
      <div className=" relative w-screen overflow-x-clip">
        <EnsoHero />
        <Features />
        <EnsoHero />
      </div>
    </PageTransition>
  );
}
