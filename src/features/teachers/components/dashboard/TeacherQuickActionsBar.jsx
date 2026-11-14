import { useNavigate } from "react-router-dom";
import { Video, Calendar, UploadCloud, Zap } from "lucide-react";
import toast from "react-hot-toast";

const actionIcons = {
  video: Video,
  calendar: Calendar,
  upload: UploadCloud,
};

const actionStyles = {
  blue: {
    container: "bg-[#e8f4fd] hover:bg-[#d8edfc] border-blue-200/80 text-blue-700",
    icon: "text-[#0080f6]",
  },
  amber: {
    container: "bg-[#fef8e7] hover:bg-[#fef2d0] border-amber-200/80 text-amber-700",
    icon: "text-amber-500",
  },
  emerald: {
    container: "bg-[#eafaf1] hover:bg-[#d5f5e3] border-emerald-200/80 text-emerald-700",
    icon: "text-emerald-500",
  },
};

export const TeacherQuickActionsBar = ({ actions = [] }) => {
  const navigate = useNavigate();

  const handleClick = (action) => {
    if (action.id === "start-live") {
      navigate("/teacher/sessions/session-1?live=true");
      return;
    }
    if (action.id === "schedule") {
      navigate("/teacher/sessions");
      return;
    }
    toast.success(`Action triggered: ${action.label}`);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
      {/* Label */}
      <div className="flex items-center gap-2.5 shrink-0">
        <Zap className="w-5 h-5 text-[#0080f6] stroke-[2.5]" />
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Quick Actions
        </h3>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 flex-1 md:max-w-2xl lg:max-w-3xl w-full">
        {actions.map((act) => {
          const Icon = actionIcons[act.iconType] || Video;
          const style = actionStyles[act.color] || actionStyles.blue;
          return (
            <button
              key={act.id}
              type="button"
              onClick={() => handleClick(act)}
              className={`p-3 sm:py-3.5 sm:px-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-center justify-center gap-2.5 active:scale-98 shadow-2xs hover:shadow-xs w-full ${style.container}`}
            >
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 stroke-[2.2] ${style.icon}`} />
              <span className="text-xs sm:text-sm font-bold text-slate-800 text-center">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherQuickActionsBar;
