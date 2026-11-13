import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { teacherInitialSessionsMock } from "@/mocks";
import {
  TeacherSessionCard,
  TeacherSessionsFilterBar,
  TeacherCreateSessionModal,
  TeacherDeleteSessionModal,
} from "../components/sessions";

export const TeacherSessionsPage = () => {
  const [sessions, setSessions] = useState(teacherInitialSessionsMock);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState(null);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  // Tab counts
  const instantCount = useMemo(() => sessions.filter((s) => s.type === "instant").length, [sessions]);
  const scheduledCount = useMemo(() => sessions.filter((s) => s.type === "scheduled").length, [sessions]);
  const completedCount = useMemo(() => sessions.filter((s) => s.type === "completed").length, [sessions]);

  const tabs = [
    { id: "all", label: "All" },
    { id: "instant", label: `Instant (${instantCount})` },
    { id: "scheduled", label: `Scheduled (${scheduledCount})` },
    { id: "completed", label: `Completed (${completedCount})` },
  ];

  // Filtering logic
  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      if (activeTab !== "all" && session.type !== activeTab) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = session.title.toLowerCase().includes(q);
        const matchesCourse = session.course.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCourse) return false;
      }
      if (selectedGrade !== "all" && session.grade !== selectedGrade) return false;
      if (selectedCourse !== "all" && session.course !== selectedCourse) return false;
      return true;
    });
  }, [sessions, activeTab, searchQuery, selectedGrade, selectedCourse]);

  const handleSaveSession = (newOrUpdatedSession) => {
    setSessions((prev) => {
      const idx = prev.findIndex((s) => s.id === newOrUpdatedSession.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...newOrUpdatedSession };
        return next;
      }
      return [newOrUpdatedSession, ...prev];
    });
    setSessionToEdit(null);
  };

  const handleDeleteSession = (sessionId) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    setSessionToDelete(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Header with Title and Single "+ Create Session" Button per user instruction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My session
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your classes, students, and class activities.
          </p>
        </div>

        <button
          type="button"
          onClick={() => { setSessionToEdit(null); setIsCreateModalOpen(true); }}
          className="px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create Session</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
                : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search and Filters Bar */}
      <TeacherSessionsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedGrade={selectedGrade}
        onGradeChange={setSelectedGrade}
        selectedCourse={selectedCourse}
        onCourseChange={setSelectedCourse}
      />

      {/* Sessions List */}
      <div className="space-y-3.5">
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <TeacherSessionCard
              key={session.id}
              session={session}
              onEdit={(s) => { setSessionToEdit(s); setIsCreateModalOpen(true); }}
              onDelete={(s) => setSessionToDelete(s)}
            />
          ))
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-100">
            <p className="text-sm font-semibold text-slate-500">No sessions match your filter criteria.</p>
          </div>
        )}
      </div>

      {/* Create / Edit Session Modal */}
      <TeacherCreateSessionModal
        isOpen={isCreateModalOpen}
        onClose={() => { setIsCreateModalOpen(false); setSessionToEdit(null); }}
        onSave={handleSaveSession}
        sessionToEdit={sessionToEdit}
      />

      {/* Delete Session Modal */}
      <TeacherDeleteSessionModal
        isOpen={!!sessionToDelete}
        onClose={() => setSessionToDelete(null)}
        onConfirm={handleDeleteSession}
        session={sessionToDelete}
      />
    </div>
  );
};

export default TeacherSessionsPage;

