import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, X, Check, GraduationCap } from "lucide-react";
import toast from "react-hot-toast";

export const AdminTeacherApprovalCard = ({ teacher }) => {
  const navigate = useNavigate();
  const [assignedSubjects, setAssignedSubjects] = useState(["Chemistry"]);
  const [assignedClasses, setAssignedClasses] = useState(["Grade 9 – B", "Grade 10 – A"]);

  const removeSubject = (s) => setAssignedSubjects((prev) => prev.filter((item) => item !== s));
  const removeClass = (c) => setAssignedClasses((prev) => prev.filter((item) => item !== c));

  const handleApprove = () => {
    toast.success(`Account approved for ${teacher.name}!`);
    navigate("/admin/teachers");
  };

  const handleReject = () => {
    toast.error(`Registration rejected for ${teacher.name}`);
    navigate("/admin/teachers");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Left Column: Teacher Information */}
        <div className="lg:col-span-6 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="w-5 h-5 text-slate-700" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Teacher Information</h3>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shrink-0"
            />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">{teacher.name}</h2>
              <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                ⏱ Pending Approval
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            <div className="py-2.5 flex justify-between gap-2">
              <span className="text-slate-500 font-semibold">Email</span>
              <span className="font-bold text-slate-800">{teacher.email}</span>
            </div>
            <div className="py-2.5 flex justify-between gap-2">
              <span className="text-slate-500 font-semibold">Phone</span>
              <span className="font-bold text-slate-800">{teacher.phone}</span>
            </div>
            <div className="py-2.5 flex justify-between gap-2">
              <span className="text-slate-500 font-semibold">Date of Birth</span>
              <span className="font-bold text-slate-800">{teacher.dob}</span>
            </div>
            <div className="py-2.5 flex justify-between gap-2">
              <span className="text-slate-500 font-semibold">Gender</span>
              <span className="font-bold text-slate-800">{teacher.gender}</span>
            </div>
            <div className="py-2.5 flex justify-between gap-2">
              <span className="text-slate-500 font-semibold">Registered On</span>
              <span className="font-bold text-slate-800">{teacher.registeredOn || "Nov 20, 2026, 11:24 AM"}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100/80 text-[11px] sm:text-xs text-slate-700 space-y-0.5">
            <p className="font-bold text-[#0080f6]">ⓘ This teacher has registered from the website.</p>
            <p className="text-slate-500">Review the details, assign subjects & classes, and approve the account.</p>
          </div>
        </div>

        {/* Right Column: Requested Details & Admin Assignment */}
        <div className="lg:col-span-6 space-y-5">
          {/* Requested Details */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <GraduationCap className="w-5 h-5 text-slate-700" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Requested Academic Details</h3>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block mb-1.5">Requested Subjects</span>
              <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                Chemistry
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 block mb-1">Preferred Classes (If any)</span>
              <span className="text-xs font-bold text-slate-800">
                {teacher.preferredClasses || "Grade 9 – B, Grade 10 – A"}
              </span>
            </div>
          </div>

          {/* Admin Assignment */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Admin Assignment</h3>
              <span className="text-xs font-semibold text-slate-400">(Required to Approve)</span>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Assign Subjects *</label>
                <div className="w-full min-h-[42px] px-3 py-1.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-1.5 bg-white">
                  {assignedSubjects.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-[#0080f6] font-semibold text-xs">
                      <span>{s}</span>
                      <button type="button" onClick={() => removeSubject(s)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Assign Classes *</label>
                <div className="w-full min-h-[42px] px-3 py-1.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-1.5 bg-white">
                  {assignedClasses.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold text-xs">
                      <span>{c}</span>
                      <button type="button" onClick={() => removeClass(c)}><X className="w-3 h-3" /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleReject}
          className="px-6 py-2.5 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs sm:text-sm font-bold cursor-pointer transition-colors flex items-center gap-1.5"
        >
          <X className="w-4 h-4" />
          <span>Reject</span>
        </button>
        <button
          type="button"
          onClick={handleApprove}
          className="px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 cursor-pointer transition-colors flex items-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          <span>Approve & Create Account</span>
        </button>
      </div>
    </div>
  );
};

export default AdminTeacherApprovalCard;
