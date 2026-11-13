import girlImg from "@/assets/images/girl.png";
import studentImg1 from "@/assets/images/Reference photograph (1).png";
import studentImg2 from "@/assets/images/Reference photograph (2).png";
import studentImg3 from "@/assets/images/Reference photograph.png";

/**
 * Teacher Students Mock Data
 * Matching reference screenshots:
 * - SS 1: Students table with search, grade, course filters, status tabs, and view eye icon
 * - SS 2: Student Details - Overview Tab (Student Info, 3 KPI stats, Recent Activity)
 * - SS 3: Student Details - Progress Tab (Donut gauge 78%, Progress factors: Attendance 92%, Assignments 67%, Live class 85%)
 * - SS 4: Student Details - Assignments Tab (Filters bar, Assignments list with download & eye icons)
 * - SS 5: Student Details - Attendance Tab (Gauge 92%, Trend 4 weeks bar chart, History table)
 */

export const teacherStudentsListMock = [
  {
    id: "stu-1",
    name: "Ayesha Ali",
    roll: "STU-10428",
    email: "ayesha.ali@kipclassin.com",
    phone: "+92 300 1234567",
    dob: "Mar 15, 2010",
    grade: "Grade 9",
    course: "Mathematics",
    classId: "cls-math-9",
    className: "Mathematics – Grade 9",
    status: "Active",
    avatar: girlImg,
    kpi: {
      lecturesWatched: 12,
      assignmentsCount: "2/3",
      overallProgress: "78%",
    },
    recentActivity: [
      {
        id: 1,
        type: "watch",
        title: "Watched: Linear Equations – Lecture 1",
        time: "Today, 10:30 AM",
      },
      {
        id: 2,
        type: "assignment",
        title: "Submitted: Assignment 1",
        time: "Nov 5, 2024",
      },
      {
        id: 3,
        type: "attendance",
        title: "Attended: Live Class",
        time: "Nov 3, 2024",
      },
    ],
    progressFactors: [
      { id: "att", label: "Attendance", percentage: 92, iconType: "calendar" },
      { id: "asg", label: "Assignments", percentage: 67, iconType: "layers" },
      { id: "live", label: "live class", percentage: 85, iconType: "star" },
    ],
    assignments: [
      {
        id: "stu-asg-1",
        title: "Linear Equations – Practice Set",
        subject: "Mathematics",
        assignedDate: "Nov 3, 2024",
        dueDate: "Nov 5, 2024",
        status: "Submitted",
        fileName: "Linear_Equations_Sol.pdf",
      },
      {
        id: "stu-asg-2",
        title: "Linear Equations – Practice Set",
        subject: "Mathematics",
        assignedDate: "Nov 3, 2024",
        dueDate: "Nov 5, 2024",
        status: "Submitted",
        fileName: "Practice_Problems_P2.pdf",
      },
      {
        id: "stu-asg-3",
        title: "Linear Equations – Practice Set",
        subject: "Mathematics",
        assignedDate: "Nov 3, 2024",
        dueDate: "Nov 5, 2024",
        status: "Submitted",
        fileName: "Worksheet_Final.pdf",
      },
    ],
    attendanceStats: {
      percentage: 92,
      present: 23,
      absent: 2,
      total: 25,
      trendWeeks: [
        { week: "Week 1", percentage: 100 },
        { week: "Week 2", percentage: 88 },
        { week: "Week 3", percentage: 92 },
        { week: "Week 4", percentage: 88 },
      ],
      history: [
        { id: "att-1", date: "Nov 5, 2024", subject: "Mathematics", status: "Present" },
        { id: "att-2", date: "Nov 4, 2024", subject: "Mathematics", status: "Present" },
        { id: "att-3", date: "Nov 3, 2024", subject: "Mathematics", status: "Absent" },
      ],
    },
  },
  {
    id: "stu-2",
    name: "Hassan Raza",
    roll: "STU-10430",
    email: "hassan.raza@kipclassin.com",
    phone: "+92 301 2345678",
    dob: "Aug 20, 2010",
    grade: "Grade 9",
    course: "Mathematics",
    classId: "cls-math-9",
    className: "Mathematics – Grade 9",
    status: "Active",
    avatar: studentImg2,
    kpi: {
      lecturesWatched: 10,
      assignmentsCount: "3/3",
      overallProgress: "85%",
    },
    recentActivity: [
      { id: 1, type: "watch", title: "Watched: Quadratic Equations", time: "Yesterday" },
      { id: 2, type: "assignment", title: "Submitted: Homework 2", time: "Nov 4, 2024" },
    ],
    progressFactors: [
      { id: "att", label: "Attendance", percentage: 95, iconType: "calendar" },
      { id: "asg", label: "Assignments", percentage: 90, iconType: "layers" },
      { id: "live", label: "live class", percentage: 92, iconType: "star" },
    ],
    assignments: [
      {
        id: "stu-asg-1",
        title: "Quadratic Equations – Practice Problems",
        subject: "Mathematics",
        assignedDate: "Nov 3, 2024",
        dueDate: "Nov 12, 2026",
        status: "Submitted",
        fileName: "Assignment.pdf",
      },
    ],
    attendanceStats: {
      percentage: 95,
      present: 24,
      absent: 1,
      total: 25,
      trendWeeks: [
        { week: "Week 1", percentage: 100 },
        { week: "Week 2", percentage: 95 },
        { week: "Week 3", percentage: 92 },
        { week: "Week 4", percentage: 95 },
      ],
      history: [
        { id: "att-1", date: "Nov 5, 2024", subject: "Mathematics", status: "Present" },
        { id: "att-2", date: "Nov 4, 2024", subject: "Mathematics", status: "Present" },
        { id: "att-3", date: "Nov 3, 2024", subject: "Mathematics", status: "Present" },
      ],
    },
  },
  {
    id: "stu-3",
    name: "Mariam Khan",
    roll: "STU-10433",
    email: "mariam.khan@kipclassin.com",
    phone: "+92 302 3456789",
    dob: "Feb 10, 2010",
    grade: "Grade 9",
    course: "Mathematics",
    classId: "cls-math-9",
    className: "Mathematics – Grade 9",
    status: "Active",
    avatar: girlImg,
    kpi: {
      lecturesWatched: 11,
      assignmentsCount: "2/3",
      overallProgress: "80%",
    },
    recentActivity: [
      { id: 1, type: "watch", title: "Watched: Geometry Basics", time: "2 days ago" },
    ],
    progressFactors: [
      { id: "att", label: "Attendance", percentage: 88, iconType: "calendar" },
      { id: "asg", label: "Assignments", percentage: 75, iconType: "layers" },
      { id: "live", label: "live class", percentage: 82, iconType: "star" },
    ],
    assignments: [],
    attendanceStats: {
      percentage: 88,
      present: 22,
      absent: 3,
      total: 25,
      trendWeeks: [
        { week: "Week 1", percentage: 90 },
        { week: "Week 2", percentage: 85 },
        { week: "Week 3", percentage: 90 },
        { week: "Week 4", percentage: 88 },
      ],
      history: [],
    },
  },
  {
    id: "stu-4",
    name: "Bilal Ahmed",
    roll: "STU-10434",
    email: "bilal.ahmed@kipclassin.com",
    phone: "+92 303 4567890",
    dob: "Dec 05, 2011",
    grade: "Grade 8",
    course: "Science",
    classId: "cls-sci-8",
    className: "Science – Grade 8",
    status: "Active",
    avatar: studentImg1,
    kpi: {
      lecturesWatched: 9,
      assignmentsCount: "1/3",
      overallProgress: "70%",
    },
    recentActivity: [],
    progressFactors: [
      { id: "att", label: "Attendance", percentage: 80, iconType: "calendar" },
      { id: "asg", label: "Assignments", percentage: 60, iconType: "layers" },
      { id: "live", label: "live class", percentage: 75, iconType: "star" },
    ],
    assignments: [],
    attendanceStats: {
      percentage: 80,
      present: 20,
      absent: 5,
      total: 25,
      trendWeeks: [],
      history: [],
    },
  },
  {
    id: "stu-5",
    name: "Zainab Fatima",
    roll: "STU-10435",
    email: "zainab.fatima@kipclassin.com",
    phone: "+92 304 5678901",
    dob: "Apr 25, 2011",
    grade: "Grade 8",
    course: "Science",
    classId: "cls-sci-8",
    className: "Science – Grade 8",
    status: "Active",
    avatar: girlImg,
    kpi: {
      lecturesWatched: 12,
      assignmentsCount: "3/3",
      overallProgress: "92%",
    },
    recentActivity: [],
    progressFactors: [
      { id: "att", label: "Attendance", percentage: 96, iconType: "calendar" },
      { id: "asg", label: "Assignments", percentage: 95, iconType: "layers" },
      { id: "live", label: "live class", percentage: 90, iconType: "star" },
    ],
    assignments: [],
    attendanceStats: {
      percentage: 96,
      present: 24,
      absent: 1,
      total: 25,
      trendWeeks: [],
      history: [],
    },
  },
];

