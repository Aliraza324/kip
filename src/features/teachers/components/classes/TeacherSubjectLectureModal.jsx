import { X, BookOpen, Video, FileText, CheckCircle2 } from "lucide-react";

export const TeacherSubjectLectureModal = ({ isOpen, onClose, subject, className: classTitle }) => {
  if (!isOpen || !subject) return null;

  const mockLectures = [
    { id: 1, number: "Lecture 01", title: `${subject.name} Fundamentals & Introduction`, duration: "45 mins", date: "Nov 3, 2026", status: "Completed" },
    { id: 2, number: "Lecture 02", title: subject.currentLecture || "Key Identities and Practice Questions", duration: "50 mins", date: "Nov 5, 2026", status: "Live Today" },
    { id: 3, number: "Lecture 03", title: "Problem Solving & Analytical Methods", duration: "45 mins", date: "Nov 7, 2026", status: "Scheduled" },
    { id: 4, number: "Lecture 04", title: "Review Exercises and Quiz Prep", duration: "45 mins", date: "Nov 10, 2026", status: "Scheduled" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-base ${subject.colorClass}`}>
              {subject.symbol}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{subject.name} Lectures</h3>
              <p className="text-xs text-slate-500">{classTitle} • {subject.totalLectures || 12} Lectures total</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lectures List */}
        <div className="p-4 sm:p-5 space-y-3 overflow-y-auto no-scrollbar flex-1">
          {mockLectures.map((lec) => (
            <div
              key={lec.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                lec.status === "Live Today"
                  ? "bg-blue-50/70 border-blue-200 shadow-2xs"
                  : "bg-slate-50/60 border-slate-100 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-[#0080f6] uppercase tracking-wider">{lec.number}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    lec.status === "Live Today"
                      ? "bg-[#0080f6] text-white"
                      : lec.status === "Completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {lec.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-1">{lec.title}</h4>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                <span>⏱️ {lec.duration}</span>
                <span>📅 {lec.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#0080f6] text-white text-xs font-bold hover:bg-[#006fd6] transition-all cursor-pointer shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherSubjectLectureModal;

