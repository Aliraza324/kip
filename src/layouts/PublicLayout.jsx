import { Outlet } from "react-router-dom";
import { LandingNavbar, LandingFooter } from "@/features/landing/components/shared";

export const PublicLayout = () => {
  return (
    <div className="w-full min-h-screen bg-white text-[#1e293b] flex flex-col overflow-x-hidden">
      {/* Global Shared Public Navigation Header */}
      <LandingNavbar />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Global Shared Public Footer */}
      <LandingFooter />
    </div>
  );
};

export default PublicLayout;

