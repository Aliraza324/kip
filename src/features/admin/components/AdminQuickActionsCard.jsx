import { Link } from "react-router-dom";
import { Users, GraduationCap, Layers, Monitor } from "lucide-react";

const quickActions = [
  {
    id: "add-student",
    label: "Add Student",
    icon: Users,
    href: "/admin/students/create",
    containerClass: "bg-[#eaf4fe] hover:bg-[#d8edfc] border-blue-200/80 text-slate-800",
    iconColorClass: "text-[#0080f6]",
    iconBgClass: "bg-blue-100/60",
  },
  {
    id: "add-teacher",
    label: "Add Teacher",
    icon: GraduationCap,
    href: "/admin/teachers",
    containerClass: "bg-[#fef8e7] hover:bg-[#fef2d0] border-amber-200/80 text-slate-800",
    iconColorClass: "text-[#d97706]",
    iconBgClass: "bg-amber-100/60",
  },
  {
    id: "create-class",
    label: "Create Class",
    icon: Layers,
    href: "/admin/classes",
    containerClass: "bg-[#eafaf1] hover:bg-[#d5f5e3] border-emerald-200/80 text-slate-800",
    iconColorClass: "text-[#16a34a]",
    iconBgClass: "bg-emerald-100/60",
  },
  {
    id: "manage-content",
    label: "Manage Content",
    icon: Monitor,
    href: "/admin/content",
    containerClass: "bg-[#f4effe] hover:bg-[#e9defc] border-purple-200/80 text-slate-800",
    iconColorClass: "text-[#9333ea]",
    iconBgClass: "bg-purple-100/60",
  },
];

export const AdminQuickActionsCard = () => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              to={action.href}
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
