import { useState, useEffect } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

const calculateGradeLetter = (marksNum, total) => {
  if (total <= 0) return "A";
  const pct = (marksNum / total) * 100;
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 75) return "B+";
  if (pct >= 70) return "B";
  if (pct >= 65) return "C+";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  return "F";
};

export const TeacherGradeSubmissionForm = ({
  initialMarks = "",
  initialGrade = "A",
  initialFeedback = "",
  totalMarks = 100,
  isSubmitting = false,
  onSave,
  onCancel,
}) => {
  const [marks, setMarks] = useState(initialMarks);
  const [grade, setGrade] = useState(initialGrade);
  const [feedback, setFeedback] = useState(initialFeedback);
  const [gradeManuallySet, setGradeManuallySet] = useState(false);

  useEffect(() => {
    if (initialMarks !== undefined && initialMarks !== null) {
      setMarks(initialMarks);
    }
  }, [initialMarks]);

  useEffect(() => {
    if (initialGrade) {
      setGrade(initialGrade);
    }
  }, [initialGrade]);

  useEffect(() => {
    if (initialFeedback) {
      setFeedback(initialFeedback);
    }
  }, [initialFeedback]);

  const handleMarksChange = (val) => {
    setMarks(val);
    const num = Number(val);
    if (!isNaN(num) && !gradeManuallySet) {
      setGrade(calculateGradeLetter(num, totalMarks));
    }
  };

  const handleGradeChange = (val) => {
    setGrade(val);
    setGradeManuallySet(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        marks: Number(marks),
        gradeLetter: grade,
        feedback: feedback.trim(),
      });
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
              onChange={(e) => handleMarksChange(e.target.value)}
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
              onChange={(e) => handleGradeChange(e.target.value)}
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
          Feedback to Student (Optional)
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

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-7 py-2.5 rounded-2xl bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-95"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>{isSubmitting ? "Saving..." : "Save Grade"}</span>
        </button>
      </div>
    </form>
  );
};

export default TeacherGradeSubmissionForm;
