import { FileText, CheckCircle2, Megaphone, Calendar, BarChart3, Users } from "lucide-react";

const iconMap = {
  file: FileText,
  check: CheckCircle2,
  announcement: Megaphone,
  calendar: Calendar,
  chart: BarChart3,
  users: Users,
};

export const AdminNotificationItemRow = ({ notification, isSelected, onClick }) => {
  const Icon = iconMap[notification.iconType] || FileText;

  return (
    <div
      onClick={onClick}
      className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all flex items-start justify-between gap-3 ${
        isSelected
          ? "bg-[#eef6ff] border border-blue-200/90 shadow-2xs"
          : "bg-white hover:bg-slate-50/80 border border-slate-100/90"
      }`}
    >
      <div className="flex items-start gap-3 min-w-0">
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${notification.iconBg}`}
        >
          <Icon className="w-5 h-5 stroke-[2]" />
        </div>

        <div className="min-w-0">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
            {notification.title}
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
            {notification.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-start pt-0.5">
        <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium whitespace-nowrap">
          {notification.time}
        </span>
        {notification.isUnread && (
          <span className="w-2 h-2 rounded-full bg-[#0080f6] shrink-0" />
        )}
      </div>
    </div>
  );
};

export default AdminNotificationItemRow;
