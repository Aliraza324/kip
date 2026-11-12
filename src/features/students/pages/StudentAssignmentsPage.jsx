import { useState } from "react";
import { studentAssignmentsListMock } from "@/mocks";
import {
  StudentAssignmentsTable,
  StudentSubmitAssignmentForm,
  StudentAssignmentSuccessView,
  StudentAssignmentResultView,
} from "../components/assignments";

export const StudentAssignmentsPage = () => {
  const [assignments, setAssignments] = useState(studentAssignmentsListMock);
  const [activeTab, setActiveTab] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentScreen, setCurrentScreen] = useState("list"); // "list" | "submit" | "success" | "result"
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionTime, setSubmissionTime] = useState("");

  const handleView = (assignment) => {
    setSelectedAssignment(assignment);
    // If already submitted, open Result/Review view directly (Screen 4)
    if (assignment.status === "Submitted") {
      setCurrentScreen("result");
    } else {
      // Pending or Overdue opens submission form (Screen 2)
      setCurrentScreen("submit");
    }
  };

  const handleSubmitSuccess = (assignment, file) => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());

    setSubmissionTime(formattedDate);

    // Update assignment to submitted in state
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === assignment.id
          ? {
              ...item,
              status: "Submitted",
              submittedAt: formattedDate,
              isGraded: false, // Right after submit, waiting for teacher evaluation
            }
          : item
      )
    );

    setSelectedAssignment((prev) => ({
      ...prev,
      status: "Submitted",
      submittedAt: formattedDate,
      isGraded: false,
    }));

    // Transition to Screen 3 (Success)
    setCurrentScreen("success");
  };

  const handleToggleGraded = (assignmentId) => {
    setAssignments((prev) =>
      prev.map((item) => {
        if (item.id === assignmentId) {
          const nextGraded = !item.isGraded;
          return {
            ...item,
            isGraded: nextGraded,
            score: nextGraded ? "92 / 100" : null,
            grade: nextGraded ? "A" : null,
            teacherFeedback: nextGraded
              ? "Excellent work! Your solutions are correct and well-presented. Just make sure to show a bit more detail in steps for full marks."
              : "",
          };
        }
        return item;
      })
    );

    setSelectedAssignment((prev) => {
      const nextGraded = !prev.isGraded;
      return {
        ...prev,
        isGraded: nextGraded,
        score: nextGraded ? "92 / 100" : null,
        grade: nextGraded ? "A" : null,
        teacherFeedback: nextGraded
          ? "Excellent work! Your solutions are correct and well-presented. Just make sure to show a bit more detail in steps for full marks."
          : "",
      };
    });
  };

  // Filter assignments based on active tab
  const filteredAssignments = assignments.filter((item) => {
    if (activeTab === "pending") return item.status === "Pending";
    if (activeTab === "submitted") return item.status === "Submitted";
    if (activeTab === "overdue") return item.status === "Overdue";
    return true;
  });

  // Render Screen 2 (Submit Assignment Form)
  if (currentScreen === "submit" && selectedAssignment) {
    return (
      <StudentSubmitAssignmentForm
        assignment={selectedAssignment}
        onBack={() => setCurrentScreen("list")}
        onSubmitSuccess={handleSubmitSuccess}
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
        onBackToAssignments={() => setCurrentScreen("list")}
      />
    );
  }

  // Render Screen 4 (Graded or Waiting for Teacher Result)
  if (currentScreen === "result" && selectedAssignment) {
    return (
      <StudentAssignmentResultView
        assignment={selectedAssignment}
        onBack={() => setCurrentScreen("list")}
        onToggleGraded={handleToggleGraded}
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

      <StudentAssignmentsTable
        assignments={filteredAssignments}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sortOrder={sortOrder}
        onToggleSort={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
        onViewAssignment={handleView}
      />
    </div>
  );
};

export default StudentAssignmentsPage;

