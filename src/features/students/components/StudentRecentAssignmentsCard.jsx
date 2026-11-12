import { ClipboardList, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations";

export const StudentRecentAssignmentsCard = ({ recentAssignments }) => {
  if (!recentAssignments) return null;

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-2xl bg-white border border-slate-100 p-4.5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-[#0060d0]" />
          <h2 className="text-base sm:text-lg font-bold text-[#004bb5]">
            {recentAssignments.cardTitle || "Recent Assignments"}
          </h2>
        </div>
        <Link
          to={recentAssignments.viewAllLink || "/student/assignments"}
          className="text-xs font-semibold text-[#0060d0] hover:underline flex items-center gap-1 group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* List */}
      <div className="space-y-2.5">
        {recentAssignments.items.map((item) => (
          <Link
            key={item.id}
            to="/student/assignments"
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-slate-50/80 border border-transparent hover:border-slate-100 transition-all gap-2 sm:gap-3"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50/70 text-[#0060d0] border border-blue-100/70 flex items-center justify-center shrink-0">
                <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-snug break-words">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{item.due}</p>
              </div>
            </div>

            {/* Status Badge */}
            <span
              className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold border shrink-0 whitespace-nowrap ${item.badgeStyle}`}
            >
              {item.status}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default StudentRecentAssignmentsCard;