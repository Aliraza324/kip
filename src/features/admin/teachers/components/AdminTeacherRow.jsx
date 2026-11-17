import { Link } from "react-router-dom";
import { Eye, Edit3, Trash2, ArrowRight } from "lucide-react";

const subjectColorMap = {
  Mathematics: "bg-blue-50 text-[#0080f6]",
  English: "bg-purple-50 text-purple-600",
  Physics: "bg-amber-50 text-amber-600",
  Chemistry: "bg-emerald-50 text-emerald-600",
  Biology: "bg-cyan-50 text-cyan-600",
};

export const AdminTeacherRow = ({ teacher, idx, isSelected, onToggle, onEdit, onDelete }) => {
  const isPending = teacher.status === "Pending Approval" || teacher.status === "pending";
  const teacherId = teacher.id || teacher._id || teacher.teacherId || teacher.code;
  const teacherName = teacher.fullName || teacher.name || "Teacher";
  const teacherCode = teacher.code || teacher.teacherId || "—";
  const avatarUrl =
    typeof teacher.avatar === "string"
      ? teacher.avatar
      : teacher.avatar?.url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(teacherName)}&background=eaf4fe&color=0080f6`;

  const subjectsList = Array.isArray(teacher.subjects) ? teacher.subjects : [];

  return (
    <tr
      className={`transition-colors ${
        isPending ? "bg-amber-50/40 hover:bg-amber-50/70" : "hover:bg-slate-50/70"
      }`}
    >
      <td className="py-3.5 px-4 text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="w-4 h-4 rounded border-slate-300 text-[#0080f6] focus:ring-blue-500 cursor-pointer"
        />
      </td>
      <td className="py-3.5 px-3 text-slate-400 font-semibold">{idx + 1}</td>
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl}
            alt={teacherName}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
          />
          <span className="font-bold text-slate-900">{teacherName}</span>
        </div>
      </td>
      <td className="py-3.5 px-4 text-slate-600 font-medium">{teacherCode}</td>
      <td className="py-3.5 px-4">
        <div className="flex flex-wrap gap-1.5">
          {subjectsList.length > 0 ? (
            subjectsList.map((sub) => (
              <span
                key={sub}
                className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold ${
                  subjectColorMap[sub] || "bg-blue-50 text-blue-600"
                }`}
              >
                {sub}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400">—</span>
          )}
        </div>
      </td>
      <td className="py-3.5 px-4 text-slate-600">
        {teacher.assignedClasses?.length > 0
          ? teacher.assignedClasses
              .map((ac) => ac.label || `${ac.className || ac.class || "Class"} – ${ac.section || ""}`)
              .join(", ")
          : "—"}
      </td>
      <td className="py-3.5 px-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
            isPending
              ? "bg-amber-100/80 text-amber-700"
              : teacher.status === "rejected"
                ? "bg-rose-100 text-rose-700"
                : "bg-emerald-50 text-emerald-600"
          }`}
        >
          {isPending ? "Pending Approval" : teacher.status === "rejected" ? "Rejected" : "• Active"}
        </span>
      </td>
      <td className="py-3.5 px-4 text-center">
        <div className="flex items-center justify-center gap-1.5">
          {isPending ? (
            <Link
              to={`/admin/teachers/approval/${teacherId}`}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs transition-colors cursor-pointer mr-1"
            >
              <span>Review</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0080f6]" />
            </Link>
          ) : (
            <Link
              to={`/admin/teachers/${teacherId}`}
              title="View Teacher Details"
              className="p-1.5 rounded-lg text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4" />
            </Link>
          )}

          <button
            type="button"
            onClick={() => onEdit?.(teacher)}
            title="Edit Teacher"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(teacher)}
            title="Delete Teacher"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminTeacherRow;
