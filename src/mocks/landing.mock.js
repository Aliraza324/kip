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

export const teachingLearningPortalsMock = {
  badge: "CHOOSE YOUR PORTAL",
  headingLine1: "One Platform for Teaching",
  headingLine2Prefix: "and ",
  headingLine2Accent: "Learning",
  cards: [
    {
      id: "student",
      role: "Student",
      prefix: "I'm a",
      description:
        "Join your classes, connect with teachers and access your learning materials.",
      loginText: "Student Login",
      loginLink: "/auth/login?role=student",
      registerPrompt: "New student?",
      registerText: "Create an account",
      registerLink: "/auth/register?role=student",
      bgColor: "#eff8ff",
      borderColor: "border-blue-100",
      iconBg: "bg-[#007be3]",
      btnStyle: "bg-[#007be3] hover:bg-[#0066c0] text-white shadow-md shadow-blue-500/20",
      iconType: "GraduationCap",
      imageType: "boy",
    },
    {
      id: "teacher",
      role: "Teacher",
      prefix: "I'm a",
      description:
        "Access your classes, manage learning materials and teach interactive live lessons.",
      loginText: "Teacher Login",
      loginLink: "/auth/login?role=teacher",
      registerPrompt: "New teacher?",
      registerText: "Create an account",
      registerLink: "/auth/register?role=teacher",
      bgColor: "#fffbf0",
      borderColor: "border-amber-100",
      iconBg: "bg-[#febf11]",
      btnStyle: "bg-[#febf11] hover:bg-[#e5ab0f] text-[#01287b] shadow-md shadow-amber-500/20",
      iconType: "Presentation",
      imageType: "teacher",
    },
  ],
};

