import { useTeacherDashboard } from "@/hooks/teacher";
import {
  TeacherGreetingHeroCard,
  TeacherKpiStats,
  TeacherTodayScheduleCard,
  TeacherMyClassesCard,
  TeacherQuickActionsBar,
} from "../components/dashboard";
import { Loader2 } from "lucide-react";

export const TeacherDashboardPage = () => {
  const {
    isLoading,
    teacher,
    greeting,
    kpiStats,
    todaySchedule,
    myClasses,
    quickActions,
  } = useTeacherDashboard();

  if (isLoading && !kpiStats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#0080f6] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-4">
      {/* 1. Greeting Hero Section */}
      <TeacherGreetingHeroCard
        displayName={teacher.displayName}
        avatar={teacher.avatar}
        title={greeting.title}
        subtitle={greeting.subtitle}
      />

      {/* 2. KPI Summary Cards (3 Columns) */}
      <TeacherKpiStats stats={kpiStats} />

      {/* 3. Middle Grid: Today's Schedule & My Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <TeacherTodayScheduleCard schedule={todaySchedule} />
        <TeacherMyClassesCard classes={myClasses} />
      </div>

      {/* 4. Quick Actions Bar */}
      <TeacherQuickActionsBar actions={quickActions} />
    </div>
  );
};

export default TeacherDashboardPage;
