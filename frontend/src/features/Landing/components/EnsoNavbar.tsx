import EnsoTitle from "@/components/common/EnsoTitle";
import { Button } from "@/components/ui/button";

import { hasSetupToken, isLoggedIn, logout } from "@/lib/auth";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function EnsoNavbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const setupPending = hasSetupToken();

  const [hovered, setHovered] = useState<string>("signup");

  return (
    <header className="flex items-center justify-between py-6 sm:px-24 lg:px-24 ">
      <EnsoTitle className="[&_img]:h-6 [&_img]:w-6 [&_span]:text-2xl" />
      <div className="pointer-events-auto flex items-center gap-4 ">
        {setupPending ? (
          <Button
            variant="dark"
            onClick={() => navigate("/profile-setup")}
            className="hover:-translate-y-px transition-transform duration-200 bg-ink  "
          >
            Complete Profile Setup
          </Button>
        ) : loggedIn ? (
          <>
            <Button
              variant="dark"
              onClick={logout}
              className="hover:-translate-y-px transition-transform duration-200 bg-ink  "
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            {/* <Button
              onClick={() => navigate("/login")}
              variant={"ghost"}
              className="text-base"
              // className="text-[16px] font-medium text-ink hover:text-primary transition-colors duration-200 shadow-none hover:-translate-y-px "
            >
              Sign in
            </Button>
            <Button
              variant="dark"
              onClick={() => navigate("/register")}
              className="hover:-translate-y-px transition-transform duration-200 bg-ink  "
            >
              Create account
            </Button> */}
            <div
              className="flex space-x-2 items-center rounded-full p-1 transition duration-200 text-sm font-medium text-black"
              onMouseLeave={() => setHovered("signup")}
            >
              {[
                { id: "login", label: "Sign in", route: "/login" },
                { id: "signup", label: "Create account", route: "/register" },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={"ghost"}
                  onClick={() => navigate(item.route)}
                  onMouseEnter={() => setHovered(item.id)}
                  className="relative px-4 py-2 rounded-full"
                >
                  <AnimatePresence>
                    {hovered === item.id && (
                      <motion.div
                        layoutId="hovered"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 h-full w-full rounded-full border-2 bg-gray-100 dark:bg-neutral-800"
                      />
                    )}
                  </AnimatePresence>
                  <span className="relative z-10">{item.label}</span>
                </Button>
              ))}
            </div>
          </>
        )}
      </div>{" "}
    </header>
  );
}
