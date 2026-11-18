import { STUDENT_ROUTES } from "./studentRoutes";
import { TEACHER_ROUTES } from "./teacherRoutes";
import { ADMIN_ROUTES } from "./adminRoutes";
import { LANDING_ROUTES } from "./landingRoute";

export { STUDENT_ROUTES } from "./studentRoutes";
export { TEACHER_ROUTES } from "./teacherRoutes";
export { ADMIN_ROUTES } from "./adminRoutes";
export { LANDING_ROUTES } from "./landingRoute";

export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  ADMIN_LOGIN: "/auth/login",
  TEACHER_LOGIN: "/auth/login",
  STUDENT_LOGIN: "/auth/login",
  TEACHER_REGISTER: "/auth/teacher/register",
  TEACHER_VERIFY_EMAIL: "/auth/teacher/verify-email",
  OTP_RESEND: "/auth/otp/resend",
  FORGOT_PASSWORD: "/auth/password/forgot",
  VERIFY_RESET_OTP: "/auth/password/verify-otp",
  RESET_PASSWORD: "/auth/password/reset",
  REFRESH: "/auth/refresh",
  LOGOUT: "/auth/logout",
};

export const PUBLIC_ROUTES = {
  CONTENT: "/content",
  CONTACT: "/contact",
  NEWSLETTER: "/newsletter",
};

export const API_ROUTES = {
  AUTH: AUTH_ROUTES,
  STUDENT: STUDENT_ROUTES,
  TEACHER: TEACHER_ROUTES,
  ADMIN: ADMIN_ROUTES,
  PUBLIC: PUBLIC_ROUTES,

  // Compatibility aliases for legacy/mock services
  STUDENTS: ADMIN_ROUTES.STUDENTS,
  TEACHERS: ADMIN_ROUTES.TEACHERS,
  CLASSES: ADMIN_ROUTES.CLASSES,
  CONTENT: {
    BASE: "/content",
    UPDATE: (pageKey) => `/admin/content/${pageKey}`,
    IMAGE: (pageKey) => `/admin/content/${pageKey}/image`,
    VIDEO: (pageKey) => `/admin/content/${pageKey}/video`,
  },
  NOTIFICATIONS: {
    BASE: "/me/notifications",
    READ_ALL: "/me/notifications/read-all",
    CLEAR_ALL: "/me/notifications/clear-all",
    DELETE: (id) => `/me/notifications/${id}`,
  },
};

export default API_ROUTES;
