import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import teacherBg from "@/assets/images/4b0cc2b5f53b6b450ee61434e3290b8157c7b053.png";

export const TeacherAuthLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center lg:justify-end px-4 sm:px-8 lg:pr-14 xl:pr-24 py-8 sm:py-12 overflow-x-hidden select-none">
      {/* Background Image with requested asset */}
      <div className="fixed inset-0 z-0">
        <img
          src={teacherBg}
          alt="Teacher Workspace Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35 sm:bg-black/25 pointer-events-none" />
      </div>

      {/* Top Floating Back Link */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white/95 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Frosted Glass Floating Card */}
      <div className="relative z-20 w-full max-w-[440px] sm:max-w-[480px] rounded-[28px] sm:rounded-[36px] backdrop-blur-xl bg-black/50 sm:bg-black/55 border border-white/20 shadow-2xl p-6 sm:p-8 text-white transition-all">
        {children}
      </div>
    </div>
  );
};

export default TeacherAuthLayout;

