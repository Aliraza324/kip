import { useState, useEffect } from "react";
import { X, UserPlus, Check } from "lucide-react";
import toast from "react-hot-toast";
import { teacherService } from "@/service/apiService";

export const AdminAssignTeacherModal = ({
  isOpen,
  onClose,
  onAssign,
  className = "Class",
  classSubjects = [],
}) => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    teacherService
      .getAll({ limit: 100 })
      .then((res) => {
        const items = res?.data || (Array.isArray(res) ? res : []);
        setTeachers(items);
        if (items.length > 0) {
          setSelectedTeacherId(items[0].id);
        }
      })
      .catch(() => setTeachers([]));

    if (classSubjects.length > 0) {
      setSelectedSubject(classSubjects[0]);
    } else {
      setSelectedSubject("Mathematics");
    }
  }, [isOpen, classSubjects]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTeacherId) {
      toast.error("Please select a teacher");
      return;
    }
    const finalSubject = selectedSubject === "__custom__" ? customSubject.trim() : selectedSubject;
    if (selectedSubject === "__custom__" && !finalSubject) {
      toast.error("Please enter a subject name");
      return;
    }

    setIsSubmitting(true);
    try {
      await onAssign({ teacherId: selectedTeacherId, subject: finalSubject || undefined });
      toast.success("Teacher assigned successfully!");
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to assign teacher");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Assign Teacher</h3>
            <p className="text-xs text-slate-500">Assign instructor to {className}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Select Teacher <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6]"
              required
            >
              {teachers.length === 0 ? (
                <option value="">No teachers available</option>
              ) : (
                teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.fullName || t.name} {t.code ? `(${t.code})` : ""}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6]"
            >
              {classSubjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
              {!classSubjects.includes("Mathematics") && <option value="Mathematics">Mathematics</option>}
              {!classSubjects.includes("Physics") && <option value="Physics">Physics</option>}
              {!classSubjects.includes("Chemistry") && <option value="Chemistry">Chemistry</option>}
              {!classSubjects.includes("English") && <option value="English">English</option>}
              <option value="__custom__">+ Other / Custom Subject</option>
            </select>
            {selectedSubject === "__custom__" && (
              <input
                type="text"
                placeholder="Enter subject name..."
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                className="mt-2 w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0080f6]"
                required
              />
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !selectedTeacherId}
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-[#0080f6] text-white text-xs font-bold shadow-md shadow-blue-500/25 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? "Assigning..." : "Confirm Assign"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAssignTeacherModal;

