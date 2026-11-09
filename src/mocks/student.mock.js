/**
 * Mock data for Student Portal
 */
export const studentCoursesMock = [
  {
    id: "crs_cs301",
    code: "CS-301",
    title: "Data Structures & Algorithms",
    instructor: "Prof. Ayesha Siddiqui",
    progress: 74,
    grade: "A-",
    nextClass: "Mon 10:00 AM",
    room: "Lab 3B",
  },
  {
    id: "crs_cs304",
    code: "CS-304",
    title: "Database Management Systems",
    instructor: "Dr. Tariq Mahmood",
    progress: 88,
    grade: "A",
    nextClass: "Tue 11:30 AM",
    room: "Auditorium A",
  },
  {
    id: "crs_cs308",
    code: "CS-308",
    title: "Web Engineering & Cloud Systems",
    instructor: "Engr. Salman Farooq",
    progress: 62,
    grade: "B+",
    nextClass: "Wed 09:00 AM",
    room: "Software Center",
  },
];

export const studentAssignmentsMock = [
  {
    id: "asg_01",
    course: "CS-301",
    title: "AVL Trees & Balanced Search Tree Implementation",
    dueDate: "2026-11-15T23:59:00",
    status: "pending",
    points: 100,
  },
  {
    id: "asg_02",
    course: "CS-304",
    title: "Normalization & Index Optimization Project",
    dueDate: "2026-11-20T23:59:00",
    status: "submitted",
    points: 50,
  },
];

export const studentStatsMock = {
  gpa: 3.82,
  attendancePercentage: 94.5,
  creditsCompleted: 68,
  pendingAssignments: 2,
};

