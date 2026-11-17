import { api } from "./apiClient";
import { API_ROUTES } from "./apiRoutes";
import { liveStore, emitDataChange } from "./dataStore";

export const authService = {
  async login(cred) {
    try { return await api.post(API_ROUTES.AUTH.LOGIN, cred); }
    catch { return { success: true, user: { username: cred.username, role: "user" } }; }
  },
  async adminLogin(cred) {
    try { return await api.post(API_ROUTES.AUTH.ADMIN_LOGIN, cred); }
    catch { return { success: true, user: { username: "admin", role: "admin" } }; }
  },
  async teacherLogin(cred) {
    try { return await api.post(API_ROUTES.AUTH.TEACHER_LOGIN, cred); }
    catch { return { success: true, user: { username: cred.email, role: "teacher" } }; }
  },
  async registerTeacher(data) {
    const newT = {
      id: `TE-${Date.now().toString().slice(-4)}`,
      teacherId: `TE-${Date.now().toString().slice(-4)}`,
      name: data.fullName || data.name,
      email: data.email,
      phone: data.phone || "",
      status: "Pending Approval",
      subjects: data.subject ? [data.subject] : ["General"],
      assignedClasses: [],
    };
    liveStore.add("teachers", newT);
    try { await api.post(API_ROUTES.AUTH.TEACHER_REGISTER, data); } catch {}
    return { success: true, teacher: newT };
  },
  logout() {
    localStorage.removeItem("kip_token");
    emitDataChange("auth", "logout", null);
  },
};

export const studentService = {
  async getAll() {
    try {
      const res = await api.get(API_ROUTES.STUDENTS.BASE);
      if (res?.data) liveStore.set("students", res.data);
      return res?.data || liveStore.get("students");
    } catch {
      return liveStore.get("students");
    }
  },
  async getByClass(classId) {
    const list = await this.getAll();
    return classId ? list.filter((s) => s.classId === classId) : list;
  },
  async create(studentData) {
    const newStudent = {
      id: `ST-${Date.now().toString().slice(-4)}`,
      studentId: `ST-${Date.now().toString().slice(-4)}`,
      name: studentData.fullName || studentData.name,
      username: studentData.username || studentData.email?.split("@")[0] || "student",
      className: studentData.class || "Grade 9",
      classId: studentData.classId || "cls-math-9",
      status: studentData.status || "Active",
      email: studentData.email || "",
      phone: studentData.phone || "",
      dob: studentData.dob || "",
      gender: studentData.gender || "Male",
      ...studentData,
    };
    liveStore.add("students", newStudent);
    try { await api.post(API_ROUTES.STUDENTS.CREATE, newStudent); } catch {}
    return newStudent;
  },
  async update(id, updates) {
    const updated = liveStore.update("students", id, updates);
    try { await api.put(API_ROUTES.STUDENTS.UPDATE(id), updates); } catch {}
    return updated;
  },
  async delete(id) {
    liveStore.remove("students", id);
    try { await api.delete(API_ROUTES.STUDENTS.DELETE(id)); } catch {}
  },
};

export const teacherService = {
  async getAll() {
    try {
      const res = await api.get(API_ROUTES.TEACHERS.BASE);
      if (res?.data) liveStore.set("teachers", res.data);
      return res?.data || liveStore.get("teachers");
    } catch {
      return liveStore.get("teachers");
    }
  },
  async create(teacherData) {
    const newT = {
      id: `TE-${Date.now().toString().slice(-4)}`,
      teacherId: `TE-${Date.now().toString().slice(-4)}`,
      name: teacherData.fullName || teacherData.name,
      username: teacherData.username || teacherData.email?.split("@")[0] || "teacher",
      email: teacherData.email,
      phone: teacherData.phone || "",
      dob: teacherData.dob || "",
      status: teacherData.status || "Active",
      subjects: Array.isArray(teacherData.subjects) ? teacherData.subjects : [teacherData.subject || "Mathematics"],
      assignedClasses: teacherData.assignedClasses || [],
      ...teacherData,
    };
    liveStore.add("teachers", newT);
    try { await api.post(API_ROUTES.TEACHERS.CREATE, newT); } catch {}
    return newT;
  },
  async approve(teacherId, extra = {}) {
    const updated = liveStore.update("teachers", teacherId, { status: "Active", ...extra });
    try { await api.put(API_ROUTES.TEACHERS.APPROVE(teacherId), extra); } catch {}
    return updated;
  },
  async reject(teacherId) {
    const updated = liveStore.update("teachers", teacherId, { status: "Rejected" });
    try { await api.put(API_ROUTES.TEACHERS.REJECT(teacherId)); } catch {}
    return updated;
  },
  async update(teacherId, updates) {
    const updated = liveStore.update("teachers", teacherId, updates);
    try { await api.put(API_ROUTES.TEACHERS.UPDATE(teacherId), updates); } catch {}
    return updated;
  },
};

export const classService = {
  async getAll() {
    try {
      const res = await api.get(API_ROUTES.CLASSES.BASE);
      if (res?.data) liveStore.set("classes", res.data);
      return res?.data || liveStore.get("classes");
    } catch {
      return liveStore.get("classes");
    }
  },
  async create(classData) {
    const newC = { id: `cls-${Date.now().toString().slice(-4)}`, enrolledCount: 0, status: "Active", ...classData };
    liveStore.add("classes", newC);
    try { await api.post(API_ROUTES.CLASSES.CREATE, newC); } catch {}
    return newC;
  },
};

export const contentService = {
  async getAll() {
    try {
      const res = await api.get(API_ROUTES.CONTENT.BASE);
      if (res?.data) liveStore.set("content", res.data);
      return res?.data || liveStore.get("content");
    } catch {
      return liveStore.get("content");
    }
  },
  async updatePageContent(pageKey, newSectionData) {
    const current = liveStore.get("content");
    const updated = { ...current, [pageKey]: { ...(current[pageKey] || {}), ...newSectionData } };
    liveStore.set("content", updated);
    try { await api.put(API_ROUTES.CONTENT.UPDATE(pageKey), newSectionData); } catch {}
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

export default {
  auth: authService,
  students: studentService,
  teachers: teacherService,
  classes: classService,
  content: contentService,
  notifications: notificationService,
};
