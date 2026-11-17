import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, UserX } from "lucide-react";
import { useAdminStudentDetail } from "@/hooks/admin";
import {
  AdminStudentDetailHeader,
  AdminStudentOverviewTab,
  AdminStudentProgressTab,
  AdminStudentAssignmentsTab,
  AdminStudentAttendanceTab,
  AdminEditStudentModal,
} from "../components";

export const AdminStudentDetailPage = () => {
  const { studentId } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    student,
    summary,
    progress,
    progressFactors,
    kpi,
    recentActivity,
    assignments,
    attendance,
    report,
    isLoading,
    isError,
    refetch,
  } = useAdminStudentDetail(studentId);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#0080f6]" />
        <p className="text-sm font-semibold text-slate-500">Loading student details...</p>
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
          <UserX className="w-8 h-8 stroke-[2]" />
        </div>
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          Student Not Found
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1 mb-6">
          The requested student could not be found or has been removed.
        </p>
        <Link
          to="/admin/students"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Students</span>
        </Link>
      </div>
    );
  }

  const resolvedReport = report || {
    summary,
    progress,
    progressFactors,
    kpi,
    recentActivity,
    assignments,
    attendance,
  };

  return (
    <div className="space-y-6 max-w-[1300px] mx-auto pb-8">
      {/* Header & Tabs */}
      <AdminStudentDetailHeader
        student={student}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onEdit={() => setIsEditOpen(true)}
      />

      {/* Tab Panels */}
      {activeTab === "Overview" && (
        <AdminStudentOverviewTab student={student} report={resolvedReport} />
      )}
      {activeTab === "Progress" && (
        <AdminStudentProgressTab
          student={student}
          report={resolvedReport}
          progress={progress}
          progressFactors={progressFactors}
          kpi={kpi}
        />
      )}
      {activeTab === "Assignments" && (
        <AdminStudentAssignmentsTab
          student={student}
          assignments={assignments || []}
          report={resolvedReport}
        />
      )}
      {activeTab === "Attendance" && (
        <AdminStudentAttendanceTab
          student={student}
          attendance={attendance || {}}
          report={resolvedReport}
        />
      )}

      {/* Edit Student Modal */}
      <AdminEditStudentModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        student={student}
        onUpdated={() => {
          refetch();
          setIsEditOpen(false);
        }}
      />
    </div>
  );
};

export default AdminStudentDetailPage;
