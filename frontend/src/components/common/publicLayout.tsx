import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";

export default function PublicLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  console.log("render:", location.pathname, outlet?.type);
  return (
    <div className="w-screen h-full">
      <AnimatePresence
        mode="wait"
        onExitComplete={() => console.log("exit complete fired")}
      >
        <PageTransition key={location.pathname} slideUp>
          {outlet}
        </PageTransition>
      </AnimatePresence>
    </div>
  );
}
