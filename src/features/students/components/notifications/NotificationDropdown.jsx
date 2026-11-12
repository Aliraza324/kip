import { BookOpen, ClipboardList, Video, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotificationDropdown = ({
  isOpen,
  onClose,
  notifications = [],
  onMarkAllAsRead,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleItemClick = (notif) => {
    onClose();
    navigate("/student/notifications", { state: { selectedId: notif.id } });
  };

  const handleViewAll = () => {
    onClose();
    navigate("/student/notifications");
  };

  const topItems = notifications.slice(0, 3);

  const getDropdownIcon = (type) => {
    if (type === "video") return <Video className="w-5 h-5 text-emerald-600" />;
    if (type === "clipboard" || type === "file")
      return <ClipboardList className="w-5 h-5 text-purple-600" />;
    return <BookOpen className="w-5 h-5 text-[#0080f6]" />;
  };

  return (
    <div className="absolute right-0 top-full mt-2.5 w-80 sm:w-96 rounded-3xl bg-white border border-slate-100 shadow-2xl p-4 sm:p-5 z-50 animate-in zoom-in-95 duration-150">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-sm sm:text-base">
          Notifications
        </h3>
        <button
          type="button"
          onClick={onMarkAllAsRead}
          className="text-xs font-semibold text-[#0080f6] hover:underline cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      {/* Items List */}
      <div className="py-2 divide-y divide-slate-100/80">
        {topItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="py-3 px-2 rounded-2xl hover:bg-slate-50/80 transition-colors cursor-pointer flex items-start gap-3 relative group"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg || "bg-blue-50"}`}
            >
              {getDropdownIcon(item.iconType)}
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-[#0080f6] transition-colors">
                  {item.title}
                </h4>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {item.time}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                {item.message}
              </p>
            </div>
            {item.isUnread && (
              <span className="w-2 h-2 rounded-full bg-[#0080f6] absolute right-2 top-4 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="pt-2 border-t border-slate-100 text-center">
        <button
          type="button"
          onClick={handleViewAll}
          className="text-xs sm:text-sm font-bold text-[#0080f6] hover:underline inline-flex items-center gap-1.5 cursor-pointer py-1"
        >
          <span>View All Notifications</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;

