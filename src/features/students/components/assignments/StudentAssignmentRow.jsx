import {
  FileText,
  FlaskConical,
  BookOpen,
  Atom,
  Share2,
} from "lucide-react";

const getSubjectIcon = (iconType, subject) => {
  if (iconType === "sqrt" || subject === "Mathematics") {
    return <span className="text-base font-black text-purple-600">√x</span>;
  }
  if (iconType === "flask" || subject === "Science") {
    return <FlaskConical className="w-4 h-4 text-sky-500" strokeWidth={2.2} />;
  }
  if (iconType === "book" || subject === "English") {
    return <BookOpen className="w-4 h-4 text-amber-500" strokeWidth={2.2} />;
  }
  if (iconType === "atom" || subject === "Physics") {
    return <Atom className="w-4 h-4 text-indigo-500" strokeWidth={2.2} />;
  }
  return <Share2 className="w-4 h-4 text-teal-500" strokeWidth={2.2} />;
};

const getStatusBadge = (status) => {
  if (status === "Submitted") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/70">
        Submitted
      </span>
    );
  }
  if (status === "Overdue") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200/70">
        Overdue
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200/70">
      Pending
    </span>
  );
};

export const StudentAssignmentRow = ({ assignment, onView }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-4 shadow-2xs hover:border-slate-200/90 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4">
      {/* Assignment Info */}
      <div className="flex items-center gap-3.5 min-w-0 md:w-5/12">
        <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 stroke-[2.2]" />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-slate-900 truncate">
            {assignment.title}
          </h4>
          <p className="text-xs text-slate-400 truncate mt-0.5">
            {assignment.subtitle}
          </p>
        </div>
      </div>

      {/* Subject */}
      <div className="flex items-center gap-2 md:w-2/12">
        <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
          {getSubjectIcon(assignment.subjectIcon, assignment.subject)}
        </div>
        <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">
          {assignment.subject}
        </span>
      </div>

      {/* Due Date & Time */}
      <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-600 font-medium md:w-2/12">
        <span className="truncate">{assignment.dueDate}</span>
        <span className="text-slate-400 truncate">{assignment.dueTime}</span>
      </div>

      {/* Status Badge */}
      <div className="md:w-1.5/12 flex items-center">
        {getStatusBadge(assignment.status)}
      </div>

      {/* Action View Button */}
      <div className="md:w-1.5/12 flex items-center justify-end">
        <button
          type="button"
          onClick={() => onView(assignment)}
          className="px-5 py-1.5 rounded-full border border-blue-400 text-[#0080f6] hover:bg-[#0080f6] hover:text-white text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-2xs"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default StudentAssignmentRow;

