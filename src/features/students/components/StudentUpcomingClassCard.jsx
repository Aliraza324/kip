import { Calendar, Clock, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import classroomImg from "@/assets/images/image 19.png";
import { fadeInUp } from "@/animations";

export const StudentUpcomingClassCard = ({ upcomingClass }) => {
  if (!upcomingClass) return null;

  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-2xl bg-white border border-slate-100 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
    >
      {/* Card Header */}
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-5 h-5 text-[#0060d0]" />
        <h2 className="text-base sm:text-lg font-bold text-[#004bb5]">
          {upcomingClass.cardTitle || "Upcoming Class"}
        </h2>
      </div>

      {/* Card Content: Image & Details */}
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 sm:gap-5">
        {/* Class Photograph */}
        <div className="w-full sm:w-44 h-28 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
          <img
            src={classroomImg}
            alt={upcomingClass.subject}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info & CTA */}
        <div className="flex-1 flex flex-col justify-between w-full space-y-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">
              {upcomingClass.subject}
            </h3>
            <div className="mt-2 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{upcomingClass.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{upcomingClass.duration}</span>
              </div>
            </div>
          </div>

          {/* Join Class Pill Button */}
          <button
            type="button"
            className="w-full py-2.5 px-6 rounded-full bg-gradient-to-r from-[#0060d0] to-[#0080f6] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 hover:opacity-95 transition-all text-center cursor-pointer active:scale-[0.99]"
          >
            {upcomingClass.actionText || "Join Class"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentUpcomingClassCard;

