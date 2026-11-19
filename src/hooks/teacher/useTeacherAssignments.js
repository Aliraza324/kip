import { useState, useEffect, useCallback } from "react";
import { teacherAssignmentService } from "@/service/apiService";
import toast from "react-hot-toast";

/**
 * Hook to fetch assignments list for teacher with stats & filters.
 */
export function useTeacherAssignments(query = {}) {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ stats: { total: 0, submitted: 0, pending: 0, overdue: 0 } });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryKey = JSON.stringify(query);

  const fetchAssignments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await teacherAssignmentService.getAssignments(query);
      setData(res.items || []);
      setMeta(res.meta || { stats: { total: 0, submitted: 0, pending: 0, overdue: 0 } });
    } catch (err) {
      console.error("useTeacherAssignments fetch error:", err);
      setError(err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [queryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return {
    assignments: data,
    meta,
    stats: meta?.stats || { total: 0, submitted: 0, pending: 0, overdue: 0 },
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchAssignments,
  };
}

/**
 * Hook to create a new assignment for selected classes.
 */
export function useTeacherCreateAssignment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const createAssignment = useCallback(async (payload) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await teacherAssignmentService.createAssignment(payload);
      toast.success("Assignment created successfully!");
      return res;
    } catch (err) {
      console.error("useTeacherCreateAssignment error:", err);
      const msg = err.response?.data?.message || err.message || "Failed to create assignment.";
      toast.error(msg);
      setError(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    createAssignment,
    isSubmitting,
    error,
  };
}

/**
 * Hook to fetch submissions and details for an assignment.
 */
export function useTeacherAssignmentSubmissions(assignmentId) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(assignmentId));
  const [error, setError] = useState(null);

  const fetchSubmissions = useCallback(async () => {
    if (!assignmentId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await teacherAssignmentService.getAssignmentSubmissions(assignmentId);
      setData(res);
    } catch (err) {
      console.error(`useTeacherAssignmentSubmissions(${assignmentId}) error:`, err);
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [assignmentId]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return {
    assignment: data?.assignment || null,
    stats: data?.stats || { totalStudents: 0, submitted: 0, pending: 0, graded: 0 },
    items: data?.items || [],
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchSubmissions,
  };
}

/**
 * Hook to fetch single student submission for grading.
 */
export function useTeacherSubmissionDetail(submissionId) {
  const [submission, setSubmission] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(submissionId));
  const [error, setError] = useState(null);

  const fetchSubmission = useCallback(async () => {
    if (!submissionId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await teacherAssignmentService.getSubmission(submissionId);
      setSubmission(res);
    } catch (err) {
      console.error(`useTeacherSubmissionDetail(${submissionId}) error:`, err);
      setError(err);
      setSubmission(null);
    } finally {
      setIsLoading(false);
    }
  }, [submissionId]);

  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);

  return {
    submission,
    assignment: submission?.assignment || null,
    student: submission?.student || null,
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchSubmission,
  };
}

/**
 * Hook to submit grading & feedback for a submission.
 */
export function useTeacherGradeSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const gradeSubmission = useCallback(async (submissionId, payload) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await teacherAssignmentService.gradeSubmission(submissionId, payload);
      toast.success("Grade saved and student notified successfully!");
      return res;
    } catch (err) {
      console.error(`useTeacherGradeSubmission(${submissionId}) error:`, err);
      const msg = err.response?.data?.message || err.message || "Failed to save grade.";
      toast.error(msg);
      setError(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    gradeSubmission,
    isSubmitting,
    error,
  };
}

export default {
  useTeacherAssignments,
  useTeacherCreateAssignment,
  useTeacherAssignmentSubmissions,
  useTeacherSubmissionDetail,
  useTeacherGradeSubmission,
};
