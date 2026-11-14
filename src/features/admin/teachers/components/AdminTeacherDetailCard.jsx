import { Link } from "react-router-dom";
import { Mail, Phone, Calendar, User, Plus, Layers } from "lucide-react";

export const AdminTeacherDetailCard = ({ teacher }) => {
  const assigned = teacher.assignedClasses || [];

  return (
    <div className="space-y-6">
      {/* Top Profile Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-4 sm:gap-5">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-slate-200 shadow-xs shrink-0"
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {teacher.name}
            </h2>
            <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-blue-50 text-[#0080f6] text-xs font-bold">
              {teacher.teacherId}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-600 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{teacher.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{teacher.dob}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{teacher.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{teacher.gender}</span>
          </div>
        </div>
      </div>

      {/* Assigned Classes Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0 mt-0.5">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Assigned Classes ({assigned.length})
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Classes allocated to this teacher.
              </p>
            </div>
          </div>

          <Link
            to={`/admin/teachers/${teacher.teacherId}/assign-class`}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Assign New Class</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Class</th>
                <th className="py-3 px-4">Section</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Assigned On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
              {assigned.map((cls, idx) => (
                <tr key={cls.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 text-center text-slate-400 font-semibold">{idx + 1}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{cls.class}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{cls.section}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-[#0080f6] text-xs font-semibold">
                      {cls.subject}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">{cls.assignedOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTeacherDetailCard;
