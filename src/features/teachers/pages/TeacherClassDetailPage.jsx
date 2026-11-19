import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTeacherClassDetail } from "@/hooks";
import {
  TeacherClassDetailHeader,
  TeacherClassOverviewTab,
  TeacherClassStudentsTab,
} from "../components/classes";
import { ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";

export const TeacherClassDetailPage = () => {
  const { classId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const { classData, isLoading, isError, error, refetch } = useTeacherClassDetail(classId);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100" />
          <div className="space-y-2">
            <div className="w-48 h-5 bg-slate-100 rounded" />
            <div className="w-32 h-3 bg-slate-100 rounded" />
          </div>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 h-28" />
        <div className="flex gap-2">
          <div className="w-24 h-9 bg-slate-100 rounded-full" />
          <div className="w-24 h-9 bg-slate-100 rounded-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 h-64" />
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 h-64" />
        </div>
      </div>
    );
  }

  if (isError || !classData) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-black text-slate-900">
          Class Not Available
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {error?.message ||
            "The requested class could not be found or you may not be assigned to teach it."}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/teacher/classes"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My Classes</span>
          </Link>
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0080f6] text-white text-xs font-bold hover:bg-blue-600 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  const assignedSubjectNames = Array.isArray(classData.subjects)
    ? classData.subjects.map((s) => (typeof s === "string" ? s : s.name)).filter(Boolean)
    : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <TeacherClassDetailHeader classItem={classData} />

      {/* Tabs navigation row matching SS 2 & SS 3 */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "overview"
              ? "bg-[#0080f6] text-white shadow-xs"
              : "bg-white text-slate-500 hover:text-slate-800 border border-slate-100 shadow-2xs"
          }`}
        >
          Overview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("students")}
          className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "students"
              ? "bg-[#0080f6] text-white shadow-xs"
              : "bg-white text-slate-500 hover:text-slate-800 border border-slate-100 shadow-2xs"
          }`}
        >
          Students
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "overview" && (
        <TeacherClassOverviewTab classItem={classData} />
      )}

      {activeTab === "students" && (
        <TeacherClassStudentsTab
          classId={classId}
          classItem={classData}
          assignedSubjects={assignedSubjectNames}
        />
      )}
    </div>
  );
};

export default TeacherClassDetailPage;
