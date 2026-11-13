import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import {
  teacherAssignmentsListMock,
  teacherAssignmentsStatsMock,
} from "@/mocks";
import {
  TeacherAssignmentsStatsCards,
  TeacherAssignmentsFilterBar,
  TeacherAssignmentsTable,
} from "../components/assignments";

export const TeacherAssignmentsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("oct-2026");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredAssignments = useMemo(() => {
    return teacherAssignmentsListMock.filter((asg) => {
      // Tab filter
      if (activeTab === "pending" && asg.status.toLowerCase() !== "pending") return false;
      if (activeTab === "submitted" && asg.status.toLowerCase() !== "submitted") return false;
      if (activeTab === "overdue" && asg.status.toLowerCase() !== "overdue") return false;

      // Dropdown filters
      if (selectedSubject !== "all" && asg.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
        return false;
      }
      if (selectedStatus !== "all" && asg.status.toLowerCase() !== selectedStatus.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [activeTab, selectedSubject, selectedStatus]);

  const handleResetFilters = () => {
    setActiveTab("all");
    setSelectedMonth("oct-2026");
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
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0080f6] hover:bg-[#006fd6] text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create Assignment</span>
        </Link>
      </div>

      {/* KPI Stats Cards */}
      <TeacherAssignmentsStatsCards stats={teacherAssignmentsStatsMock} />

      {/* Filter Tabs and Dropdowns */}
      <TeacherAssignmentsFilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
        selectedSubject={selectedSubject}
        onSubjectChange={setSelectedSubject}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onResetFilters={handleResetFilters}
      />

      {/* Assignment List Table */}
      <TeacherAssignmentsTable assignments={filteredAssignments} />
    </div>
  );
};

export default TeacherAssignmentsPage;

