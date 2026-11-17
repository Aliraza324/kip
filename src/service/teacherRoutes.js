/**
 * Teacher API Routes
 * Endpoints for Teacher Portal, Authentication, Sessions, Classes & Materials
 */
export const TEACHER_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/teacher/register",
    VERIFY_EMAIL: "/auth/teacher/verify-email",
    RESEND_OTP: "/auth/otp/resend",
    FORGOT_PASSWORD: "/auth/password/forgot",
    VERIFY_RESET_OTP: "/auth/password/verify-otp",
    RESET_PASSWORD: "/auth/password/reset",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
  DASHBOARD: "/teacher/dashboard",
  CLASSES: {
    BASE: "/teacher/classes",
    DETAIL: (classId) => `/teacher/classes/${classId}`,
    STUDENTS: (classId) => `/teacher/classes/${classId}/students`,
  },
  STUDENTS: {
    DETAIL: (studentId) => `/teacher/students/${studentId}`,
    MARK_ATTENDANCE: (studentId, lectureId) =>
      `/teacher/students/${studentId}/attendance/${lectureId}`,
  },
  SESSIONS: {
    BASE: "/teacher/sessions",
    DETAIL: (sessionId) => `/teacher/sessions/${sessionId}`,
    CREATE: "/teacher/sessions",
    UPDATE: (sessionId) => `/teacher/sessions/${sessionId}`,
    DELETE: (sessionId) => `/teacher/sessions/${sessionId}`,
    START: (sessionId) => `/teacher/sessions/${sessionId}/start`,
    END: (sessionId) => `/teacher/sessions/${sessionId}/end`,
    CANCEL: (sessionId) => `/teacher/sessions/${sessionId}/cancel`,
  },
  MATERIALS: {
    BASE: "/teacher/materials",
    CREATE: "/teacher/materials",
    DELETE: (materialId) => `/teacher/materials/${materialId}`,
  },
  ASSIGNMENTS: {
    BASE: "/teacher/assignments",
    CREATE: "/teacher/assignments",
    DETAIL: (assignmentId) => `/teacher/assignments/${assignmentId}`,
    UPDATE: (assignmentId) => `/teacher/assignments/${assignmentId}`,
    DELETE: (assignmentId) => `/teacher/assignments/${assignmentId}`,
    SUBMISSIONS: (assignmentId) => `/teacher/assignments/${assignmentId}/submissions`,
    GRADE: (assignmentId, submissionId) =>
      `/teacher/assignments/${assignmentId}/submissions/${submissionId}/grade`,
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

export default TEACHER_ROUTES;
