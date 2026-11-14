import { useState } from "react";
import { Bell } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherNotificationAlertsCard = ({
  initialEnabled = true,
  onToggle,
}) => {
  const [enabled, setEnabled] = useState(initialEnabled);

  const handleToggle = () => {
    const nextState = !enabled;
    setEnabled(nextState);
    if (onToggle) onToggle(nextState);
    toast.success(
      nextState
        ? "Notification alerts enabled"
        : "Notification alerts disabled"
    );
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
          <Bell className="w-4 h-4 stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            Notification Alerts
          </h4>
          <p className="text-xs text-slate-400 font-medium truncate">
            Get updates about classes, assignments, and students.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleToggle}
        aria-label="Toggle notification alerts"
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${
          enabled ? "bg-[#0080f6]" : "bg-slate-200"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
            enabled ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default TeacherNotificationAlertsCard;
