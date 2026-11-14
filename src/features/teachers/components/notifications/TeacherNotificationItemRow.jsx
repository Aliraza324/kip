import { FileText, CheckCircle, Bell, Calendar, Clock } from "lucide-react";

const getNotificationIcon = (type) => {
  if (type === "check") return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 stroke-[2.2]" />;
  if (type === "calendar") return <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 stroke-[2.2]" />;
  if (type === "clock") return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 stroke-[2.2]" />;
  if (type === "bell") return <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 stroke-[2.2]" />;
  return <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#0080f6] stroke-[2.2]" />;
};

export const TeacherNotificationItemRow = ({ notification, isSelected, onClick }) => {
  return (
    <div
      onClick={() => onClick(notification)}
      className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-start gap-2.5 sm:gap-3.5 ${
        isSelected
          ? "bg-blue-50/40 border-blue-200 shadow-2xs"
          : "bg-white border-slate-100 hover:border-slate-200 shadow-2xs"
      }`}
    >
      {/* Icon */}
      <div
        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${notification.iconBg}`}
      >
        {getNotificationIcon(notification.iconType)}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          <h4
            className={`text-xs sm:text-sm font-bold truncate ${
              isSelected ? "text-[#0080f6]" : "text-slate-900"
            }`}
          >
            {notification.title}
          </h4>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400">
              {notification.time}
            </span>
            {notification.isUnread && (
              <span className="w-2 h-2 rounded-full bg-[#0080f6] shrink-0" />
            )}
          </div>
        </div>
        <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-1 mt-0.5">
          {notification.message}
        </p>
      </div>
    </div>
  );
};

export default TeacherNotificationItemRow;
