/**
 * Mock data for Teacher Portal
 */
export const teacherClassesMock = [
  {
    id: "cls_cs301_a",
    courseCode: "CS-301",
    section: "Sec A",
    courseTitle: "Data Structures & Algorithms",
    enrolledStudents: 52,
    avgAttendance: 91.2,
    pendingSubmissions: 14,
  },
  {
    id: "cls_cs301_b",
    courseCode: "CS-301",
    section: "Sec B",
    courseTitle: "Data Structures & Algorithms",
    enrolledStudents: 48,
    avgAttendance: 88.5,
    pendingSubmissions: 22,
  },
  {
    id: "cls_cs502_pg",
    courseCode: "CS-502",
    section: "Postgrad",
    courseTitle: "Advanced Algorithm Design",
    enrolledStudents: 18,
    avgAttendance: 96.0,
    pendingSubmissions: 5,
  },
];

export const teacherGradingQueueMock = [
  {
    id: "sub_101",
    studentName: "Bilal Ahmed",
    rollNumber: "BCS-2024-042",
    assignment: "AVL Trees Implementation",
    submittedAt: "2026-11-07T18:22:00",
    status: "needs_review",
  },
  {
    id: "sub_102",
    studentName: "Sara Khan",
    rollNumber: "BCS-2024-019",
    assignment: "AVL Trees Implementation",
    submittedAt: "2026-11-07T20:15:00",
    status: "needs_review",
  },
];

