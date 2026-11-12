import { Play, ClipboardCheck, BookOpen, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations";

export const StudentKpiStats = ({ stats = [] }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4"
    >
      {stats.map((item) => {
        return (
          <div
            key={item.id}
            className="rounded-2xl bg-white border border-slate-100 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex items-center gap-3.5 sm:gap-4"
          >
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: item.bg }}
            >
              {item.iconType === "play" && (
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0080f6] flex items-center justify-center shadow-xs">
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white ml-0.5" />
                </div>
              )}
              {item.iconType === "clipboard" && (
                <ClipboardCheck
                  className="w-6 h-6 text-[#f59e0b]"
                  strokeWidth={2.2}
                />
              )}
              {item.iconType === "book" && (
                <BookOpen
                  className="w-6 h-6 text-[#22c55e]"
                  strokeWidth={2.2}
                />
              )}
              {item.iconType === "chart" && (
                <BarChart
                  className="w-6 h-6 text-[#a855f7]"
                  strokeWidth={3}
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-500 truncate">
                {item.label}
              </p>
              <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
};

export default StudentKpiStats;
