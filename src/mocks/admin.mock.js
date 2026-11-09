/**
 * Mock data for Admin Hub
 */
export const adminMetricsMock = {
  totalStudents: 12540,
  totalTeachers: 452,
  activeCourses: 318,
  monthlyFeeCollectionPercentage: 96.2,
  systemHealth: "Optimal (99.98% uptime)",
};

export const adminRecentActivityMock = [
  {
    id: "act_01",
    action: "New Faculty Onboarded",
    target: "Engr. Noman Tariq (Electrical Engineering)",
    timestamp: "10 mins ago",
    status: "success",
  },
  {
    id: "act_02",
    action: "Curriculum Revision Approved",
    target: "CS-402 Distributed Systems",
    timestamp: "1 hour ago",
    status: "info",
  },
  {
    id: "act_03",
    action: "Tuition Batch Reconciled",
    target: "Spring 2026 Installment 2",
    timestamp: "3 hours ago",
    status: "success",
  },
];

