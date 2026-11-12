import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, Umbrella } from "lucide-react";
import { calendarCellsMock, attendanceLogMock } from "@/mocks";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const StudentAttendanceCalendar = () => {
  const [viewMode, setViewMode] = useState("month"); // "month" | "week" | "list"
  const [currentMonth, setCurrentMonth] = useState("September 2026");

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
      {/* Top Header: Month Switcher & View Modes */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Month Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setCurrentMonth("August 2026")}
            className="p-1 rounded-full text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <h2 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">
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
                className={`px-3 sm:px-5 py-1.5 rounded-full transition-all cursor-pointer ${
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

      {/* Month View */}
      {viewMode === "month" && (
        <div className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-7 gap-1 sm:gap-3 text-center text-[11px] sm:text-sm font-semibold text-slate-400">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-3">
            {calendarCellsMock.map((cell, idx) => {
              if (cell.isPrev || cell.isNext) {
                return (
                  <div
                    key={idx}
                    className="h-11 sm:h-16 flex items-center justify-center text-xs sm:text-sm font-semibold text-slate-300"
                  >
                    {cell.day}
                  </div>
                );
              }

              if (cell.status === "present") {
                return (
                  <div
                    key={idx}
                    className="h-11 sm:h-16 rounded-xl sm:rounded-3xl bg-[#f0fdf4] border border-[#bbf7d0]/70 flex flex-col items-center justify-center p-1 shadow-2xs hover:scale-105 transition-transform cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-none">
                      {cell.day}
                    </span>
                    <span className="w-3.5 sm:w-4 h-3.5 sm:h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center mt-1">
                      <Check className="w-2 sm:w-2.5 h-2 sm:h-2.5 stroke-[3]" />
                    </span>
                  </div>
                );
              }

              if (cell.status === "leave") {
                return (
                  <div
                    key={idx}
                    className="h-11 sm:h-16 rounded-xl sm:rounded-3xl bg-[#fffbeb] border border-[#fde68a]/90 flex flex-col items-center justify-center p-1 shadow-2xs hover:scale-105 transition-transform cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-amber-700 leading-none">
                      {cell.day}
                    </span>
                    <Umbrella className="w-3 sm:w-4 h-3 sm:h-4 text-amber-500 mt-1" />
                  </div>
                );
              }

              return (
                <div
                  key={idx}
                  className="h-11 sm:h-16 flex items-center justify-center text-xs sm:text-base font-bold text-slate-800"
                >
                  {cell.day}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {viewMode === "week" && (
        <div className="space-y-3">
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400">
            {DAYS_OF_WEEK.map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-3">
            {calendarCellsMock.slice(7, 14).map((cell, idx) => (
              <div
                key={idx}
                className={`h-14 sm:h-16 rounded-xl sm:rounded-3xl flex flex-col items-center justify-center p-1.5 ${
                  cell.status === "present"
                    ? "bg-[#f0fdf4] border border-[#bbf7d0]/70"
                    : "bg-slate-50"
                }`}
              >
                <span className="text-xs sm:text-sm font-bold text-slate-900">{cell.day}</span>
                {cell.status === "present" && (
                  <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center mt-1">
                    <Check className="w-2 h-2 stroke-[3]" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {attendanceLogMock.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs sm:text-sm"
            >
              <div>
                <p className="font-bold text-slate-800">{item.date}</p>
                <p className="text-[11px] text-slate-400">{item.day}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs text-slate-500">{item.time}</span>
                <span
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold ${
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
