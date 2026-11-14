import { useState } from "react";
import { X, UserPlus, Check } from "lucide-react";
import toast from "react-hot-toast";

export const AdminAssignTeacherModal = ({ isOpen, onClose, onAssign }) => {
  const [selectedTeacher, setSelectedTeacher] = useState("Mr. David Miller");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign({ teacher: selectedTeacher, subject: selectedSubject });
    toast.success(`${selectedTeacher} assigned to ${selectedSubject}!`);
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
            <h3 className="text-lg font-bold text-slate-900">Assign Teacher</h3>
            <p className="text-xs text-slate-500">Add an instructor to Grade 9</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Select Teacher
            </label>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6]"
            >
              <option value="Mr. David Miller">Mr. David Miller</option>
              <option value="Ms. Sarah Jenkins">Ms. Sarah Jenkins</option>
              <option value="Dr. Robert Fox">Dr. Robert Fox</option>
              <option value="Mrs. Emma Watson">Mrs. Emma Watson</option>
              <option value="Prof. Alan Turing">Prof. Alan Turing</option>
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
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
            </select>
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
              <span>Confirm Assign</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAssignTeacherModal;

