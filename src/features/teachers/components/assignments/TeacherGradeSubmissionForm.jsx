import { useState } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

export const TeacherGradeSubmissionForm = ({
  initialMarks = 92,
  initialGrade = "A",
  initialFeedback = "Excellent work! Your solutions are accurate and well-written. Keep up the great effort.",
  totalMarks = 100,
  onSave,
  onCancel,
}) => {
  const [marks, setMarks] = useState(initialMarks);
  const [grade, setGrade] = useState(initialGrade);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    if (onSave) {
      onSave({ marks, grade, feedback });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-5"
    >
      <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
        Grade Assignment
      </h3>

      {/* Marks and Grade row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Marks Input */}
        <div className="flex-1 space-y-1.5">
          <label className="text-xs sm:text-sm font-bold text-slate-800 block">
            Marks <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              placeholder="0"
              max={totalMarks}
              min="0"
              required
              className="w-full sm:w-48 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0080f6] focus:bg-white transition-all"
            />
            <span className="text-sm font-bold text-slate-400 shrink-0">
              / {totalMarks}
            </span>
          </div>
        </div>

        {/* Grade Letter dropdown */}
        <div className="w-full sm:w-44 space-y-1.5">
          <label className="text-xs sm:text-sm font-bold text-slate-800 block">
            Grade
          </label>
          <div className="relative">
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              aria-label="Grade letter"
              className="w-full appearance-none px-4 pr-10 py-2.5 bg-emerald-50/70 border border-emerald-200/60 rounded-2xl text-xs sm:text-sm font-bold text-emerald-700 focus:outline-none focus:border-emerald-400 cursor-pointer transition-all"
            >
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="F">F</option>
            </select>
            <ChevronDown className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Feedback to Student */}
      <div className="space-y-1.5">
        <label className="text-xs sm:text-sm font-bold text-slate-800 block">
          Feedback to Student
        </label>
        <textarea
          rows={4}
          maxLength={500}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Provide constructive feedback to the student..."
          className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0080f6] focus:bg-white resize-none transition-all"
        />
        <div className="flex justify-end text-[11px] text-slate-400 font-semibold pr-1">
          {feedback.length} / 500
        </div>
      </div>

      {/* Success notification if saved */}
      {isSaved && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Grade has been saved successfully!</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-800 bg-white transition-all cursor-pointer shadow-2xs"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-7 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer"
        >
          Save Grade
        </button>
      </div>
    </form>
  );
};

export default TeacherGradeSubmissionForm;

