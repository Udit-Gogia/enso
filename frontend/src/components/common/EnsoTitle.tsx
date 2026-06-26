import { cn } from "@/lib/utils";
import ensoLogo from "../assets/logo/Enso.svg";
import { useNavigate } from "react-router-dom";

export default function EnsoTitle({
  className,
  redirectToHome,
}: {
  className?: string;
  redirectToHome?: boolean;
}) {
  const navigate = useNavigate();
  return (
    <div
      className={cn(
        `pointer-events-auto flex items-center gap-2 text-2xl font-bold tracking-tight text-ink ${redirectToHome ? "hover:cursor-pointer" : ""}`,
        className,
      )}
      onClick={() => {
        if (redirectToHome) navigate("/");
      }}
    >
      <img src={ensoLogo} alt="Enso Logo" className="h-9 w-9" />
      <span>Enso</span>
    </div>
  );
}
