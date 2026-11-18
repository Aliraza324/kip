import { api, setAuthToken, setAuthUser, clearAuthSession } from "./apiClient";
import { API_ROUTES } from "./apiRoutes";
import { LANDING_ROUTES } from "./landingRoute";
import { liveStore, emitDataChange } from "./dataStore";

export const authService = {
  async studentLogin(credentials) {
    const res = await api.post(API_ROUTES.AUTH.LOGIN, {
      username: credentials.username,
      password: credentials.password,
      portal: "student",
    });
    if (res?.data?.accessToken) {
      setAuthToken(res.data.accessToken);
      setAuthUser(res.data.user);
    }
    emitDataChange("auth", "login", res?.data?.user);
    return res;
  },

  async adminLogin(credentials) {
    const res = await api.post(API_ROUTES.AUTH.LOGIN, {
      username: credentials.username,
      password: credentials.password,
      portal: "admin",
    });
    if (res?.data?.accessToken) {
      setAuthToken(res.data.accessToken);
      setAuthUser(res.data.user);
    }
    emitDataChange("auth", "login", res?.data?.user);
    return res;
  },

  async teacherLogin(credentials) {
    const res = await api.post(API_ROUTES.AUTH.LOGIN, {
      username: credentials.username || credentials.email,
      password: credentials.password,
      portal: "teacher",
    });
    if (res?.data?.accessToken) {
      setAuthToken(res.data.accessToken);
      setAuthUser(res.data.user);
    }
    emitDataChange("auth", "login", res?.data?.user);
    return res;
  },

  async registerTeacher(data) {
    const res = await api.post(API_ROUTES.AUTH.TEACHER_REGISTER, {
      fullName: data.fullName || data.name,
      phoneNumber: data.phoneNumber || data.phone,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword || data.password,
      gender: data.gender,
      qualification: data.qualification,
      subjects: data.subjects || (data.subject ? [data.subject] : undefined),
      preferredClasses: data.preferredClasses || data.preferClasses,
      agreeTerms: Boolean(data.agreeTerms !== undefined ? data.agreeTerms : true),
    });
    return res;
  },

  async verifyTeacherEmail(data) {
    return await api.post(API_ROUTES.AUTH.TEACHER_VERIFY_EMAIL, {
      email: data.email,
      otp: data.otp,
    });
  },

  async resendOtp(data) {
    return await api.post(API_ROUTES.AUTH.OTP_RESEND, {
      email: data.email,
      purpose: data.purpose || "verify_email",
    });
  },

  async forgotPassword(data) {
    return await api.post(API_ROUTES.AUTH.FORGOT_PASSWORD, {
      email: data.email,
    });
  },

  async verifyResetOtp(data) {
    return await api.post(API_ROUTES.AUTH.VERIFY_RESET_OTP, {
      email: data.email,
      otp: data.otp,
    });
  },

  async resetPassword(data) {
    return await api.post(API_ROUTES.AUTH.RESET_PASSWORD, {
      resetToken: data.resetToken,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword || data.newPassword,
    });
  },

  async refreshSession() {
    try {
      const res = await api.post(API_ROUTES.AUTH.REFRESH);
      if (res?.data?.accessToken) {
        setAuthToken(res.data.accessToken);
        setAuthUser(res.data.user);
      }
      return res;
    } catch (err) {
      clearAuthSession();
      throw err;
    }
  },

  async logout() {
    try {
      await api.post(API_ROUTES.AUTH.LOGOUT);
    } catch {}
    clearAuthSession();
    emitDataChange("auth", "logout", null);
  },

  // Aliases for backwards compatibility
  async login(cred) {
    return this.studentLogin(cred);
  },
};

export const studentService = {
  async getAll(params = {}) {
    try {
      const res = await api.get(API_ROUTES.ADMIN.STUDENTS.BASE, { params });
      return res?.data || res;
    } catch {
      return [];
    }
  },
  async getByClass(classId) {
    return await this.getAll({ classId });
  },
  async getById(id) {
    const res = await api.get(API_ROUTES.ADMIN.STUDENTS.DETAIL(id));
    return res?.data !== undefined ? res.data : res;
  },
  async create(studentData) {
    let payload = studentData;
    if (typeof FormData !== "undefined" && !(studentData instanceof FormData)) {
      const hasFile = studentData && Object.values(studentData).some((v) => v instanceof File || v instanceof Blob);
      if (hasFile) {
        const formData = new FormData();
        Object.entries(studentData).forEach(([key, value]) => {
          if (value === undefined || value === null) return;
          formData.append(key, value);
        });
        payload = formData;
      }
    }
    const res = await api.post(API_ROUTES.ADMIN.STUDENTS.CREATE, payload);
    const created = res?.data !== undefined ? res.data : res;
    if (created) liveStore.add("students", created);
    return created;
  },
  async update(id, updates) {
    let payload = updates;
    if (typeof FormData !== "undefined" && !(updates instanceof FormData)) {
      const hasFile = updates && Object.values(updates).some((v) => v instanceof File || v instanceof Blob);
      if (hasFile) {
        const formData = new FormData();
        Object.entries(updates).forEach(([key, value]) => {
          if (value === undefined || value === null) return;
          formData.append(key, value);
        });
        payload = formData;
      }
    }
    const res = await api.patch(API_ROUTES.ADMIN.STUDENTS.UPDATE(id), payload);
    const updated = res?.data !== undefined ? res.data : res;
    if (updated) liveStore.update("students", id, updated);
    return updated;
  },
  async delete(id) {
    const res = await api.delete(API_ROUTES.ADMIN.STUDENTS.DELETE(id));
    liveStore.remove("students", id);
    return res;
  },
};

