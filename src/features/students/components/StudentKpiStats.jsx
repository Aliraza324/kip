import { Play, ClipboardCheck, BookOpen, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations";

const iconMap = {
  play: Play,
  clipboard: ClipboardCheck,
  book: BookOpen,
  chart: BarChart3,
};

export const StudentKpiStats = ({ stats = [] }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4"
    >
      {stats.map((item) => {
        const Icon = iconMap[item.iconType] || BookOpen;
        return (
          <div
            key={item.id}
            className="rounded-2xl bg-white border border-slate-100 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex items-center gap-3.5 sm:gap-4"
          >
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: item.bg, color: item.color }}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
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

