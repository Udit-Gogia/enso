import { cn } from "@/lib/utils";
import ensoLogo from "../assets/logo/Enso.svg";

export default function EnsoTitle({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-auto flex items-center gap-3 text-2xl font-bold tracking-tight text-[#16161D]",
        className,
      )}
    >
      <img src={ensoLogo} alt="Enso Logo" className="h-6 w-6" />
      <span className="">Enso</span>
    </div>
  );
}