export const teacherService = {
  async getAll(params = {}) {
    try {
      const res = await api.get(API_ROUTES.ADMIN.TEACHERS.BASE, { params });
      return res;
    } catch (err) {
      console.error("teacherService.getAll error:", err);
      return { data: [], meta: { total: 0, counts: { all: 0, pending: 0, active: 0 } } };
    }
  },

  async getById(teacherId) {
    const res = await api.get(API_ROUTES.ADMIN.TEACHERS.DETAIL(teacherId));
    return res?.data;
  },

  async create(teacherData) {
    let payload = teacherData;
    if (typeof FormData !== "undefined" && !(teacherData instanceof FormData)) {
      const formData = new FormData();
      Object.entries(teacherData).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        if (key === "avatar") {
          if (value instanceof File || value instanceof Blob) {
            formData.append("avatar", value, value.name || "avatar.jpg");
          }
        } else if (Array.isArray(value)) {
          if (value.length > 0 && typeof value[0] === "object") {
            formData.append(key, JSON.stringify(value));
          } else {
            value.forEach((item) => formData.append(key, item));
          }
        } else {
          formData.append(key, value);
        }
      });
      payload = formData;
    }

    try {
      const res = await api.post(API_ROUTES.ADMIN.TEACHERS.CREATE, payload);
      const created = res?.data?.teacher || res?.data;
      if (created) liveStore.add("teachers", created);
      return res?.data || created;
    } catch (err) {
      console.error("teacherService.create error:", err);
      throw err;
    }
  },

  async update(teacherId, updates) {
    let payload = updates;
    if (typeof FormData !== "undefined" && !(updates instanceof FormData)) {
      const hasFile = updates && Object.values(updates).some((v) => v instanceof File || v instanceof Blob);
      if (hasFile) {
        const formData = new FormData();
        Object.entries(updates).forEach(([key, value]) => {
          if (value === undefined || value === null) return;
          if (key === "avatar" && (value instanceof File || value instanceof Blob)) {
            formData.append("avatar", value, value.name || "avatar.jpg");
          } else if (Array.isArray(value)) {
            value.forEach((item) => formData.append(key, item));
          } else {
            formData.append(key, value);
          }
        });
        payload = formData;
      }
    }
    const res = await api.patch(API_ROUTES.ADMIN.TEACHERS.UPDATE(teacherId), payload);
    const updated = res?.data?.teacher || res?.data;
    if (updated) liveStore.update("teachers", teacherId, updated);
    return res?.data || updated;
  },

  async delete(teacherId) {
    const res = await api.delete(API_ROUTES.ADMIN.TEACHERS.DELETE(teacherId));
    liveStore.remove("teachers", teacherId);
    return res;
  },

  async approve(teacherId, { subjects = [], classes = [] } = {}) {
    try {
      const res = await api.patch(API_ROUTES.ADMIN.TEACHERS.APPROVE(teacherId), {
        action: "approve",
        subjects,
        classes,
      });
      liveStore.update("teachers", teacherId, { status: "active", ...res?.data });
      return res?.data;
    } catch {
      return liveStore.update("teachers", teacherId, { status: "Active" });
    }
  },

  async reject(teacherId) {
    try {
      const res = await api.patch(API_ROUTES.ADMIN.TEACHERS.REJECT(teacherId), {
        action: "reject",
      });
      liveStore.update("teachers", teacherId, { status: "rejected" });
      return res?.data;
    } catch {
      return liveStore.update("teachers", teacherId, { status: "Rejected" });
    }
  },

  async assignClass(teacherId, { classId, subjects = [] }) {
    const res = await api.post(API_ROUTES.ADMIN.TEACHERS.ASSIGN_CLASS(teacherId), {
      classId,
      subjects,
    });
    const updated = res?.data;
    if (updated) liveStore.update("teachers", teacherId, updated);
    return updated;
  },
};

