import { Calendar, Video, Layers, Users, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

export const TeacherSessionOverviewTab = ({ session, onStartLive }) => {
  const handleStartClass = (title) => {
    onStartLive?.(title);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: Session Timeline (SS 4) */}
      <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Session</h3>
        </div>

        <div className="space-y-3 pt-1">
          {/* Active Row: Today 10:00 AM - 10:45 AM */}
          <div className="p-4 rounded-2xl bg-[#eaf4fe] border border-blue-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <span className="text-xs font-bold text-[#0080f6] uppercase tracking-wider">Active Now</span>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                Today, 10:00 AM – 10:45 AM
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleStartClass(session.title)}
              className="px-5 py-2 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 active:scale-95"
            >
              <Video className="w-4 h-4" />
              <span>Start Live</span>
            </button>
          </div>

          {/* Upcoming Row 2 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">12:00 PM – 12:45 PM</p>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">Science – Grade 8</h4>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                <span className="text-[#0080f6] flex items-center gap-1 font-medium"><Video className="w-3 h-3" /> Live Class</span>
                <span>• Tue, Nov 5, 2026</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleStartClass("Science – Grade 8")}
              className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold"
            >
              Start Class
            </button>
          </div>

          {/* Upcoming Row 3 */}
          <div className="p-4 rounded-2xl bg-white border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">02:00 PM – 02:45 PM</p>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">English – Grade 9</h4>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                <span className="text-[#0080f6] flex items-center gap-1 font-medium"><Video className="w-3 h-3" /> Live Class</span>
                <span>• Monday, Nov 10, 2026</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleStartClass("English – Grade 9")}
              className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold"
            >
              Start Class
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Class Info (SS 4) */}
      <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4 stroke-[2.2]" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Class Info</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center">
            <Users className="w-6 h-6 text-[#0080f6] mb-2" />
            <p className="text-2xl font-black text-slate-900">{session.studentsCount || 28}</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Students</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center text-center">
            <BookOpen className="w-6 h-6 text-[#0080f6] mb-2" />
            <p className="text-2xl font-black text-slate-900">{session.materialsCount || 1}</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Materials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSessionOverviewTab;

