import { Screens } from "@/routes/Routes";
import { LayoutGrid, LucideProps, PieChart, User } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type DASHBOARD_FIELD = {
  id: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  redirectPath: Screens;
};

export const DASHBOARD_FIELDS: DASHBOARD_FIELD[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    redirectPath: "DASHBOARD",
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    redirectPath: "MY_PROFILE",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: PieChart,
    redirectPath: "ANALYTICS",
  },
];
