import { Link } from "react-router-dom";
import { GraduationCap, Users, Layers, ArrowRight } from "lucide-react";
import { adminDashboardMock } from "@/mocks";

const iconMap = {
  teachers: GraduationCap,
  users: Users,
  classes: Layers,
};

export const AdminNotificationsCard = () => {
  const { notifications } = adminDashboardMock;

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
          const Icon = iconMap[item.iconType] || Users;
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-2.5 sm:p-3 rounded-2xl hover:bg-slate-50/80 transition-colors"
            >
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 ${item.bgClass} ${item.iconColorClass}`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminNotificationsCard;
