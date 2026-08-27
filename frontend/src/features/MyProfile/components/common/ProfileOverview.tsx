import {
  Briefcase,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldIcon,
  User,
} from "lucide-react";
import { UserRole } from "../../constants/types";
import { toSentenceCase } from "@/lib/utils";

const roleColors: Record<UserRole, String> = {
  VENDOR: "bg-rose-100 shadow-des border-rose-200 text-rose-500",
  ADMIN: "bg-green-100 shadow-success/120 border-green-200 text-success",
  CUSTOMER:
    "bg-brand-blue/10 shadow-brand-blue/20 border-brand-blue/20 text-brand-blue",
};

export default function ProfileOverview({
  username,
  isVerified = false,
  email,
  phone,
  location,
  bio,
  role,
}: {
  username: string;
  email: string;
  isVerified?: boolean;
  phone: string;
  role: UserRole;
  location: string | null;
  bio?: string | null;
}) {
  const colors = roleColors[role];

  return (
    <div className="rounded-2xl flex items-start justify-between">
      <div className="flex items-start gap-6">
        {/* Logo */}
        <div
          className={`w-24 max-w-24 h-24 basis-1/3 rounded-full flex items-center justify-center shadow-md border ${colors}`}
        >
          {role === "VENDOR" && (
            <Briefcase className="text-rose-500" size={44} />
          )}
          {role === "CUSTOMER" && (
            <User className="text-brand-blue" size={44} />
          )}
          {role === "ADMIN" && (
            <ShieldIcon className="text-success" size={44} />
          )}
        </div>

        {/* Profile Details */}
        <div className="flex flex-col gap-2 my-2">
          <span
            className={`w-fit px-2 py-1 rounded-2xl text-xs  font-medium border  ${colors}`}
          >
            {toSentenceCase(role)}
          </span>
          <div className="flex items-center gap-2 ">
            <h2 className="text-xl font-bold text-ink-900">{username}</h2>
            {isVerified && <CheckCircle2 className="text-primary" size={18} />}
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold font-sans text-ink-muted">
            <span className="flex items-center gap-3 ">
              <Mail size={14} />
              {email}
            </span>
            <span className="text-ink-placeholder/40">|</span>
            <span className="flex items-center gap-[6px] ">
              <Phone size={14} />
              {phone}
            </span>
            {location && (
              <>
                <span className="text-ink-placeholder/40">|</span>
                <span className="flex items-center gap-[6px] ">
                  <MapPin size={14} />
                  {location ?? "-"}
                </span>
              </>
            )}
          </div>
          {bio && (
            <div className="text-xs  rounded-md text-ink-muted font-medium  mt-2 bg-ink-placeholder/5 px-4 py-3 border border-ink-placeholder/30 flex gap-3 items-center">
              <svg
                width="16"
                height="16"
                fontWeight={"500"}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.2815 18C21.1111 32.6963 14 48.3407 14 62.3259C14 73.7037 22.5333 82 31.0667 82C38.6519 82 44.8148 75.837 44.8148 68.2519C44.8148 58.5333 37.7037 53.5555 27.2741 53.5555C27.2741 41.9407 30.8296 35.0667 41.9704 23.6889L36.2815 18ZM75.8667 18C60.6963 32.6963 53.5852 48.3407 53.5852 62.3259C53.5852 73.7037 62.1185 82 70.6519 82C78.237 82 84.4 75.837 84.4 68.2519C84.4 58.5333 77.2889 53.5555 66.8593 53.5555C66.8593 41.9407 70.4148 35.0667 81.5556 23.6889L75.8667 18Z"
                  fill="#80828e"
                />
              </svg>
              {bio}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
