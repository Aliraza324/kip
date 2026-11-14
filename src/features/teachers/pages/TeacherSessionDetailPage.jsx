import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  teacherInitialSessionsMock,
  teacherSessionStudentsMock,
  teacherSessionMaterialsMock,
  teacherSessionScheduleListMock,
} from "@/mocks";
import { LiveClassroomView } from "@/features/students/components/classroom";
import {
  TeacherSessionDetailHeader,
  TeacherSessionOverviewTab,
  TeacherSessionStudentsTab,
  TeacherSessionMaterialsTab,
  TeacherSessionScheduleTab,
  TeacherCreateSessionModal,
  TeacherAddStudentModal,
  TeacherInviteSuccessModal,
} from "../components/sessions";

export const TeacherSessionDetailPage = () => {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialSession =
    teacherInitialSessionsMock.find((s) => s.id === sessionId) ||
    teacherInitialSessionsMock[0];

  const [session, setSession] = useState(initialSession);
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState(teacherSessionStudentsMock);
  const [materials, setMaterials] = useState(teacherSessionMaterialsMock);
  const [isLiveClassOpen, setIsLiveClassOpen] = useState(
    searchParams.get("live") === "true"
  );
  const [activeLiveTitle, setActiveLiveTitle] = useState(session.title);

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [invitedStudentName, setInvitedStudentName] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "students", label: "Students" },
    { id: "materials", label: "Materials" },
    { id: "schedule", label: "Schedule" },
  ];

  const handleStartLive = (title) => {
    setActiveLiveTitle(title || session.title);
    setIsLiveClassOpen(true);
  };

  const handleSaveEditedSession = (updatedData) => {
    setSession((prev) => ({ ...prev, ...updatedData }));
  };

  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [newStudent, ...prev]);
    setSession((prev) => ({
      ...prev,
      studentsCount: (prev.studentsCount || 0) + 1,
    }));
  };

  const handleRemoveStudent = (studentId) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    setSession((prev) => ({
      ...prev,
      studentsCount: Math.max(0, (prev.studentsCount || 1) - 1),
    }));
  };

  const handleInviteSuccess = (studentName) => {
    setIsAddStudentOpen(false);
    setInvitedStudentName(studentName);
    setIsSuccessModalOpen(true);
  };

  if (isLiveClassOpen) {
    return (
      <LiveClassroomView
        title={`${activeLiveTitle} – Live Class`}
        participantsCount={session.studentsCount || 28}
        onLeaveClass={() => setIsLiveClassOpen(false)}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* 1. Header Banner Matching SS 4 & SS 5 */}
      <TeacherSessionDetailHeader
        session={session}
        onEditSchedule={() => setIsEditModalOpen(true)}
        onStartLive={handleStartLive}
      />

      {/* 2. Tabs Navigation: [ Overview, Students, Materials, Schedule ] */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === tab.id
                ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
                : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Tab Contents */}
      {activeTab === "overview" && (
        <TeacherSessionOverviewTab
          session={session}
          onStartLive={handleStartLive}
        />
      )}

      {activeTab === "students" && (
        <TeacherSessionStudentsTab
          students={students}
          onAddStudentClick={() => setIsAddStudentOpen(true)}
          onRemoveStudent={handleRemoveStudent}
        />
      )}

      {activeTab === "materials" && (
        <TeacherSessionMaterialsTab
          materials={materials}
          onUploadClick={() => setIsEditModalOpen(true)}
          onRemoveMaterial={(id) => setMaterials((m) => m.filter((x) => x.id !== id))}
        />
      )}

      {activeTab === "schedule" && (
        <TeacherSessionScheduleTab schedules={teacherSessionScheduleListMock} />
      )}

      {/* Edit Session Modal */}
      <TeacherCreateSessionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEditedSession}
        sessionToEdit={session}
      />

      {/* Add Student Modal (SS 6) */}
      <TeacherAddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onAddStudent={handleAddStudent}
        onInviteSuccess={handleInviteSuccess}
      />

      {/* Invitation Sent Success Modal (SS 7) */}
      <TeacherInviteSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        studentName={invitedStudentName}
      />
    </div>
  );
};

export default TeacherSessionDetailPage;

