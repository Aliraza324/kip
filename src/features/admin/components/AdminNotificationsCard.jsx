import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  Layers,
  ArrowRight,
  MessageSquare,
  AlertTriangle,
  Megaphone,
  Bell,
} from "lucide-react";
import { notificationService } from "@/service/apiService";

const getIconAndStyle = (item) => {
  const type = item.meta?.type;
  if (type === "low_progress") {
    return { Icon: AlertTriangle, bg: "bg-amber-100", color: "text-amber-600" };
  }
  if (type === "teacher_registration") {
    return { Icon: GraduationCap, bg: "bg-purple-100", color: "text-purple-600" };
  }
  if (type === "contact_query") {
    return { Icon: MessageSquare, bg: "bg-sky-100", color: "text-sky-600" };
  }
  if (item.category === "announcements") {
    return { Icon: Megaphone, bg: "bg-blue-100", color: "text-[#0080f6]" };
  }
  return { Icon: Users, bg: "bg-slate-100", color: "text-slate-600" };
};

const formatTimeAgo = (dateStr) => {
  if (!dateStr) return "Just now";
  const diffSec = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diffSec < 60) return "Just now";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  return `${Math.floor(diffSec / 86400)}d ago`;
};

export const AdminNotificationsCard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    notificationService
      .getAll({ limit: 4 })
      .then((res) => {
        const items = res?.items || [];
        setNotifications(items.slice(0, 4));
      })
      .catch(() => {
        setNotifications([]);
      });
  }, []);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 border border-slate-100 shadow-2xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Notifications
        </h3>
        <Link
          to="/admin/notifications"
          className="text-xs sm:text-sm font-bold text-[#0080f6] hover:text-blue-700 inline-flex items-center gap-1 transition-colors group"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Notifications List */}
      <div className="space-y-3 sm:space-y-3.5">
        {notifications.map((item) => {
          const { Icon, bg, color } = getIconAndStyle(item);
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-2.5 sm:p-3 rounded-2xl hover:bg-slate-50/80 transition-colors"
            >
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 ${bg} ${color}`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium shrink-0">
                    {item.time || formatTimeAgo(item.createdAt)}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
                  {item.message || item.description}
                </p>
              </div>
            </div>
          );
        })}

        {notifications.length === 0 && (
          <div className="py-6 text-center text-slate-400 space-y-1">
            <Bell className="w-5 h-5 mx-auto text-slate-300 stroke-[1.8]" />
            <p className="text-xs font-semibold text-slate-500">No new notifications</p>
            <p className="text-[11px] text-slate-400">All activity updates will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotificationsCard;
