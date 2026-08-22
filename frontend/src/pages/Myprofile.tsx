import { MagneticDots } from "@/components/common/MagneticDots";
import useGetProfile from "@/features/MyProfile/hooks/useGetProfile";
import CustomerProfilePage from "@/features/MyProfile/pages/CustomerProfilePage";
import { VendorProfilePage } from "@/features/MyProfile/pages/VendorProfilePage";

export default function Myprofile() {
  const { profile, loading, error } = useGetProfile();

  console.log({ error });

  if (loading)
    return <div className="p-8 text-ink-500">Loading profile...</div>;
  if (error || !profile)
    return (
      <div className="p-8 text-red-600">
        {error?.error_msg ?? "No profile found."}
      </div>
    );

  return (
    <section className="bg-surface p-4 rounded-xl h-fit w-full relative">
      <MagneticDots
        palette="Google"
        intensity={1}
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative z-20 ">
        {profile.role === "VENDOR" && (
          <VendorProfilePage savedProfile={profile} />
        )}

        {profile.role === "CUSTOMER" && (
          <CustomerProfilePage savedProfile={profile} />
        )}
      </div>
    </section>
  );
}
