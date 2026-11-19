import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, AlertCircle, RefreshCw } from "lucide-react";
import { useTeacherAssignments } from "@/hooks";
import {
  TeacherAssignmentsStatsCards,
  TeacherAssignmentsFilterBar,
  TeacherAssignmentsTable,
} from "../components/assignments";

export const TeacherAssignmentsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const queryParams = useMemo(() => {
    const q = {};
    if (activeTab !== "all") q.status = activeTab;
    if (selectedSubject !== "all") q.subject = selectedSubject;
    return q;
  }, [activeTab, selectedSubject]);

  const { assignments, stats, isLoading, isError, error, refetch } =
    useTeacherAssignments(queryParams);

  // Extract available subjects from assignments
  const availableSubjects = useMemo(() => {
    const set = new Set();
    assignments.forEach((a) => {
      if (a.subject) set.add(a.subject);
    });
    return Array.from(set);
  }, [assignments]);

  // Client-side additional filters if selectedStatus is set
  const filteredAssignments = useMemo(() => {
    return assignments.filter((asg) => {
      if (selectedStatus !== "all" && (asg.status || "").toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [assignments, selectedStatus]);

  const handleResetFilters = () => {
    setActiveTab("all");
    setSelectedMonth("all");
    setSelectedSubject("all");
    setSelectedStatus("all");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header matching SS 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Assignments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage, track, and grade assignments for your classes.
          </p>
        </div>

        {/* Top button: navigates to SS 2 Create Assignment */}
        <Link
          to="/teacher/assignments/create"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer self-start sm:self-auto shrink-0 active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create Assignment</span>
        </Link>
      </div>

      {/* KPI Stats Cards */}
      <TeacherAssignmentsStatsCards stats={stats} />

      {/* Filter Tabs and Dropdowns */}
      <TeacherAssignmentsFilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={stats}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        selectedSubject={selectedSubject}
        onSubjectChange={setSelectedSubject}
        availableSubjects={availableSubjects}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onResetFilters={handleResetFilters}
      />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-2xs space-y-4 animate-pulse">
          <div className="w-40 h-5 bg-slate-100 rounded" />
          <div className="h-64 bg-slate-50 rounded-2xl" />
        </div>
      )}

      {/* Error State */}
      {!isLoading && isError && (
        <div className="bg-red-50 border border-red-200/80 rounded-3xl p-8 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
          <h3 className="text-base font-bold text-red-800">
            Failed to load assignments
          </h3>
          <p className="text-xs text-red-600 max-w-md mx-auto">
            {error?.message || "An error occurred while fetching your assignments. Please try again."}
          </p>
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Assignment List Table */}
      {!isLoading && !isError && (
        <TeacherAssignmentsTable assignments={filteredAssignments} />
      )}
    </div>
  );
};

export default TeacherAssignmentsPage;
