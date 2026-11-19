import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { getSocket, joinSocketRoom } from "@/service/socket";
import { playNotificationSound } from "@/utils/notificationSound";
import { getAuthUser } from "@/service/apiClient";

export const useSocketNotifications = ({
  role = null,
  userId = null,
  onNotification = null,
  enableToast = true,
  enableSound = true,
} = {}) => {
  useEffect(() => {
    const authUser = getAuthUser();
    const effectiveUserId = userId || authUser?.id || authUser?._id;
    const effectiveRole = role || authUser?.role || "student";

    const socket = getSocket();

    // Join room
    joinSocketRoom({ userId: effectiveUserId, role: effectiveRole });

    const handleNewNotification = (notif) => {
      if (!notif) return;

      // 1. Play audio tone
      if (enableSound) {
        playNotificationSound();
      }

      // 2. Show Toast notification
      if (enableToast) {
        const cat = notif.category || notif.meta?.type || "";
        const iconEmoji =
          cat === "assignments" || cat === "assignment"
            ? "📝"
            : cat === "submissions" || cat === "submission"
            ? "📥"
            : cat === "grades" || cat === "grade"
            ? "🏆"
            : cat === "low_progress"
            ? "⚠️"
            : cat === "teacher_registration"
            ? "👨‍🏫"
            : cat === "contact_query"
            ? "💬"
            : "📢";

        toast(
          (t) =>
            React.createElement(
              "div",
              {
                onClick: () => toast.dismiss(t.id),
                className: "flex items-start gap-2.5 cursor-pointer max-w-sm",
              },
              React.createElement(
                "div",
                { className: "text-lg shrink-0 mt-0.5" },
                iconEmoji
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "p",
                  { className: "text-xs font-bold text-slate-900 leading-snug" },
                  notif.title
                ),
                React.createElement(
                  "p",
                  { className: "text-[11px] text-slate-500 font-medium line-clamp-2 mt-0.5" },
                  notif.message || notif.description
                )
              )
            ),
          {
            duration: 5000,
            position: "top-right",
            style: {
              borderRadius: "16px",
              background: "#ffffff",
              color: "#0f172a",
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e2e8f0",
              padding: "12px 14px",
            },
          }
        );
      }

      // 3. Callback to update component state
      if (typeof onNotification === "function") {
        onNotification(notif);
      }
    };

    socket.on("notification:new", handleNewNotification);
    if (role === "admin") {
      socket.on("admin:notification:new", handleNewNotification);
    }

    return () => {
      socket.off("notification:new", handleNewNotification);
      if (role === "admin") {
        socket.off("admin:notification:new", handleNewNotification);
      }
    };
  }, [role, userId, onNotification, enableToast, enableSound]);
};

export default useSocketNotifications;
