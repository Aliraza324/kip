import { useState, useEffect, useCallback } from "react";
import { studentAssignmentService } from "@/service/apiService";
import { getSocket } from "@/service/socket";
import toast from "react-hot-toast";

/**
 * Hook to fetch assignments list for student with tab counts.
 * Also subscribes to real-time socket updates for new assignments or grades.
 */
export function useStudentAssignments(query = {}) {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ counts: { all: 0, pending: 0, submitted: 0, overdue: 0 } });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryKey = JSON.stringify(query);

  const fetchAssignments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await studentAssignmentService.getAssignments(query);
      setData(res.items || []);
      setMeta(res.meta || { counts: { all: 0, pending: 0, submitted: 0, overdue: 0 } });
    } catch (err) {
      console.error("useStudentAssignments fetch error:", err);
      setError(err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [queryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  // Real-time socket listener: refresh list when a new assignment or grade notification arrives
  useEffect(() => {
    const socket = getSocket();
    const handleNotification = (notif) => {
      const cat = notif?.category || notif?.meta?.type || "";
      if (cat === "assignments" || cat === "assignment" || cat === "grades" || cat === "grade") {
        fetchAssignments();
      }
    };

    socket.on("notification:new", handleNotification);
    return () => {
      socket.off("notification:new", handleNotification);
    };
  }, [fetchAssignments]);

  return {
    assignments: data,
    meta,
    counts: meta?.counts || { all: 0, pending: 0, submitted: 0, overdue: 0 },
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchAssignments,
  };
}

/**
 * Hook to fetch a single assignment detail (instructions, attachments, submission).
 */
export function useStudentAssignmentDetail(assignmentId) {
  const [assignment, setAssignment] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(assignmentId));
  const [error, setError] = useState(null);

  const fetchDetail = useCallback(async () => {
    if (!assignmentId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await studentAssignmentService.getAssignment(assignmentId);
      setAssignment(res);
    } catch (err) {
      console.error(`useStudentAssignmentDetail(${assignmentId}) error:`, err);
      setError(err);
      setAssignment(null);
    } finally {
      setIsLoading(false);
    }
  }, [assignmentId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    assignment,
    isLoading,
    isError: Boolean(error),
    error,
    refetch: fetchDetail,
  };
}

/**
 * Hook to submit a student assignment with file upload.
 */
export function useStudentSubmitAssignment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submitAssignment = useCallback(async (assignmentId, fileOrFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      let formData = fileOrFormData;
      if (fileOrFormData instanceof File) {
        formData = new FormData();
        formData.append("file", fileOrFormData);
      }
      const res = await studentAssignmentService.submitAssignment(assignmentId, formData);
      toast.success("Assignment submitted successfully!");
      return res;
    } catch (err) {
      console.error(`useStudentSubmitAssignment(${assignmentId}) error:`, err);
      const msg = err.response?.data?.message || err.message || "Failed to submit assignment.";
      toast.error(msg);
      setError(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    submitAssignment,
    isSubmitting,
    error,
  };
}
