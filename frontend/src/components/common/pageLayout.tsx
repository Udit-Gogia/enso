import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import PageTransition from "./PageTransition";
import { Reveal } from "../ui/Reveal";

export default function PageLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <Reveal triggerOnView>
      <div className="w-screen h-screen bg-surface">
        <div className="flex p-4 gap-4 h-full w-full">
          <Sidebar />

          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname} slideUp>
              {outlet}
            </PageTransition>
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
}
