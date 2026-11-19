import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useTeacherStudentDetail } from "@/hooks";
import {
  TeacherStudentDetailHeader,
  TeacherStudentOverviewTab,
  TeacherStudentProgressTab,
  TeacherStudentAssignmentsTab,
  TeacherStudentAttendanceTab,
} from "../components/students";
import { ArrowLeft, AlertCircle, RefreshCw } from "lucide-react";

export const TeacherStudentDetailPage = () => {
  const { studentId, classId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const { studentData, isLoading, isError, error, refetch } = useTeacherStudentDetail(studentId);

  const backUrl = classId
    ? `/teacher/students/class/${classId}`
    : "/teacher/students";

  const currentStudent = useMemo(() => {
    if (!studentData) return null;
    const raw = studentData.student || studentData;

    const dobFormatted = raw.dob
      ? new Date(raw.dob).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

    const kpi = {
      lecturesWatched: studentData.kpi?.lecturesAttended ?? 0,
      assignmentsCount: `${studentData.kpi?.assignmentsSubmitted ?? 0}/${studentData.kpi?.assignmentsTotal ?? 0}`,
      overallProgress: `${studentData.kpi?.overallProgress ?? 0}%`,
    };

    const progressFactors = [
      {
        id: "att",
        label: "Attendance",
        percentage: Math.round(studentData.progressFactors?.attendance ?? 0),
        iconType: "calendar",
      },
      {
        id: "asg",
        label: "Assignments",
        percentage: Math.round(studentData.progressFactors?.assignments ?? 0),
        iconType: "layers",
      },
      {
        id: "live",
        label: "Live Class",
        percentage: Math.round(studentData.progressFactors?.averageScore ?? 0),
        iconType: "star",
      },
    ];

    const recentActivity = Array.isArray(studentData.recentActivity)
      ? studentData.recentActivity.map((act, i) => ({
          id: i,
          type: act.type === "assignment" ? "assignment" : act.type === "attendance" ? "attendance" : "watch",
          title: act.title,
          time: act.at
            ? new Date(act.at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "Recent",
        }))
      : [];

    const assignments = Array.isArray(studentData.assignments)
      ? studentData.assignments.map((asg) => ({
          id: asg.id,
          title: asg.title,
          subject: asg.subject,
          assignedDate: asg.assignedAt
            ? new Date(asg.assignedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "—",
          dueDate: asg.dueAt
            ? new Date(asg.dueAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "—",
          status: asg.status || "Pending",
          submission: asg.submission,
        }))
      : [];

    const attendanceStats = {
      percentage: Math.round(studentData.attendance?.percentage ?? 0),
      present: studentData.attendance?.present ?? 0,
      absent: studentData.attendance?.absent ?? 0,
      total: studentData.attendance?.total ?? 0,
      trendWeeks: Array.isArray(studentData.attendance?.trend) ? studentData.attendance.trend : [],
      history: Array.isArray(studentData.attendance?.history)
        ? studentData.attendance.history.map((h, i) => ({
            id: h.lectureId || String(i),
            date: h.date
              ? new Date(h.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "—",
            subject: h.subject || "General",
            status: h.status || "Present",
          }))
        : [],
    };

    return {
      id: raw.id || studentId,
      name: raw.fullName || raw.name || "Student",
      email: raw.email || "—",
      phone: raw.phone || "—",
      dob: dobFormatted,
      grade: raw.class?.grade || raw.class?.name || raw.grade || "Grade",
      course: (raw.subjects && raw.subjects.length > 0) ? raw.subjects.join(", ") : (raw.class?.name || "General"),
      avatar: typeof raw.avatar === "string" ? raw.avatar : raw.avatar?.url || null,
      status: raw.status || "Active",
      kpi,
      progressFactors,
      recentActivity,
      assignments,
      attendanceStats,
    };
  }, [studentData, studentId]);

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto pb-14 animate-pulse">
        <div className="w-24 h-4 bg-slate-100 rounded" />
        <div className="space-y-2">
          <div className="w-48 h-6 bg-slate-100 rounded" />
          <div className="w-64 h-3 bg-slate-100 rounded" />
        </div>
        <div className="bg-white rounded-3xl p-6 border border-slate-100 h-24" />
        <div className="flex gap-2">
          <div className="w-24 h-9 bg-slate-100 rounded-full" />
          <div className="w-24 h-9 bg-slate-100 rounded-full" />
          <div className="w-24 h-9 bg-slate-100 rounded-full" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 h-72" />
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 h-72" />
        </div>
      </div>
    );
  }

  if (isError || !currentStudent) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-black text-slate-900">
          Student Details Not Available
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          {error?.message || "The requested student could not be found or you may not have permission to view them."}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to={backUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Go Back</span>
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-14">
      {/* Header Banner & Tab Navigation */}
      <TeacherStudentDetailHeader
        student={currentStudent}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        backUrl={backUrl}
      />

      {/* Tab Panels matching SS 3-6 */}
      {activeTab === "overview" && (
        <TeacherStudentOverviewTab student={currentStudent} />
      )}

      {activeTab === "progress" && (
        <TeacherStudentProgressTab student={currentStudent} />
      )}

      {activeTab === "assignments" && (
        <TeacherStudentAssignmentsTab student={currentStudent} />
      )}

      {activeTab === "attendance" && (
        <TeacherStudentAttendanceTab student={currentStudent} />
      )}
    </div>
  );
};

export default TeacherStudentDetailPage;
