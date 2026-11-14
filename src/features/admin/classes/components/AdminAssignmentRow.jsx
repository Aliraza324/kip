import { Eye, Edit2, MoreHorizontal, Check, Clock } from "lucide-react";
import toast from "react-hot-toast";

export const AdminAssignmentRow = ({
  assignment,
  isSelected,
  onToggleSelect,
}) => {
  const isCompleted = assignment.status === "Completed";

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
      <td className="py-4 px-3 font-bold text-[#0c1a40] whitespace-nowrap">
        {assignment.index}
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <span className="font-bold text-[#0c1a40] text-sm whitespace-nowrap">
          {assignment.title}
        </span>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <span
          className={`inline-block px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${assignment.subjectColor}`}
        >
          {assignment.subject}
        </span>
      </td>
      <td className="py-4 px-4 text-slate-600 font-medium text-xs sm:text-sm whitespace-nowrap">
        {assignment.assignedDate}
      </td>
      <td className="py-4 px-4 text-slate-600 font-medium text-xs sm:text-sm whitespace-nowrap">
        {assignment.dueDate}
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
            isCompleted
              ? "bg-[#e8faee] text-[#16a34a]"
              : "bg-[#fff2e8] text-[#ea580c]"
          }`}
        >
          {isCompleted ? (
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : (
            <Clock className="w-3.5 h-3.5 stroke-[2]" />
          )}
          <span>{assignment.status}</span>
        </span>
      </td>
      <td className="py-4 px-4 min-w-[140px] whitespace-nowrap">
        <div className="space-y-1.5 w-36">
          <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
            {assignment.submissionsCount} / {assignment.totalSubmissions}
          </span>
          <div className="w-full bg-[#eef2f7] h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                isCompleted ? "bg-[#16a34a]" : "bg-[#ea580c]"
              }`}
              style={{ width: `${assignment.progressPercent}%` }}
            />
          </div>
        </div>
      </td>
      <td className="py-4 px-4 whitespace-nowrap">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => toast(`Viewing assignment: ${assignment.title}`, { icon: "📝" })}
            className="p-1 text-[#0080f6] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
            title="View Details"
          >
            <Eye className="w-4.5 h-4.5 stroke-[2.2]" />
          </button>
          <button
            type="button"
            onClick={() => toast.success(`Edit assignment: ${assignment.title}`)}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Edit"
          >
            <Edit2 className="w-4.5 h-4.5 stroke-[2]" />
          </button>
          <button
            type="button"
            onClick={() => toast(`More options for ${assignment.title}`, { icon: "⚙️" })}
            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="More Options"
          >
            <MoreHorizontal className="w-4.5 h-4.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminAssignmentRow;
