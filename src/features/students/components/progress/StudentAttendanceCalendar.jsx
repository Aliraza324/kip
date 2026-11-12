import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, Umbrella } from "lucide-react";

export const StudentAttendanceCalendar = ({ attendance }) => {
  const [viewMode, setViewMode] = useState("month"); // "month" | "week" | "list"
  const [currentMonth, setCurrentMonth] = useState("October 2026");

  // Grid dates matching October 2026 reference image
  const calendarCells = [
    { day: 28, isPrevMonth: true },
    { day: 29, isPrevMonth: true },
    { day: 30, isPrevMonth: true },
    { day: 1, status: "present" },
    { day: 2, status: "present" },
    { day: 3, status: "present" },
    { day: 4, isWeekend: true },

    { day: 5, isWeekend: true },
    { day: 6, status: "present" },
    { day: 7, status: "present" },
    { day: 8, status: "present" },
    { day: 9, status: "present" },
    { day: 10, status: "present" },
    { day: 11, isWeekend: true },

    { day: 12, isWeekend: true },
    { day: 13, status: "present" },
    { day: 14, status: "present" },
    { day: 15, status: "leave" },
    { day: 16, status: "present" },
    { day: 17, status: "present" },
    { day: 18, isWeekend: true },

    { day: 19, isWeekend: true },
    { day: 20, status: "present" },
    { day: 21, status: "present" },
    { day: 22, status: "present" },
    { day: 23, status: "present" },
    { day: 24, status: "leave" },
    { day: 25, isWeekend: true },

    { day: 26, isWeekend: true },
    { day: 27, status: "present" },
    { day: 28, status: "present" },
    { day: 29, status: "present" },
    { day: 30, status: "present" },
    { day: 31, isWeekend: true },
    { day: 1, isNextMonth: true },
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-5">
      {/* Calendar Header with Navigation and View Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Month Navigation */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentMonth("September 2026")}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {currentMonth}
          </h2>
          <button
            type="button"
            onClick={() => setCurrentMonth("November 2026")}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 transition-colors cursor-pointer"
            aria-label="Next Month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Pills: Month, Week, List */}
        <div className="bg-slate-100/80 p-1 rounded-full flex items-center gap-1 text-xs font-semibold">
          {["month", "week", "list"].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setViewMode(mode)}
              className={`px-4 py-1.5 rounded-full capitalize transition-all cursor-pointer ${
                viewMode === mode
                  ? "bg-[#0080f6] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-semibold text-slate-400">
        {daysOfWeek.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
        {calendarCells.map((cell, idx) => {
          if (cell.isPrevMonth || cell.isNextMonth) {
            return (
              <div
                key={idx}
                className="h-12 sm:h-14 rounded-2xl flex items-center justify-center text-xs sm:text-sm font-semibold text-slate-300"
              >
                {cell.day}
              </div>
            );
          }

          if (cell.status === "present") {
            return (
              <div
                key={idx}
                className="h-12 sm:h-14 rounded-2xl bg-emerald-50/70 border border-emerald-100/90 flex flex-col items-center justify-center p-1 transition-all hover:bg-emerald-100/80 cursor-pointer shadow-2xs"
              >
                <span className="text-xs sm:text-sm font-bold text-slate-800 leading-none">
                  {cell.day}
                </span>
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center mt-1">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              </div>
            );
          }

          if (cell.status === "leave") {
            return (
              <div
                key={idx}
                className="h-12 sm:h-14 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col items-center justify-center p-1 transition-all hover:bg-amber-100/80 cursor-pointer shadow-2xs"
              >
                <span className="text-xs sm:text-sm font-bold text-amber-700 leading-none">
                  {cell.day}
                </span>
                <Umbrella className="w-3.5 h-3.5 text-amber-500 mt-1" />
              </div>
            );
          }

          // Weekends / standard days
          return (
            <div
              key={idx}
              className="h-12 sm:h-14 rounded-2xl flex items-center justify-center text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {cell.day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentAttendanceCalendar;

