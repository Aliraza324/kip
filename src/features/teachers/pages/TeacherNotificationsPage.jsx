import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { teacherNotificationsMock } from "@/mocks";
import {
  TeacherNotificationItemRow,
  TeacherNotificationDetailCard,
} from "../components/notifications";

const CATEGORIES = [
  { key: "all", label: "All (5)" },
  { key: "submissions", label: "Submissions (2)" },
  { key: "assignments", label: "Assignments (1)" },
  { key: "class-updates", label: "Class Updates (1)" },
  { key: "announcements", label: "Announcements (1)" },
];

export const TeacherNotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(teacherNotificationsMock);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(
    notifications[0] || null
  );

  const handleSelect = (notif) => {
    setSelectedNotification(notif);
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
    if (url) navigate(url);
  };

  const filteredNotifications = notifications.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const todayItems = filteredNotifications.filter((n) => n.group === "Today");
  const yesterdayItems = filteredNotifications.filter((n) => n.group === "Yesterday");
  const earlierItems = filteredNotifications.filter((n) => n.group === "Earlier");

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto pb-14">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Notifications
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
          Stay updated with your classes, student submissions, and announcements.
        </p>
      </div>

      {/* Filter Row: Horizontal scrollable pills on mobile so they don't wrap into 4 rows */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeCategory === cat.key
                  ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
          >
            <Check className="w-3.5 h-3.5 text-slate-500" />
            <span>Mark All as Read</span>
          </button>
          <button
            type="button"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shadow-2xs shrink-0"
            aria-label="More Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Left Column: Grouped Notifications */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          {todayItems.length > 0 && (
            <div className="space-y-2 sm:space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Today
              </h3>
              {todayItems.map((item) => (
                <TeacherNotificationItemRow
                  key={item.id}
                  notification={item}
                  isSelected={selectedNotification?.id === item.id}
                  onClick={handleSelect}
                />
              ))}
            </div>
          )}

          {yesterdayItems.length > 0 && (
            <div className="space-y-2 sm:space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Yesterday
              </h3>
              {yesterdayItems.map((item) => (
                <TeacherNotificationItemRow
                  key={item.id}
                  notification={item}
                  isSelected={selectedNotification?.id === item.id}
                  onClick={handleSelect}
                />
              ))}
            </div>
          )}

          {earlierItems.length > 0 && (
            <div className="space-y-2 sm:space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                Earlier
              </h3>
              {earlierItems.map((item) => (
                <TeacherNotificationItemRow
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
          <TeacherNotificationDetailCard
            notification={selectedNotification}
            onClose={() => setSelectedNotification(null)}
            onActionClick={handleRedirect}
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherNotificationsPage;
