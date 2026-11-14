import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  AdminNotificationItemRow,
  AdminNotificationDetailCard,
  AdminNotificationFilterPills,
} from "../components";
import { adminNotificationsListMock } from "@/mocks";

const CATEGORIES = [
  { key: "all", label: "All (24)" },
  { key: "assignments", label: "Assignments (8)" },
  { key: "grades", label: "Grades (5)" },
  { key: "announcements", label: "Announcements (4)" },
  { key: "class-updates", label: "Class Updates (3)" },
];

export const AdminNotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(adminNotificationsListMock);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(
    notifications[0] || null
  );

  const handleSelect = (notif) => {
    setSelectedNotification(notif);
    setNotifications((prev) =>
      prev.map((item) => (item.id === notif.id ? { ...item, isUnread: false } : item))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isUnread: false })));
    toast.success("All notifications marked as read");
  };

  const handleActionRedirect = (url) => {
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
    <div className="space-y-6 max-w-[1400px] mx-auto pb-8">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Notifications
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
          Stay updated with your classes, assignments, and important announcements.
        </p>
      </div>

      {/* Filter Row */}
      <AdminNotificationFilterPills
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Main Grid: Left List + Right Detail Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Column: Notification Groups */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-5">
          {/* Today Group */}
          {todayItems.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
                Today
              </span>
              <div className="space-y-2">
                {todayItems.map((item) => (
                  <AdminNotificationItemRow
                    key={item.id}
                    notification={item}
                    isSelected={selectedNotification?.id === item.id}
                    onClick={() => handleSelect(item)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Yesterday Group */}
          {yesterdayItems.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
                Yesterday
              </span>
              <div className="space-y-2">
                {yesterdayItems.map((item) => (
                  <AdminNotificationItemRow
                    key={item.id}
                    notification={item}
                    isSelected={selectedNotification?.id === item.id}
                    onClick={() => handleSelect(item)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Earlier Group */}
          {earlierItems.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
                Earlier
              </span>
              <div className="space-y-2">
                {earlierItems.map((item) => (
                  <AdminNotificationItemRow
                    key={item.id}
                    notification={item}
                    isSelected={selectedNotification?.id === item.id}
                    onClick={() => handleSelect(item)}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredNotifications.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 text-slate-400 text-xs sm:text-sm font-medium">
              No notifications found in this category.
            </div>
          )}
        </div>

        {/* Right Column: Preview Detail Card */}
        <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-4">
          <AdminNotificationDetailCard
            notification={selectedNotification}
            onClose={() => setSelectedNotification(null)}
            onActionClick={handleActionRedirect}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminNotificationsPage;
