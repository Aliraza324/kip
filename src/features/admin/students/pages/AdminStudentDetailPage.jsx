import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  AdminStudentDetailHeader,
  AdminStudentOverviewTab,
  AdminStudentProgressTab,
  AdminStudentAssignmentsTab,
  AdminStudentAttendanceTab,
} from "../components";
import { adminStudentsMock } from "@/mocks";

export const AdminStudentDetailPage = () => {
  const { studentId } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");

  const student =
    adminStudentsMock.find((s) => s.studentId === studentId || s.id === studentId) ||
    adminStudentsMock[0];

  return (
    <div className="space-y-6 max-w-[1300px] mx-auto pb-8">
      {/* Header & Tabs */}
      <AdminStudentDetailHeader
        student={student}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Tab Panels */}
      {activeTab === "Overview" && <AdminStudentOverviewTab student={student} />}
      {activeTab === "Progress" && <AdminStudentProgressTab student={student} />}
      {activeTab === "Assignments" && <AdminStudentAssignmentsTab student={student} />}
      {activeTab === "Attendance" && <AdminStudentAttendanceTab student={student} />}
    </div>
  );
};

export default AdminStudentDetailPage;
