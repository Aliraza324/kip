/**
 * Centralized API Route Endpoints
 */
export const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
    ADMIN_LOGIN: "/api/auth/admin-login",
    TEACHER_LOGIN: "/api/auth/teacher-login",
    TEACHER_REGISTER: "/api/auth/teacher-register",
    STUDENT_LOGIN: "/api/auth/student-login",
    ME: "/api/auth/me",
    LOGOUT: "/api/auth/logout",
  },
  STUDENTS: {
    BASE: "/api/students",
    DETAIL: (id) => `/api/students/${id}`,
    BY_CLASS: (classId) => `/api/students/class/${classId}`,
    CREATE: "/api/students",
    UPDATE: (id) => `/api/students/${id}`,
    DELETE: (id) => `/api/students/${id}`,
  },
  TEACHERS: {
    BASE: "/api/teachers",
    DETAIL: (id) => `/api/teachers/${id}`,
    CREATE: "/api/teachers",
    UPDATE: (id) => `/api/teachers/${id}`,
    APPROVE: (id) => `/api/teachers/${id}/approve`,
    REJECT: (id) => `/api/teachers/${id}/reject`,
    ASSIGN_CLASS: (id) => `/api/teachers/${id}/assign-class`,
  },
  CLASSES: {
    BASE: "/api/classes",
    DETAIL: (id) => `/api/classes/${id}`,
    CREATE: "/api/classes",
    UPDATE: (id) => `/api/classes/${id}`,
    DELETE: (id) => `/api/classes/${id}`,
  },
  CONTENT: {
    BASE: "/api/content",
    PAGE: (pageKey) => `/api/content/${pageKey}`,
    UPDATE: (pageKey) => `/api/content/${pageKey}`,
  },
  NOTIFICATIONS: {
    BASE: "/api/notifications",
    READ_ALL: "/api/notifications/read-all",
    MARK_READ: (id) => `/api/notifications/${id}/read`,
  },
  ASSIGNMENTS: {
    BASE: "/api/assignments",
    DETAIL: (id) => `/api/assignments/${id}`,
    CREATE: "/api/assignments",
    SUBMISSIONS: (id) => `/api/assignments/${id}/submissions`,
    GRADE: (id, subId) => `/api/assignments/${id}/submissions/${subId}/grade`,
  },
  SESSIONS: {
    BASE: "/api/sessions",
    DETAIL: (id) => `/api/sessions/${id}`,
    CREATE: "/api/sessions",
  },
};

export default API_ROUTES;
