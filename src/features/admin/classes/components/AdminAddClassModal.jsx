import { useState, useEffect } from "react";
import { X, Layers, Plus, Check } from "lucide-react";
import toast from "react-hot-toast";
import { teacherService } from "@/service/apiService";
import { AddClassSubjectItem } from "./AddClassSubjectItem";

export const AdminAddClassModal = ({ isOpen, onClose, onSaveClass }) => {
  const [className, setClassName] = useState("");
  const [grade, setGrade] = useState("Grade 9");
  const [section, setSection] = useState("");
  const [room, setRoom] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [subjects, setSubjects] = useState(["Mathematics", "Science", "English"]);

  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [teacherDropdown, setTeacherDropdown] = useState(false);
  const [newSubjectInput, setNewSubjectInput] = useState("");
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    teacherService.getAll({ limit: 50 }).then((res) => {
      const items = res?.data || (Array.isArray(res) ? res : []);
      setAvailableTeachers(items);
    }).catch(() => {
      setAvailableTeachers([]);
    });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAddSubject = () => {
    if (newSubjectInput.trim() && !subjects.includes(newSubjectInput.trim())) {
      setSubjects((prev) => [...prev, newSubjectInput.trim()]);
      setNewSubjectInput("");
      setShowAddSubject(false);
    }
  };

  const handleToggleTeacher = (t) => {
    const isAlready = selectedTeachers.some((x) => x.id === t.id);
    if (isAlready) {
      setSelectedTeachers((prev) => prev.filter((x) => x.id !== t.id));
    } else {
      setSelectedTeachers((prev) => [...prev, { id: t.id, name: t.fullName || t.name }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!className.trim()) {
      toast.error("Please enter a class name");
      return;
    }
    setIsSubmitting(true);
    try {
      await onSaveClass({
        name: className.trim(),
        grade: grade.trim() || undefined,
        section: section.trim() || undefined,
        room: room.trim() || undefined,
        status: "active",
        subjects,
        teachers: selectedTeachers.map((t) => ({ teacherId: t.id })),
      });
      toast.success(`Class "${className}" created successfully!`);
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to create class");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto no-scrollbar">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-[#0080f6] flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">Add Class</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Create a new class by adding class name, grade, teachers, and subjects.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                Class Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Grade 9 – Science"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/90 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
                required
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                Grade
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/90 text-xs sm:text-sm text-slate-800 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
              >
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
                <option value="O Level (Year 1)">O Level (Year 1)</option>
                <option value="O Level (Year 2)">O Level (Year 2)</option>
                <option value="A Level">A Level</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                Section (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Section A, Blue Wing"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/90 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                Room (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Room 204"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200/90 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Teachers selection */}
          <div className="relative">
            <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
              Assign Teachers (Optional)
            </label>
            <div
              onClick={() => setTeacherDropdown(!teacherDropdown)}
              className="w-full min-h-[46px] p-2 rounded-2xl border border-slate-200/90 flex flex-wrap items-center justify-between gap-1.5 bg-white cursor-pointer shadow-2xs"
            >
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedTeachers.length === 0 ? (
                  <span className="text-xs text-slate-400 px-2">Select teachers...</span>
                ) : (
                  selectedTeachers.map((t) => (
                    <span
                      key={t.id}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#0080f6] text-xs font-semibold"
                    >
                      <span>{t.name}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTeachers(selectedTeachers.filter((x) => x.id !== t.id));
                        }}
                        className="hover:text-rose-500 font-bold ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            {teacherDropdown && (
              <div className="absolute left-0 top-full mt-1.5 w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-30 max-h-48 overflow-y-auto">
                {availableTeachers.length === 0 ? (
                  <p className="p-3 text-center text-xs text-slate-400">No teachers found.</p>
                ) : (
                  availableTeachers.map((t) => {
                    const isSelected = selectedTeachers.some((x) => x.id === t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleToggleTeacher(t)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors ${
                          isSelected ? "bg-blue-50 text-[#0080f6] font-bold" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{t.fullName || t.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#0080f6]" />}
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Subjects selection */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-2">
              Subjects <span className="text-rose-500">*</span>
            </label>
            <div className="space-y-2">
              {subjects.map((sub, idx) => (
                <AddClassSubjectItem
                  key={sub}
                  subject={sub}
                  onRemove={() => setSubjects((prev) => prev.filter((_, i) => i !== idx))}
                />
              ))}
            </div>

            <div className="mt-3">
              {showAddSubject ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Subject name..."
                    value={newSubjectInput}
                    onChange={(e) => setNewSubjectInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSubject();
                      }
                    }}
                    className="flex-1 px-4 py-2 rounded-full border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#0080f6]"
                  />
                  <button
                    type="button"
                    onClick={handleAddSubject}
                    className="px-4 py-2 rounded-full bg-[#0080f6] text-white text-xs font-bold"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddSubject(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddSubject(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200/90 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Subject</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full border border-slate-200/90 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{isSubmitting ? "Adding..." : "Add Class"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddClassModal;
