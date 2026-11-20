import { api, setAuthToken, setAuthUser, clearAuthSession } from "./apiClient";
import { API_ROUTES, ADMIN_ROUTES } from "./apiRoutes";
import { LANDING_ROUTES } from "./landingRoute";
import { TEACHER_ROUTES } from "./teacherRoutes";
import { STUDENT_ROUTES } from "./studentRoutes";
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
  async getNextCode() {
    try {
      const res = await api.get(ADMIN_ROUTES.STUDENTS.NEXT_CODE);
      return res?.data?.code || res?.code || "";
    } catch (err) {
      console.warn("studentService.getNextCode error:", err);
      return "";
    }
  },
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
  async getNextCode() {
    try {
      const res = await api.get(ADMIN_ROUTES.TEACHERS.NEXT_CODE);
      return res?.data?.code || res?.code || "";
    } catch (err) {
      console.warn("teacherService.getNextCode error:", err);
      return "";
    }
  },
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
  async getAll(params = {}) {
    try {
      const res = await api.get(API_ROUTES.NOTIFICATIONS.BASE, { params });
      const items = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res)
        ? res
        : Array.isArray(res?.items)
        ? res.items
        : [];
      return {
        items,
        meta: res?.meta || {},
      };
    } catch (err) {
      console.warn("Notifications fetch error:", err.message);
      return { items: [], meta: {} };
    }
  },
  async markAsRead(notificationId) {
    try {
      const res = await api.patch(`/me/notifications/${notificationId}/read`);
      return res?.data || res;
    } catch {
      return null;
    }
  },
  async markAllAsRead() {
    try {
      const res = await api.patch(API_ROUTES.NOTIFICATIONS.READ_ALL);
      return res?.data || res;
    } catch {
      return null;
    }
  },
  async clearAll(category = null) {
    try {
      const params = category && category !== "all" ? { category } : {};
      const res = await api.delete(API_ROUTES.NOTIFICATIONS.CLEAR_ALL, { params });
      return res?.data || res;
    } catch {
      return null;
    }
  },
  async deleteOne(id) {
    try {
      const res = await api.delete(API_ROUTES.NOTIFICATIONS.DELETE(id));
      return res?.data || res;
    } catch {
      return null;
    }
  },
};

export const adminAnnouncementService = {
  async create(data) {
    const res = await api.post(ADMIN_ROUTES.ANNOUNCEMENTS.CREATE, data);
    return res?.data || res;
  },
};

