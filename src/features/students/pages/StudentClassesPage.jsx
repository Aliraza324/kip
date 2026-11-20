import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, User, Layers, ChevronDown } from "lucide-react";
import { api } from "@/service/apiClient";
import toast from "react-hot-toast";
import { StudentClassCard } from "../components/classes/StudentClassCard";
import { StudentClassDetailView } from "../components/classes/StudentClassDetailView";
import { LiveClassroomView } from "../components/classroom/LiveClassroomView";

const formatStudentClass = (c) => {
  const isInstant = c.type === "instant";
  const isLive = Boolean(c.isLive);
  const isExpired = Boolean(
    c.isExpired ||
      (isInstant && c.expiresAt && new Date() > new Date(c.expiresAt) && !isLive) ||
      (isInstant && c.status === "completed")
  );
  const statusText = isLive
    ? "Live Now"
    : isExpired
    ? "Expired"
    : c.status === "completed"
    ? "Completed"
    : "In Progress";
  const teacherName = c.teacher?.fullName || "Assigned Teacher";
  const courseSubject = c.subject || c.title || "General";

  const symbol = (courseSubject || "CL").slice(0, 2).toUpperCase();
  const symbolColor = courseSubject.toLowerCase().includes("math")
    ? "bg-purple-100 text-purple-600"
    : courseSubject.toLowerCase().includes("comp")
    ? "bg-blue-100 text-[#0080f6]"
    : courseSubject.toLowerCase().includes("med") || courseSubject.toLowerCase().includes("bio")
    ? "bg-emerald-100 text-emerald-600"
    : "bg-blue-100 text-[#0080f6]";

  const statusBadge = isLive
    ? "bg-rose-50 text-rose-600 border border-rose-200 animate-pulse"
    : isExpired || c.status === "completed"
    ? "bg-slate-100 text-slate-600 border border-slate-200"
    : "bg-blue-50 text-[#0080f6] border border-blue-200/60";

  const daysText = c.days?.length ? c.days.join(", ") : isInstant ? "Today" : "Weekly";
  const scheduleTime =
    c.startTime && c.endTime
      ? isInstant
        ? `${c.startTime} – ${c.endTime}`
        : `${daysText} • ${c.startTime} – ${c.endTime}`
      : isInstant
      ? "Instant Session"
      : `${daysText} • 10:00 AM – 10:45 AM`;

  return {
    id: c.id || String(c._id),
    fullName: c.title ? `${c.title} – ${courseSubject}` : `${c.class?.name || "Class"} – ${courseSubject}`,
    subject: courseSubject,
    teacher: teacherName,
    type: isInstant ? "Instant Live" : "Scheduled",
    typeBadge: isInstant ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-[#0080f6]",
    symbol,
    symbolColor,
    materialsCount: c.materialsCount ?? 0,
    scheduledCount: c.type === "scheduled" ? 1 : 0,
    status: statusText,
    statusBadge,
    isExpired,
    isLive,
    days: c.days?.length ? c.days.join(", ") : isInstant ? "Today" : "Mon – Fri",
    scheduleTime,
    nextClassDate: c.nextOccurrence || "Upcoming",
    nextClassTopic: c.title,
    isClassTimeActive: isLive || isInstant || c.status === "active",
    raw: c,
  };
};

export const StudentClassesPage = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isLiveClassOpen, setIsLiveClassOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("all");

  const fetchStudentClasses = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/student/classes");
      const list = Array.isArray(res?.data) ? res.data : [];
      setClasses(list.map(formatStudentClass));
    } catch (err) {
      console.warn("Could not load student classes:", err);
      toast.error("Failed to load classes.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudentClasses();
  }, [fetchStudentClasses]);

  const handleEnterClass = async (classItem) => {
    try {
      const res = await api.post(`/student/classes/${classItem.id}/join`);
      const targetRoom = res?.data?.roomId || res?.data?.sessionId || classItem.id;
      navigate(`/meeting/${targetRoom}`);
    } catch {
      navigate(`/meeting/${classItem.id}`);
    }
  };

  if (isLiveClassOpen) {
    return <LiveClassroomView onLeaveClass={() => setIsLiveClassOpen(false)} />;
  }

  if (selectedClass) {
    return (
      <StudentClassDetailView
        classData={selectedClass}
        onBack={() => setSelectedClass(null)}
        onJoinLiveClass={async () => {
          try {
            const classId = selectedClass.id;
            const res = await api.post(`/student/classes/${classId}/join`);
            const roomId = res?.data?.roomId || res?.data?.sessionId || classId;
            navigate(`/meeting/${roomId}`);
          } catch {
            navigate(`/meeting/${selectedClass.id}`);
          }
        }}
      />
    );
  }

  const filteredClasses = classes.filter((item) => {
    if (activeTab === "in-progress" && item.status === "Completed") return false;
    if (activeTab === "completed" && item.status !== "Completed") return false;
    if (
      searchQuery &&
      !item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (teacherFilter !== "all" && !item.teacher.includes(teacherFilter)) return false;
    return true;
  });

  return (
    <div className="space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          My Classes
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          View and continue your enrolled classes.
        </p>
      </div>

      {/* Tabs: Sleek Horizontal Row that fits perfectly without scrollbar or awkward wrap */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {[
          { key: "all", label: "All Classes" },
          { key: "in-progress", label: "In Progress" },
          { key: "completed", label: "Completed" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
                : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter Row: Search Full Width on Mobile, 3 Compact Dropdowns in 1 Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 items-center">
        {/* Search Input */}
        <div className="lg:col-span-6 relative">
          <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Class.."
            className="w-full bg-white border border-slate-200/80 rounded-2xl pl-10 sm:pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-700 outline-none focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100/50 shadow-2xs placeholder:text-slate-400 transition-all"
          />
        </div>

        {/* 3 Compact Filter Buttons: Side-by-Side on all screens */}
        <div className="grid grid-cols-3 gap-2 lg:col-span-6 lg:gap-3">
          <button
            type="button"
            className="w-full bg-white border border-slate-200/80 rounded-2xl px-2 sm:px-3.5 py-2.5 text-[11px] sm:text-xs font-semibold text-slate-600 hover:border-blue-200 flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Date/Time</span>
          </button>

          <div className="relative">
            <select
              value={teacherFilter}
              onChange={(e) => setTeacherFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-slate-200/80 rounded-2xl pl-7 sm:pl-9 pr-6 sm:pr-8 py-2.5 text-[11px] sm:text-xs font-semibold text-slate-600 outline-none focus:border-[#0080f6] shadow-2xs cursor-pointer truncate"
            >
              <option value="all">Teacher</option>
              {[...new Set(classes.map((c) => c.teacher).filter(Boolean))].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <User className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="w-full appearance-none bg-white border border-slate-200/80 rounded-2xl pl-7 sm:pl-9 pr-6 sm:pr-8 py-2.5 text-[11px] sm:text-xs font-semibold text-slate-600 outline-none focus:border-[#0080f6] shadow-2xs cursor-pointer truncate">
              <option value="all">Course</option>
              {[...new Set(classes.map((c) => c.subject).filter(Boolean))].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <Layers className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="space-y-3 sm:space-y-3.5">
        {isLoading ? (
          <div className="bg-white rounded-3xl border border-slate-100 p-10 text-center text-slate-400">
            <div className="inline-block w-8 h-8 border-3 border-blue-200 border-t-[#0080f6] rounded-full animate-spin mb-3" />
            <p className="font-semibold text-slate-500 text-sm">Loading your classes...</p>
          </div>
        ) : filteredClasses.length > 0 ? (
          filteredClasses.map((classItem) => (
            <StudentClassCard
              key={classItem.id}
              classItem={classItem}
              onEnterClass={handleEnterClass}
            />
          ))
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100 p-10 text-center text-slate-400">
            <Layers className="w-9 h-9 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-slate-700 text-sm">
              {classes.length === 0 ? "No classes enrolled yet." : "No classes match your filter."}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {classes.length === 0
                ? "When your teacher schedules a live class or session, it will appear here."
                : "Try resetting your search query or filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentClassesPage;
