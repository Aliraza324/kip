import { Link } from "react-router-dom";
import { Users, GraduationCap, Layers, Monitor } from "lucide-react";
import { adminDashboardMock } from "@/mocks";

const iconMap = {
  users: Users,
  teachers: GraduationCap,
  classes: Layers,
  content: Monitor,
};

const actionLinks = {
  "add-student": "/admin/students/create",
  "add-teacher": "/admin/teachers",
  "create-class": "/admin/classes",
  "manage-content": "/admin/content",
};

export const AdminQuickActionsCard = () => {
  const { quickActions } = adminDashboardMock;

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickActions.map((action) => {
          const Icon = iconMap[action.iconType] || Users;
          const href = actionLinks[action.id] || "/admin";
          return (
            <Link
              key={action.id}
              to={href}
              className={`w-full flex items-center justify-center sm:justify-start gap-3 px-4 py-3.5 sm:py-4 rounded-2xl sm:rounded-3xl border transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 ${action.containerClass}`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${action.iconBgClass} ${action.iconColorClass}`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdminQuickActionsCard;
