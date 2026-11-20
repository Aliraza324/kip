import { useState, useMemo, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { api } from "@/service/apiClient";
import toast from "react-hot-toast";
import {
  TeacherSessionCard,
  TeacherSessionsFilterBar,
  TeacherCreateSessionModal,
  TeacherDeleteSessionModal,
} from "../components/sessions";

export const formatTeacherSession = (s) => {
  const isInstant = s.type === "instant";
  const isExpired = Boolean(
    s.isExpired ||
      (isInstant && s.expiresAt && new Date() > new Date(s.expiresAt) && !s.isLive) ||
      (isInstant && s.status === "completed")
  );
  const statusBadge = s.isLive
    ? "Live Now"
    : isExpired
    ? "Expired"
    : isInstant
    ? "Instant"
    : s.status === "completed"
    ? "Completed"
    : "Scheduled";

  const course = s.subject || s.class?.name || "General";
  const grade = s.class?.grade || s.class?.name || "Class";
  const iconType = course.toLowerCase().includes("math")
    ? "sqrt"
    : course.toLowerCase().includes("comp")
    ? "code"
    : course.toLowerCase().includes("chem") || course.toLowerCase().includes("med")
    ? "clover"
    : "book";
  const colorClass = course.toLowerCase().includes("math")
    ? "bg-purple-100 text-purple-600"
    : course.toLowerCase().includes("comp")
    ? "bg-blue-100 text-[#0080f6]"
    : course.toLowerCase().includes("med") || course.toLowerCase().includes("bio")
    ? "bg-emerald-100 text-emerald-600"
    : "bg-blue-100 text-blue-600";

  const daysText = s.days?.length ? s.days.join(", ") : isInstant ? "Instant" : "Weekly";
  const timingText =
    s.startTime && s.endTime
      ? isInstant
        ? `${s.startTime} – ${s.endTime}`
        : `${daysText} • ${s.startTime} – ${s.endTime}`
      : isInstant
      ? "Instant Session"
      : `${daysText} • 10:00 AM – 10:45 AM`;

  return {
    id: s.id || String(s._id),
    title: s.title,
    type: s.type,
    statusBadge,
    isExpired,
    isLive: Boolean(s.isLive),
    startTime: s.startTime,
    endTime: s.endTime,
    timingText,
    duration: timingText,
    scheduleDays: s.days?.length ? s.days.join(", ") : isInstant ? "Instant" : "Weekly",
    repeatRule: isInstant ? "One-time Live" : (s.days?.length ? `Weekly (${s.days.join(", ")})` : "Weekly"),
    studentsCount: s.studentsCount ?? s.studentIds?.length ?? 0,
    materialsCount: s.materialsCount ?? 0,
    scheduledCount: s.type === "scheduled" ? 1 : 0,
    course,
    grade,
    iconType,
    colorClass,
    raw: s,
  };
};

export const TeacherSessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [counts, setCounts] = useState({ all: 0, instant: 0, scheduled: 0, completed: 0 });

  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sessionToEdit, setSessionToEdit] = useState(null);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  const fetchSessions = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/teacher/sessions");
      const list = Array.isArray(res?.data) ? res.data : [];
      setSessions(list.map(formatTeacherSession));
      if (res?.meta?.counts) {
        setCounts(res.meta.counts);
      } else {
        const instant = list.filter((s) => s.type === "instant").length;
        const scheduled = list.filter((s) => s.type === "scheduled" && s.status !== "completed").length;
        const completed = list.filter((s) => s.status === "completed").length;
        setCounts({ all: list.length, instant, scheduled, completed });
      }
    } catch (err) {
      console.warn("Could not load sessions from API:", err);
      toast.error("Failed to load sessions.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const tabs = [
    { id: "all", label: "All" },
    { id: "instant", label: `Instant (${counts.instant})` },
    { id: "scheduled", label: `Scheduled (${counts.scheduled})` },
    { id: "completed", label: `Completed (${counts.completed})` },
  ];

  // Filtering logic
  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      if (activeTab === "completed") {
        if (session.raw?.status !== "completed") return false;
      } else if (activeTab !== "all" && session.type !== activeTab) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = session.title?.toLowerCase().includes(q);
        const matchesCourse = session.course?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCourse) return false;
      }
      if (selectedGrade !== "all" && session.grade !== selectedGrade) return false;
      if (selectedCourse !== "all" && session.course !== selectedCourse) return false;
      return true;
    });
  }, [sessions, activeTab, searchQuery, selectedGrade, selectedCourse]);

  const handleSaveSession = () => {
    fetchSessions();
    setSessionToEdit(null);
  };

  const handleDeleteSession = async (sessionId) => {
    try {
      await api.delete(`/teacher/sessions/${sessionId}`);
      toast.success("Session deleted successfully!");
      fetchSessions();
    } catch (err) {
      toast.error(err?.message || "Failed to delete session.");
    } finally {
      setSessionToDelete(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Header with Title and Single "+ Create Session" Button per user instruction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My session
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your classes, students, and class activities.
          </p>
        </div>

        <button
          type="button"
          onClick={() => { setSessionToEdit(null); setIsCreateModalOpen(true); }}
          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create Session</span>
        </button>
      </div>

      {/* Filter Tabs - Fits cleanly even on 320px screens */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
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
        {isLoading ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-100">
            <div className="inline-block w-8 h-8 border-3 border-blue-200 border-t-[#0080f6] rounded-full animate-spin mb-3" />
            <p className="text-sm font-semibold text-slate-500">Loading sessions...</p>
          </div>
        ) : filteredSessions.length > 0 ? (
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
            <p className="text-sm font-semibold text-slate-500">
              {sessions.length === 0
                ? "No sessions created yet. Click '+ Create Session' to create one!"
                : "No sessions match your filter criteria."}
            </p>
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
