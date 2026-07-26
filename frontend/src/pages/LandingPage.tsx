import PageTransition from "@/components/common/PageTransition";
import { EnsoHero } from "@/features/Landing/components/EnsoHero";
import { Features } from "@/features/Landing/components/Features";

export default function LandingPage() {
  return (
    <PageTransition>
      <div className=" relative w-screen h-full overflow-y-scroll overflow-x-hidden">
        <div className=" ">
          <EnsoHero />
          <Features />
        </div>
      </div>
    </PageTransition>
  );
}
