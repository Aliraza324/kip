import { Users, Plus, Eye, Edit2, MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";

export const AdminClassTeachersTab = ({ teachers = [], onAssignTeacher }) => {
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
            {teachers.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-4 px-3 font-semibold text-slate-800 whitespace-nowrap">{t.index}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200/70"
                    />
                    <span className="font-black text-slate-900 whitespace-nowrap">{t.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 font-semibold text-slate-600 whitespace-nowrap">{t.teacherId}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${t.subjectColor}`}
                  >
                    {t.subject}
                  </span>
                </td>
                <td className="py-4 px-4 text-slate-600 font-medium whitespace-nowrap">{t.joinedOn}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => toast(`Viewing profile of ${t.name}`, { icon: "👤" })}
                      className="p-1 text-[#0080f6] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4 stroke-[2.2]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toast.success(`Editing assignment for ${t.name}`)}
                      className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 stroke-[2]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => toast(`Options for ${t.name}`, { icon: "⚙️" })}
                      className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="More"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminClassTeachersTab;

