import { logout } from "@/lib/auth";
import PageTransition from "@/components/common/PageTransition";
import PageLayout from "@/components/common/pageLayout";

export default function Dashboard() {
  return (
    <PageTransition>
      {/* <div className="min-h-screen bg-surface-page flex flex-col items-center justify-center gap-6">
        <h1 className="font-display text-3xl font-bold text-ink">
          Welcome to Enso
        </h1>
        <p className="text-sm text-ink-muted">Dashboard coming soon.</p>
        <button
          onClick={logout}
          className="px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-ink
                     hover:opacity-90 transition-opacity"
        >
          Log out
        </button>
      </div> */}
      <PageLayout />
    </PageTransition>
  );
}
