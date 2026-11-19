import { useState, useEffect, useCallback } from "react";
import { teacherClassService } from "@/service/apiService";
import { liveStore } from "@/service/dataStore";

// Color palettes for classes & subjects for visual consistency with design
const COLOR_PALETTES = [
  { colorClass: "bg-purple-50 text-purple-600", symbol: "√x", iconType: "sqrt" },
  { colorClass: "bg-cyan-50 text-cyan-600", symbol: "⚗", iconType: "flask" },
  { colorClass: "bg-emerald-50 text-emerald-600", symbol: "Δ", iconType: "book" },
  { colorClass: "bg-amber-50 text-amber-600", symbol: "π", iconType: "code" },
  { colorClass: "bg-blue-50 text-blue-600", symbol: "∑", iconType: "book" },
  { colorClass: "bg-rose-50 text-rose-600", symbol: "∞", iconType: "book" },
];

export const formatClassItem = (cls, index = 0) => {
  const palette = COLOR_PALETTES[index % COLOR_PALETTES.length];
  return {
    ...cls,
    colorClass: cls.colorClass || palette.colorClass,
    symbol: cls.symbol || palette.symbol,
    iconType: cls.iconType || palette.iconType,
    subjectsCount: cls.subjectsCount ?? (cls.subjects?.length || 0),
    studentsCount: cls.studentsCount ?? 0,
  };
};

/**
 * Hook to fetch all classes assigned to the logged-in teacher
 */
export function useTeacherClasses() {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClasses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await teacherClassService.getClasses();
      const list = Array.isArray(data) ? data : data?.data || [];
      const formatted = list.map((item, idx) => formatClassItem(item, idx));
      setClasses(formatted);
    } catch (err) {
      console.error("useTeacherClasses error:", err);
      setError(err);
      setClasses([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchClasses,
  };
}

/**
 * Hook to fetch single class details for the teacher
 */
export function useTeacherClassDetail(classId) {
  const [classData, setClassData] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(classId));
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!classId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await teacherClassService.getClassDetail(classId);
      const raw = data?.data !== undefined ? data.data : data;
      if (raw) {
        const formatted = formatClassItem(raw, 0);
        // Format subjects with badges/palette
        if (Array.isArray(formatted.subjects)) {
          formatted.subjects = formatted.subjects.map((sbj, idx) => {
            const p = COLOR_PALETTES[idx % COLOR_PALETTES.length];
            return {
              id: sbj.id || sbj.name || `sbj-${idx}`,
              ...sbj,
              colorClass: sbj.colorClass || p.colorClass,
              symbol: sbj.symbol || p.symbol,
            };
          });
        }
        setClassData(formatted);
      } else {
        setClassData(null);
      }
    } catch (err) {
      console.error(`useTeacherClassDetail(${classId}) error:`, err);
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
 * Hook to fetch students of a class with search, status, course/subject filter, and pagination
 */
export function useTeacherClassStudents(classId, filters = {}) {
  const { search = "", status = "", subject = "", page = 1, limit = 10 } = filters;

  const [students, setStudents] = useState([]);
  const [meta, setMeta] = useState(null);
  const [classInfo, setClassInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(classId));
  const [error, setError] = useState(null);

  const fetchStudents = useCallback(async () => {
    if (!classId) return;
    setIsLoading(true);
    setError(null);
    try {
      const params = { page, limit };
      if (search && search.trim()) params.search = search.trim();
      if (status && status !== "all" && status !== "All Status") params.status = status.toLowerCase();
      if (subject && subject !== "all" && subject !== "Course: All") params.subject = subject;

      const res = await teacherClassService.getClassStudents(classId, params);
      const items = res?.data || [];
      setStudents(items);
      setMeta(res?.meta || null);
      if (res?.meta?.class) {
        setClassInfo(res.meta.class);
      }
    } catch (err) {
      console.error(`useTeacherClassStudents(${classId}) error:`, err);
      setError(err);
      setStudents([]);
    } finally {
      setIsLoading(false);
    }
  }, [classId, search, status, subject, page, limit]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students,
    meta,
    classInfo,
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchStudents,
  };
}

export default {
  useTeacherClasses,
  useTeacherClassDetail,
  useTeacherClassStudents,
};
