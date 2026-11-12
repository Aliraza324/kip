import { Layers, Calendar, User, Video } from "lucide-react";

export const StudentClassCard = ({ classItem, onEnterClass }) => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4">
      {/* Subject Info */}
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base shrink-0 shadow-2xs ${classItem.symbolColor}`}
        >
          {classItem.symbol}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug break-words">
            {classItem.fullName}
          </h3>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-500 mt-1">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${classItem.typeBadge}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span>{classItem.type}</span>
            </span>
            <div className="flex items-center gap-1 text-slate-600">
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{classItem.teacher}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Status: Responsive 3-Col Unified Pill on Mobile, Row on Desktop */}
      <div className="grid grid-cols-3 gap-2 p-2.5 sm:p-3 rounded-2xl bg-slate-50/80 border border-slate-100/90 items-center text-center lg:bg-transparent lg:border-0 lg:p-0 lg:flex lg:flex-row lg:gap-8 lg:text-left">
        {/* Materials Count */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1 sm:gap-2">
          <Layers className="w-4 h-4 text-[#0080f6] shrink-0" />
          <div className="text-center sm:text-left">
            <p className="font-bold text-slate-800 text-xs sm:text-sm leading-tight">
              {classItem.materialsCount}
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">Materials</p>
          </div>
        </div>

        {/* Scheduled Count */}
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1 sm:gap-2 border-x border-slate-200/60 lg:border-0 px-1 sm:px-2 lg:px-0">
          <Calendar className="w-4 h-4 text-[#0080f6] shrink-0" />
          <div className="text-center sm:text-left">
            <p className="font-bold text-slate-800 text-xs sm:text-sm leading-tight">
              {classItem.scheduledCount}
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400">Scheduled</p>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col items-center justify-center lg:items-start">
          <span className="hidden lg:block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
            Status
          </span>
          <span
            className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold text-center whitespace-nowrap ${classItem.statusBadge}`}
          >
            {classItem.status}
          </span>
        </div>
      </div>

      {/* Action Button: Enter Class */}
      <div className="flex items-center justify-end shrink-0 pt-2 lg:pt-0 border-t border-slate-100 lg:border-t-0">
        <button
          type="button"
          onClick={() => onEnterClass(classItem)}
          className="w-full sm:w-auto py-2.5 px-5 rounded-full bg-gradient-to-r from-[#0060d0] to-[#0080f6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <Video className="w-4 h-4" />
          <span>Enter Class</span>
        </button>
      </div>
    </div>
  );
};

export default StudentClassCard;