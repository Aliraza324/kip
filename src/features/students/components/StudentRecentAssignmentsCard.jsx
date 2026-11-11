import { ClipboardList, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations";

export const StudentRecentAssignmentsCard = ({ recentAssignments }) => {
  if (!recentAssignments) return null;

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-[#0060d0]" />
          <h2 className="text-base sm:text-lg font-bold text-[#004bb5]">
            {recentAssignments.cardTitle || "Recent Assignments"}
          </h2>
        </div>
        <Link
          to={recentAssignments.viewAllLink || "/student"}
          className="text-xs font-semibold text-[#0060d0] hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* List */}
      <div className="space-y-3">
        {recentAssignments.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-slate-50/80 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50/60 text-[#0060d0] border border-blue-100/60 flex items-center justify-center shrink-0">
                <ClipboardList className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-800 truncate">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{item.due}</p>
              </div>
            </div>

            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border shrink-0 ${item.badgeStyle}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default StudentRecentAssignmentsCard;

