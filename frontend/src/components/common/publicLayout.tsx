import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";

export default function PublicLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  console.log("PageLayout rendered", location);
  return (
    <div className="w-screen h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname} slideUp>
          {outlet}
        </PageTransition>
      </AnimatePresence>
    </div>
  );
}
