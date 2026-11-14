import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, ChevronDown, X, Check } from "lucide-react";
import toast from "react-hot-toast";

export const AdminAssignClassForm = ({ teacher }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    class: "Grade 11",
    section: "A",
  });
  const [subjects, setSubjects] = useState(["Mathematics"]);

  const removeSubject = (s) => setSubjects((prev) => prev.filter((item) => item !== s));

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`New class assigned to ${teacher.name}!`);
    navigate(`/admin/teachers/${teacher.teacherId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Strip */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">{teacher.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0080f6] text-xs font-bold">
                {teacher.teacherId}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{teacher.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{teacher.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Select Class *</label>
            <div className="relative">
              <select
                value={formData.class}
                onChange={(e) => setFormData((prev) => ({ ...prev, class: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 appearance-none bg-white focus:border-[#0080f6] outline-none cursor-pointer"
              >
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Select Section *</label>
            <div className="relative">
              <select
                value={formData.section}
                onChange={(e) => setFormData((prev) => ({ ...prev, section: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 appearance-none bg-white focus:border-[#0080f6] outline-none cursor-pointer"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Select Subject(s) *</label>
          <div className="w-full min-h-[44px] px-3 py-1.5 rounded-2xl border border-slate-200 flex flex-wrap items-center gap-1.5 bg-white">
            {subjects.map((sub) => (
              <span
                key={sub}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-[#0080f6] font-semibold text-xs"
              >
                <span>{sub}</span>
                <button type="button" onClick={() => removeSubject(sub)}>
                  <X className="w-3 h-3 hover:text-blue-800" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <Link
          to={`/admin/teachers/${teacher.teacherId}`}
          className="px-6 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-7 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/25 cursor-pointer transition-colors flex items-center gap-1.5"
        >
          <Check className="w-4 h-4" />
          <span>Assign Class</span>
        </button>
      </div>
    </form>
  );
};

export default AdminAssignClassForm;
