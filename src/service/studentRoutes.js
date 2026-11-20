/**
 * Student API Routes
 * Endpoints for Student Portal & Student Authentication
 */
export const STUDENT_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  DASHBOARD: "/student/dashboard",
  CLASSES: {
    BASE: "/student/classes",
    DETAIL: (sessionId) => `/student/classes/${sessionId}`,
    JOIN: (sessionId) => `/student/classes/${sessionId}/join`,
  },
  ASSIGNMENTS: {
    BASE: "/student/assignments",
    DETAIL: (assignmentId) => `/student/assignments/${assignmentId}`,
    SUBMIT: (assignmentId) => `/student/assignments/${assignmentId}/submit`,
  },
  MATERIALS: {
    BASE: "/student/materials",
  },
  PROGRESS: {
    BASE: "/student/progress",
  },
  PROFILE: {
    BASE: "/student/profile",
    UPDATE: "/student/profile",
    UPDATE_PASSWORD: "/student/profile/password",
    AVATAR: "/student/profile/avatar",
    NOTIFICATIONS: "/me/notifications",
    MARK_NOTIFICATION_READ: (id) => `/me/notifications/${id}/read`,
    MARK_ALL_NOTIFICATIONS_READ: "/me/notifications/read-all",
  },
};

export default STUDENT_ROUTES;
