import { useState } from "react";
import { ArrowLeft, BarChart2, ClipboardList } from "lucide-react";
import { studentProgressMock } from "@/mocks";
import {
  StudentProgressKpiCards,
  StudentSubjectProgressBar,
  StudentAttendanceKpiCards,
  StudentAttendanceCalendar,
  StudentAttendanceOverviewCard,
  StudentAttendanceFilterBar,
} from "../components/progress";

export const StudentProgressPage = () => {
  const [activeTab, setActiveTab] = useState("progress"); // "progress" | "attendance"
  const [selectedMonth, setSelectedMonth] = useState("October 2026");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { kpiStats, subjectProgress, attendance } = studentProgressMock;

  const handleResetFilters = () => {
    setSelectedMonth("October 2026");
    setSelectedSubject("all");
    setSelectedStatus("all");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {activeTab === "attendance" && (
            <button
              type="button"
              onClick={() => setActiveTab("progress")}
              className="w-10 h-10 rounded-full bg-white border border-slate-200/90 text-slate-700 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs shrink-0"
              aria-label="Back to Progress"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeTab === "progress" ? "My Progress" : "Attendance"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {activeTab === "progress"
                ? "See your learning activity and overall progress."
                : "Track your class attendance and leave history."}
            </p>
          </div>
        </div>

        {/* Circular Attendance Rate Badge on Screen 2 */}
        {activeTab === "attendance" && (
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-full border-4 border-emerald-500 bg-white flex flex-col items-center justify-center shadow-2xs">
              <span className="text-sm font-black text-slate-900 leading-none">
                {attendance.rate}%
              </span>
              <span className="text-[8px] font-bold text-slate-400 uppercase leading-none mt-0.5">
                Rate
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Sub-tab Pill Switcher: Progress | Attendance */}
      <div className="bg-slate-100/80 p-1 rounded-full inline-flex items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("progress")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "progress"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <BarChart2 className="w-4 h-4 text-blue-500" />
          <span>Progress</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("attendance")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "attendance"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <ClipboardList className="w-4 h-4 text-blue-500" />
          <span>Attendance</span>
        </button>
      </div>

      {/* Screen 1: Progress View */}
      {activeTab === "progress" && (
        <div className="space-y-6">
          <StudentProgressKpiCards kpiStats={kpiStats} />
          <StudentSubjectProgressBar subjectProgress={subjectProgress} />
        </div>
      )}

      {/* Screen 2: Attendance View */}
      {activeTab === "attendance" && (
        <div className="space-y-6">
          <StudentAttendanceKpiCards attendance={attendance} />

          <StudentAttendanceFilterBar
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
            selectedSubject={selectedSubject}
            onSubjectChange={setSelectedSubject}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            onReset={handleResetFilters}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <StudentAttendanceCalendar attendance={attendance} />
            </div>
            <div className="lg:col-span-4">
              <StudentAttendanceOverviewCard attendance={attendance} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProgressPage;

