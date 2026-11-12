import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, Umbrella } from "lucide-react";

export const StudentAttendanceCalendar = () => {
  const [viewMode, setViewMode] = useState("month"); // "month" | "week" | "list"
  const [currentMonth, setCurrentMonth] = useState("September 2026");

  // Grid dates exactly matching the user's reference image (media_1794469342796_3477d051.png)
  const calendarCells = [
    // Row 1
    { day: 28, isPrev: true },
    { day: 29, isPrev: true },
    { day: 30, isPrev: true },
    { day: 1, status: "present" },
    { day: 2, status: "present" },
    { day: 3, status: "present" },
    { day: 4, isWeekend: true },
    // Row 2
    { day: 5, isWeekend: true },
    { day: 6, status: "present" },
    { day: 7, status: "present" },
    { day: 8, status: "present" },
    { day: 9, status: "present" },
    { day: 10, status: "present" },
    { day: 11, isWeekend: true },
    // Row 3
    { day: 12, isWeekend: true },
    { day: 13, status: "present" },
    { day: 14, status: "present" },
    { day: 15, status: "leave" },
    { day: 16, status: "present" },
    { day: 17, status: "present" },
    { day: 18, isWeekend: true },
    // Row 4
    { day: 19, isWeekend: true },
    { day: 20, status: "present" },
    { day: 21, status: "present" },
    { day: 22, status: "present" },
    { day: 23, status: "present" },
    { day: 24, status: "leave" },
    { day: 25, isWeekend: true },
    // Row 5
    { day: 26, isWeekend: true },
    { day: 27, status: "present" },
    { day: 28, status: "present" },
    { day: 29, status: "present" },
    { day: 30, status: "present" },
    { day: 31, isWeekend: true },
    { day: 1, isNext: true },
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const attendanceLog = [
    { date: "Sep 30, 2026", day: "Wednesday", status: "present", time: "10:00 AM" },
    { date: "Sep 29, 2026", day: "Tuesday", status: "present", time: "10:00 AM" },
    { date: "Sep 28, 2026", day: "Monday", status: "present", time: "10:00 AM" },
    { date: "Sep 24, 2026", day: "Thursday", status: "leave", time: "Approved Leave" },
    { date: "Sep 23, 2026", day: "Wednesday", status: "present", time: "10:00 AM" },
    { date: "Sep 15, 2026", day: "Tuesday", status: "leave", time: "Approved Leave" },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-2xs space-y-6">
      {/* Top Header Matching Image Exactly */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Month Navigation */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentMonth("August 2026")}
            className="p-1 rounded-full text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {currentMonth}
          </h2>
          <button
            type="button"
            onClick={() => setCurrentMonth("October 2026")}
            className="p-1 rounded-full text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
            aria-label="Next Month"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* View Switcher Pills: Month | Week | List */}
        <div className="bg-slate-100/70 p-1 rounded-full flex items-center gap-1 text-xs font-semibold">
          {["Month", "Week", "List"].map((label) => {
            const key = label.toLowerCase();
            const isActive = viewMode === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setViewMode(key)}
                className={`px-5 py-1.5 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0080f6] text-white shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900 font-medium"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* View 1: Month View Matching Reference Image Exactly */}
      {viewMode === "month" && (
        <div className="space-y-4">
          {/* Days of Week Row */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center text-xs sm:text-sm font-semibold text-slate-400">
            {daysOfWeek.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* 7-Column Grid of Squircles */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {calendarCells.map((cell, idx) => {
              if (cell.isPrev || cell.isNext) {
                return (
                  <div
                    key={idx}
                    className="h-14 sm:h-16 flex items-center justify-center text-sm font-semibold text-slate-300"
                  >
                    {cell.day}
                  </div>
                );
              }

              if (cell.status === "present") {
                return (
                  <div
                    key={idx}
                    className="h-14 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#f0fdf4] border border-[#bbf7d0]/70 flex flex-col items-center justify-center p-1.5 shadow-2xs hover:scale-105 transition-transform cursor-pointer"
                  >
                    <span className="text-sm font-bold text-slate-900 leading-none">
                      {cell.day}
                    </span>
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center mt-1.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                  </div>
                );
              }

              if (cell.status === "leave") {
                return (
                  <div
                    key={idx}
                    className="h-14 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#fffbeb] border border-[#fde68a]/90 flex flex-col items-center justify-center p-1.5 shadow-2xs hover:scale-105 transition-transform cursor-pointer"
                  >
                    <span className="text-sm font-bold text-amber-700 leading-none">
                      {cell.day}
                    </span>
                    <Umbrella className="w-4 h-4 text-amber-500 mt-1.5" />
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className="h-14 sm:h-16 flex items-center justify-center text-sm sm:text-base font-bold text-slate-800"
                >
                  {cell.day}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Week View */}
      {viewMode === "week" && (
        <div className="space-y-3">
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400">
            {daysOfWeek.map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {calendarCells.slice(7, 14).map((cell, idx) => (
              <div
                key={idx}
                className={`h-16 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-2 ${
                  cell.status === "present"
                    ? "bg-[#f0fdf4] border border-[#bbf7d0]/70"
                    : "bg-slate-50"
                }`}
              >
                <span className="text-sm font-bold text-slate-900">{cell.day}</span>
                {cell.status === "present" && (
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center mt-1">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 3: List View */}
      {viewMode === "list" && (
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {attendanceLog.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm"
            >
              <div>
                <p className="font-bold text-slate-800">{item.date}</p>
                <p className="text-[11px] text-slate-400">{item.day}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">{item.time}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === "present"
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : "bg-amber-50 text-amber-600 border border-amber-200"
                  }`}
                >
                  {item.status === "present" ? "Present" : "Leave"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentAttendanceCalendar;
