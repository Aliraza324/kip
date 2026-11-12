import { BookOpen, Play, FileText, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations";

export const StudentLearningMaterialsCard = ({ learningMaterials }) => {
  const navigate = useNavigate();
  if (!learningMaterials) return null;

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-2xl bg-white border border-slate-100 p-4.5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#0060d0]" />
          <h2 className="text-base sm:text-lg font-bold text-[#004bb5]">
            {learningMaterials.cardTitle || "Learning Materials"}
          </h2>
        </div>
        <Link
          to={learningMaterials.viewAllLink || "/student/materials"}
          className="text-xs font-semibold text-[#0060d0] hover:underline flex items-center gap-1 group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid of 3 Material Cards */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3.5">
        {learningMaterials.items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate("/student/materials")}
            className="rounded-2xl bg-[#f8fbfe] border border-slate-100/90 p-2.5 sm:p-3.5 flex flex-col items-center text-center hover:border-blue-200 hover:shadow-2xs transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center shrink-0 mb-1.5 group-hover:scale-105 transition-transform">
              {item.iconType === "book" ? (
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
              ) : item.iconType === "video" ? (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-[#0080f6] fill-current" />
              ) : (
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              )}
            </div>
            <h3 className="text-xs sm:text-[13px] font-bold text-slate-800 leading-tight text-center break-words">
              {item.title}
            </h3>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 whitespace-nowrap">
              {item.meta}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StudentLearningMaterialsCard;