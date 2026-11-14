import { Link } from "react-router-dom";
import adminBgImg from "@/assets/images/a25756c2ba22a3316bb41c7a92a1800aca36b6dc.png";
import { AdminLoginForm } from "../components/AdminLoginForm";
import { adminLoginMock } from "@/mocks";

export const AdminLoginPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center lg:justify-end px-3.5 sm:px-8 lg:pr-16 xl:pr-28 py-8 sm:py-10 overflow-hidden select-none">
      {/* 1. Full Cover Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src={adminBgImg}
          alt="Admin Login Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle dark tint overlay for contrast and glassmorphism readability */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      </div>

      {/* 2. Top Floating Back Link */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-30">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white/90 bg-black/35 hover:bg-black/55 backdrop-blur-md border border-white/20 transition-all shadow-sm cursor-pointer"
        >
          {adminLoginMock.backToHome}
        </Link>
      </div>

      {/* 3. Bottom-Left Brand Graphic Accents matching reference design */}
      <div className="absolute bottom-0 left-0 pointer-events-none z-10 w-64 sm:w-80 h-32 sm:h-44 overflow-hidden">
        {/* Blue base curved swoop */}
        <div className="absolute -bottom-8 -left-8 w-72 h-36 bg-[#0060d0] -rotate-12 rounded-tr-[100px]" />
        {/* Yellow brand accent shape flush to bottom left */}
        <div className="absolute bottom-0 left-0 w-36 sm:w-44 h-20 sm:h-24 bg-[#febf11] rounded-tr-[54px]" />
      </div>

      {/* 4. Right Column: Glassmorphism Admin Login Card */}
      <AdminLoginForm />
    </div>
  );
};

export default AdminLoginPage;
