import { Play, ClipboardCheck, BookOpen, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations";

export const StudentKpiStats = ({ stats = [] }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
    >
      {stats.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl bg-white border border-slate-100 p-3 sm:p-3.5 xl:p-4 shadow-2xs hover:shadow-xs transition-all flex items-center gap-2.5 sm:gap-3 min-w-0 overflow-hidden"
        >
          {/* Icon Box */}
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
            style={{ backgroundColor: item.bg }}
          >
            {item.iconType === "play" && (
              <div className="w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-md bg-[#0080f6] flex items-center justify-center shadow-xs">
                <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white fill-white ml-0.5" />
              </div>
            )}
            {item.iconType === "clipboard" && (
              <ClipboardCheck
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#f59e0b]"
                strokeWidth={2.2}
              />
            )}
            {item.iconType === "book" && (
              <BookOpen
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#22c55e]"
                strokeWidth={2.2}
              />
            )}
            {item.iconType === "chart" && (
              <BarChart
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#a855f7]"
                strokeWidth={2.6}
              />
            )}
          </div>

          {/* Label & Value */}
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="text-[11px] sm:text-xs font-semibold text-slate-500 leading-tight truncate">
              {item.label}
            </p>
            <p className="text-lg sm:text-xl xl:text-2xl font-black text-slate-900 mt-0.5 tracking-tight">
              {item.value}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default StudentKpiStats;