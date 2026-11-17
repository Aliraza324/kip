import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export const AdminClassesFilters = ({
  gradeOptions = [],
  selectedGrade,
  onSelectGrade,
  teacherOptions = [],
  selectedTeacher,
  onSelectTeacher,
  statusOptions = [],
  selectedStatus,
  onSelectStatus,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null); // 'grade' | 'teacher' | 'status' | null
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const renderDropdown = (defaultLabel, currentVal, options = [], onSelect, key) => {
    const isOpen = openDropdown === key;

    let displayLabel = defaultLabel;
    if (currentVal && currentVal !== defaultLabel) {
      const matched = options.find((o) => {
        const val = typeof o === "object" ? o.id || o.value : o;
        return val === currentVal;
      });
      if (matched) {
        displayLabel = typeof matched === "object" ? matched.label || matched.name : matched;
      } else {
        displayLabel = currentVal;
      }
    }

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => toggleDropdown(key)}
          className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white border text-xs sm:text-sm font-medium transition-all shadow-2xs cursor-pointer ${
            isOpen
              ? "border-[#0080f6] ring-2 ring-blue-100 text-[#0080f6]"
              : "border-slate-200/90 text-slate-700 hover:border-slate-300 hover:bg-slate-50/60"
          }`}
        >
          <span>{displayLabel}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-[#0080f6]" : "text-slate-400"
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full mt-2 w-48 sm:w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150 max-h-60 overflow-y-auto no-scrollbar">
            {options.map((opt) => {
              const optVal = typeof opt === "object" ? opt.id || opt.value : opt;
              const optLabel = typeof opt === "object" ? opt.label || opt.name : opt;
              const isSelected = (currentVal || defaultLabel) === optVal || displayLabel === optLabel;

              return (
                <button
                  key={optVal}
                  type="button"
                  onClick={() => {
                    onSelect(optVal);
                    setOpenDropdown(null);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2 text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-blue-50/80 text-[#0080f6] font-bold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="truncate">{optLabel}</span>
                  {isSelected && <Check className="w-4 h-4 text-[#0080f6]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="flex flex-wrap items-center gap-3">
      {renderDropdown("All Grades", selectedGrade, gradeOptions, onSelectGrade, "grade")}
      {renderDropdown("All Teachers", selectedTeacher, teacherOptions, onSelectTeacher, "teacher")}
      {renderDropdown("All Status", selectedStatus, statusOptions, onSelectStatus, "status")}
    </div>
  );
};

export default AdminClassesFilters;