export const adminLowProgressService = {
  async getLowProgress() {
    const res = await api.get(ADMIN_ROUTES.STUDENTS.LOW_PROGRESS);
    return res?.data || res;
  },
  async reachOut(data) {
    const res = await api.post(ADMIN_ROUTES.STUDENTS.REACH_OUT, data);
    return res?.data || res;
  },
  async syncAlerts() {
    const res = await api.post(ADMIN_ROUTES.STUDENTS.SYNC_LOW_PROGRESS);
    return res?.data || res;
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

export const adminContactService = {
  async listMessages(params = {}) {
    const res = await api.get(API_ROUTES.ADMIN.CONTACT.MESSAGES, { params });
    return res;
  },
  async setRead(id, isRead = true) {
    const res = await api.patch(API_ROUTES.ADMIN.CONTACT.SET_READ(id), { isRead });
    return res;
  },
  async replyMessage(id, replyMessage) {
    const res = await api.post(API_ROUTES.ADMIN.CONTACT.REPLY(id), { replyMessage });
    return res;
  },
  async deleteMessage(id) {
    const res = await api.delete(API_ROUTES.ADMIN.CONTACT.DELETE(id));
    return res;
  },
  async getStats() {
    const res = await api.get(API_ROUTES.ADMIN.CONTACT.STATS);
    return res?.data !== undefined ? res.data : res;
  },
};

export const adminDashboardService = {
  async getDashboard() {
    const res = await api.get(ADMIN_ROUTES.DASHBOARD);
    return res?.data !== undefined ? res.data : res;
  },
};

export const teacherDashboardService = {
  async getDashboard() {
    try {
      const res = await api.get(TEACHER_ROUTES.DASHBOARD);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("teacherDashboardService.getDashboard error:", err);
      throw err;
    }
  },
};

export const teacherClassService = {
  async getClasses() {
    try {
      const res = await api.get(TEACHER_ROUTES.CLASSES.BASE);
      return res?.data !== undefined ? res.data : (Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("teacherClassService.getClasses error:", err);
      throw err;
    }
  },
  async getClassDetail(classId) {
    try {
      const res = await api.get(TEACHER_ROUTES.CLASSES.DETAIL(classId));
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error(`teacherClassService.getClassDetail(${classId}) error:`, err);
      throw err;
    }
  },
  async getClassStudents(classId, params = {}) {
    try {
      const res = await api.get(TEACHER_ROUTES.CLASSES.STUDENTS(classId), { params });
      return {
        data: res?.data || [],
        meta: res?.meta || {},
      };
    } catch (err) {
      console.error(`teacherClassService.getClassStudents(${classId}) error:`, err);
      throw err;
    }
  },
};

export const teacherStudentService = {
  async getStudent(studentId) {
    try {
      const res = await api.get(TEACHER_ROUTES.STUDENTS.DETAIL(studentId));
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error(`teacherStudentService.getStudent(${studentId}) error:`, err);
      throw err;
    }
  },
  async markAttendance(studentId, lectureId, status) {
    try {
      const res = await api.patch(TEACHER_ROUTES.STUDENTS.MARK_ATTENDANCE(studentId, lectureId), { status });
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error(`teacherStudentService.markAttendance error:`, err);
      throw err;
    }
  },
};

export const teacherAssignmentService = {
  async getAssignments(params = {}) {
    try {
      const res = await api.get(TEACHER_ROUTES.ASSIGNMENTS.BASE, { params });
      return {
        items: res?.data || [],
        meta: res?.meta || {},
      };
    } catch (err) {
      console.error("teacherAssignmentService.getAssignments error:", err);
      throw err;
    }
  },

  async createAssignment(payload) {
    try {
      const res = await api.post(TEACHER_ROUTES.ASSIGNMENTS.CREATE, payload);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("teacherAssignmentService.createAssignment error:", err);
      throw err;
    }
  },

  async getAssignmentSubmissions(assignmentId) {
    try {
      const res = await api.get(TEACHER_ROUTES.ASSIGNMENTS.SUBMISSIONS(assignmentId));
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error(`teacherAssignmentService.getAssignmentSubmissions(${assignmentId}) error:`, err);
      throw err;
    }
  },

  async getSubmission(submissionId) {
    try {
      const res = await api.get(`/teacher/submissions/${submissionId}`);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error(`teacherAssignmentService.getSubmission(${submissionId}) error:`, err);
      throw err;
    }
  },

  async gradeSubmission(submissionId, { marks, gradeLetter, feedback }) {
    try {
      const res = await api.patch(`/teacher/submissions/${submissionId}/grade`, {
        marks,
        gradeLetter,
        feedback,
      });
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error(`teacherAssignmentService.gradeSubmission(${submissionId}) error:`, err);
      throw err;
    }
  },
};

export const studentAssignmentService = {
  async getAssignments(params = {}) {
    try {
      const res = await api.get(STUDENT_ROUTES.ASSIGNMENTS.BASE, { params });
      return {
        items: res?.data || [],
        meta: res?.meta || {},
      };
    } catch (err) {
      console.error("studentAssignmentService.getAssignments error:", err);
      throw err;
    }
  },

  async getAssignment(assignmentId) {
    try {
      const res = await api.get(STUDENT_ROUTES.ASSIGNMENTS.DETAIL(assignmentId));
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error(`studentAssignmentService.getAssignment(${assignmentId}) error:`, err);
      throw err;
    }
  },

  async submitAssignment(assignmentId, formData) {
    try {
      const res = await api.post(STUDENT_ROUTES.ASSIGNMENTS.SUBMIT(assignmentId), formData);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error(`studentAssignmentService.submitAssignment(${assignmentId}) error:`, err);
      throw err;
    }
  },
};

export const teacherProfileService = {
  async getProfile() {
    try {
      const res = await api.get(TEACHER_ROUTES.PROFILE.BASE);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("teacherProfileService.getProfile error:", err);
      throw err;
    }
  },

  async updateProfile(payload) {
    try {
      const res = await api.patch(TEACHER_ROUTES.PROFILE.UPDATE, payload);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("teacherProfileService.updateProfile error:", err);
      throw err;
    }
  },

  async changePassword({ newPassword, confirmPassword }) {
    try {
      const res = await api.patch(TEACHER_ROUTES.PROFILE.UPDATE_PASSWORD, {
        newPassword,
        confirmPassword,
      });
      if (res?.data?.accessToken) {
        setAuthToken(res.data.accessToken);
      }
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("teacherProfileService.changePassword error:", err);
      throw err;
    }
  },

  async updateAvatar(fileOrFormData) {
    try {
      let formData = fileOrFormData;
      if (fileOrFormData instanceof File) {
        formData = new FormData();
        formData.append("avatar", fileOrFormData);
      }
      const res = await api.put(TEACHER_ROUTES.PROFILE.AVATAR, formData);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("teacherProfileService.updateAvatar error:", err);
      throw err;
    }
  },

  async removeAvatar() {
    try {
      const res = await api.delete(TEACHER_ROUTES.PROFILE.AVATAR);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("teacherProfileService.removeAvatar error:", err);
      throw err;
    }
  },
};

export const studentProfileService = {
  async getProfile() {
    try {
      const res = await api.get(STUDENT_ROUTES.PROFILE.BASE);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("studentProfileService.getProfile error:", err);
      throw err;
    }
  },

  async updateProfile(data) {
    try {
      const res = await api.patch(STUDENT_ROUTES.PROFILE.UPDATE, data);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("studentProfileService.updateProfile error:", err);
      throw err;
    }
  },

  async changePassword({ newPassword, confirmPassword }) {
    try {
      const res = await api.patch(STUDENT_ROUTES.PROFILE.UPDATE_PASSWORD, {
        newPassword,
        confirmPassword,
      });
      if (res?.data?.accessToken) {
        setAuthToken(res.data.accessToken);
      }
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("studentProfileService.changePassword error:", err);
      throw err;
    }
  },

  async updateAvatar(fileOrFormData) {
    try {
      let formData = fileOrFormData;
      if (fileOrFormData instanceof File) {
        formData = new FormData();
        formData.append("avatar", fileOrFormData);
      }
      const res = await api.put(STUDENT_ROUTES.PROFILE.AVATAR, formData);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("studentProfileService.updateAvatar error:", err);
      throw err;
    }
  },

  async removeAvatar() {
    try {
      const res = await api.delete(STUDENT_ROUTES.PROFILE.AVATAR);
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("studentProfileService.removeAvatar error:", err);
      throw err;
    }
  },
};

export const studentProgressService = {
  async getProgress(params = {}) {
    try {
      const res = await api.get(STUDENT_ROUTES.PROGRESS.BASE, { params });
      return res?.data !== undefined ? res.data : res;
    } catch (err) {
      console.error("studentProgressService.getProgress error:", err);
      throw err;
    }
  },
};

export const studentMaterialService = {
  async getMaterials(params = {}) {
    try {
      const res = await api.get(STUDENT_ROUTES.MATERIALS.BASE, { params });
      return res;
    } catch (err) {
      console.error("studentMaterialService.getMaterials error:", err);
      throw err;
    }
  },
};

export default {
  auth: authService,
  dashboard: adminDashboardService,
  students: studentService,
  teachers: teacherService,
  classes: classService,
  teacherClasses: teacherClassService,
  teacherStudents: teacherStudentService,
  teacherAssignments: teacherAssignmentService,
  teacherProfile: teacherProfileService,
  studentProfile: studentProfileService,
  studentProgress: studentProgressService,
  studentMaterials: studentMaterialService,
  teacherDashboard: teacherDashboardService,
  studentAssignments: studentAssignmentService,
  content: contentService,
  landing: contentService,
  newsletter: newsletterService,
  contactPublic: contactPublicService,
  adminContact: adminContactService,
  announcements: adminAnnouncementService,
  lowProgress: adminLowProgressService,
  notifications: notificationService,
};
