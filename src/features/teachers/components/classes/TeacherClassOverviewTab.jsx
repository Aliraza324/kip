import { useState } from "react";
import {
  Calendar,
  Layers,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Radio,
  Video,
  RotateCcw,
} from "lucide-react";

export const TeacherClassOverviewTab = ({ classItem = {} }) => {
  const subjects = Array.isArray(classItem.subjects) ? classItem.subjects : [];
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Column 1: Class or Selected Subject Information (Left Side) */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        {selectedSubject ? (
          /* Subject-Specific Information */
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-[#0080f6] uppercase tracking-wider block">
                  Subject Details
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight truncate">
                  {selectedSubject.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubject(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer shrink-0"
                title="Back to Class Overview"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Class Info</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100/80 text-xs sm:text-sm">
              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                  <BookOpen className="w-4 h-4 text-[#0080f6]" />
                  <span>Subject</span>
                </div>
                <span className="font-bold text-slate-900">{selectedSubject.name}</span>
              </div>

              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                  <Video className="w-4 h-4 text-[#0080f6]" />
                  <span>Total Lectures</span>
                </div>
                <span className="font-bold text-slate-900">
                  {selectedSubject.totalLectures ?? (selectedSubject.lectures?.length || 0)}
                </span>
              </div>

              {selectedSubject.currentLecture && (
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                    <Radio className="w-4 h-4 text-[#0080f6]" />
                    <span>Current Topic</span>
                  </div>
                  <span className="font-bold text-slate-900 truncate max-w-[180px]">
                    {selectedSubject.currentLecture}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Status</span>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    selectedSubject.isLive
                      ? "bg-rose-50 text-rose-600 border border-rose-200/60"
                      : "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                  }`}
                >
                  {selectedSubject.isLive ? "Live Session" : "Active"}
                </span>
              </div>
            </div>

            {/* Lectures List Preview */}
            {selectedSubject.lectures && selectedSubject.lectures.length > 0 && (
              <div className="pt-2 space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Recent Lectures ({selectedSubject.lectures.length})
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {selectedSubject.lectures.slice(0, 5).map((lec, idx) => (
                    <div
                      key={lec.id || idx}
                      className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">
                          {lec.title || `Lecture ${idx + 1}`}
                        </p>
                        {lec.durationMinutes && (
                          <span className="text-[11px] text-slate-400">
                            {lec.durationMinutes} mins
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700 capitalize shrink-0">
                        {lec.status || "Completed"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* General Class Information */
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Class Information
            </h3>

            <div className="divide-y divide-slate-100/80 text-xs sm:text-sm">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-[#0080f6]" />
                  <span>Class Name</span>
                </div>
                <span className="font-bold text-slate-900">
                  {classItem.name || classItem.label || "Class"}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                  <Layers className="w-4 h-4 text-[#0080f6]" />
                  <span>Grade</span>
                </div>
                <span className="font-bold text-slate-900">{classItem.grade || "N/A"}</span>
              </div>

              {classItem.section && (
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                    <Layers className="w-4 h-4 text-[#0080f6]" />
                    <span>Section</span>
                  </div>
                  <span className="font-bold text-slate-900">{classItem.section}</span>
                </div>
              )}

              {classItem.room && (
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                    <BookOpen className="w-4 h-4 text-[#0080f6]" />
                    <span>Room</span>
                  </div>
                  <span className="font-bold text-slate-900">{classItem.room}</span>
                </div>
              )}

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                  <Users className="w-4 h-4 text-[#0080f6]" />
                  <span>Total Students</span>
                </div>
                <span className="font-bold text-slate-900">
                  {classItem.studentsCount ?? 0}
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                  <Layers className="w-4 h-4 text-[#0080f6]" />
                  <span>Total Subjects</span>
                </div>
                <span className="font-bold text-slate-900">
                  {classItem.subjectsCount ?? subjects.length}
                </span>
              </div>

              <div className="flex items-start justify-between py-3 gap-2">
                <div className="flex items-center gap-2.5 text-slate-500 font-medium shrink-0">
                  <Clock className="w-4 h-4 text-[#0080f6]" />
                  <span>Schedule</span>
                </div>
                <div className="text-right">
                  {classItem.scheduleDays ? (
                    <>
                      <p className="font-bold text-slate-900">{classItem.scheduleDays}</p>
                      {classItem.scheduleTime && (
                        <p className="text-[11px] text-slate-400 font-medium">
                          ({classItem.scheduleTime})
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-slate-400 font-medium">Not scheduled yet</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3">
                <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Status</span>
                </div>
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60 capitalize">
                  {classItem.status || "Active"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Column 2: Subjects in this Class (Right Side) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-900 font-black text-base sm:text-lg">
            <Layers className="w-5 h-5 text-[#0080f6]" />
            <h3>Subjects in this Class ({subjects.length})</h3>
          </div>
          {selectedSubject && (
            <span className="text-xs text-slate-400 font-medium">
              Click subject to switch
            </span>
          )}
        </div>

        {subjects.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs sm:text-sm">
            No subjects assigned to this class yet.
          </div>
        ) : (
          <div className="space-y-3">
            {subjects.map((sbj) => {
              const isSelected = selectedSubject?.name === sbj.name;
              return (
                <button
                  key={sbj.id || sbj.name}
                  type="button"
                  onClick={() =>
                    setSelectedSubject(isSelected ? null : sbj)
                  }
                  className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all text-left group cursor-pointer ${
                    isSelected
                      ? "border-[#0080f6] bg-blue-50/40 shadow-xs ring-1 ring-[#0080f6]/30"
                      : "border-slate-100 bg-white hover:bg-slate-50/70 hover:border-slate-200"
                  }`}
                  title={`Click to view ${sbj.name} details`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-serif font-black text-base shrink-0 ${
                        sbj.colorClass || "bg-purple-50 text-purple-600"
                      }`}
                    >
                      {sbj.symbol || "Δ"}
                    </div>
                    <div className="min-w-0">
                      <h4
                        className={`text-sm sm:text-base font-bold transition-colors truncate ${
                          isSelected ? "text-[#0080f6]" : "text-slate-900 group-hover:text-[#0080f6]"
                        }`}
                      >
                        {sbj.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {sbj.totalLectures ?? (sbj.lectures?.length || 0)} Lectures • Click to view info
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 transition-all shrink-0 ml-2 ${
                      isSelected
                        ? "text-[#0080f6] translate-x-1"
                        : "text-slate-300 group-hover:text-[#0080f6] group-hover:translate-x-0.5"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherClassOverviewTab;
