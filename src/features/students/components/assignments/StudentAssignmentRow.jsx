import {
  FileText,
  FlaskConical,
  BookOpen,
  Atom,
  Share2,
  Calendar,
} from "lucide-react";

const getSubjectIcon = (iconType, subject) => {
  if (iconType === "sqrt" || subject === "Mathematics") {
    return <span className="text-sm font-black text-purple-600">√x</span>;
  }
  if (iconType === "flask" || subject === "Science") {
    return <FlaskConical className="w-3.5 h-3.5 text-sky-500" strokeWidth={2.2} />;
  }
  if (iconType === "book" || subject === "English") {
    return <BookOpen className="w-3.5 h-3.5 text-amber-500" strokeWidth={2.2} />;
  }
  if (iconType === "atom" || subject === "Physics") {
    return <Atom className="w-3.5 h-3.5 text-indigo-500" strokeWidth={2.2} />;
  }
  return <Share2 className="w-3.5 h-3.5 text-teal-500" strokeWidth={2.2} />;
};

const getStatusBadge = (status) => {
  if (status === "Submitted") {
    return (
      <span className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200/70 whitespace-nowrap">
        Submitted
      </span>
    );
  }
  if (status === "Overdue") {
    return (
      <span className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200/70 whitespace-nowrap">
        Overdue
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-amber-50 text-amber-600 border border-amber-200/70 whitespace-nowrap">
      Pending
    </span>
  );
};

export const StudentAssignmentRow = ({ assignment, onView }) => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-3.5 sm:p-4 shadow-2xs hover:border-blue-200 hover:shadow-xs transition-all">
      {/* Mobile Card Layout (< md) */}
      <div className="flex flex-col gap-2.5 md:hidden">
        {/* Top: Icon + Title & Type + Status Badge */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0 shadow-2xs">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-slate-900 leading-snug break-words">
                {assignment.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {assignment.subtitle}
              </p>
            </div>
          </div>
          <div className="shrink-0 pt-0.5">
            {getStatusBadge(assignment.status)}
          </div>
        </div>

        {/* Middle: Subject Pill & Due Date in a Clean Single Info Row */}
        <div className="flex items-center justify-between text-xs text-slate-500 py-1.5 px-3 rounded-xl bg-slate-50/80 border border-slate-100/80">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center shrink-0 shadow-2xs">
              {getSubjectIcon(assignment.subjectIcon, assignment.subject)}
            </div>
            <span className="font-semibold text-slate-700 text-xs truncate">{assignment.subject}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium shrink-0">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{assignment.dueDate} • {assignment.dueTime}</span>
          </div>
        </div>

        {/* Bottom: Action View Button */}
        <div className="pt-0.5">
          <button
            type="button"
            onClick={() => onView(assignment)}
            className="w-full py-2 px-4 rounded-xl border border-blue-400 text-[#0080f6] hover:bg-[#0080f6] hover:text-white text-xs font-bold transition-all cursor-pointer active:scale-98 shadow-2xs flex items-center justify-center gap-1.5"
          >
            <span>View</span>
          </button>
        </div>
      </div>

      {/* Desktop Table Row (>= md) */}
      <div className="hidden md:flex md:items-center justify-between gap-4">
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

        <div className="flex items-center gap-2 md:w-2/12">
          <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
            {getSubjectIcon(assignment.subjectIcon, assignment.subject)}
          </div>
          <span className="text-xs sm:text-sm font-medium text-slate-700 truncate">
            {assignment.subject}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-600 font-medium md:w-2/12">
          <span className="truncate">{assignment.dueDate}</span>
          <span className="text-slate-400 truncate">{assignment.dueTime}</span>
        </div>

        <div className="md:w-1.5/12 flex items-center">
          {getStatusBadge(assignment.status)}
        </div>

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
    </div>
  );
};

export default StudentAssignmentRow;