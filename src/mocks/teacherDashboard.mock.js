import teacherAvatarImg from "@/assets/images/Reference photograph.png";

/**
 * Teacher Dashboard Mock Data
 * Matching reference image: media_1794548109940_60defdd7.jpg
 */

export const teacherDashboardMock = {
  teacher: {
    name: "Alex Teacher",
    displayName: "Ms. Sarah",
    role: "Teacher",
    avatar: teacherAvatarImg,
  },
  greeting: {
    title: "Good Morning, Ms. Sarah",
    emoji: "👏",
    subtitle: "Here's your teaching overview for today.",
  },
  kpiStats: [
    {
      id: "classes",
      value: "4",
      label: "My Classes",
      iconType: "layers",
      colorClass: "bg-blue-50 text-[#0080f6]",
    },
    {
      id: "students",
      value: "96",
      label: "Total Students",
      iconType: "users",
      colorClass: "bg-amber-50 text-amber-500",
    },
    {
      id: "sessions",
      value: "3",
      label: "Today's Session",
      iconType: "calendar",
      colorClass: "bg-emerald-50 text-emerald-500",
    },
  ],
  todaySchedule: [
    {
      id: "sched_1",
      time: "10:00 AM – 10:45 AM",
      title: "Mathematics – Grade 9",
      type: "Live Class",
      isActive: true,
      buttonText: "Start Class",
      variant: "primary",
    },
    {
      id: "sched_2",
      time: "12:00 PM – 12:45 PM",
      title: "Science – Grade 8",
      type: "Live Class",
      isActive: false,
      buttonText: "Start Class",
      variant: "outline",
    },
    {
      id: "sched_3",
      time: "02:00 PM – 02:45 PM",
      title: "English – Grade 9",
      type: "Live Class",
      isActive: false,
      buttonText: "Start Class",
      variant: "outline",
    },
  ],
  myClasses: [
    {
      id: "cls_math_9",
      subject: "Mathematics – Grade 9",
      studentsCount: 28,
      iconType: "sqrt",
      colorClass: "bg-purple-100 text-purple-600",
    },
    {
      id: "cls_sci_8",
      subject: "Science – Grade 8",
      studentsCount: 24,
      iconType: "clover",
      colorClass: "bg-emerald-100 text-emerald-600",
    },
    {
      id: "cls_eng_9",
      subject: "English – Grade 9",
      studentsCount: 22,
      iconType: "book",
      colorClass: "bg-amber-100 text-amber-600",
    },
  ],
  quickActions: [
    {
      id: "start_live",
      label: "Start Live Class",
      iconType: "video",
      color: "blue",
    },
    {
      id: "schedule_class",
      label: "Schedule Class",
      iconType: "calendar",
      color: "amber",
    },
    {
      id: "upload_material",
      label: "Upload Material",
      iconType: "upload",
      color: "emerald",
    },
  ],
  helpCard: {
    title: "Need Help?",
    subtitle: "Contact your administrator or support team.",
    buttonText: "Get Support →",
    link: "/contact",
  },
};

export default teacherDashboardMock;

