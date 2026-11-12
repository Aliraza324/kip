/**
 * Student Progress & Attendance Mock Data
 * Supporting:
 * 1. Progress view (KPI stats, Subject progress bars)
 * 2. Attendance view (KPI stats, Attendance rate, Monthly Calendar, Breakdown)
 */

export const studentProgressMock = {
  kpiStats: [
    {
      id: "assignments",
      label: "Assignments Submitted",
      value: "3 / 4",
      iconType: "clipboard",
      colorClass: "bg-blue-50 text-[#0080f6]",
    },
    {
      id: "lectures",
      label: "Lectures Completed",
      value: "28",
      iconType: "play",
      colorClass: "bg-emerald-50 text-emerald-500",
    },
    {
      id: "progress",
      label: "Overall Progress",
      value: "85%",
      iconType: "book",
      colorClass: "bg-purple-50 text-purple-500",
    },
  ],
  subjectProgress: [
    {
      id: "math",
      subject: "Mathematics",
      symbol: "√x",
      iconType: "sqrt",
      colorClass: "bg-purple-100 text-purple-600",
      percentage: 90,
    },
    {
      id: "sci",
      subject: "Science",
      iconType: "flask",
      colorClass: "bg-emerald-100 text-emerald-600",
      percentage: 80,
    },
    {
      id: "eng",
      subject: "English",
      iconType: "book",
      colorClass: "bg-amber-100 text-amber-600",
      percentage: 85,
    },
    {
      id: "phy",
      subject: "Physics",
      iconType: "atom",
      colorClass: "bg-indigo-100 text-indigo-600",
      percentage: 75,
    },
  ],
  attendance: {
    rate: 92,
    present: 24,
    leave: 2,
    absent: 0,
    totalClasses: 26,
    monthName: "October 2026",
    // Daily records for October 2026 (1 to 31)
    // 1: Wed (Present), 2: Thu (Present), 3: Fri (Present), 4: Sat (Weekend), 5: Sun (Weekend)
    // 15: Leave, 24: Leave
    records: {
      1: "present",
      2: "present",
      3: "present",
      4: "weekend",
      5: "weekend",
      6: "present",
      7: "present",
      8: "present",
      9: "present",
      10: "present",
      11: "weekend",
      12: "weekend",
      13: "present",
      14: "present",
      15: "leave",
      16: "present",
      17: "present",
      18: "weekend",
      19: "weekend",
      20: "present",
      21: "present",
      22: "present",
      23: "present",
      24: "leave",
      25: "weekend",
      26: "weekend",
      27: "present",
      28: "present",
      29: "present",
      30: "present",
      31: "present",
    },
  },
};

