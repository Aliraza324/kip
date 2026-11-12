import { Layers, ArrowRight, Play, FlaskConical, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations";

export const StudentMyClassesCard = ({ myClasses }) => {
  const navigate = useNavigate();
  if (!myClasses) return null;

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-2xl bg-white border border-slate-100 p-4.5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#0060d0]" />
          <h2 className="text-base sm:text-lg font-bold text-[#004bb5]">
            {myClasses.cardTitle || "My Classes"}
          </h2>
        </div>
        <Link
          to={myClasses.viewAllLink || "/student/classes"}
          className="text-xs font-semibold text-[#0060d0] hover:underline flex items-center gap-1 group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* List */}
      <div className="space-y-2.5">
        {myClasses.items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate("/student/classes")}
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-slate-50/80 border border-transparent hover:border-slate-100 transition-all gap-2 sm:gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {item.isSymbol ? (
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-bold flex items-center justify-center text-xs tracking-tighter shrink-0 ${item.colorClass}`}
                >
                  {item.symbol}
                </div>
              ) : item.iconType === "flask" ? (
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${item.colorClass}`}
                >
                  <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              ) : (
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${item.colorClass}`}
                >
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug break-words">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{item.details}</p>
              </div>
            </div>

            {/* Play Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/student/classes");
              }}
              className="w-7 h-7 rounded-full border border-blue-200 text-[#0060d0] flex items-center justify-center hover:bg-blue-50 transition-colors shrink-0 cursor-pointer shadow-2xs"
              aria-label={`Open ${item.title}`}
            >
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StudentMyClassesCard;