export const landingHowItWorksMock = {
  badge: "HOW IT WORKS",
  headingLine1: "Getting Started Is ",
  headingAccent: "Simple.",
  subtitle: "Three simple steps to begin your online learning experience.",
  steps: [
    {
      id: "step_01",
      title: "Create Account",
      description: "Sign up as a student or teacher.",
      imageKey: "step1",
      link: "/auth/register",
    },
    {
      id: "step_02",
      title: "Get Connected",
      description: "Access your classes and schedule.",
      imageKey: "step2",
      link: "/auth/login",
    },
    {
      id: "step_03",
      title: "Start Learning",
      description: "Join live classes and collaborate.",
      imageKey: "step3",
      link: "/student",
    },
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

export const landingWhatYouCanDoMock = {
  badge: "WHAT YOU CAN DO",
  headingMain: "Everything You Need for ",
  headingAccent1: "A Better",
  headingAccent2: "Virtual Classroom.",
  cards: [
    {
      id: "card_live_classes",
      title: "Live Online Classes",
      description:
        "Connect with teachers and students through live audio and video sessions.",
      theme: "blue",
      iconType: "video",
    },
    {
      id: "card_screen_sharing",
      title: "Screen Sharing",
      description:
        "Share presentations, documents and your screen during lessons.",
      theme: "yellow",
      iconType: "screenShare",
    },
    {
      id: "card_whiteboard",
      title: "Interactive Whiteboard",
      description:
        "Write, draw and explain ideas together on a shared digital board.",
      theme: "blue",
      iconType: "whiteboard",
    },
    {
      id: "card_scheduling",
      title: "Easy Class Scheduling",
      description:
        "Stay updated with upcoming classes and scheduled sessions.",
      theme: "yellow",
      iconType: "scheduling",
    },
    {
      id: "card_materials",
      title: "Learning Materials",
      description:
        "Access learning resources shared by your teachers.",
      theme: "blue",
      iconType: "materials",
    },
    {
      id: "card_teacher_tools",
      title: "Teacher Tools",
      description:
        "Manage class participants, control permissions and keep lessons focused.",
      theme: "yellow",
      iconType: "teacherTools",
    },
  ],
};

export const landingVirtualClassroomExperienceMock = {
  badge: "A Better Virtual Classroom",
  headingPart1: "Better ",
  headingPart2: "Virtual",
  headingPart3: "Classroom",
  headingPart4: "Experience",
  subtitle:
    "Bring your online classes to life with tools that make teaching and learning more engaging.",
  buttonText: "watch demo",
  buttonLink: "#demo",
  chips: [
    {
      id: "chip_1",
      icon: "video",
      color: "blue",
      line1: "Interactive",
      line2: "Whiteboard",
    },
    {
      id: "chip_2",
      icon: "pen",
      color: "yellow",
      line1: "Participant",
      line2: "Management",
    },
    {
      id: "chip_3",
      icon: "chat",
      color: "blue",
      line1: "Live Video &",
      line2: "Audio",
    },
    {
      id: "chip_4",
      icon: "screen",
      color: "blue",
      line1: "Screen",
      line2: "Sharing",
    },
    {
      id: "chip_5",
      icon: "hand",
      color: "yellow",
      line1: "Raise",
      line2: "Hand",
    },
    {
      id: "chip_6",
      icon: "users",
      color: "blue",
      line1: "Participant",
      line2: "Management",
    },
  ],
};

export const landingMoreThanVirtualClassroomMock = {
  badgeAccent: "Powerful",
  badgeText: "Learning Features",
  headingMain: "More Than a ",
  headingAccent: "Virtual Classroom.",
  subtitle:
    "Smart tools that make teaching, learning, and progress tracking easier for everyone.",
  cards: [
    {
      id: "ai_learning",
      title: "AI-Powered Learning",
      description:
        "Get personalized learning support, smart recommendations, and instant help.",
      imageKey: "ai",
      link: "/student",
    },
    {
      id: "assessments_tests",
      title: "Assessments & Tests",
      description:
        "Create quizzes and tests, automate grading, and give timely feedback.",
      imageKey: "assessments",
      link: "/teacher",
    },
    {
      id: "progress_tracking",
      title: "Student Progress Tracking",
      description:
        "Monitor learning progress, performance, and milestone completion in real time.",
      imageKey: "progress",
      link: "/student",
    },
  ],
};

export const landingTestimonialsSliderMock = {
  badge: "Testimonials",
  headingMain: "Loved by ",
  headingAccent: "Students and Teachers.",
  subtitle:
    "See what our users say about their learning and teaching experience on KIPClassin.",
  testimonials: [
    {
      id: "testimonial_01",
      name: "Daniel R.",
      role: "Student",
      rating: 5,
      quote:
        "KIPClassin makes online learning so easy and interactive. I can join my classes, access materials and stay on track.",
      imageKey: "daniel",
      circleBg: "bg-[#d6ebff]",
      featured: false,
    },
    {
      id: "testimonial_02",
      name: "Aisha M.",
      role: "Teacher",
      rating: 5,
      quote:
        "As a teacher, I love how simple it is to create classes, manage students and teach live with all the tools I need in one place.",
      imageKey: "aisha",
      circleBg: "bg-[#fef3c7]",
      featured: true,
    },
    {
      id: "testimonial_03",
      name: "Omar K.",
      role: "Student",
      rating: 5,
      quote:
        "The live classes, whiteboard and screen sharing make lessons more engaging and help me understand better.",
      imageKey: "omar",
      circleBg: "bg-[#d6ebff]",
      featured: false,
    },
    {
      id: "testimonial_04",
      name: "Sarah L.",
      role: "Teacher",
      rating: 5,
      quote:
        "The automated grading and live classroom breakout rooms save me hours every week while keeping student engagement at its highest.",
      imageKey: "aisha",
      circleBg: "bg-[#fef3c7]",
      featured: true,
    },
    {
      id: "testimonial_05",
      name: "Zain M.",
      role: "Student",
      rating: 5,
      quote:
        "Instant access to class notes and recorded lectures made revision effortless before semester finals. I couldn't be happier!",
      imageKey: "daniel",
      circleBg: "bg-[#d6ebff]",
      featured: false,
    },
  ],
};

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

export const landingTrustedBannerMock = {
  badge: "Trusted by Educators & Students",
  items: [
    {
      id: "active_students",
      label: "Active Students",
      imageKey: "students",
    },
    {
      id: "teachers",
      label: "Teachers",
      imageKey: "teachers",
    },
    {
      id: "classes_held",
      label: "Classes Held",
      imageKey: "classes",
    },
    {
      id: "watch_demo",
      label: "Watch Demo",
      imageKey: "demo",
      hasArrow: true,
      href: "#demo",
    },
  ],
};

export const landingFaqMock = {
  badge: "FAQ",
  headingLine1: "Frequently",
  headingLine2Prefix: "Asked ",
  headingLine2Accent: "Questions",
  subtitle: "Find quick answers to common questions about KIPClassin.",
  items: [
    {
      id: "faq_1",
      question: "What is KIPClassin?",
      answer:
        "KIPClassin is an online learning platform that helps students and teachers connect, conduct live classes, share materials and collaborate in a virtual classroom.",
      icon: "BookOpen",
      theme: "blue",
    },
    {
      id: "faq_2",
      question: "How do I receive my login details?",
      answer:
        "Your official login credentials are sent to your registered email address upon enrollment or registration. You can also contact your campus administrator if you haven't received them.",
      icon: "User",
      theme: "yellow",
    },
    {
      id: "faq_3",
      question: "Can I use the platform on a phone or tablet?",
      answer:
        "Yes, KIPClassin is fully responsive and accessible via modern web browsers on smartphones, tablets, laptops, and desktop computers with complete cross-device support.",
      icon: "Video",
      theme: "blue",
    },
    {
      id: "faq_4",
      question: "Do I need to download an application?",
      answer:
        "No installation is required. KIPClassin works directly in any standard web browser such as Chrome, Firefox, Safari, or Edge without needing additional software.",
      icon: "Laptop",
      theme: "yellow",
    },
    {
      id: "faq_5",
      question: "What should I do if my microphone is not working?",
      answer:
        "Check your browser's audio permissions to ensure KIPClassin is permitted to access your microphone. You can also test and select your input device in the classroom settings menu.",
      icon: "Calendar",
      theme: "blue",
    },
    {
      id: "faq_6",
      question: "Where can I find the learning materials?",
      answer:
        "All recorded lessons, lecture slides, digital notes, and homework files are organized inside the 'Learning Materials' tab on your student or teacher portal dashboard.",
      icon: "CreditCard",
      theme: "yellow",
    },
    {
      id: "faq_7",
      question: "Who should I contact for technical support?",
      answer:
        "You can reach out to our campus liaison IT team at support@kip.edu.pk or use the live chat help widget available inside your portal workspace.",
      icon: "Headphones",
      theme: "blue",
    },
  ],
};

export const landingNextLearningExperienceMock = {
  headingLine1: "Your Next Learning",
  headingLine2Prefix: "Experience ",
  headingLine2Accent: "Starts Here.",
  subtitle:
    "Join your classroom, connect with your teacher and make learning more interactive.",
  primaryCta: {
    text: "Get Started Today",
    href: "/auth/register",
  },
  secondaryCta: {
    text: "Login to Your Portal",
    href: "/auth/login",
  },
};

export const landingFooterMock = {
  description:
    "A modern online learning platform that helps students and teachers connect, teach and learn together.",
  socials: [
    { label: "Facebook", href: "#facebook", icon: "facebook" },
    { label: "Instagram", href: "#instagram", icon: "instagram" },
    { label: "YouTube", href: "#youtube", icon: "youtube" },
    { label: "LinkedIn", href: "#linkedin", icon: "linkedin" },
  ],
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" },
  ],
  userLinks: [
    {
      label: "Student Login",
      href: "/auth/login?role=student",
      icon: "GraduationCap",
    },
    {
      label: "Teacher Login",
      href: "/auth/login?role=teacher",
      icon: "Users",
    },
    {
      label: "Create an Account",
      href: "/auth/register",
      icon: "UserPlus",
    },
    {
      label: "Help & Support",
      href: "#faq",
      icon: "HelpCircle",
    },
  ],
  companyLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  newsletter: {
    title: "Stay in the Loop",
    subtitle: "Get updates, new features and learning tips from KIPClassin.",
    placeholder: "Enter your email",
  },
  copyright: "© 2026 KIPClassin. All rights reserved.",
};
