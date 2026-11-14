import { Eye, Edit2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export const AdminStudentRow = ({
  student,
  isSelected,
  onToggleSelect,
}) => {
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
        {student.index}
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
          />
          <span className="font-black text-slate-900 whitespace-nowrap">
            {student.name}
          </span>
        </div>
      </td>
      <td className="py-4 px-4 font-semibold text-slate-600 whitespace-nowrap">
        {student.studentId}
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            student.gender === "Female"
              ? "bg-[#fdf2f8] text-[#db2777]"
              : "bg-[#eff6ff] text-[#2563eb]"
          }`}
        >
          <span>{student.gender === "Female" ? "♀ Female" : "♂ Male"}</span>
        </span>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eefcf3] text-[#16a34a] text-xs font-semibold whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
          <span>{student.status}</span>
        </span>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => toast(`Viewing student ${student.name}`, { icon: "🎓" })}
            className="p-1 text-[#0080f6] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4 h-4 stroke-[2.2]" />
          </button>
          <button
            type="button"
            onClick={() => toast.success(`Edit ${student.name}`)}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Edit"
          >
            <Edit2 className="w-4 h-4 stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={() => toast.error(`Removed ${student.name} from class`)}
            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminStudentRow;

