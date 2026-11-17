import { Eye, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export const AdminStudentRow = ({
  student,
  isSelected,
  onToggleSelect,
  index = 1,
  onEdit,
  onDelete,
}) => {
  const studentName = student.fullName || student.name || "Student";
  const studentCode = student.code || student.studentId || "—";
  const isFemale = (student.gender || "").toLowerCase() === "female";
  const isActive = (student.status || "active").toLowerCase() === "active";
  const studentId = student.id || student._id;

  return (
    <tr className="hover:bg-slate-50/60 transition-colors">
      <td className="py-4 px-4 text-center whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="w-4 h-4 rounded border-slate-300 text-[#0080f6] focus:ring-blue-400 cursor-pointer accent-[#0080f6]"
        />
      </td>
      <td className="py-4 px-3 font-semibold text-slate-800 whitespace-nowrap">
        {student.index || index}
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          {student.avatar ? (
            <img
              src={typeof student.avatar === "string" ? student.avatar : student.avatar?.url}
              alt={studentName}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0080f6] font-bold text-xs flex items-center justify-center shrink-0">
              {(studentName || "S")[0]}
            </div>
          )}
          <span className="font-black text-slate-900 whitespace-nowrap">
            {studentName}
          </span>
        </div>
      </td>
      <td className="py-4 px-4 font-semibold text-slate-600 whitespace-nowrap font-mono text-xs">
        {studentCode}
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            isFemale
              ? "bg-[#fdf2f8] text-[#db2777]"
              : "bg-[#eff6ff] text-[#2563eb]"
          }`}
        >
          <span>{isFemale ? "♀ Female" : "♂ Male"}</span>
        </span>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap capitalize ${
            isActive
              ? "bg-[#eefcf3] text-[#16a34a]"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isActive ? "bg-[#16a34a]" : "bg-slate-400"
            }`}
          />
          <span>{student.status || "Active"}</span>
        </span>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="flex items-center justify-center gap-2">
          {studentId ? (
            <Link
              to={`/admin/students/${studentId}`}
              className="p-1.5 text-[#0080f6] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              title="View Student Details"
            >
              <Eye className="w-4 h-4 stroke-[2.2]" />
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => onEdit?.(student)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Edit Student"
          >
            <Edit2 className="w-4 h-4 stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(student)}
            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Delete Student"
          >
            <Trash2 className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminStudentRow;
