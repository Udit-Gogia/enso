import EnsoTitle from "./EnsoTitle";
import { useLocation } from "react-router-dom";
import SidebarOption from "./SidebarOption";
import {
  DASHBOARD_FIELD,
  DASHBOARD_FIELDS,
} from "@/constants/sidebarConstants";
import { useState } from "react";
import ROUTES from "@/routes/Routes";
import { Button } from "@base-ui/react";
import { LogOutIcon } from "lucide-react";
import { logout } from "@/lib/auth";

export default function Sidebar() {
  const location = useLocation();

  const [hovered, setHovered] = useState<string | null>(null);

  const onHoverChange = (option: string | null) => {
    setHovered(option);
  };

  return (
    <div
      id="sidebar"
      className="bg-white p-4 rounded-xl h-full shadow-md basis-1/5 flex flex-col justify-between gap-10 font-sans"
    >
      <div className="flex flex-col gap-10">
        <div className="px-4 py-1 w-full">
          <EnsoTitle
            redirectTo="dashboard"
            className="mx-auto text-2xl [&_img]:h-6 [&_img]:w-6 "
          />
        </div>

        <div>
          {DASHBOARD_FIELDS.map((field: DASHBOARD_FIELD) => {
            return (
              <SidebarOption
                key={field.id}
                field={field}
                hovered={hovered}
                onHoverChange={onHoverChange}
                isSelected={location.pathname === ROUTES[field.redirectPath]}
              />
            );
          })}
        </div>
      </div>

      <div className="px-4 py-1 group/sidebar relative cursor-pointer rounded-sm hover:bg-neutral-200/50 ">
        <Button onClick={logout} className="flex items-center gap-2 py-2">
          <LogOutIcon className="h-5 w-5 text-neutral-700" />
          <span className="text-sm font-medium text-neutral-700 transition-transform ease-linear duration-150 group-hover/sidebar:translate-x-1">
            Logout
          </span>
        </Button>
      </div>
    </div>
  );
}
