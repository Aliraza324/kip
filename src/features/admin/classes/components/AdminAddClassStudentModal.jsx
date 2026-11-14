import { useState } from "react";
import { X, UserPlus, Check } from "lucide-react";
import toast from "react-hot-toast";

export const AdminAddClassStudentModal = ({ isOpen, onClose, onAddStudent }) => {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState(`ST-${Math.floor(1000 + Math.random() * 9000)}`);
  const [gender, setGender] = useState("Male");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      toast.error("Please enter student name");
      return;
    }
    onAddStudent({ name: studentName, studentId, gender });
    toast.success(`Student ${studentName} enrolled in Grade 9!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Add Student</h3>
            <p className="text-xs text-slate-500">Enroll student into Grade 9</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. Danial Ahmed"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Student ID
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-[#0080f6] text-white text-xs font-bold shadow-md shadow-blue-500/25"
            >
              <Check className="w-4 h-4" />
              <span>Add Student</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddClassStudentModal;

