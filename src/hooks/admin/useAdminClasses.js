import { useState, useEffect, useCallback } from "react";
import { classService } from "@/service/apiService";
import { liveStore } from "@/service/dataStore";
import { useMutation } from "../useMutation";

/**
 * Hook to fetch and manage admin classes list with search & filters
 */
export function useAdminClasses(filters = {}) {
  const { search = "", grade = "", status = "", teacherId = "", page = 1, limit = 10 } = filters;

  const [classes, setClasses] = useState([]);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClasses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = { page, limit };
      if (search && search.trim()) params.search = search.trim();
      if (grade && grade !== "All Grades") params.grade = grade;
      if (status && status !== "All Status") params.status = status.toLowerCase();
      if (teacherId && teacherId !== "All Teachers") params.teacherId = teacherId;

      const res = await classService.getAll(params);
      const items = res?.data || [];
      setClasses(items);
      if (res?.meta) {
        setMeta(res.meta);
      }
    } catch (err) {
      setError(err);
      setClasses([]);
    } finally {
      setIsLoading(false);
    }
  }, [search, grade, status, teacherId, page, limit]);

  useEffect(() => {
    fetchClasses();

    const unsubscribe = liveStore.subscribe("classes", (storeData, detail) => {
      if (detail?.action && detail.action !== "set") {
        fetchClasses();
      }
    });

    return unsubscribe;
  }, [fetchClasses]);

  return {
    classes,
    meta,
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchClasses,
  };
}

/**
 * Hook to fetch single class details with stats, teachers, students, assignments
 */
export function useAdminClassDetail(classId) {
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(classId));
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!classId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await classService.getById(classId);
      setClassData(data);
    } catch (err) {
      setError(err);
      setClassData(null);
    } finally {
      setIsLoading(false);
    }
  }, [classId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    classData,
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchDetail,
  };
}

/**
 * Mutation hooks for Classes
 */
export function useAdminCreateClass(options = {}) {
  return useMutation((classData) => classService.create(classData), options);
}

export function useAdminUpdateClass(options = {}) {
  return useMutation(
    ({ classId, updates }) => classService.update(classId, updates),
    options
  );
}

export function useAdminDeleteClass(options = {}) {
  return useMutation((classId) => classService.delete(classId), options);
}

export default useAdminClasses;