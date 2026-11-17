/**
 * Admin API Routes
 * Endpoints for Administrator Portal, Dashboard, Management & Approvals
 */
export const ADMIN_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  DASHBOARD: "/admin/dashboard",
  CLASSES: {
    BASE: "/admin/classes",
    CREATE: "/admin/classes",
    DETAIL: (classId) => `/admin/classes/${classId}`,
    UPDATE: (classId) => `/admin/classes/${classId}`,
    DELETE: (classId) => `/admin/classes/${classId}`,
    ASSIGN_TEACHER: (classId) => `/admin/classes/${classId}/teachers`,
    UPDATE_TEACHER: (classId, assignmentId) => `/admin/classes/${classId}/teachers/${assignmentId}`,
    REMOVE_TEACHER: (classId, assignmentId) => `/admin/classes/${classId}/teachers/${assignmentId}`,
    IMPORT_STUDENTS: (classId) => `/admin/classes/${classId}/students/import`,
    ENROLL_STUDENTS: (classId) => `/admin/classes/${classId}/enroll`,
    UNENROLL_STUDENTS: (classId) => `/admin/classes/${classId}/unenroll`,
  },
  STUDENTS: {
    BASE: "/admin/students",
    CREATE: "/admin/students",
    IMPORT_CSV: "/admin/students/import-csv",
    DETAIL: (studentId) => `/admin/students/${studentId}`,
    UPDATE: (studentId) => `/admin/students/${studentId}`,
    DELETE: (studentId) => `/admin/students/${studentId}`,
    RESET_PASSWORD: (studentId) => `/admin/students/${studentId}/reset-password`,
  },
  TEACHERS: {
    BASE: "/admin/teachers",
    CREATE: "/admin/teachers",
    PENDING: "/admin/teachers?tab=pending",
    DETAIL: (teacherId) => `/admin/teachers/${teacherId}`,
    UPDATE: (teacherId) => `/admin/teachers/${teacherId}`,
    DELETE: (teacherId) => `/admin/teachers/${teacherId}`,
    REVIEW: (teacherId) => `/admin/teachers/${teacherId}/approval`,
    APPROVE: (teacherId) => `/admin/teachers/${teacherId}/approval`,
    REJECT: (teacherId) => `/admin/teachers/${teacherId}/approval`,
    ASSIGN_CLASS: (teacherId) => `/admin/teachers/${teacherId}/classes`,
    RESET_PASSWORD: (teacherId) => `/admin/teachers/${teacherId}/reset-password`,
  },
  CONTENT: {
    BASE: "/content",
    DETAIL: (section) => `/admin/content/${section}`,
    UPDATE: (section) => `/admin/content/${section}`,
  },
  CONTACT: {
    MESSAGES: "/admin/contact-messages",
    SUBSCRIBERS: "/admin/subscribers",
  },
  PROFILE: {
    ME: "/me",
    UPDATE_PASSWORD: "/me/password",
    AVATAR: "/me/avatar",
    NOTIFICATIONS: "/me/notifications",
    MARK_NOTIFICATION_READ: (id) => `/me/notifications/${id}/read`,
    MARK_ALL_NOTIFICATIONS_READ: "/me/notifications/read-all",
  },
};

export default ADMIN_ROUTES;
