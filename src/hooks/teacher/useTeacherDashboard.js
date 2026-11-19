import { useState, useEffect, useCallback } from "react";
import { teacherDashboardService } from "@/service/apiService";
import { getAuthUser } from "@/service/apiClient";
import { teacherDashboardMock } from "@/mocks";

const CLASS_PALETTES = [
  { colorClass: "bg-purple-100 text-purple-600", iconType: "sqrt" },
  { colorClass: "bg-emerald-100 text-emerald-600", iconType: "clover" },
  { colorClass: "bg-amber-100 text-amber-600", iconType: "book" },
  { colorClass: "bg-blue-100 text-blue-600", iconType: "code" },
];

export function useTeacherDashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await teacherDashboardService.getDashboard();
      const rawData = res?.data || res || {};
      setData(rawData);
    } catch (err) {
      console.error("useTeacherDashboard error:", err);
      setError(err);
      // Fallback to mock on error so page stays resilient
      setData(teacherDashboardMock);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // Format KPIs
  const kpis = data?.kpis || {};
  const kpiStats = [
    {
      id: "classes",
      value: String(kpis.classes ?? (data?.myClasses?.length || 0)),
      label: "My Classes",
      iconType: "layers",
      colorClass: "bg-blue-50 text-[#0080f6]",
    },
    {
      id: "students",
      value: String(
        kpis.students ??
          (data?.myClasses || []).reduce((acc, c) => acc + (c.studentsCount || 0), 0)
      ),
      label: "Total Students",
      iconType: "users",
      colorClass: "bg-amber-50 text-amber-500",
    },
    {
      id: "sessions",
      value: String(kpis.todaySessions ?? (data?.todaySchedule?.length || 0)),
      label: "Today's Session",
      iconType: "calendar",
      colorClass: "bg-emerald-50 text-emerald-500",
    },
  ];

  // Today's schedule (empty [] per request until sessions tab integration)
  const todaySchedule = data?.todaySchedule || [];

  // Format My Classes
  const myClasses = (data?.myClasses || []).map((cls, index) => {
    const palette = CLASS_PALETTES[index % CLASS_PALETTES.length];
    const subjectName =
      cls.subject ||
      (cls.subjects && cls.subjects.length > 0
        ? `${cls.subjects.join(", ")} – ${cls.name || cls.grade || cls.label}`
        : cls.label || cls.name || "Class");

    return {
      ...cls,
      id: cls.id || cls._id || `cls-${index}`,
      subject: subjectName,
      studentsCount: cls.studentsCount ?? 0,
      iconType: cls.iconType || palette.iconType,
      colorClass: cls.colorClass || palette.colorClass,
    };
  });

  // Teacher Profile & Greetings
  const authUser = getAuthUser();
  const teacher = {
    name: authUser?.fullName || authUser?.name || data?.teacher?.name || "Teacher",
    displayName: authUser?.fullName || authUser?.name || data?.teacher?.displayName || "Teacher",
    avatar: authUser?.avatar || data?.teacher?.avatar,
    role: "Teacher",
  };

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const greeting = {
    title: `${timeGreeting}, ${teacher.displayName}`,
    subtitle: data?.greeting?.subtitle || "Here's your teaching overview for today.",
  };

  const quickActions = data?.quickActions || teacherDashboardMock.quickActions;

  return {
    isLoading,
    error,
    refetch: fetchDashboard,
    kpiStats,
    todaySchedule,
    myClasses,
    teacher,
    greeting,
    quickActions,
    rawDashboard: data,
  };
}

export default useTeacherDashboard;
