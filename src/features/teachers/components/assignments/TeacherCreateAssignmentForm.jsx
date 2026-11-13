import { useState } from "react";
import { FileText, X, Plus, ChevronDown } from "lucide-react";

export const TeacherCreateAssignmentForm = ({
  formData,
  onChange,
  materials,
  onAddMaterial,
  onRemoveMaterial,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
      {/* Assignment Title */}
      <div className="space-y-1.5">
        <label className="text-xs sm:text-sm font-bold text-slate-800 block">
          Assignment Title <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="e.g. Quadratic Equations – Practice Problems"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
        />
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <label className="text-xs sm:text-sm font-bold text-slate-800 block">
          Subject <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <select
            value={formData.subject}
            onChange={(e) => onChange("subject", e.target.value)}
            aria-label="Select subject"
            className="w-full appearance-none px-4 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0080f6] focus:bg-white cursor-pointer transition-all"
          >
            <option value="Algebra">Algebra</option>
            <option value="Geometry">Geometry</option>
            <option value="Trigonometry">Trigonometry</option>
            <option value="Statistics">Statistics</option>
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Description / Instructions */}
      <div className="space-y-1.5">
        <label className="text-xs sm:text-sm font-bold text-slate-800 block">
          Description / Instructions <span className="text-rose-500">*</span>
        </label>
        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe assignment instructions for students..."
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0080f6] focus:bg-white resize-none transition-all"
        />
      </div>

      {/* Due Date, Due Time, Total Marks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Due Date */}
        <div className="space-y-1.5">
          <label className="text-xs sm:text-sm font-bold text-slate-800 block">
            Due Date <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.dueDate}
            onChange={(e) => onChange("dueDate", e.target.value)}
            placeholder="Nov 12, 2026"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
          />
        </div>

        {/* Due Time */}
        <div className="space-y-1.5">
          <label className="text-xs sm:text-sm font-bold text-slate-800 block">
            Due Time <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={formData.dueTime}
            onChange={(e) => onChange("dueTime", e.target.value)}
            placeholder="11:59 PM"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
          />
        </div>

        {/* Total Marks */}
        <div className="space-y-1.5">
          <label className="text-xs sm:text-sm font-bold text-slate-800 block">
            Total Marks <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            value={formData.totalMarks}
            onChange={(e) => onChange("totalMarks", e.target.value)}
            placeholder="100"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Attach Materials (Optional) */}
      <div className="space-y-2 pt-1">
        <label className="text-xs sm:text-sm font-bold text-slate-800 block">
          Attach Materials (Optional)
        </label>
        <div className="flex flex-wrap items-center gap-3">
          {materials.map((file, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-blue-50/70 border border-blue-100 rounded-2xl text-xs sm:text-sm font-semibold text-slate-800 shadow-2xs"
            >
              <FileText className="w-4 h-4 text-[#0080f6] shrink-0" />
              <span>
                {file.name} <span className="text-slate-400 font-normal">({file.size})</span>
              </span>
              <button
                type="button"
                onClick={() => onRemoveMaterial(idx)}
                className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors ml-1 cursor-pointer"
                title="Remove file"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={onAddMaterial}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:border-[#0080f6] rounded-2xl text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0080f6] bg-white transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherCreateAssignmentForm;

