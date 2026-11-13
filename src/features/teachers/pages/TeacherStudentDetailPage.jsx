import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { teacherStudentsListMock } from "@/mocks";
import {
  TeacherStudentDetailHeader,
  TeacherStudentOverviewTab,
  TeacherStudentProgressTab,
  TeacherStudentAssignmentsTab,
  TeacherStudentAttendanceTab,
} from "../components/students";

export const TeacherStudentDetailPage = () => {
  const { studentId, classId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const currentStudent = useMemo(() => {
    return (
      teacherStudentsListMock.find((s) => s.id === studentId) ||
      teacherStudentsListMock[0]
    );
  }, [studentId]);

  const backUrl = classId
    ? `/teacher/students/class/${classId}`
    : "/teacher/students";

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-14">
      {/* Header Banner & Tab Navigation */}
      <TeacherStudentDetailHeader
        student={currentStudent}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        backUrl={backUrl}
      />

      {/* Tab Panels matching SS 2-5 */}
      {activeTab === "overview" && (
        <TeacherStudentOverviewTab student={currentStudent} />
      )}

      {activeTab === "progress" && (
        <TeacherStudentProgressTab student={currentStudent} />
      )}

      {activeTab === "assignments" && (
        <TeacherStudentAssignmentsTab student={currentStudent} />
      )}

      {activeTab === "attendance" && (
        <TeacherStudentAttendanceTab student={currentStudent} />
      )}
    </div>
  );
};

export default TeacherStudentDetailPage;

