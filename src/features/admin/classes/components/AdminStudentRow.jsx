import { Eye, Edit2 } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const AdminStudentRow = ({
  student,
  isSelected,
  onToggleSelect,
  index = 1,
}) => {
  const studentName = student.fullName || student.name;
  const studentCode = student.code || student.studentId || "—";
  const isFemale = (student.gender || "").toLowerCase() === "female";
  const isActive = (student.status || "").toLowerCase() === "active";

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
              src={student.avatar}
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
      <td className="py-4 px-4 font-semibold text-slate-600 whitespace-nowrap">
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
        <div className="flex items-center justify-center gap-3">
          {student.id ? (
            <Link
              to={`/admin/students/${student.id}`}
              className="p-1 text-[#0080f6] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              title="View Details"
            >
              <Eye className="w-4 h-4 stroke-[2.2]" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => toast(`Viewing student ${studentName}`, { icon: "🎓" })}
              className="p-1 text-[#0080f6] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              title="View Details"
            >
              <Eye className="w-4 h-4 stroke-[2.2]" />
            </button>
          )}
          <button
            type="button"
            onClick={() => toast.success(`Edit ${studentName}`)}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Edit"
          >
            <Edit2 className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminStudentRow;

