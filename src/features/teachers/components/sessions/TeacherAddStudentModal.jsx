import { useState } from "react";
import { X, User, Mail, Hash, UserPlus, Send } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherAddStudentModal = ({
  isOpen,
  onClose,
  onAddStudent,
  onInviteSuccess,
}) => {
  const [tab, setTab] = useState("manual");
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter student name.");

    if (tab === "manual") {
      if (!roll.trim()) return toast.error("Please enter roll number.");
      const newStudent = {
        id: Date.now(),
        name: name.trim(),
        roll: roll.trim(),
        email: `${name.toLowerCase().replace(/\s+/g, ".")}@kipclassin.com`,
        status: "Active",
      };
      onAddStudent(newStudent);
      toast.success("Student added successfully!");
      onClose();
    } else {
      if (!email.trim()) return toast.error("Please enter student email.");
      const studentData = {
        id: Date.now(),
        name: name.trim(),
        roll: roll.trim() || `ROLL-${Math.floor(Math.random() * 90) + 10}`,
        email: email.trim(),
        status: "Active",
      };
      onAddStudent(studentData);
      onInviteSuccess(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Add Student</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Segmented Mode Selector */}
          <div className="p-1 bg-slate-100/80 rounded-2xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => setTab("manual")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                tab === "manual" ? "bg-white text-[#0080f6] shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Manually</span>
            </button>
            <button
              type="button"
              onClick={() => setTab("invite")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                tab === "invite" ? "bg-white text-[#0080f6] shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Invite by Email</span>
            </button>
          </div>

          {/* Student Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Student Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6]"
              />
            </div>
          </div>

          {/* Roll Number */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Roll Number *</label>
            <div className="relative">
              <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                placeholder="Enter roll number (e.g. ROLL-042)"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6]"
              />
            </div>
          </div>

          {/* Email (Visible in Invite Mode) */}
          {tab === "invite" && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter student email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#0080f6]"
                />
              </div>
            </div>
          )}

          {/* Actions */}
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
              className="px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs font-bold shadow-md shadow-blue-500/25 flex items-center gap-1.5"
            >
              {tab === "manual" ? <UserPlus className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
              <span>{tab === "manual" ? "Add Student" : "Send Invitation"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherAddStudentModal;