export const classService = {
  async getAll(params = {}) {
    try {
      const res = await api.get(API_ROUTES.ADMIN.CLASSES.BASE, { params });
      return res;
    } catch (err) {
      console.error("classService.getAll error:", err);
      return { data: [], meta: { total: 0, filters: { grades: [] } } };
    }
  },

  async getById(classId) {
    const res = await api.get(API_ROUTES.ADMIN.CLASSES.DETAIL(classId));
    return res?.data !== undefined ? res.data : res;
  },

  async create(classData) {
    const res = await api.post(API_ROUTES.ADMIN.CLASSES.CREATE, classData);
    const created = res?.data !== undefined ? res.data : res;
    if (created) liveStore.add("classes", created);
    return created;
  },

  async update(classId, updates) {
    const res = await api.patch(API_ROUTES.ADMIN.CLASSES.UPDATE(classId), updates);
    const updated = res?.data !== undefined ? res.data : res;
    if (updated) liveStore.update("classes", classId, updated);
    return updated;
  },

  async delete(classId) {
    const res = await api.delete(API_ROUTES.ADMIN.CLASSES.DELETE(classId));
    liveStore.remove("classes", classId);
    return res;
  },

  async assignTeacher(classId, { teacherId, subject }) {
    const res = await api.post(API_ROUTES.ADMIN.CLASSES.ASSIGN_TEACHER(classId), { teacherId, subject });
    return res?.data !== undefined ? res.data : res;
  },

  async removeTeacher(classId, assignmentId) {
    const res = await api.delete(API_ROUTES.ADMIN.CLASSES.REMOVE_TEACHER(classId, assignmentId));
    return res?.data !== undefined ? res.data : res;
  },

  async updateTeacherAssignment(classId, assignmentId, { subject }) {
    const res = await api.patch(API_ROUTES.ADMIN.CLASSES.UPDATE_TEACHER(classId, assignmentId), { subject });
    return res?.data !== undefined ? res.data : res;
  },

  async importStudentsCsv(classId, file) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post(API_ROUTES.ADMIN.CLASSES.IMPORT_STUDENTS(classId), formData);
    return res?.data !== undefined ? res.data : res;
  },
};

export const contentService = {
  async getAll() {
    try {
      const res = await api.get(API_ROUTES.CONTENT.BASE);
      const data = res?.data !== undefined ? res.data : res;
      if (data) liveStore.set("content", data);
      return data || liveStore.get("content");
    } catch {
      return liveStore.get("content");
    }
  },
  async updatePageContent(pageKey, newSectionData) {
    const res = await api.put(API_ROUTES.CONTENT.UPDATE(pageKey), newSectionData);
    const updatedSection = res?.data !== undefined ? res.data : res;
    const current = liveStore.get("content") || {};
    const updated = {
      ...current,
      [pageKey]: { ...(current[pageKey] || {}), ...newSectionData, ...(updatedSection || {}) },
    };
    liveStore.set("content", updated);
    return updated[pageKey];
  },
  async uploadImage(pageKey, file) {
    const formData = new FormData();
    formData.append("image", file);
    const res = await api.put(API_ROUTES.CONTENT.IMAGE(pageKey), formData);
    const updatedSection = res?.data !== undefined ? res.data : res;
    const current = liveStore.get("content") || {};
    const updated = {
      ...current,
      [pageKey]: { ...(current[pageKey] || {}), ...(updatedSection || {}) },
    };
    liveStore.set("content", updated);
    return updated[pageKey];
  },
  async uploadVideo(pageKey, file) {
    const formData = new FormData();
    formData.append("video", file);
    const res = await api.put(API_ROUTES.CONTENT.VIDEO(pageKey), formData);
    const updatedSection = res?.data !== undefined ? res.data : res;
    const current = liveStore.get("content") || {};
    const updated = {
      ...current,
      [pageKey]: { ...(current[pageKey] || {}), ...(updatedSection || {}) },
    };
    liveStore.set("content", updated);
    return updated[pageKey];
  },
};

export const notificationService = {
  async getAll() {
    try {
      const res = await api.get(API_ROUTES.NOTIFICATIONS.BASE);
      if (res?.data) liveStore.set("notifications", res.data);
      return res?.data || liveStore.get("notifications");
    } catch {
      return liveStore.get("notifications");
    }
  },
  async markAllAsRead() {
    const current = liveStore.get("notifications") || [];
    const updated = current.map((n) => ({ ...n, unread: false }));
    liveStore.set("notifications", updated);
    try { await api.put(API_ROUTES.NOTIFICATIONS.READ_ALL); } catch {}
    return updated;
  },
};

export const newsletterService = {
  async subscribe(email) {
    const res = await api.post(LANDING_ROUTES.NEWSLETTER.SUBSCRIBE, { email });
    return res;
  },
};

export const contactPublicService = {
  async submitMessage(messageData) {
    const res = await api.post(LANDING_ROUTES.CONTACT.SUBMIT, messageData);
    return res?.data !== undefined ? res.data : res;
  },
};

export default {
  auth: authService,
  students: studentService,
  teachers: teacherService,
  classes: classService,
  content: contentService,
  landing: contentService,
  newsletter: newsletterService,
  contactPublic: contactPublicService,
  notifications: notificationService,
};
