import { LayoutGrid, LucideProps, PieChart, User } from "lucide-react";
import { motion } from "framer-motion";
import EnsoTitle from "./EnsoTitle";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import ROUTES, { Screens } from "@/routes/Routes";
import { useNavigate } from "react-router-dom";

type DASHBOARD_FIELD = {
  id: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  redirectPath: Screens;
};

const DASHBOARD_FIELDS: DASHBOARD_FIELD[] = [
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
    redirectPath: "DASHBOARD",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: PieChart,
    redirectPath: "DASHBOARD",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div
      id="sidebar"
      className="bg-white p-4 rounded-xl h-full shadow-sm basis-1/5 flex flex-col gap-10 font-sans"
    >
      <div className="px-4 py-1 w-full">
        <EnsoTitle
          redirectTo="dashboard"
          className="mx-auto text-2xl [&_img]:h-6 [&_img]:w-6 "
        />
      </div>

      <div>
        {DASHBOARD_FIELDS.map((field: DASHBOARD_FIELD) => {
          const Icon = field.icon;
          return (
            <div
              key={field.id}
              onMouseEnter={() => setHovered(field.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(ROUTES[field.redirectPath])}
              className="group/sidebar relative px-4 py-1 cursor-pointer"
            >
              {hovered === field.id && (
                <motion.div
                  layoutId="sidebar-hover"
                  className="absolute inset-0 rounded-sm bg-neutral-200/50"
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 60,
                    mass: 0.6,
                  }}
                />
              )}

              <div className="relative flex items-center gap-2 py-2 ">
                <Icon className="h-5 w-5 text-neutral-700" />

                <span className="text-md font-medium text-neutral-700 transition-transform duration-150 group-hover/sidebar:translate-x-1">
                  {field.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
