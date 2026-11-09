/**
 * Mock data for Public / Landing Page
 * Synchronized with KIPClassin visual specifications
 */
export const landingNavLinksMock = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact", href: "/contact" },
];

export const landingHeroMock = {
  badge: "YOUR ONLINE LEARNING SPACE",
  headingLine1: "Learn Together.",
  headingLine2: "Grow Together.",
  description:
    "KIPClassin brings live lessons, an interactive whiteboard and learning materials together in one platform for students and teachers.",
  primaryCta: {
    text: "Create an Account",
    href: "/auth/register",
  },
  secondaryCta: {
    text: "Watch Demo",
    href: "#demo",
  },
  stats: [
    { label: "Active Students", value: "12,500+", change: "+18% this term" },
    { label: "Expert Faculty", value: "450+", change: "PhD & certified" },
    { label: "Success Rate", value: "98.4%", change: "Course completion" },
    { label: "Partner Institutions", value: "85+", change: "Nationwide campuses" },
  ],
};

export const landingPortalsMock = [
  {
    id: "student",
    title: "Student Portal",
    subtitle: "Active Learning Hub",
    description:
      "Interactive course playlists, real-time live lessons, instant assignment submissions, and progress trackers.",
    badge: "For Learners",
    link: "/student",
    iconName: "GraduationCap",
    accentColor: "#007be3",
    features: [
      "Live whiteboard lessons & recordings",
      "Interactive quiz feedback & GPA calc",
      "Course material repository & downloads",
    ],
  },
  {
    id: "teacher",
    title: "Faculty Workspace",
    subtitle: "Educator Cockpit",
    description:
      "Curriculum management, automated grading queue, biometric attendance logs, and student performance metrics.",
    badge: "For Teachers",
    link: "/teacher",
    iconName: "BookOpenCheck",
    accentColor: "#01287b",
    features: [
      "Class roster & session scheduling",
      "Assignment evaluation & rubric grading",
      "Direct parent & student messaging",
    ],
  },
  {
    id: "admin",
    title: "Administrative Hub",
    subtitle: "Campus Oversight",
    description:
      "Institutional governance, fee reconciliation, faculty scheduling, role-based security, and accreditation audits.",
    badge: "For Management",
    link: "/admin",
    iconName: "ShieldAlert",
    accentColor: "#febf11",
    features: [
      "Campus-wide fiscal & fee analytics",
      "Staff onboarding & access permissions",
      "Comprehensive system audit logs",
    ],
  },
];

export const landingFeaturesMock = [
  {
    id: "feat_01",
    title: "Live Synchronous Virtual Classroom",
    description:
      "Low-latency HD video streaming paired with an interactive multi-user whiteboard and break-out rooms.",
    icon: "Video",
    highlight: "Real-Time Collaboration",
  },
  {
    id: "feat_02",
    title: "Role-Based Academic Governance",
    description:
      "Granular permission trees ensuring Students, Teachers, and Administrators only access authorized resources.",
    icon: "ShieldCheck",
    highlight: "Enterprise Security",
  },
  {
    id: "feat_03",
    title: "Instant Assignment & Rubric Grading",
    description:
      "Digital drop-boxes supporting file uploads, inline teacher annotations, and automatic grade calculation.",
    icon: "Layers",
    highlight: "Paperless Efficiency",
  },
  {
    id: "feat_04",
    title: "Comprehensive Academic Analytics",
    description:
      "Predictive dropout prevention alerts, attendance tracking, and semester GPA trend visualizers.",
    icon: "BarChart3",
    highlight: "Data-Driven Insights",
  },
];

export const landingFooterMock = {
  aboutText:
    "KIPClassin is the unified academic operating system designed for modern schools, colleges, and training institutes.",
  quickLinks: [
    { label: "Student Portal", href: "/student" },
    { label: "Teacher Workspace", href: "/teacher" },
    { label: "Admin Hub", href: "/admin" },
    { label: "Admissions 2026", href: "/auth/register" },
  ],
  supportLinks: [
    { label: "Help Center", href: "#help" },
    { label: "System Status", href: "#status" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
  ],
  contact: {
    email: "admissions@kip.edu.pk",
    phone: "+92 42 111 547 547",
    address: "KIP Campus, Education City, Lahore, Pakistan",
  },
};
