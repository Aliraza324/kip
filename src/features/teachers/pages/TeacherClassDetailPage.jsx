import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  teacherClassesListMock,
  teacherClassStudentsListMock,
} from "@/mocks";
import {
  TeacherClassDetailHeader,
  TeacherClassOverviewTab,
  TeacherClassStudentsTab,
} from "../components/classes";

export const TeacherClassDetailPage = () => {
  const { classId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const currentClass = useMemo(() => {
    return (
      teacherClassesListMock.find((c) => c.id === classId) ||
      teacherClassesListMock[0]
    );
  }, [classId]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <TeacherClassDetailHeader classItem={currentClass} />

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
        <TeacherClassOverviewTab
          classItem={currentClass}
          students={teacherClassStudentsListMock}
          onViewAllStudents={() => setActiveTab("students")}
        />
      )}

      {activeTab === "students" && (
        <TeacherClassStudentsTab
          students={teacherClassStudentsListMock}
        />
      )}
    </div>
  );
};

export default TeacherClassDetailPage;

