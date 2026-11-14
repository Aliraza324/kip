/**
 * Mock data for Admin Hub & Dashboard
 */
export const adminLoginMock = {
  title: "Admin Login",
  subtitle: "Manage classes, teachers, students, and platform activities from one place.",
  backToHome: "← Back to Home",
  credentials: {
    username: "admin",
    password: "password123",
  },
  fields: {
    username: {
      type: "text",
      placeholder: "Username",
    },
    password: {
      type: "password",
      placeholder: "Password",
    },
  },
  submitButton: {
    label: "Login to Dashboard",
  },
  validation: {
    usernameRequired: "Username is required.",
    passwordRequired: "Password is required.",
  },
};

export const adminDashboardMock = {
  admin: {
    name: "Admin",
    role: "Super Admin",
  },
  greeting: {
    title: "Welcome back, Admin",
    subtitle: "Manage your platform, users, classes, and content from one place.",
  },
  kpis: [
    {
      id: "students",
      label: "Total Students",
      value: "1,248",
      iconType: "users",
      bgClass: "bg-[#eaf4fe]",
      iconColorClass: "text-[#0080f6]",
    },
    {
      id: "teachers",
      label: "Total Teachers",
      value: "86",
      iconType: "teachers",
      bgClass: "bg-[#fef8e7]",
      iconColorClass: "text-[#d97706]",
    },
    {
      id: "classes",
      label: "Total Classes",
      value: "24",
      iconType: "classes",
      bgClass: "bg-[#eafaf1]",
      iconColorClass: "text-[#16a34a]",
    },
  ],
  chart: {
    title: "Form Overview",
    highlightBadge: "1,248",
    yAxis: [1400, 1200, 1000, 800, 600, 400],
    points: [
      { month: "Jun", value: 800 },
      { month: "Jul", value: 920 },
      { month: "Aug", value: 1010 },
      { month: "Sep", value: 1080 },
      { month: "Oct", value: 1160 },
      { month: "Nov", value: 1248 },
    ],
  },
  notifications: [
    {
      id: "notif_1",
      iconType: "teachers",
      bgClass: "bg-[#eaf4fe]",
      iconColorClass: "text-[#0080f6]",
      title: "Teacher Registration Approval",
      description: "3 teacher registrations are waiting for your approval.",
      time: "2 min ago",
    },
    {
      id: "notif_2",
      iconType: "users",
      bgClass: "bg-[#eaf4fe]",
      iconColorClass: "text-[#0080f6]",
      title: "New Student Registration",
      description: "5 new student registrations received.",
      time: "18 min ago",
    },
    {
      id: "notif_3",
      iconType: "classes",
      bgClass: "bg-[#eafaf1]",
      iconColorClass: "text-[#16a34a]",
      title: "Class Update",
      description: 'A new class "Grade 10 – Section B" was created.',
      time: "1 hour ago",
    },
  ],
  quickActions: [
    {
      id: "add-student",
      label: "Add Student",
      iconType: "users",
      color: "blue",
      containerClass: "bg-[#eaf4fe] hover:bg-[#d8edfc] border-blue-200/80 text-slate-800",
      iconColorClass: "text-[#0080f6]",
      iconBgClass: "bg-blue-100/60",
    },
    {
      id: "add-teacher",
      label: "Add Teacher",
      iconType: "teachers",
      color: "amber",
      containerClass: "bg-[#fef8e7] hover:bg-[#fef2d0] border-amber-200/80 text-slate-800",
      iconColorClass: "text-[#d97706]",
      iconBgClass: "bg-amber-100/60",
    },
    {
      id: "create-class",
      label: "Create Class",
      iconType: "classes",
      color: "emerald",
      containerClass: "bg-[#eafaf1] hover:bg-[#d5f5e3] border-emerald-200/80 text-slate-800",
      iconColorClass: "text-[#16a34a]",
      iconBgClass: "bg-emerald-100/60",
    },
    {
      id: "manage-content",
      label: "Manage Content",
      iconType: "content",
      color: "purple",
      containerClass: "bg-[#f4effe] hover:bg-[#e9defc] border-purple-200/80 text-slate-800",
      iconColorClass: "text-[#9333ea]",
      iconBgClass: "bg-purple-100/60",
    },
  ],
};
