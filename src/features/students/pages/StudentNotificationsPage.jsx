import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { studentNotificationsMock } from "@/mocks";
import {
  NotificationItemRow,
  NotificationDetailCard,
} from "../components/notifications";

const CATEGORIES = [
  { key: "all", label: "All (24)" },
  { key: "assignments", label: "Assignments (8)" },
  { key: "grades", label: "Grades (5)" },
  { key: "announcements", label: "Announcements (4)" },
  { key: "class-updates", label: "Class Updates (3)" },
];

export const StudentNotificationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(studentNotificationsMock);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(
    notifications[0] || null
  );

  // Auto-select if came from dropdown click
  useEffect(() => {
    if (location.state?.selectedId) {
      const match = notifications.find(
        (n) => n.id === location.state.selectedId
      );
      if (match) setSelectedNotification(match);
    }
  }, [location.state, notifications]);

  const handleSelect = (notif) => {
    setSelectedNotification(notif);
    // Mark clicked item as read
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notif.id ? { ...item, isUnread: false } : item
      )
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isUnread: false }))
    );
    toast.success("All notifications marked as read");
  };

  const handleRedirect = (url) => {
    if (url) {
      navigate(url);
    }
  };

  // Filter
  const filteredNotifications = notifications.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const todayItems = filteredNotifications.filter((n) => n.group === "Today");
  const yesterdayItems = filteredNotifications.filter(
    (n) => n.group === "Yesterday"
  );
  const earlierItems = filteredNotifications.filter(
    (n) => n.group === "Earlier"
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Notifications
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Stay updated with your classes, assignments, and important announcements.
        </p>
      </div>

      {/* Filter Row Matching Image 2 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-200/90 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
          >
            <Check className="w-3.5 h-3.5 text-slate-500" />
            <span>Mark All as Read</span>
          </button>
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-white border border-slate-200/90 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            aria-label="More Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Grouped Notifications */}
        <div className="lg:col-span-7 space-y-6">
          {todayItems.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Today
              </h3>
              {todayItems.map((item) => (
                <NotificationItemRow
                  key={item.id}
                  notification={item}
                  isSelected={selectedNotification?.id === item.id}
                  onClick={handleSelect}
                />
              ))}
            </div>
          )}

          {yesterdayItems.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Yesterday
              </h3>
              {yesterdayItems.map((item) => (
                <NotificationItemRow
                  key={item.id}
                  notification={item}
                  isSelected={selectedNotification?.id === item.id}
                  onClick={handleSelect}
                />
              ))}
            </div>
          )}

          {earlierItems.length > 0 && (
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Earlier
              </h3>
              {earlierItems.map((item) => (
                <NotificationItemRow
                  key={item.id}
                  notification={item}
                  isSelected={selectedNotification?.id === item.id}
                  onClick={handleSelect}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Detail Card */}
        <div className="lg:col-span-5 sticky top-4">
          <NotificationDetailCard
            notification={selectedNotification}
            onClose={() => setSelectedNotification(null)}
            onActionClick={handleRedirect}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentNotificationsPage;

