import {
  FileText,
  CheckCircle2,
  Megaphone,
  Calendar,
  BarChart3,
  Users,
  GraduationCap,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

const getNotificationMetaStyle = (notif) => {
  const metaType = notif.meta?.type;
  const category = notif.category;

  if (metaType === "low_progress") {
    return {
      Icon: AlertTriangle,
      iconBg: "bg-amber-100 text-amber-600",
      badge: `${notif.meta?.progress != null ? `${notif.meta.progress}%` : "<70%"} Low Progress`,
      badgeStyle: "bg-amber-50 text-amber-700 border border-amber-200/60",
    };
  }

  if (metaType === "teacher_registration") {
    return {
      Icon: GraduationCap,
      iconBg: "bg-purple-100 text-purple-600",
      badge: "Teacher Approval",
      badgeStyle: "bg-purple-50 text-purple-700 border border-purple-200/60",
    };
  }

  if (metaType === "contact_query") {
    return {
      Icon: MessageSquare,
      iconBg: "bg-sky-100 text-sky-600",
      badge: "Contact Query",
      badgeStyle: "bg-sky-50 text-sky-700 border border-sky-200/60",
    };
  }

  if (category === "announcements" || notif.iconType === "announcement") {
    return {
      Icon: Megaphone,
      iconBg: "bg-blue-100 text-[#0080f6]",
      badge: "Announcement",
      badgeStyle: "bg-blue-50 text-blue-700 border border-blue-200/60",
    };
  }

  if (category === "grades" || notif.iconType === "chart") {
    return {
      Icon: BarChart3,
      iconBg: "bg-emerald-100 text-emerald-600",
      badge: "Grades & Progress",
      badgeStyle: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    };
  }

  if (category === "class-updates" || notif.iconType === "users") {
    return {
      Icon: Users,
      iconBg: "bg-indigo-100 text-indigo-600",
      badge: "Class Update",
      badgeStyle: "bg-indigo-50 text-indigo-700 border border-indigo-200/60",
    };
  }

  return {
    Icon: FileText,
    iconBg: "bg-slate-100 text-slate-600",
    badge: null,
    badgeStyle: "",
  };
};

const formatTimeAgo = (dateStr) => {
  if (!dateStr) return "Just now";
  const date = new Date(dateStr);
  const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diffSec < 60) return "Just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return `${Math.floor(diffSec / 86400)}d ago`;
};

export const AdminNotificationItemRow = ({ notification, isSelected, onClick }) => {
  const metaStyle = getNotificationMetaStyle(notification);
  const Icon = metaStyle.Icon;
  const isUnread = notification.isUnread ?? !notification.isRead;
  const timeText = notification.time || formatTimeAgo(notification.createdAt);
  const descriptionText = notification.description || notification.message;

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
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
            notification.iconBg || metaStyle.iconBg
          }`}
        >
          <Icon className="w-5 h-5 stroke-[2]" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              {notification.title}
            </h4>
            {metaStyle.badge && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${metaStyle.badgeStyle}`}
              >
                {metaStyle.badge}
              </span>
            )}
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
            {descriptionText}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-start pt-0.5">
        <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium whitespace-nowrap">
          {timeText}
        </span>
        {isUnread && <span className="w-2 h-2 rounded-full bg-[#0080f6] shrink-0" />}
      </div>
    </div>
  );
};

export default AdminNotificationItemRow;
