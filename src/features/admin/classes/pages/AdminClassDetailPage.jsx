import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAdminClassDetail } from "@/hooks/admin";
import { classService, studentService } from "@/service/apiService";
import {
  AdminClassDetailHeader,
  AdminClassDetailStats,
  AdminClassDetailTabs,
  AdminClassTeachersTab,
  AdminClassStudentsTab,
  AdminClassAssignmentsTab,
  AdminAssignTeacherModal,
  AdminAddClassStudentModal,
} from "../components";

export const AdminClassDetailPage = () => {
  const { classId } = useParams();
  const { classData, isLoading, isError, error, refetch } = useAdminClassDetail(classId);
  const [activeTab, setActiveTab] = useState("teachers"); // 'teachers' | 'students' | 'assignments'

  const [isAssignTeacherOpen, setIsAssignTeacherOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleAssignTeacher = async ({ teacherId, subject }) => {
    await classService.assignTeacher(classId, { teacherId, subject });
    refetch();
  };

  const handleRemoveTeacher = async (assignmentId, teacherName) => {
    const confirmed = window.confirm(`Remove ${teacherName || "this teacher"} from this class?`);
    if (!confirmed) return;
    try {
      await classService.removeTeacher(classId, assignmentId);
      toast.success("Teacher removed from class");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to remove teacher");
    }
  };

  const handleAddStudent = async (newStudentData) => {
    try {
      await studentService.create({
        ...newStudentData,
        classId,
      });
      toast.success(`Student "${newStudentData.fullName}" enrolled in class!`);
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to enroll student");
    }
  };

  const handleImportCsv = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await classService.importStudentsCsv(classId, file);
      toast.success(res?.message || "Students imported successfully!");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "CSV Import failed");
    } finally {
      if (e.target) e.target.value = "";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/70 p-16 text-center text-slate-500 font-medium">
        Loading class details...
      </div>
    );
  }

  if (isError || !classData) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/70 p-16 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Class Not Found</h3>
        <p className="text-xs text-slate-500">
          {error?.response?.data?.message || error?.message || "The requested class could not be loaded."}
        </p>
        <Link
          to="/admin/classes"
          className="inline-flex px-6 py-2 rounded-full bg-[#0080f6] text-white text-xs font-bold"
        >
          Back to Classes
        </Link>
      </div>
    );
  }

  const teachersCount = classData.teachers?.length ?? classData.stats?.assignedTeachers ?? 0;
  const studentsCount = classData.students?.length ?? classData.stats?.totalStudents ?? 0;
  const assignmentsCount = classData.assignments?.length ?? 0;

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10 animate-in fade-in duration-150">
      {/* Hidden file input for CSV Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportCsv}
        accept=".csv,text/csv"
        className="hidden"
      />

      {/* 1. Header with Back Button and Dynamic Title */}
      <AdminClassDetailHeader
        activeTab={activeTab}
        className={classData.name}
      />

      {/* 2. Top Metrics / Stat Cards */}
      <AdminClassDetailStats
        grade={classData.grade || classData.name || "—"}
        status={classData.status || "Active"}
        totalStudents={studentsCount}
        assignedTeachers={teachersCount}
        pendingAssignments={classData.stats?.pendingAssignments ?? 0}
        completedAssignments={classData.stats?.completedAssignments ?? 0}
      />

      {/* 3. Three Tab Pills with Real Counts */}
      <AdminClassDetailTabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        teachersCount={teachersCount}
        studentsCount={studentsCount}
        assignmentsCount={assignmentsCount}
      />

      {/* 4. Active Tab Content */}
      {activeTab === "teachers" && (
        <AdminClassTeachersTab
          teachers={classData.teachers || []}
          onAssignTeacher={() => setIsAssignTeacherOpen(true)}
          onRemoveTeacher={handleRemoveTeacher}
        />
      )}

      {activeTab === "students" && (
        <AdminClassStudentsTab
          students={classData.students || []}
          onAddStudent={() => setIsAddStudentOpen(true)}
          onImportStudents={() => fileInputRef.current?.click()}
          onRefresh={refetch}
        />
      )}

      {activeTab === "assignments" && (
        <AdminClassAssignmentsTab
          assignments={classData.assignments || []}
        />
      )}

      {/* Modals */}
      <AdminAssignTeacherModal
        isOpen={isAssignTeacherOpen}
        onClose={() => setIsAssignTeacherOpen(false)}
        onAssign={handleAssignTeacher}
        className={classData.name}
        classSubjects={classData.subjects || []}
      />

      <AdminAddClassStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onAddStudent={handleAddStudent}
        className={classData.name}
      />
    </div>
  );
};

export default AdminClassDetailPage;

