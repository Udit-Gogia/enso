import { MagneticDots } from "@/components/common/MagneticDots";
import { StickyScroll } from "../../../components/ui/sticky-scroll-reveal";
import { FEATURES_CONTENT } from "../Constants/featuresContent";

export function Features() {
  return (
    <div className="w-full h-full bg-surface relative">
      <StickyScroll
        backdrop={
          <MagneticDots
            palette="Google"
            intensity={1}
            background="#F4F4F7"
            className="h-full w-full"
          />
        }
        header={
          <div className="pt-16 flex flex-col items-center text-center relative">
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 z-10"
              style={{
                height: "120px",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0) 100%)",
              }}
            />
            <div className="relative">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "1600px",
                  height: "1000px",
                  background:
                    "radial-gradient(ellipse 720px 300px at 50% 48%, rgba(255,255,255,.9), rgba(255,255,255,0) 68%)",
                }}
              />
              <div className="rounded-3xl px-10 py-8 relative z-20">
                <h1 className="font-display text-6xl font-semibold tracking-tight">
                  Built on certainty.
                </h1>
                <p className="text-secondary text-lg font-medium mt-6">
                  Every vendor verified. Every hour real. Every booking tracked.
                </p>
              </div>
            </div>
          </div>
        }
        content={FEATURES_CONTENT}
      />
    </div>
  );
}
