import { Features } from "@/features/Landing/components/Features";
import { EnsoHero } from "@/features/Landing/components/EnsoHero";
import { ScallopDivider } from "@/components/ui/scallop-divider";

export default function LandingPage() {
  return (
    <div className="relative w-full bg-black">
      <EnsoHero />
      <ScallopDivider fill="#ffffff" />
      <Features />
    </div>
  );
}
