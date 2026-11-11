import { Link } from "react-router-dom";
import bgImg from "@/assets/images/student-login-bg.png";
import { TeacherComingSoonView } from "../components/TeacherComingSoonView";
import { studentLoginMock } from "@/mocks";

export const TeacherComingSoonPage = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center lg:justify-end px-4 sm:px-8 lg:pr-16 xl:pr-24 py-10 overflow-hidden select-none">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src={bgImg}
          alt="Teacher Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/15 pointer-events-none" />
      </div>

      {/* Top Floating Back Link */}
      <div className="absolute top-5 left-5 sm:top-8 sm:left-8 z-30">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold text-white/90 bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/20 transition-all shadow-sm"
        >
          {studentLoginMock.backToHome}
        </Link>
      </div>

      {/* Bottom-Left Brand Graphic Accents */}
      <div className="absolute bottom-0 left-0 pointer-events-none z-10 w-64 sm:w-80 h-32 sm:h-44 overflow-hidden">
        <div className="absolute -bottom-8 -left-8 w-72 h-36 bg-[#0060d0] -rotate-12 rounded-tr-[100px]" />
        <div className="absolute bottom-0 left-0 w-36 sm:w-44 h-20 sm:h-24 bg-[#febf11] rounded-tr-[54px]" />
      </div>

      {/* Glass Card */}
      <div className="relative z-20 w-full max-w-[420px] sm:max-w-[440px] rounded-[32px] sm:rounded-[36px] backdrop-blur-xl bg-white/20 sm:bg-white/25 border border-white/40 shadow-2xl p-7 sm:p-9 text-left">
        <TeacherComingSoonView />
      </div>
    </div>
  );
};

export default TeacherComingSoonPage;

