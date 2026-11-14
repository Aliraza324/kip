import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { adminClassDetailMock } from "@/mocks";
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
  const [classData, setClassData] = useState(adminClassDetailMock);
  const [activeTab, setActiveTab] = useState("teachers"); // 'teachers' | 'students' | 'assignments'

  const [isAssignTeacherOpen, setIsAssignTeacherOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  const handleAssignTeacher = (newTeacherData) => {
    const newEntry = {
      id: `TE-${Date.now()}`,
      index: classData.teachers.length + 1,
      name: newTeacherData.teacher,
      teacherId: `TE-${Math.floor(1000 + Math.random() * 9000)}`,
      avatar: classData.teachers[0].avatar,
      subject: newTeacherData.subject,
      subjectColor: "bg-[#eaf4fe] text-[#0080f6]",
      joinedOn: "Today",
    };
    setClassData((prev) => ({
      ...prev,
      teachers: [...prev.teachers, newEntry],
      stats: {
        ...prev.stats,
        assignedTeachers: prev.stats.assignedTeachers + 1,
      },
    }));
  };

  const handleAddStudent = (newStudentData) => {
    const newEntry = {
      id: newStudentData.studentId,
      index: classData.students.length + 1,
      name: newStudentData.name,
      studentId: newStudentData.studentId,
      avatar: classData.students[0].avatar,
      gender: newStudentData.gender,
      status: "Active",
    };
    setClassData((prev) => ({
      ...prev,
      students: [...prev.students, newEntry],
      stats: {
        ...prev.stats,
        totalStudents: prev.stats.totalStudents + 1,
      },
    }));
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10 animate-in fade-in duration-150">
      {/* 1. Header with Back Button and Dynamic Title */}
      <AdminClassDetailHeader
        activeTab={activeTab}
        className={classData.name}
      />

      {/* 2. Top 5 Metrics / Stat Cards */}
      <AdminClassDetailStats
        grade={classData.stats.grade}
        status={classData.stats.status}
        totalStudents={classData.stats.totalStudents}
        assignedTeachers={classData.stats.assignedTeachers}
        pendingAssignments={classData.stats.pendingAssignments}
        completedAssignments={classData.stats.completedAssignments}
      />

      {/* 3. Three Tab Pills */}
      <AdminClassDetailTabs
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        studentsCount={classData.stats.totalStudents}
      />

      {/* 4. Active Tab Content */}
      {activeTab === "teachers" && (
        <AdminClassTeachersTab
          teachers={classData.teachers}
          onAssignTeacher={() => setIsAssignTeacherOpen(true)}
        />
      )}

      {activeTab === "students" && (
        <AdminClassStudentsTab
          students={classData.students}
          onAddStudent={() => setIsAddStudentOpen(true)}
          onImportStudents={() => toast("Import students feature ready", { icon: "📥" })}
        />
      )}

      {activeTab === "assignments" && (
        <AdminClassAssignmentsTab
          assignments={classData.assignments}
        />
      )}

      {/* Modals */}
      <AdminAssignTeacherModal
        isOpen={isAssignTeacherOpen}
        onClose={() => setIsAssignTeacherOpen(false)}
        onAssign={handleAssignTeacher}
      />

      <AdminAddClassStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onAddStudent={handleAddStudent}
      />
    </div>
  );
};

export default AdminClassDetailPage;

