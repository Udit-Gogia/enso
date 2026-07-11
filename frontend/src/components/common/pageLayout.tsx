import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";
import PageTransition from "./PageTransition";

export default function PageLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="w-screen h-screen bg-secondary">
      <div className="flex p-4 gap-4 h-full w-full">
        <Sidebar />

        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname} slideUp>
            {outlet}
          </PageTransition>
        </AnimatePresence>
      </div>
    </div>
  );
}
