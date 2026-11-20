import { useState, useEffect } from "react";
import { X, BookOpen, Layers, ChevronDown } from "lucide-react";
import { api } from "@/service/apiClient";
import { SessionMaterialUploadInput } from "./SessionMaterialUploadInput";
import { SessionSchedulePicker } from "./SessionSchedulePicker";
import toast from "react-hot-toast";

export const TeacherCreateSessionModal = ({ isOpen, onClose, onSave, sessionToEdit }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("scheduled");
  const [teacherClasses, setTeacherClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDays, setSelectedDays] = useState(["Mon", "Wed", "Fri"]);
  const [startTime, setStartTime] = useState("10:00 AM");
  const [endTime, setEndTime] = useState("10:45 AM");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch teacher's real assigned classes
  useEffect(() => {
    if (!isOpen) return;
    const fetchClasses = async () => {
      try {
        const res = await api.get("/teacher/classes");
        const list = Array.isArray(res?.data) ? res.data : [];
        setTeacherClasses(list);

        if (list.length > 0) {
          if (sessionToEdit?.raw?.classId) {
            const rawClassId = sessionToEdit.raw.classId?.id || sessionToEdit.raw.classId?._id || sessionToEdit.raw.classId;
            setSelectedClassId(String(rawClassId));
            setSelectedSubject(sessionToEdit.raw.subject || list[0].subjects?.[0] || list[0].name);
          } else {
            setSelectedClassId(String(list[0].id));
            const firstSubjects = list[0].subjects?.length ? list[0].subjects : [list[0].name];
            setSelectedSubject(firstSubjects[0] || list[0].name);
          }
        }
      } catch (err) {
        console.warn("Could not fetch assigned classes:", err);
      }
    };
    fetchClasses();
  }, [isOpen, sessionToEdit]);

  useEffect(() => {
    if (sessionToEdit) {
      setTitle(sessionToEdit.title || "");
      setType(sessionToEdit.type === "instant" ? "instant" : "scheduled");
      setSelectedDays(sessionToEdit.raw?.days?.length ? sessionToEdit.raw.days : ["Mon", "Wed", "Fri"]);
      setStartTime(sessionToEdit.raw?.startTime || "10:00 AM");
      setEndTime(sessionToEdit.raw?.endTime || "10:45 AM");
      setAttachedFiles(sessionToEdit.materials || []);
    } else {
      setTitle("");
      setType("scheduled");
      setSelectedDays(["Mon", "Wed", "Fri"]);
      setStartTime("10:00 AM");
      setEndTime("10:45 AM");
      setAttachedFiles([]);
    }
  }, [sessionToEdit, isOpen]);

  const activeClass = teacherClasses.find((c) => String(c.id) === String(selectedClassId)) || teacherClasses[0];
  const availableSubjects = activeClass?.subjects?.length ? activeClass.subjects : (activeClass ? [activeClass.name] : []);

  const handleClassChange = (classId) => {
    setSelectedClassId(classId);
    const cls = teacherClasses.find((c) => String(c.id) === String(classId));
    const subs = cls?.subjects?.length ? cls.subjects : [cls?.name || "General"];
    setSelectedSubject(subs[0] || cls?.name || "General");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Please enter a session name.");
    if (!selectedClassId && !activeClass?.id) {
      return toast.error("No class assigned. Please contact administrator.");
    }

    try {
      setIsSubmitting(true);
      const targetClassId = selectedClassId || activeClass?.id;
      const targetSubject = selectedSubject || availableSubjects[0] || activeClass?.name || "General";

      const payload = {
        title: title.trim(),
        classId: targetClassId,
        subject: targetSubject,
        type,
        ...(type === "scheduled"
          ? {
              days: selectedDays,
              startTime: startTime,
              endTime: endTime,
            }
          : {
              days: [],
              startTime: undefined,
              endTime: undefined,
            }),
      };

      let res;
      if (sessionToEdit?.id) {
        res = await api.patch(`/teacher/sessions/${sessionToEdit.id}`, payload);
        toast.success("Session updated successfully!");
      } else {
        res = await api.post("/teacher/sessions", payload);
        toast.success("Session created successfully!");
      }

      onSave?.(res?.data);
      onClose();
    } catch (err) {
      toast.error(err?.message || "Failed to save session.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100">
          <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
            {sessionToEdit ? "Edit Session" : "Create New Session"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 max-h-[82vh] overflow-y-auto">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Session Name *</label>
            <div className="relative">
              <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Session name (e.g., Mathematics – Grade 9)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl pl-10 pr-4 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6] focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Session Type *</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType("scheduled")}
                className={`py-2 px-2.5 rounded-xl sm:rounded-2xl text-xs font-bold border transition-all ${
                  type === "scheduled" ? "bg-blue-50 border-[#0080f6] text-[#0080f6]" : "border-slate-200 text-slate-600"
                }`}
              >
                📅 Scheduled
              </button>
              <button
                type="button"
                onClick={() => setType("instant")}
                className={`py-2 px-2.5 rounded-xl sm:rounded-2xl text-xs font-bold border transition-all ${
                  type === "instant" ? "bg-emerald-50 border-emerald-500 text-emerald-600" : "border-slate-200 text-slate-600"
                }`}
              >
                ⚡ Instant Live
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Assigned Class *</label>
              <div className="relative">
                <select
                  value={selectedClassId}
                  onChange={(e) => handleClassChange(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl pl-3.5 pr-8 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6] cursor-pointer"
                >
                  {teacherClasses.length === 0 ? (
                    <option value="">No Assigned Classes</option>
                  ) : (
                    teacherClasses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.section ? `(${c.section})` : ""} {c.grade && c.grade !== c.name ? `– ${c.grade}` : ""}
                      </option>
                    ))
                  )}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Subject *</label>
              <div className="relative">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl pl-3.5 pr-8 py-2 sm:py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6] cursor-pointer"
                >
                  {availableSubjects.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
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

          <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-end gap-2.5 sm:gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs font-bold shadow-md shadow-blue-500/25 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Saving..." : sessionToEdit ? "Save Changes" : "Create session"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherCreateSessionModal;
