import { teacherDashboardMock } from "@/mocks";
import {
  TeacherGreetingHeroCard,
  TeacherKpiStats,
  TeacherTodayScheduleCard,
  TeacherMyClassesCard,
  TeacherQuickActionsBar,
} from "../components/dashboard";

export const TeacherDashboardPage = () => {
  const { teacher, greeting, kpiStats, todaySchedule, myClasses, quickActions } =
    teacherDashboardMock;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-4">
      {/* 1. Greeting Hero Section */}
      <TeacherGreetingHeroCard
        displayName={teacher.displayName}
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

