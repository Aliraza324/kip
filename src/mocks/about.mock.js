/**
 * Mock data for About Landing Page
 * Synchronized with KIPClassin visual specifications
 */
export const aboutHeroMock = {
  badge: "ABOUT KIPCLASSIN",
  headingLine1: "Our Story, Our",
  headingLine2Prefix: "Purpose, ",
  headingLine2Accent: "Your Learning.",
  description:
    "KIPClassin is an AI-powered online learning platform that brings students and teachers together in a simple, interactive and intelligent classroom. We make teaching easier, learning smarter and collaboration stronger.",
  primaryCta: {
    text: "Create an Account",
    href: "/auth/register",
  },
  secondaryCta: {
    text: "Watch Demo",
    href: "#demo",
  },
};

export const aboutHighlightsMock = [
  {
    id: "smart_learning",
    titleLine1: "Smart Learning",
    titleLine2: "with AI",
    imageKey: "smart_learning",
  },
  {
    id: "built_for",
    titleLine1: "Built for",
    titleLine2: "Students & Teachers",
    imageKey: "built_for",
  },
  {
    id: "all_in_one",
    titleLine1: "All-in-One",
    titleLine2: "Classroom",
    imageKey: "all_in_one",
  },
  {
    id: "secure_reliable",
    titleLine1: "Secure &",
    titleLine2: "Reliable",
    imageKey: "secure_reliable",
  },
];

export const aboutMissionVisionMock = [
  {
    id: "mission",
    badge: "Our Mission",
    iconType: "Target",
    headingLine1: "Make Quality",
    headingLine2: "Education Accessible.",
    accentWord: null,
    description:
      "To empower educators and learners with smart, easy and effective online learning tools that create real impact.",
    imageKey: "mission",
  },
  {
    id: "vision",
    badge: "Our Vision",
    iconType: "Eye",
    headingLine1: "A Smarter",
    headingLine2: "Learning ",
    accentWord: "World.",
    description:
      "A world where everyone can teach, learn and grow with the support of intelligent, inclusive and engaging technology.",
    imageKey: "vision",
  },
];

export const aboutValuesMock = {
  badge: "Our Values",
  title: "The Values We Stand For",
  values: [
    {
      id: "accessibility",
      title: "Accessibility",
      description: "Learning for everyone, anywhere.",
      imageKey: "accessibility",
      theme: "blue",
    },
    {
      id: "collaboration",
      title: "Collaboration",
      description: "Bring students and teachers closer together.",
      imageKey: "collaboration",
      theme: "amber",
    },
    {
      id: "reliability",
      title: "Reliability",
      description: "A secure and stable platform you can trust.",
      imageKey: "reliability",
      theme: "blue",
    },
    {
      id: "continuous_growth",
      title: "Continuous Growth",
      description: "Evolving with new features and better learning experiences.",
      imageKey: "continuous_growth",
      theme: "amber",
    },
  ],
};

export const aboutCommunityCtaMock = {
  headingLine1: "Join Our Learning",
  headingAccent: "Community",
  description:
    "Be part of a growing community of learners and educators using AI to make education more effective and engaging.",
  primaryCta: {
    text: "Get Started Today",
    href: "/auth/register",
  },
  secondaryCta: {
    text: "Login to Your Portal",
    href: "/auth/login",
  },
};
