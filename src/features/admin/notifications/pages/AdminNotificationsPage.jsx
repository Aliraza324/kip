import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus, AlertTriangle, Volume2, Bell } from "lucide-react";
import {
  AdminNotificationItemRow,
  AdminNotificationDetailCard,
  AdminNotificationFilterPills,
  AdminCreateAnnouncementModal,
  AdminReachOutStudentModal,
} from "../components";
import { notificationService, adminLowProgressService } from "@/service/apiService";
import { playNotificationSound } from "@/utils/notificationSound";
import { useSocketNotifications } from "@/hooks/useSocketNotifications";

const getItemDateGroup = (item) => {
  if (item.group) return item.group;
  if (!item.createdAt) return "Earlier";
  const date = new Date(item.createdAt);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return "Earlier";
};

export const AdminNotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [metaCounts, setMetaCounts] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isReachOutModalOpen, setIsReachOutModalOpen] = useState(false);
  const [targetStudentForReachOut, setTargetStudentForReachOut] = useState(null);

  // Real-time WebSocket Notifications via Socket.io
  useSocketNotifications({
    role: "admin",
    onNotification: (newNotif) => {
      setNotifications((prev) => {
        const exists = prev.some((it) => it.id === newNotif.id);
        if (exists) return prev;
        return [
          {
            ...newNotif,
            id: newNotif.id || `ws-${Date.now()}`,
            isUnread: true,
            isRead: false,
            group: "Today",
          },
          ...prev,
        ];
      });
      setSelectedNotification((curr) => curr || newNotif);
      setMetaCounts((prev) => {
        if (!prev) return null;
        const cat = newNotif.category || "announcements";
        return {
          ...prev,
          all: (prev.all || 0) + 1,
          [cat]: (prev[cat] || 0) + 1,
        };
      });
    },
  });

  // Fetch notifications from backend
  const fetchNotifications = async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    try {
      const res = await notificationService.getAll();
      const items = res?.items || [];
      if (res?.meta?.counts) {
        setMetaCounts(res.meta.counts);
      }
      setNotifications((prev) => {
        if (isBackground && items.length > prev.length) {
          playNotificationSound();
        }
        return items;
      });

      setSelectedNotification((curr) => {
        const searchParams = new URLSearchParams(window.location.search);
        const queryStudentId = searchParams.get("studentId");
        if (queryStudentId) {
          const matchingNotif = items.find(
            (it) => it.meta?.studentId === queryStudentId || it.link?.includes(queryStudentId)
          );
          if (matchingNotif) return matchingNotif;
        }
        if (!curr) return items[0] || null;
        const found = items.find((it) => it.id === curr.id);
        return found || items[0] || null;
      });
    } catch (err) {
      console.warn("Notifications fetch error:", err.message);
      setNotifications([]);
      setSelectedNotification(null);
    } finally {
      if (!isBackground) setLoading(false);
    }
  };

  useEffect(() => {
    // 1. Initial fetch
    fetchNotifications();

    // 2. Sync low progress alerts in backend
    adminLowProgressService.syncAlerts().catch(() => {});

    // 3. Polling for live notification updates every 25 seconds
    const interval = setInterval(() => {
      fetchNotifications(true);
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  const handleSelect = async (notif) => {
    setSelectedNotification(notif);
    const isUnread = notif.isUnread ?? !notif.isRead;
    if (isUnread) {
      setNotifications((prev) =>
        prev.map((item) =>
          item.id === notif.id ? { ...item, isRead: true, isUnread: false } : item
        )
      );
      if (notif.id) {
        await notificationService.markAsRead(notif.id);
      }
    }
  };

  const handleMarkAllRead = async () => {
    await notificationService.markAllAsRead();
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isRead: true, isUnread: false }))
    );
    toast.success("All notifications marked as read");
  };

  const handleClearAll = async () => {
    try {
      await notificationService.clearAll(activeCategory);
      setNotifications((prev) => {
        if (activeCategory === "all") return [];
        return prev.filter((item) => item.category !== activeCategory);
      });
      if (activeCategory === "all") {
        setMetaCounts({
          all: 0,
          announcements: 0,
          grades: 0,
          assignments: 0,
          "class-updates": 0,
          submissions: 0,
        });
      } else {
        setMetaCounts((prev) =>
          prev
            ? {
                ...prev,
                [activeCategory]: 0,
                all: Math.max(0, (prev.all || 0) - (prev[activeCategory] || 0)),
              }
            : null
        );
      }
      setSelectedNotification(null);
      toast.success(
        activeCategory === "all"
          ? "All notifications cleared"
          : `Cleared ${activeCategory} notifications`
      );
    } catch {
      toast.error("Failed to clear notifications");
    }
  };

  const handleActionRedirect = (url, notif) => {
    let target = url;
    const studentId =
      notif?.meta?.studentId ||
      (typeof url === "string" && url.includes("studentId=")
        ? url.split("studentId=")[1]?.split("&")[0]
        : null);

    if (studentId && (notif?.meta?.type === "low_progress" || url?.includes("studentId="))) {
      target = `/admin/students/${studentId}`;
    }

    if (target) navigate(target);
  };

  const handleReachOutFromNotif = (studentMeta) => {
    setTargetStudentForReachOut(studentMeta || null);
    setIsReachOutModalOpen(true);
  };

  // Compute Category Counts strictly from real data
  const counts = {
    all: metaCounts?.all ?? notifications.length,
    announcements:
      metaCounts?.announcements ??
      notifications.filter((n) => n.category === "announcements").length,
    grades:
      metaCounts?.grades ??
      notifications.filter((n) => n.category === "grades").length,
    assignments:
      metaCounts?.assignments ??
      notifications.filter((n) => n.category === "assignments").length,
    "class-updates":
      metaCounts?.["class-updates"] ??
      notifications.filter((n) => n.category === "class-updates").length,
  };

  const categories = [
    { key: "all", label: `All (${counts.all})` },
    { key: "announcements", label: `Announcements (${counts.announcements})` },
    { key: "grades", label: `Grades & Progress (${counts.grades})` },
    { key: "assignments", label: `Assignments (${counts.assignments})` },
    { key: "class-updates", label: `Class Updates (${counts["class-updates"]})` },
  ];

  const filteredNotifications = notifications.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const todayItems = filteredNotifications.filter((n) => getItemDateGroup(n) === "Today");
  const yesterdayItems = filteredNotifications.filter(
    (n) => getItemDateGroup(n) === "Yesterday"
  );
  const earlierItems = filteredNotifications.filter(
    (n) => getItemDateGroup(n) === "Earlier"
  );

  const lowProgressCount = notifications.filter((n) => n.meta?.type === "low_progress").length;

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-8">
      {/* Top Header & Broadcast Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Admin notification center for registrations, queries, low progress alerts, and announcements.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={playNotificationSound}
            title="Test notification alert sound"
            className="p-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 shadow-2xs transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-slate-500" />
          </button>

          <button
            type="button"
            onClick={() => {
              setTargetStudentForReachOut(null);
              setIsReachOutModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-50 hover:bg-amber-100/90 text-amber-700 border border-amber-200 text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Reach Out (&lt;70% Progress)</span>
            {lowProgressCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-200 text-amber-800 text-[10px] font-black">
                {lowProgressCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsAnnouncementModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Announcement</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <AdminNotificationFilterPills
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onMarkAllRead={handleMarkAllRead}
        onClearAll={handleClearAll}
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
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 text-slate-400 space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="text-sm font-bold text-slate-700">No Notifications</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium">
                No notifications found in this category. New teacher registrations, queries, and student alerts will appear here in real-time.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Preview Detail Card */}
        <div className="lg:col-span-5 xl:col-span-5 lg:sticky lg:top-4">
          {selectedNotification ? (
            <AdminNotificationDetailCard
              notification={selectedNotification}
              onClose={() => setSelectedNotification(null)}
              onActionClick={handleActionRedirect}
              onReachOut={handleReachOutFromNotif}
            />
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 text-center space-y-3 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6 stroke-[1.8]" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">Notification Preview</h3>
              <p className="text-xs text-slate-400 font-medium max-w-xs mx-auto leading-relaxed">
                Select a notification from the list to view its full details and actions.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Announcement Modal */}
      <AdminCreateAnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
        onSuccess={() => fetchNotifications(false)}
      />

      {/* Reach Out to Low Progress Student Modal */}
      <AdminReachOutStudentModal
        isOpen={isReachOutModalOpen}
        initialStudent={targetStudentForReachOut}
        onClose={() => {
          setIsReachOutModalOpen(false);
          setTargetStudentForReachOut(null);
        }}
        onSuccess={() => fetchNotifications(false)}
      />
    </div>
  );
};

export default AdminNotificationsPage;
