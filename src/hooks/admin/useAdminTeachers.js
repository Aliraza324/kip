import { useState, useEffect, useCallback } from "react";
import { teacherService } from "@/service/apiService";
import { liveStore } from "@/service/dataStore";
import { useMutation } from "../useMutation";

/**
 * Hook to fetch and manage admin teachers list with tabs, search & filters
 */
export function useAdminTeachers(filters = {}) {
  const { tab = "all", search = "", subject = "", page = 1, limit = 15 } = filters;

  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [counts, setCounts] = useState({ all: 0, pending: 0, active: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeachers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = { tab, page, limit };
      if (search && search.trim()) params.search = search.trim();
      if (subject && subject.trim()) params.subject = subject.trim();

      const res = await teacherService.getAll(params);
      const items = res?.data || [];
      setData(items);

      if (res?.meta) {
        setMeta(res.meta);
        if (res.meta.counts) {
          setCounts(res.meta.counts);
        }
      } else {
        // Compute counts from items if meta not provided
        const all = items.length;
        const pending = items.filter(
          (t) => t.status === "pending" || t.status === "Pending Approval"
        ).length;
        const active = items.filter(
          (t) => t.status === "active" || t.status === "Active"
        ).length;
        setCounts({ all, pending, active });
      }
    } catch (err) {
      setError(err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [tab, search, subject, page, limit]);

  useEffect(() => {
    fetchTeachers();

    // Subscribe to live mutations only (add, update, remove), ignore set or query events
    const unsubscribe = liveStore.subscribe("teachers", (storeData, detail) => {
      if (detail?.action && detail.action !== "set") {
        fetchTeachers();
      }
    });

    return unsubscribe;
  }, [fetchTeachers]);

  return {
    teachers: data,
    meta,
    counts,
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchTeachers,
  };
}

/**
 * Hook to fetch a single teacher's detail by ID
 */
export function useAdminTeacherDetail(teacherId) {
  const [teacher, setTeacher] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(teacherId));
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!teacherId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await teacherService.getById(teacherId);
      setTeacher(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [teacherId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    teacher,
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchDetail,
  };
}

/**
 * Mutation hook to create a teacher
 */
export function useAdminCreateTeacher(options = {}) {
  return useMutation(
    (teacherData) => teacherService.create(teacherData),
    options
  );
}

/**
 * Mutation hook to update a teacher
 */
export function useAdminUpdateTeacher(options = {}) {
  return useMutation(
    ({ teacherId, updates }) => teacherService.update(teacherId, updates),
    options
  );
}

/**
 * Mutation hook to delete a teacher
 */
export function useAdminDeleteTeacher(options = {}) {
  return useMutation(
    (teacherId) => teacherService.delete(teacherId),
    options
  );
}

/**
 * Mutation hook to approve or reject a teacher registration
 */
export function useAdminReviewTeacher(options = {}) {
  return useMutation(
    ({ teacherId, action, subjects, classes }) => {
      if (action === "approve") {
        return teacherService.approve(teacherId, { subjects, classes });
      }
      return teacherService.reject(teacherId);
    },
    options
  );
}

export default useAdminTeachers;
