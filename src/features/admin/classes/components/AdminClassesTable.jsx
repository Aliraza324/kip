import { Link } from "react-router-dom";
import { Eye, Edit2, MoreHorizontal, Trash2 } from "lucide-react";

export const AdminClassesTable = ({
  classes = [],
  selectedIds = [],
  onToggleSelectAll,
  onToggleSelectOne,
  onViewClass,
  onEditClass,
  onDeleteClass,
  onMoreOptions,
  startIndex = 0,
}) => {
  const isAllSelected =
    classes.length > 0 && selectedIds.length === classes.length;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/70 shadow-xs overflow-hidden">
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse min-w-[850px]">
          <thead>
            <tr className="border-b border-slate-100/90 text-xs sm:text-sm font-bold text-slate-900 bg-white">
              <th className="py-4 px-4 w-12 text-center whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  aria-label="Select all classes"
                  className="w-4 h-4 rounded border-slate-300 text-[#0080f6] focus:ring-blue-400 cursor-pointer accent-[#0080f6]"
                />
              </th>
              <th className="py-4 px-3 w-12 font-bold text-slate-900 whitespace-nowrap">#</th>
              <th className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Class Name</th>
              <th className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Grade</th>
              <th className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Teachers</th>
              <th className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Students</th>
              <th className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">Status</th>
              <th className="py-4 px-4 font-bold text-slate-900 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/90 text-xs sm:text-sm font-medium text-slate-700">
            {classes.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                  No classes found matching the selected filters.
                </td>
              </tr>
            ) : (
              classes.map((cls, idx) => {
                const isSelected = selectedIds.includes(cls.id);
                const teacherName = cls.primaryTeacher?.fullName || cls.primaryTeacher?.name;
                const teacherAvatar = cls.primaryTeacher?.avatar;
                const moreCount = cls.moreTeachersCount ?? Math.max(0, (cls.teachersCount || cls.teachers?.length || 0) - 1);
                const isActive = (cls.status || "").toLowerCase() === "active";

                return (
                  <tr
                    key={cls.id}
                    className={`transition-colors ${
                      isSelected ? "bg-blue-50/40" : "hover:bg-slate-50/60"
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelectOne(cls.id)}
                        aria-label={`Select class ${cls.name}`}
                        className="w-4 h-4 rounded border-slate-300 text-[#0080f6] focus:ring-blue-400 cursor-pointer accent-[#0080f6]"
                      />
                    </td>

                    {/* Number */}
                    <td className="py-4 px-3 font-medium text-slate-800 whitespace-nowrap">
                      {cls.index || startIndex + idx + 1}
                    </td>

                    {/* Class Name */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <Link
                        to={`/admin/classes/${cls.id}`}
                        className="font-bold text-slate-900 text-sm hover:text-[#0080f6] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {cls.name}
                      </Link>
                      {cls.section && (
                        <span className="text-xs text-slate-400 ml-1.5 font-normal">
                          ({cls.section})
                        </span>
                      )}
                    </td>

                    {/* Grade */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-slate-600 font-medium whitespace-nowrap">
                        {cls.grade}
                      </span>
                    </td>

                    {/* Teachers (Avatar + More badge) */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5 whitespace-nowrap">
                        {cls.primaryTeacher ? (
                          <>
                            {teacherAvatar ? (
                              <img
                                src={teacherAvatar}
                                alt={teacherName || "Teacher"}
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0 border border-slate-200/60 shadow-2xs"
                              />
                            ) : (
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-[#0080f6] font-bold text-xs flex items-center justify-center shrink-0">
                                {(teacherName || "T")[0]}
                              </div>
                            )}
                            <span className="font-semibold text-xs sm:text-sm text-slate-800">
                              {teacherName}
                            </span>
                          </>
                        ) : (
                          <span className="text-slate-400 text-xs italic">Unassigned</span>
                        )}
                        {moreCount > 0 && (
                          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#eaf4fe] text-[#0080f6] font-bold text-[10px] sm:text-xs whitespace-nowrap">
                            +{moreCount} More
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Students */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-slate-700 font-medium text-sm whitespace-nowrap">
                        {cls.studentsCount || 0}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap capitalize ${
                          isActive
                            ? "bg-[#eefcf3] text-[#16a34a]"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isActive ? "bg-[#16a34a]" : "bg-slate-400"
                          }`}
                        />
                        <span>{cls.status || "Inactive"}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => onViewClass(cls)}
                          className="p-1 text-[#0080f6] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="View Details"
                          aria-label={`View ${cls.name}`}
                        >
                          <Eye className="w-4 h-4 stroke-[2.2]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onEditClass(cls)}
                          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit Class"
                          aria-label={`Edit ${cls.name}`}
                        >
                          <Edit2 className="w-4 h-4 stroke-[2]" />
                        </button>
                        {onDeleteClass && (
                          <button
                            type="button"
                            onClick={() => onDeleteClass(cls)}
                            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Class"
                            aria-label={`Delete ${cls.name}`}
                          >
                            <Trash2 className="w-4 h-4 stroke-[2]" />
                          </button>
                        )}
                        {onMoreOptions && (
                          <button
                            type="button"
                            onClick={(e) => onMoreOptions(cls, e)}
                            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="More Options"
                            aria-label={`More options for ${cls.name}`}
                          >
                            <MoreHorizontal className="w-4 h-4" />
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

export default AdminClassesTable;

