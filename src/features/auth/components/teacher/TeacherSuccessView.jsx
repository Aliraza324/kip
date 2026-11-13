import { LayoutGrid, ArrowRight } from "lucide-react";
import logoImg from "@/assets/images/KIPClassin logo.png";
import successBadgeImg from "@/assets/images/3a19a6fb48f327443bbb08a6b62e12a49ea04021.png";
import { teacherAuthMock } from "@/mocks";

export const TeacherSuccessView = ({ onGoToDashboard }) => {
  const { success } = teacherAuthMock;

  return (
    <div className="space-y-6 text-center py-2">
      {/* Brand Logo */}
      <div className="flex items-center justify-center">
        <img
          src={logoImg}
          alt="KIPClassin Logo"
          className="h-8 sm:h-9 w-auto object-contain drop-shadow-md"
        />
      </div>

      {/* Success Badge Icon with Confetti - requested asset */}
      <div className="flex items-center justify-center pt-2">
        <img
          src={successBadgeImg}
          alt="Account Verified Success Badge"
          className="w-24 sm:w-28 h-24 sm:h-28 object-contain drop-shadow-2xl animate-in zoom-in-90 duration-300"
        />
      </div>

      {/* Heading & Subtitle */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {success.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200/90 max-w-sm mx-auto leading-relaxed">
          {success.subtitle}
        </p>
      </div>

      {/* Go to Dashboard Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onGoToDashboard}
          className="w-full py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#0099ff] to-[#0066ee] hover:from-[#008ae6] hover:to-[#0055dd] text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/35 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
        >
          <LayoutGrid className="w-4 h-4" />
          <span>{success.dashboardButtonText}</span>
          <ArrowRight className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </div>
  );
};

export default TeacherSuccessView;

