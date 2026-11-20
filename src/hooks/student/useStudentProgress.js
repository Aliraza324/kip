import { useState, useEffect, useCallback, useMemo } from "react";
import { studentProgressService } from "@/service/apiService";
import { studentProgressMock, calendarCellsMock } from "@/mocks";

// Month label <-> API param helpers (e.g. "October 2026" <-> "2026-10")
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const parseMonthLabelToParam = (label) => {
  if (!label) return undefined;
  const parts = label.trim().split(/\s+/);
  if (parts.length === 2) {
    const monthIndex = MONTH_NAMES.indexOf(parts[0]);
    const year = parts[1];
    if (monthIndex !== -1 && /^\d{4}$/.test(year)) {
      const m = String(monthIndex + 1).padStart(2, "0");
      return `${year}-${m}`;
    }
  }
  return undefined;
};

const formatParamToMonthLabel = (param) => {
  if (!param || !/^\d{4}-\d{2}$/.test(param)) return "October 2026";
  const [year, month] = param.split("-");
  const monthName = MONTH_NAMES[parseInt(month, 10) - 1];
  return monthName ? `${monthName} ${year}` : "October 2026";
};

/**
 * Generate calendar grid cells (42 cells: 6 rows of 7 days) for the given month
 */
const generateCalendarCells = (year, monthIndex, attendanceDays = {}) => {
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday...
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, monthIndex, 0).getDate();

  const cells = [];

  // Previous month trailing days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      isPrev: true,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, monthIndex, day);
    const dayOfWeek = dateObj.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
    const status = attendanceDays[day] || (attendanceDays[String(day)]) || null;

    cells.push({
      day,
      status: status || (isWeekend ? "weekend" : undefined),
      isWeekend,
    });
  }

  // Next month leading days to complete full grid (multiple of 7)
  const remaining = (7 - (cells.length % 7)) % 7;
  for (let day = 1; day <= remaining; day++) {
    cells.push({
      day,
      isNext: true,
    });
  }

  return cells;
};

export function useStudentProgress() {
  const [selectedMonth, setSelectedMonth] = useState("October 2026");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const monthParam = useMemo(() => {
    return parseMonthLabelToParam(selectedMonth) || "2026-10";
  }, [selectedMonth]);

  const fetchProgress = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await studentProgressService.getProgress({ month: monthParam });
      const rawData = res?.data !== undefined ? res.data : res;
      setData(rawData);
    } catch (err) {
      console.error("useStudentProgress fetch error:", err);
      setError(err);
      // Resilient fallback to mock
      setData(studentProgressMock);
    } finally {
      setIsLoading(false);
    }
  }, [monthParam]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Format 3 KPI cards for Screen 1 (My Progress)
  const kpiStats = useMemo(() => {
    const kpi = data?.kpi || {};
    return [
      {
        id: "assignments",
        label: "Assignments Submitted",
        shortLabel: "Assignments",
        value: `${kpi.assignmentsSubmitted ?? 3} / ${kpi.assignmentsTotal ?? 4}`,
        iconType: "clipboard",
        colorClass: "bg-blue-50 text-[#0080f6]",
      },
      {
        id: "lectures",
        label: "Lectures Completed",
        shortLabel: "Lectures",
        value: String(kpi.lecturesAttended ?? 28),
        iconType: "play",
        colorClass: "bg-emerald-50 text-emerald-500",
      },
      {
        id: "progress",
        label: "Overall Progress",
        shortLabel: "Overall",
        value: `${kpi.overallProgress ?? 85}%`,
        iconType: "book",
        colorClass: "bg-purple-50 text-purple-500",
      },
    ];
  }, [data]);

  // Format Subject Progress Bars
  const rawSubjects = data?.subjectProgress || studentProgressMock.subjectProgress || [];

  const subjectProgress = useMemo(() => {
    return rawSubjects.filter((item) => {
      if (selectedSubject === "all") return true;
      return item.subject?.toLowerCase() === selectedSubject.toLowerCase();
    });
  }, [rawSubjects, selectedSubject]);

  // List of all available subjects for filter dropdown
  const allSubjectNames = useMemo(() => {
    const list = data?.subjects || rawSubjects.map((s) => s.subject);
    return [...new Set(list.filter(Boolean))];
  }, [data, rawSubjects]);

  // Format Attendance Data for Screen 2 (Attendance)
  const attendance = useMemo(() => {
    const att = data?.attendance || studentProgressMock.attendance || {};
    const [yearStr, monthStr] = monthParam.split("-");
    const year = parseInt(yearStr, 10) || 2026;
    const monthIndex = (parseInt(monthStr, 10) || 10) - 1;

    const daysMap = att.days || att.records || {};
    const generatedCells = generateCalendarCells(year, monthIndex, daysMap);

    return {
      rate: att.rate ?? 92,
      present: att.present ?? 24,
      leave: att.leave ?? 2,
      absent: att.absent ?? 0,
      totalClasses: att.totalClasses ?? 26,
      monthName: att.monthName || selectedMonth,
      calendarCells: generatedCells.length ? generatedCells : calendarCellsMock,
      days: daysMap,
      log: att.log || [],
    };
  }, [data, monthParam, selectedMonth]);

  const handleResetFilters = useCallback(() => {
    setSelectedMonth("October 2026");
    setSelectedSubject("all");
    setSelectedStatus("all");
  }, []);

  return {
    isLoading,
    error,
    refetch: fetchProgress,
    selectedMonth,
    setSelectedMonth,
    selectedSubject,
    setSelectedSubject,
    selectedStatus,
    setSelectedStatus,
    handleResetFilters,
    kpiStats,
    subjectProgress,
    allSubjectNames,
    attendance,
  };
}

export default useStudentProgress;
