import EnsoTitle from "@/components/common/EnsoTitle";
import { Button } from "@/components/ui/button";
import { hasSetupToken, isLoggedIn, logout } from "@/lib/auth";

import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const setupPending = hasSetupToken();
  console.log({ loggedIn });
  console.log({ setupPending });
  return (
    <header className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
      <EnsoTitle className="[&_img]:h-6 [&_img]:w-6 [&_span]:text-2xl" />
      <div className="pointer-events-auto flex items-center gap-4">
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
            <Button
              onClick={() => navigate("/login")}
              className="text-[16px] font-medium text-ink hover:text-primary bg-white transition-colors duration-200 hover:bg-white shadow-none hover:-translate-y-px "
            >
              Sign in
            </Button>
            <Button
              variant="dark"
              onClick={() => navigate("/register")}
              className="hover:-translate-y-px transition-transform duration-200 bg-ink  "
            >
              Create account
            </Button>
          </>
        )}
      </div>{" "}
    </header>
  );
}
