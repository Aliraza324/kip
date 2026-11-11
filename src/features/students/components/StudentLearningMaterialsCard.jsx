import { BookOpen, Play, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations";

export const StudentLearningMaterialsCard = ({ learningMaterials }) => {
  if (!learningMaterials) return null;

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#0060d0]" />
          <h2 className="text-base sm:text-lg font-bold text-[#004bb5]">
            {learningMaterials.cardTitle || "Learning Materials"}
          </h2>
        </div>
        <Link
          to={learningMaterials.viewAllLink || "/student"}
          className="text-xs font-semibold text-[#0060d0] hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of 3 Material Cards */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
        {learningMaterials.items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-[#f8fbfe] border border-slate-100/80 p-3 sm:p-4 flex flex-col items-center text-center hover:border-blue-200 hover:shadow-2xs transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center shrink-0 mb-2 group-hover:scale-105 transition-transform">
              {item.iconType === "book" ? (
                <BookOpen className="w-5 h-5 text-rose-500" />
              ) : item.iconType === "video" ? (
                <Play className="w-5 h-5 text-[#0080f6] fill-current" />
              ) : (
                <FileText className="w-5 h-5 text-purple-500" />
              )}
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">
              {item.title}
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
              {item.meta}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StudentLearningMaterialsCard;

