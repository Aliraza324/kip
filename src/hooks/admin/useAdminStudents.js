import { useState, useEffect, useCallback } from "react";
import { studentService } from "@/service/apiService";
import { liveStore } from "@/service/dataStore";
import { useMutation } from "../useMutation";

/**
 * Hook to fetch and manage admin students list with filters, search & pagination
 */
export function useAdminStudents(filters = {}) {
  const { classId = "", search = "", status = "", page = 1, limit = 15 } = filters;

  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = { page, limit };
      if (classId && classId !== "all" && classId !== "All Classes") params.classId = classId;
      if (status && status !== "all" && status !== "All Status") {
        params.status = status.toLowerCase();
      }
      if (search && search.trim()) params.search = search.trim();

      const res = await studentService.getAll(params);
      const items = res?.data || (Array.isArray(res) ? res : []);
      setData(items);

      if (res?.meta) {
        setMeta(res.meta);
      }
    } catch (err) {
      setError(err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [classId, search, status, page, limit]);

  useEffect(() => {
    fetchStudents();

    const unsubscribe = liveStore.subscribe("students", (storeData, detail) => {
      if (detail?.action && detail.action !== "set") {
        fetchStudents();
      }
    });

    return unsubscribe;
  }, [fetchStudents]);

  return {
    students: data,
    meta,
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchStudents,
  };
}

/**
 * Hook to fetch a single student's complete details by ID
 */
export function useAdminStudentDetail(studentId) {
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(studentId));
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!studentId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await studentService.getById(studentId);
      setStudentData(res?.data || res);
    } catch (err) {
      setError(err);
      setStudentData(null);
    } finally {
      setIsLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    data: studentData,
    student: studentData?.student || studentData,
    kpi: studentData?.kpi,
    progressFactors: studentData?.progressFactors,
    recentActivity: studentData?.recentActivity,
    summary: studentData?.summary,
    progress: studentData?.progress,
    assignments: studentData?.assignments || [],
    attendance: studentData?.attendance || {},
    report: studentData,
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchDetail,
  };
}

/**
 * Mutation hook to create a student
 */
export function useAdminCreateStudent(options = {}) {
  return useMutation(
    (studentData) => studentService.create(studentData),
    options
  );
}

/**
 * Mutation hook to update a student
 */
export function useAdminUpdateStudent(options = {}) {
  return useMutation(
    ({ id, updates }) => studentService.update(id, updates),
    options
  );
}

/**
 * Mutation hook to delete a student
 */
export function useAdminDeleteStudent(options = {}) {
  return useMutation(
    (id) => studentService.delete(id),
    options
  );
}
