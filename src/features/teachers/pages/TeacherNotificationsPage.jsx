import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Check, MoreHorizontal, Bell } from "lucide-react";
import toast from "react-hot-toast";
import { notificationService } from "@/service/apiService";
import {
  TeacherNotificationItemRow,
  TeacherNotificationDetailCard,
} from "../components/notifications";

export const TeacherNotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [metaCounts, setMetaCounts] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    notificationService
      .getAll()
      .then((res) => {
        const items = res?.items || [];
        setNotifications(items);
        if (res?.meta?.counts) setMetaCounts(res.meta.counts);
        setSelectedNotification(items[0] || null);
      })
      .catch(() => {
        setNotifications([]);
      });
  }, []);

  const handleSelect = (notif) => {
    setSelectedNotification(notif);
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === notif.id ? { ...item, isUnread: false, isRead: true } : item
      )
    );
    if (notif.id) {
      notificationService.markAsRead(notif.id);
    }
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isUnread: false, isRead: true }))
    );
    toast.success("All notifications marked as read");
  };

  const handleRedirect = (url, notif) => {
    const target = url || notif?.link || notif?.redirectUrl || "/teacher/assignments";
    navigate(target);
  };

  const counts = {
    all: metaCounts?.all ?? notifications.length,
    submissions: metaCounts?.submissions ?? notifications.filter((n) => n.category === "submissions").length,
    assignments: metaCounts?.assignments ?? notifications.filter((n) => n.category === "assignments").length,
    "class-updates": metaCounts?.["class-updates"] ?? notifications.filter((n) => n.category === "class-updates").length,
    announcements: metaCounts?.announcements ?? notifications.filter((n) => n.category === "announcements").length,
  };

  const categories = [
    { key: "all", label: `All (${counts.all})` },
    { key: "submissions", label: `Submissions (${counts.submissions})` },
    { key: "assignments", label: `Assignments (${counts.assignments})` },
    { key: "class-updates", label: `Class Updates (${counts["class-updates"]})` },
    { key: "announcements", label: `Announcements (${counts.announcements})` },
  ];

  const filteredNotifications = notifications.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const todayItems = filteredNotifications.filter((n) => n.group === "Today" || (n.createdAt && new Date(n.createdAt).toDateString() === new Date().toDateString()));
  const yesterdayItems = filteredNotifications.filter((n) => n.group === "Yesterday");
  const earlierItems = filteredNotifications.filter((n) => n.group !== "Today" && n.group !== "Yesterday" && (!n.createdAt || new Date(n.createdAt).toDateString() !== new Date().toDateString()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Notifications
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Stay updated with submissions, class updates, and platform announcements.
        </p>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
            <span>Mark All as Read</span>
          </button>

          <button
            type="button"
            className="p-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 shadow-2xs transition-colors cursor-pointer"
            aria-label="More Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Grouped Notifications */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
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

          {filteredNotifications.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto">
                <Bell className="w-5 h-5 stroke-[1.8]" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">No notifications found</p>
              <p className="text-[11px] text-slate-400">Student submissions and announcements will appear here.</p>
            </div>
          )}
        </div>

        {/* Right Column: Detail Card */}
        <div className="lg:col-span-5 sticky top-4">
          {selectedNotification ? (
            <TeacherNotificationDetailCard
              notification={selectedNotification}
              onClose={() => setSelectedNotification(null)}
              onActionClick={handleRedirect}
            />
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center mx-auto">
                <Bell className="w-5 h-5 stroke-[1.8]" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">Notification Preview</p>
              <p className="text-[11px] text-slate-400">Select any notification from the list to view its details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherNotificationsPage;
