import { Layers, ArrowRight, Play, FlaskConical, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations";

export const StudentMyClassesCard = ({ myClasses }) => {
  if (!myClasses) return null;

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#0060d0]" />
          <h2 className="text-base sm:text-lg font-bold text-[#004bb5]">
            {myClasses.cardTitle || "My Classes"}
          </h2>
        </div>
        <Link
          to={myClasses.viewAllLink || "/student"}
          className="text-xs font-semibold text-[#0060d0] hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* List */}
      <div className="space-y-3">
        {myClasses.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-slate-50/80 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              {item.isSymbol ? (
                <div
                  className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center text-xs tracking-tighter shrink-0 ${item.colorClass}`}
                >
                  {item.symbol}
                </div>
              ) : item.iconType === "flask" ? (
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.colorClass}`}
                >
                  <FlaskConical className="w-5 h-5" />
                </div>
              ) : (
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.colorClass}`}
                >
                  <BookOpen className="w-5 h-5" />
                </div>
              )}

              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-800 truncate">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{item.details}</p>
              </div>
            </div>

            {/* Play Button */}
            <button
              type="button"
              className="w-7 h-7 rounded-full border border-blue-200 text-[#0060d0] flex items-center justify-center hover:bg-blue-50 transition-colors shrink-0 cursor-pointer"
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

