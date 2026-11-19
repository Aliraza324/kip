import { useState, useEffect, useCallback } from "react";
import { teacherStudentService } from "@/service/apiService";

/**
 * Hook to fetch single student details with report (overview, progress, assignments, attendance)
 * for the teacher portal.
 */
export function useTeacherStudentDetail(studentId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(studentId));
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!studentId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await teacherStudentService.getStudent(studentId);
      const studentData = res?.data !== undefined ? res.data : res;
      setData(studentData);
    } catch (err) {
      console.error(`useTeacherStudentDetail(${studentId}) error:`, err);
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    studentData: data,
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchDetail,
  };
}

export default {
  useTeacherStudentDetail,
};
