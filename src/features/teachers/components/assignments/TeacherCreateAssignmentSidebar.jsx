import { useState } from "react";
import { Search, Check } from "lucide-react";

export const TeacherCreateAssignmentSidebar = ({
  classes = [],
  selectedClasses = [],
  onToggleClass,
  notifyStudents = true,
  onToggleNotify,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClasses = classes.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Assign To Box */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <h4 className="text-sm sm:text-base font-bold text-slate-900">
          Assign To <span className="text-rose-500">*</span>
        </h4>

        {/* Tab / Pill button */}
        <div>
          <button
            type="button"
            className="px-4 py-1.5 rounded-full bg-[#0080f6] text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            By Class
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search class..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
          />
        </div>

        {/* Class checkboxes list */}
        <div className="space-y-2 pt-1">
          {filteredClasses.map((cls) => {
            const isChecked = selectedClasses.includes(cls.id);
            return (
              <label
                key={cls.id}
                onClick={() => onToggleClass(cls.id)}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                  isChecked
                    ? "bg-blue-50/50 border-blue-200 text-slate-900"
                    : "bg-slate-50/50 border-slate-100 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-[#0080f6] border-[#0080f6] text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs sm:text-sm font-bold truncate">
                    {cls.name}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 shrink-0 ml-2">
                  {cls.studentsCount} Students
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Settings Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
          <span>⚙️</span>
          <span>Settings</span>
        </h4>

        {/* Toggle Notify Students */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-xs sm:text-sm font-medium text-slate-700">
            Notify students about this assignment
          </span>
          <button
            type="button"
            onClick={onToggleNotify}
            aria-label="Toggle notify students"
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
              notifyStudents ? "bg-[#0080f6]" : "bg-slate-200"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                notifyStudents ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCreateAssignmentSidebar;

