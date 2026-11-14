import { useState } from "react";
import { X, Layers, Plus, Check } from "lucide-react";
import toast from "react-hot-toast";
import { AddClassMultiSelect } from "./AddClassMultiSelect";
import { AddClassSubjectItem } from "./AddClassSubjectItem";

export const AdminAddClassModal = ({ isOpen, onClose, onSaveClass }) => {
  const [className, setClassName] = useState("");
  const [teachers, setTeachers] = useState(["John Smith", "Emma Wilson"]);
  const [students, setStudents] = useState(["Alex Turner", "Sophia Green", "Ethan Clark"]);
  const [subjects, setSubjects] = useState(["Mathematics", "Science", "English"]);

  const [teacherDropdown, setTeacherDropdown] = useState(false);
  const [studentDropdown, setStudentDropdown] = useState(false);
  const [newSubjectInput, setNewSubjectInput] = useState("");
  const [showAddSubject, setShowAddSubject] = useState(false);

  const availableTeachers = ["John Smith", "Emma Wilson", "Robert Fox", "Sarah Jenkins", "Alan Turing"];
  const availableStudents = ["Alex Turner", "Sophia Green", "Ethan Clark", "Ali Hassan", "Sara Ahmed"];

  if (!isOpen) return null;

  const handleAddSubject = () => {
    if (newSubjectInput.trim()) {
      setSubjects((prev) => [...prev, newSubjectInput.trim()]);
      setNewSubjectInput("");
      setShowAddSubject(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!className.trim()) {
      toast.error("Please enter a class name");
      return;
    }
    onSaveClass({
      name: className,
      grade: className.includes("10") ? "Grade 10" : "Grade 9",
      teacherName: teachers[0] || "John Smith",
      studentsCount: students.length * 8 || 32,
    });
    toast.success(`Class "${className}" created successfully!`);
    onClose();
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
              Create a new class by adding class name, students, teachers, and subjects.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
              Class Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter class name (e.g., Grade 9, Class 10)"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200/90 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-2xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AddClassMultiSelect
              label="Teachers"
              required
              items={teachers}
              availableItems={availableTeachers}
              onRemoveItem={(item) => setTeachers(teachers.filter((t) => t !== item))}
              onAddItem={(item) => {
                if (!teachers.includes(item)) setTeachers([...teachers, item]);
                setTeacherDropdown(false);
              }}
              isOpen={teacherDropdown}
              onToggleOpen={() => setTeacherDropdown(!teacherDropdown)}
            />

            <AddClassMultiSelect
              label="Students"
              required
              items={students}
              availableItems={availableStudents}
              onRemoveItem={(item) => setStudents(students.filter((s) => s !== item))}
              onAddItem={(item) => {
                if (!students.includes(item)) setStudents([...students, item]);
                setStudentDropdown(false);
              }}
              isOpen={studentDropdown}
              onToggleOpen={() => setStudentDropdown(!studentDropdown)}
            />
          </div>

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
              className="px-6 py-2.5 rounded-full border border-slate-200/90 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Add Class</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddClassModal;
