import { Link, useNavigate } from "react-router-dom";
import { Calendar, Video, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherTodayScheduleCard = ({ schedule = [] }) => {
  const navigate = useNavigate();

  const handleStartClass = (item) => {
    toast.success(`Starting live session for ${item.title}...`);
    navigate("/teacher/sessions/session-1?live=true");
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Today's Schedule
            </h3>
          </div>

          <Link
            to="/teacher/sessions"
            className="text-xs sm:text-sm font-semibold text-[#0080f6] hover:text-[#0060d0] flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Schedule List */}
        <div className="space-y-3 pt-4">
          {schedule.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                item.isActive
                  ? "bg-[#eaf4fe]/90 border border-blue-200/70 shadow-xs"
                  : "bg-white hover:bg-slate-50/70 border border-slate-100"
              }`}
            >
              {/* Time */}
              <div className="text-xs sm:text-sm font-semibold text-slate-700 sm:w-44 shrink-0">
                {item.time}
              </div>

              {/* Subject Title & Type */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#0080f6] font-medium mt-0.5">
                  <Video className="w-3.5 h-3.5" />
                  <span>{item.type}</span>
                </div>
              </div>

              {/* Start Class Action Button */}
              <button
                type="button"
                onClick={() => handleStartClass(item)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  item.isActive
                    ? "bg-[#0080f6] hover:bg-[#006fd6] text-white shadow-md shadow-blue-500/25 active:scale-95"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>{item.buttonText}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherTodayScheduleCard;

