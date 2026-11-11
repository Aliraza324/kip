/**
 * Mock data for Student Portal & Dashboard
 * Centralized mock data matching reference design
 */

export const studentDashboardMock = {
  greeting: "Good Morning, Alex 👋",
  subtitle: "Ready to learn something new today?",
  user: {
    name: "Alex Student",
    shortName: "Alex",
    role: "Student",
    avatar: "AL",
  },
  stats: [
    {
      id: "classes",
      label: "My Classes",
      value: "4",
      iconType: "play",
      color: "#0080f6",
      bg: "#e0f0fe",
    },
    {
      id: "assignments",
      label: "Assignments",
      value: "12",
      iconType: "clipboard",
      color: "#f59e0b",
      bg: "#fef7e0",
    },
    {
      id: "materials",
      label: "Learning Materials",
      value: "28",
      iconType: "book",
      color: "#22c55e",
      bg: "#e7f9ee",
    },
    {
      id: "progress",
      label: "My Progress",
      value: "85%",
      iconType: "chart",
      color: "#a855f7",
      bg: "#f3e8ff",
    },
  ],
  upcomingClass: {
    cardTitle: "Upcoming Class",
    subject: "Math – Live Class",
    time: "Today, 10:00 AM",
    duration: "45 Minutes",
    actionText: "Join Class",
    link: "#",
  },
  myClasses: {
    cardTitle: "My Classes",
    viewAllLink: "/student/classes",
    items: [
      {
        id: "math",
        title: "Mathematics",
        symbol: "√x",
        isSymbol: true,
        details: "4 Lessons • 2 Assignments",
        colorClass: "bg-purple-100 text-purple-600",
      },
      {
        id: "science",
        title: "Science",
        iconType: "flask",
        isSymbol: false,
        details: "6 Lessons • 3 Assignments",
        colorClass: "bg-sky-100 text-sky-500",
      },
      {
        id: "english",
        title: "English",
        iconType: "book",
        isSymbol: false,
        details: "5 Lessons • 2 Assignments",
        colorClass: "bg-amber-100 text-amber-500",
      },
    ],
  },
  recentAssignments: {
    cardTitle: "Recent Assignments",
    viewAllLink: "/student/assignments",
    items: [
      {
        id: "asg_1",
        title: "Algebra Practice Set",
        due: "Due: Tomorrow",
        status: "Not Started",
        badgeStyle: "bg-emerald-50 text-emerald-600 border-emerald-100",
      },
      {
        id: "asg_2",
        title: "Science Lab Report",
        due: "Due: Nov 5",
        status: "In Progress",
        badgeStyle: "bg-sky-50 text-sky-600 border-sky-100",
      },
      {
        id: "asg_3",
        title: "English Essay",
        due: "Due: Nov 8",
        status: "Not Started",
        badgeStyle: "bg-slate-100 text-slate-500 border-slate-200/80",
      },
    ],
  },
  learningMaterials: {
    cardTitle: "Learning Materials",
    viewAllLink: "/student/materials",
    items: [
      {
        id: "mat_1",
        title: "Math Notes",
        meta: "PDF • 2.4 MB",
        iconType: "book",
        color: "#f43f5e",
        bg: "bg-rose-50",
      },
      {
        id: "mat_2",
        title: "Science Lecture",
        meta: "Video • 18 Min",
        iconType: "video",
        color: "#0080f6",
        bg: "bg-blue-50",
      },
      {
        id: "mat_3",
        title: "English Guide",
        meta: "PDF • 1.8 MB",
        iconType: "doc",
        color: "#a855f7",
        bg: "bg-purple-50",
      },
    ],
  },
  helpCard: {
    title: "Need Help?",
    subtitle: "Contact your teacher for support.",
    buttonText: "Get Support →",
    link: "/contact",
  },
};

export const studentCoursesMock = studentDashboardMock.myClasses.items;
export const studentAssignmentsMock = studentDashboardMock.recentAssignments.items;
