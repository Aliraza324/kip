import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import logoImg from "@/assets/images/KIPClassin logo.png";
import { studentLoginMock } from "@/mocks";

export const TeacherComingSoonView = () => {
  const { teacherTitle, teacherSubtitle, teacherBadge } = studentLoginMock;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-left"
    >
      {/* Brand Logo */}
      <div className="flex items-center">
        <img src={logoImg} alt="KIPClassin Logo" className="h-8 sm:h-9 w-auto object-contain drop-shadow-xs" />
      </div>

      {/* Coming Soon Badge */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-400/20 px-3.5 py-1 shadow-xs my-5 backdrop-blur-md">
        <Sparkles className="h-3.5 w-3.5 text-[#febf11]" />
        <span className="text-xs font-black tracking-wider text-[#febf11] uppercase">
          {teacherBadge}
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight drop-shadow-xs">
        {teacherTitle}
      </h1>
      <p className="mt-2.5 text-xs sm:text-sm text-white/90 leading-relaxed font-normal drop-shadow-2xs">
        {teacherSubtitle}
      </p>

      <div className="mt-8 pt-5 border-t border-white/20">
        <Link
          to="/"
          className="w-full rounded-full py-3.5 px-6 bg-white/25 hover:bg-white/35 border border-white/40 text-white font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </motion.div>
  );
};

export default TeacherComingSoonView;
