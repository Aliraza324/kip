import { useState } from "react";
import {
  Calendar,
  Layers,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import TeacherSubjectLectureModal from "./TeacherSubjectLectureModal";

export const TeacherClassOverviewTab = ({
  classItem,
  students = [],
  onViewAllStudents,
}) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const previewStudents = students.slice(0, 5);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Column 1: Class Information */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Class Information
          </h3>

          <div className="divide-y divide-slate-100/80 text-xs sm:text-sm">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                <Calendar className="w-4 h-4 text-[#0080f6]" />
                <span>Class Name</span>
              </div>
              <span className="font-bold text-slate-900">{classItem.subject || "Mathematics"}</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                <Layers className="w-4 h-4 text-[#0080f6]" />
                <span>Grade</span>
              </div>
              <span className="font-bold text-slate-900">{classItem.grade || "Grade 9"}</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                <Users className="w-4 h-4 text-[#0080f6]" />
                <span>Total Students</span>
              </div>
              <span className="font-bold text-slate-900">{classItem.studentsCount || 28}</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                <Layers className="w-4 h-4 text-[#0080f6]" />
                <span>Total Subjects</span>
              </div>
              <span className="font-bold text-slate-900">
                {classItem.subjectsCount || classItem.subjects?.length || 4}
              </span>
            </div>

            <div className="flex items-start justify-between py-3 gap-2">
              <div className="flex items-center gap-2.5 text-slate-500 font-medium shrink-0">
                <Clock className="w-4 h-4 text-[#0080f6]" />
                <span>Schedule</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">{classItem.scheduleDays || "Mon, Wed, Fri"}</p>
                <p className="text-[11px] text-slate-400 font-medium">
                  ({classItem.scheduleTime || "10:00 AM – 11:00 AM"})
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2.5 text-slate-500 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Status</span>
              </div>
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                {classItem.status || "Active"}
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: Subjects in this Class */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-black text-base sm:text-lg">
            <Layers className="w-5 h-5 text-[#0080f6]" />
            <h3>Subjects in this Class ({classItem.subjects?.length || 4})</h3>
          </div>

          <div className="space-y-3">
            {classItem.subjects?.map((sbj) => (
              <button
                key={sbj.id}
                type="button"
                onClick={() => setSelectedSubject(sbj)}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-white hover:bg-blue-50/40 hover:border-blue-200 transition-all text-left group cursor-pointer"
                title="Click to view lectures"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-serif font-black text-base shrink-0 ${sbj.colorClass}`}
                  >
                    {sbj.symbol}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0080f6] transition-colors truncate">
                      {sbj.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {sbj.totalLectures || 10} Lectures • View Details
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0080f6] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Column 3: Students list preview */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-black text-base sm:text-lg">
              <Users className="w-5 h-5 text-[#0080f6]" />
              <h3>Students ({classItem.studentsCount || students.length || 28})</h3>
            </div>

            <div className="space-y-3">
              {previewStudents.map((stu) => (
                <div
                  key={stu.id}
                  className="flex items-center justify-between py-1.5"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={stu.avatar}
                      alt={stu.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0 ring-1 ring-slate-100"
                    />
                    <span className="text-sm font-bold text-slate-800 truncate">
                      {stu.name}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-400 shrink-0 ml-2">
                    {stu.roll}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onViewAllStudents}
            className="w-full mt-4 py-2.5 px-4 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 text-[#0080f6] text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>View All Students ({classItem.studentsCount || 28})</span>
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Lecture Modal for assigned class lectures */}
      <TeacherSubjectLectureModal
        isOpen={Boolean(selectedSubject)}
        onClose={() => setSelectedSubject(null)}
        subject={selectedSubject}
        className={classItem.name}
      />
    </>
  );
};

export default TeacherClassOverviewTab;

