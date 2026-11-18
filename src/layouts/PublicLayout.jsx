import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { LandingNavbar, LandingFooter } from "@/features/landing/components/shared";
import { ScrollProgressBar } from "@/animations";
import { contentService } from "@/service/apiService";

export const PublicLayout = () => {
  useEffect(() => {
    contentService.getAll();
  }, []);
  return (
    <div className="w-full min-h-screen bg-white text-[#1e293b] flex flex-col overflow-x-hidden">
      {/* Interactive Top Scroll Progress Indicator */}
      <ScrollProgressBar />

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

