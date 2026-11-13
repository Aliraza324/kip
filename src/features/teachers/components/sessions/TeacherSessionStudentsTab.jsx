import { useState, useRef, useEffect } from "react";
import { Users, Plus, User, MoreVertical, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherSessionStudentsTab = ({ students, onAddStudentClick, onRemoveStudent }) => {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setActiveMenuId(null);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleRemove = (student) => {
    onRemoveStudent(student.id);
    setActiveMenuId(null);
    toast.success(`${student.name} removed from session.`);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
      {/* Tab Header with Student Count and "+ Add Student" Button */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Students ({students.length})
          </h3>
        </div>

        <button
          type="button"
          onClick={onAddStudentClick}
          className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-[#0080f6] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Add Student</span>
        </button>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-3">#</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80 text-xs sm:text-sm">
            {students.map((st, idx) => (
              <tr key={st.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-3 text-slate-400 font-medium">{idx + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{st.name}</p>
                      {st.roll && <p className="text-[11px] text-slate-400 font-mono">{st.roll}</p>}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-slate-600 font-medium">{st.email}</td>
                <td className="py-3 px-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                    {st.status || "Active"}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="relative inline-block" ref={activeMenuId === st.id ? menuRef : null}>
                    <button
                      type="button"
                      onClick={() => setActiveMenuId(activeMenuId === st.id ? null : st.id)}
                      className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {activeMenuId === st.id && (
                      <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20">
                        <button
                          type="button"
                          onClick={() => handleRemove(st)}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    )}
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

export default TeacherSessionStudentsTab;

