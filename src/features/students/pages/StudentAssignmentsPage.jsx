import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useStudentAssignments, useStudentSubmitAssignment } from "@/hooks";
import { studentAssignmentService } from "@/service/apiService";
import {
  StudentAssignmentsTable,
  StudentSubmitAssignmentForm,
  StudentAssignmentSuccessView,
  StudentAssignmentResultView,
} from "../components/assignments";

export const StudentAssignmentsPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentScreen, setCurrentScreen] = useState("list"); // "list" | "submit" | "success" | "result"
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionTime, setSubmissionTime] = useState("");
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  // Fetch real-time assignments from backend with active tab filter
  const {
    assignments,
    counts,
    isLoading,
    refetch,
  } = useStudentAssignments({
    status: activeTab === "all" ? undefined : activeTab,
  });

  const { submitAssignment, isSubmitting } = useStudentSubmitAssignment();

  // Auto-open target assignment if navigated with assignmentId in state
  useEffect(() => {
    const targetId = location.state?.assignmentId;
    if (targetId && assignments.length > 0 && currentScreen === "list") {
      const match = assignments.find((a) => a.id === targetId);
      if (match) {
        handleView(match);
      }
    }
  }, [location.state, assignments]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sort assignments based on dueAt
  const sortedAssignments = useMemo(() => {
    return [...assignments].sort((a, b) => {
      const timeA = a.dueAt ? new Date(a.dueAt).getTime() : 0;
      const timeB = b.dueAt ? new Date(b.dueAt).getTime() : 0;
      return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
    });
  }, [assignments, sortOrder]);

  const handleView = async (item) => {
    try {
      setIsLoadingDetail(true);
      // Fetch full assignment detail (including description, attachments, submission)
      const detail = await studentAssignmentService.getAssignment(item.id);
      const assignmentData = detail || item;
      setSelectedAssignment(assignmentData);

      const statusLower = String(assignmentData.status || "").toLowerCase();
      if (statusLower === "submitted" || assignmentData.submission) {
        setCurrentScreen("result");
      } else {
        setCurrentScreen("submit");
      }
    } catch (err) {
      console.warn("Failed to fetch assignment detail, using list item:", err);
      setSelectedAssignment(item);
      const statusLower = String(item.status || "").toLowerCase();
      if (statusLower === "submitted" || item.submission) {
        setCurrentScreen("result");
      } else {
        setCurrentScreen("submit");
      }
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const handleSubmitSuccess = async (assignment, file) => {
    const updated = await submitAssignment(assignment.id, file);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());

    setSubmissionTime(formattedDate);
    setSelectedAssignment(updated || {
      ...assignment,
      status: "submitted",
      submittedAt: formattedDate,
      isGraded: false,
    });

    // Refresh list and counts in background
    refetch();

    // Transition to Success View (Screen 3)
    setCurrentScreen("success");
  };

  // Render Screen 2 (Submit Assignment Form)
  if (currentScreen === "submit" && selectedAssignment) {
    return (
      <StudentSubmitAssignmentForm
        assignment={selectedAssignment}
        onBack={() => setCurrentScreen("list")}
        onSubmitSuccess={handleSubmitSuccess}
        isSubmitting={isSubmitting}
      />
    );
  }

  // Render Screen 3 (Assignment Submitted Success)
  if (currentScreen === "success" && selectedAssignment) {
    return (
      <StudentAssignmentSuccessView
        assignment={selectedAssignment}
        submittedAt={submissionTime}
        onViewSubmission={() => setCurrentScreen("result")}
        onBackToAssignments={() => {
          setSelectedAssignment(null);
          setCurrentScreen("list");
        }}
      />
    );
  }

  // Render Screen 4 (Graded or Waiting for Teacher Result)
  if (currentScreen === "result" && selectedAssignment) {
    return (
      <StudentAssignmentResultView
        assignment={selectedAssignment}
        onBack={() => {
          setSelectedAssignment(null);
          setCurrentScreen("list");
        }}
        onReSubmit={() => setCurrentScreen("submit")}
      />
    );
  }

  // Render Screen 1 (Assignments List & Filter Table)
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Assignments
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          View your assigned work and submission deadlines.
        </p>
      </div>

      {isLoading || isLoadingDetail ? (
        <div className="bg-white rounded-3xl p-16 flex flex-col items-center justify-center border border-slate-100 shadow-2xs">
          <Loader2 className="w-8 h-8 text-[#0080f6] animate-spin mb-3" />
          <p className="text-sm font-semibold text-slate-600">Loading assignments...</p>
        </div>
      ) : (
        <StudentAssignmentsTable
          assignments={sortedAssignments}
          counts={counts}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sortOrder={sortOrder}
          onToggleSort={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
          onViewAssignment={handleView}
        />
      )}
    </div>
  );
};

export default StudentAssignmentsPage;
