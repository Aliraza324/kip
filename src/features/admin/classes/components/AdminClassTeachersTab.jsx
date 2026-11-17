import { Users, Plus, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export const AdminClassTeachersTab = ({ teachers = [], onAssignTeacher, onRemoveTeacher }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/70 p-5 sm:p-7 shadow-2xs space-y-5">
      {/* Tab Inner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <Users className="w-8 h-8 text-[#0080f6] stroke-[2] shrink-0" />
          <h2 className="text-xl sm:text-2xl font-black text-[#0c1a40] tracking-tight">
            Assigned Teachers ({teachers.length})
          </h2>
        </div>

        <button
          type="button"
          onClick={onAssignTeacher}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Assign Teacher</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto no-scrollbar -mx-5 sm:mx-0 px-5 sm:px-0">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-200/80 text-xs sm:text-sm font-bold text-[#0c1a40] bg-[#eef4fb]">
              <th className="py-4 px-3 w-12 font-bold text-[#0c1a40] whitespace-nowrap">#</th>
              <th className="py-4 px-4 font-bold text-[#0c1a40] whitespace-nowrap">Teacher Name</th>
              <th className="py-4 px-4 font-bold text-[#0c1a40] whitespace-nowrap">Teacher ID</th>
              <th className="py-4 px-4 font-bold text-[#0c1a40] whitespace-nowrap">Subject(s)</th>
              <th className="py-4 px-4 font-bold text-[#0c1a40] whitespace-nowrap">Joined On</th>
              <th className="py-4 px-4 font-bold text-[#0c1a40] text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/90 text-xs sm:text-sm font-medium text-slate-700">
            {teachers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-400 font-medium">
                  No teachers assigned to this class yet.
                </td>
              </tr>
            ) : (
              teachers.map((t, idx) => {
                const teacherName = t.fullName || t.name;
                const teacherCode = t.code || t.teacherId || "—";
                const joinedDate = t.assignedAt ? new Date(t.assignedAt).toLocaleDateString() : t.joinedOn || "—";

                return (
                  <tr key={t.assignmentId || t.id || idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-3 font-semibold text-slate-800 whitespace-nowrap">{idx + 1}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {t.avatar ? (
                          <img
                            src={t.avatar}
                            alt={teacherName}
                            className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200/70"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0080f6] font-bold text-xs flex items-center justify-center shrink-0">
                            {(teacherName || "T")[0]}
                          </div>
                        )}
                        <span className="font-black text-slate-900 whitespace-nowrap">{teacherName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-600 whitespace-nowrap">{teacherCode}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap bg-blue-50 text-[#0080f6]">
                        {t.subject || "All Subjects"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium whitespace-nowrap">{joinedDate}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        {t.id && (
                          <Link
                            to={`/admin/teachers/${t.id}`}
                            className="p-1.5 text-[#0080f6] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="View Teacher Profile"
                          >
                            <Eye className="w-4 h-4 stroke-[2.2]" />
                          </Link>
                        )}
                        {onRemoveTeacher && (
                          <button
                            type="button"
                            onClick={() => onRemoveTeacher(t.assignmentId || t.id, teacherName)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Remove from class"
                          >
                            <Trash2 className="w-4 h-4 stroke-[2]" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminClassTeachersTab;

