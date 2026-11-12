import { useState } from "react";
import { ArrowLeft, User, Calendar, Clock, Layers, Video } from "lucide-react";
import { StudentClassNotesView } from "./StudentClassNotesView";
import { StudentJoinClassModal } from "./StudentJoinClassModal";

export const StudentClassDetailView = ({ classData, onBack, onJoinLiveClass }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  if (!classData) return null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Back Navigation Matching Image 2 */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-slate-800 hover:text-[#0080f6] transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>My Classes</span>
      </button>

      {/* Class Hero Banner Card Matching Image 2 */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 sm:p-7 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-lg sm:text-xl font-black shrink-0 ${classData.symbolColor}`}
        >
          {classData.symbol}
        </div>
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {classData.subject}
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-400" />
              <span>{classData.teacher}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{classData.days}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{classData.scheduleTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Overview & Notes Matching Image 2 */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "overview"
              ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
              : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("notes")}
          className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "notes"
              ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
              : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
          }`}
        >
          Notes
        </button>
      </div>

      {/* Tab Content: Overview Grid */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {/* Card 1: Next Class */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-2xs space-y-5 flex flex-col justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Next Class
            </h2>
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-semibold text-slate-800">{classData.nextClassDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{classData.scheduleTime}</span>
              </div>
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-medium">Topic: {classData.nextClassTopic}</span>
              </div>
            </div>
            <div className="pt-2 text-xs text-slate-400">
              Attendance & participation will be recorded automatically.
            </div>
          </div>

          {/* Card 2: Join Live Class */}
          <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-7 shadow-2xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-[#0060d0]">
                <Video className="w-6 h-6" strokeWidth={2.2} />
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Join Live Class
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                The class is about to start. Click below to join the live session.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsJoinModalOpen(true)}
              className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#0060d0] to-[#0080f6] text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Video className="w-4 h-4" />
              <span>Join Class</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Notes Table */}
      {activeTab === "notes" && <StudentClassNotesView classData={classData} />}

      {/* Modal: Join Class (Screen 3) */}
      <StudentJoinClassModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        classData={classData}
        onJoinSuccess={onJoinLiveClass}
      />
    </div>
  );
};

export default StudentClassDetailView;

