import EnsoTitle from "./EnsoTitle";
import { useLocation } from "react-router-dom";
import SidebarOption from "./SidebarOption";
import {
  DASHBOARD_FIELD,
  DASHBOARD_FIELDS,
} from "@/constants/sidebarConstants";
import { useState } from "react";
import ROUTES from "@/routes/Routes";

export default function Sidebar() {
  const location = useLocation();

  const [hovered, setHovered] = useState<string | null>(null);

  const onHoverChange = (option: string | null) => {
    setHovered(option);
  };

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
  );
}
