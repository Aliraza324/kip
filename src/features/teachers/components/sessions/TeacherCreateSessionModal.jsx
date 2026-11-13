import { useState, useEffect } from "react";
import { X, BookOpen } from "lucide-react";
import { teacherGradesAndSubjectsMock } from "@/mocks";
import { SessionMaterialUploadInput } from "./SessionMaterialUploadInput";
import { SessionSchedulePicker } from "./SessionSchedulePicker";
import toast from "react-hot-toast";

export const TeacherCreateSessionModal = ({ isOpen, onClose, onSave, sessionToEdit }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("scheduled");
  const [selectedGrade, setSelectedGrade] = useState("Grade 9");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [selectedDays, setSelectedDays] = useState(["Mon", "Wed", "Fri"]);
  const [startTime, setStartTime] = useState("10:00 AM");
  const [endTime, setEndTime] = useState("10:45 AM");
  const [attachedFiles, setAttachedFiles] = useState([]);

  useEffect(() => {
    if (sessionToEdit) {
      setTitle(sessionToEdit.title || "");
      setType(sessionToEdit.type === "instant" ? "instant" : "scheduled");
      setSelectedGrade(sessionToEdit.grade || "Grade 9");
      setSelectedSubject(sessionToEdit.course || "Mathematics");
      setSelectedDays(sessionToEdit.scheduleDays ? sessionToEdit.scheduleDays.split(", ") : ["Mon", "Wed", "Fri"]);
      const [sTime, eTime] = (sessionToEdit.duration || "10:00 AM – 10:45 AM").split(" – ");
      setStartTime(sTime || "10:00 AM");
      setEndTime(eTime || "10:45 AM");
      setAttachedFiles(sessionToEdit.materials || []);
    } else {
      setTitle(""); setType("scheduled"); setSelectedGrade("Grade 9"); setSelectedSubject("Mathematics");
      setSelectedDays(["Mon", "Wed", "Fri"]); setStartTime("10:00 AM"); setEndTime("10:45 AM"); setAttachedFiles([]);
    }
  }, [sessionToEdit, isOpen]);

  const activeGradeConfig = teacherGradesAndSubjectsMock.find((g) => g.grade === selectedGrade);
  const availableSubjects = activeGradeConfig ? activeGradeConfig.subjects : [];

  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
    const cfg = teacherGradesAndSubjectsMock.find((g) => g.grade === grade);
    if (cfg && cfg.subjects.length > 0) setSelectedSubject(cfg.subjects[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Please enter a session name.");
    const durationString = type === "instant" ? "Instant Live" : `${startTime} – ${endTime}`;
    const sessionData = {
      id: sessionToEdit ? sessionToEdit.id : `sess_${Date.now()}`,
      title: title.trim(),
      grade: selectedGrade,
      course: selectedSubject,
      type,
      statusBadge: type === "instant" ? "Instant" : "Scheduled",
      duration: durationString,
      scheduleDays: type === "scheduled" ? selectedDays.join(", ") : "Instant",
      repeatRule: type === "scheduled" ? `Weekly (${selectedDays.join(", ")})` : "One-time Live",
      studentsCount: sessionToEdit ? sessionToEdit.studentsCount : 0,
      materialsCount: (sessionToEdit?.materialsCount || 0) + attachedFiles.length,
      scheduledCount: type === "scheduled" ? 1 : 0,
      iconType: selectedSubject.toLowerCase().includes("math") ? "sqrt" : "book",
      colorClass: selectedSubject.toLowerCase().includes("math")
        ? "bg-purple-100 text-purple-600"
        : "bg-blue-100 text-blue-600",
      materials: attachedFiles,
    };
    onSave(sessionData);
    toast.success(sessionToEdit ? "Session updated successfully!" : "Session created successfully!");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {sessionToEdit ? "Edit Session" : "Create New Session"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Session Name *</label>
            <div className="relative">
              <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Session name (e.g., Mathematics – Grade 9)"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6] focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Session Type *</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType("scheduled")}
                className={`py-2 px-3 rounded-2xl text-xs font-bold border transition-all ${
                  type === "scheduled" ? "bg-blue-50 border-[#0080f6] text-[#0080f6]" : "border-slate-200 text-slate-600"
                }`}
              >
                📅 Scheduled Session
              </button>
              <button
                type="button"
                onClick={() => setType("instant")}
                className={`py-2 px-3 rounded-2xl text-xs font-bold border transition-all ${
                  type === "instant" ? "bg-emerald-50 border-emerald-500 text-emerald-600" : "border-slate-200 text-slate-600"
                }`}
              >
                ⚡ Instant Live
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Grade *</label>
              <select
                value={selectedGrade}
                onChange={(e) => handleGradeChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6]"
              >
                {teacherGradesAndSubjectsMock.map((g) => (
                  <option key={g.grade} value={g.grade}>{g.grade}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Class / Subject *</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6]"
              >
                {availableSubjects.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Scheduled Details: Week Days + Durations Dropdown */}
          {type === "scheduled" && (
            <SessionSchedulePicker
              selectedDays={selectedDays}
              onDaysChange={setSelectedDays}
              startTime={startTime}
              endTime={endTime}
              onTimeChange={(start, end) => {
                setStartTime(start);
                setEndTime(end);
              }}
            />
          )}

          <SessionMaterialUploadInput
            attachedFiles={attachedFiles}
            onAttach={(newFiles) => setAttachedFiles((prev) => [...prev, ...newFiles])}
            onRemove={(idx) => setAttachedFiles((prev) => prev.filter((_, i) => i !== idx))}
          />

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs font-bold shadow-md shadow-blue-500/25 active:scale-95"
            >
              {sessionToEdit ? "Save Changes" : "Create session"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherCreateSessionModal;
