import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "@/service/apiClient";
import toast from "react-hot-toast";
import { formatTeacherSession } from "./TeacherSessionsPage";
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

  const [session, setSession] = useState({
    id: sessionId,
    title: "Loading Session...",
    type: "scheduled",
    statusBadge: "Scheduled",
    duration: "10:00 AM – 10:45 AM",
    scheduleDays: "Weekly",
    repeatRule: "Weekly",
    studentsCount: 0,
    materialsCount: 0,
    scheduledCount: 1,
    course: "Class",
    grade: "Grade",
    iconType: "book",
    colorClass: "bg-blue-100 text-[#0080f6]",
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    { id: "students", label: `Students (${students.length})` },
    { id: "materials", label: `Materials (${materials.length})` },
    { id: "schedule", label: "Schedule" },
  ];

  const fetchSessionData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get(`/teacher/sessions/${sessionId}`);
      const data = res?.data;
      if (data) {
        const formatted = formatTeacherSession(data);
        setSession(formatted);
        setActiveLiveTitle(data.title);
        if (Array.isArray(data.students)) setStudents(data.students);
        if (Array.isArray(data.materials)) setMaterials(data.materials);
        if (Array.isArray(data.schedule)) setSchedules(data.schedule);
      }
    } catch (err) {
      console.warn("Could not fetch session detail:", err);
      toast.error("Failed to load session details.");
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchSessionData();
  }, [fetchSessionData]);

  const handleStartLive = async (title) => {
    try {
      await api.post(`/teacher/sessions/${sessionId}/start`, { title: title || session.title });
    } catch (err) {
      console.warn("Start live session:", err);
    }
    navigate(`/meeting/${sessionId}`);
  };

  const handleSaveEditedSession = () => {
    fetchSessionData();
  };

  const handleAddStudent = async (newStudent) => {
    try {
      await api.post(`/teacher/sessions/${sessionId}/students`, {
        roll: newStudent.rollNumber || newStudent.code,
        email: newStudent.email,
        name: newStudent.name || newStudent.fullName,
      });
      fetchSessionData();
      toast.success("Student added to session!");
    } catch (err) {
      toast.error(err?.message || "Failed to add student.");
    }
  };

  const handleRemoveStudent = async (studentId) => {
    try {
      await api.delete(`/teacher/sessions/${sessionId}/students/${studentId}`);
      setStudents((prev) => prev.filter((s) => s.id !== studentId && s._id !== studentId));
      setSession((prev) => ({
        ...prev,
        studentsCount: Math.max(0, (prev.studentsCount || 1) - 1),
      }));
      toast.success("Student removed from session.");
    } catch (err) {
      toast.error(err?.message || "Failed to remove student.");
    }
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
        participantsCount={session.studentsCount || 1}
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
        <TeacherSessionScheduleTab schedules={schedules} />
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
