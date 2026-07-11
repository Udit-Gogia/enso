export type Screens =
  | "LANDING"
  | "REGISTER"
  | "LOGIN"
  | "DASHBOARD"
  | "PROFILE_SETUP"
  | "PERSONA_PROFILE_SETUP";

const ROUTES: Record<Screens, string> = {
  LANDING: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  REGISTER: "/register",
  PROFILE_SETUP: "/profile-setup",
  PERSONA_PROFILE_SETUP: "/profile-setup/:persona",
};

export default ROUTES;
