import { Layers, Calendar, User, Video } from "lucide-react";

export const StudentClassCard = ({ classItem, onEnterClass }) => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 p-4 sm:p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      {/* Subject Info */}
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm sm:text-base shrink-0 ${classItem.symbolColor}`}
        >
          {classItem.symbol}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
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
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>{classItem.teacher}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Stats & Status Column (User requested status column) */}
      <div className="flex flex-wrap items-center gap-5 sm:gap-8 text-xs text-slate-600 pl-1 sm:pl-0">
        {/* Materials Count */}
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#0080f6] shrink-0" />
          <div>
            <p className="font-bold text-slate-800 leading-tight">
              {classItem.materialsCount}
            </p>
            <p className="text-[11px] text-slate-400">Materials</p>
          </div>
        </div>

        {/* Scheduled Count */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#0080f6] shrink-0" />
          <div>
            <p className="font-bold text-slate-800 leading-tight">
              {classItem.scheduledCount}
            </p>
            <p className="text-[11px] text-slate-400">Scheduled</p>
          </div>
        </div>

        {/* Status Column */}
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">
            Status
          </span>
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-bold text-center ${classItem.statusBadge}`}
          >
            {classItem.status}
          </span>
        </div>
      </div>

      {/* Action Button: Enter Class Matching Image 1 */}
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

