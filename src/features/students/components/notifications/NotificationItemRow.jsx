import { FileText, CheckCircle, Megaphone, Calendar, BarChart2, User } from "lucide-react";

const getNotificationIcon = (type) => {
  if (type === "check") return <CheckCircle className="w-5 h-5 text-emerald-600 stroke-[2.2]" />;
  if (type === "megaphone") return <Megaphone className="w-5 h-5 text-purple-600 stroke-[2.2]" />;
  if (type === "calendar") return <Calendar className="w-5 h-5 text-amber-600 stroke-[2.2]" />;
  if (type === "chart") return <BarChart2 className="w-5 h-5 text-blue-600 stroke-[2.2]" />;
  if (type === "user") return <User className="w-5 h-5 text-sky-600 stroke-[2.2]" />;
  return <FileText className="w-5 h-5 text-[#0080f6] stroke-[2.2]" />;
};

export const NotificationItemRow = ({ notification, isSelected, onClick }) => {
  return (
    <div
      onClick={() => onClick(notification)}
      className={`p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer flex items-start gap-3.5 ${
        isSelected
          ? "bg-blue-50/40 border-blue-200 shadow-2xs"
          : "bg-white border-slate-100 hover:border-slate-200 shadow-2xs"
      }`}
    >
      <div
        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${notification.iconBg}`}
      >
        {getNotificationIcon(notification.iconType)}
      </div>

      <div className="flex-1 min-w-0 pr-2">
        <div className="flex items-center justify-between gap-2">
          <h4
            className={`text-xs sm:text-sm font-bold truncate ${
              isSelected ? "text-[#0080f6]" : "text-slate-900"
            }`}
          >
            {notification.title}
          </h4>
          <span className="text-[11px] font-medium text-slate-400 shrink-0">
            {notification.time}
          </span>
        </div>
        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
          {notification.message}
        </p>
      </div>

      {notification.isUnread && (
        <span className="w-2.5 h-2.5 rounded-full bg-[#0080f6] shrink-0 mt-1.5" />
      )}
    </div>
  );
};

export default NotificationItemRow;

