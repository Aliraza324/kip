/**
 * Student Assignments Mock Data
 * Supporting 4-step workflow:
 * 1. Assignments list with filters (All, Pending, Submitted, Overdue)
 * 2. Submit Assignment with file upload, guidelines & instructions
 * 3. Assignment Submitted success screen
 * 4. Graded / Waiting for teacher result review screen
 */

export const studentAssignmentsListMock = [
  {
    id: "asg_algebra",
    title: "Algebra Practice Set",
    subtitle: "PDF · Practice problems",
    iconType: "file",
    subject: "Mathematics",
    subjectIcon: "sqrt",
    subjectColor: "bg-purple-100 text-purple-600",
    dueDate: "Nov 6, 2026",
    dueTime: "11:59 PM",
    dueBadge: "Due in 2 Days",
    status: "Pending", // "Pending" | "Submitted" | "Overdue"
    isGraded: false,
    score: "92 / 100",
    grade: "A",
    teacherFeedback:
      "Excellent work! Your solutions are correct and well-presented. Just make sure to show a bit more detail in steps for full marks.",
    attachedFile: {
      name: "Algebra_Practice_Set.pdf",
      size: "1.2 MB",
    },
    instructions: [
      "Solve all the problems in the practice set.",
      "Write your answers clearly and neatly.",
      "Submit your completed work as a PDF, JPG, or PNG file.",
    ],
  },
  {
    id: "asg_science_lab",
    title: "Science Lab Report",
    subtitle: "PDF · Lab report",
    iconType: "flask",
    subject: "Science",
    subjectIcon: "flask",
    subjectColor: "bg-sky-100 text-sky-600",
    dueDate: "Nov 7, 2026",
    dueTime: "05:00 PM",
    dueBadge: "Overdue",
    status: "Overdue",
    isGraded: false,
    score: null,
    grade: null,
    teacherFeedback: "",
    attachedFile: {
      name: "Science_Lab_Report.pdf",
      size: "2.4 MB",
    },
    instructions: [
      "Document observations and experimental results accurately.",
      "Include structured charts and conclusion data.",
      "Submit your report as PDF or DOC file.",
    ],
  },
  {
    id: "asg_english_essay",
    title: "English Essay: My Community",
    subtitle: "Written work · Essay (DOC/PDF)",
    iconType: "book",
    subject: "English",
    subjectIcon: "book",
    subjectColor: "bg-amber-100 text-amber-600",
    dueDate: "Nov 9, 2026",
    dueTime: "11:59 PM",
    dueBadge: "Due in 5 Days",
    status: "Submitted",
    submittedAt: "Nov 4, 2026, 10:24 AM",
    isGraded: true,
    score: "92 / 100",
    grade: "A",
    teacherFeedback:
      "Excellent work! Your solutions are correct and well-presented. Just make sure to show a bit more detail in steps for full marks.",
    attachedFile: {
      name: "English_Essay_Guidelines.pdf",
      size: "850 KB",
    },
    instructions: [
      "Write a 500-word essay describing your community roots and values.",
      "Include introductory, body, and conclusion paragraphs.",
      "Check grammar and vocabulary before final submission.",
    ],
  },
  {
    id: "asg_physics_motion",
    title: "Physics Worksheet: Motion",
    subtitle: "PDF · Worksheet",
    iconType: "atom",
    subject: "Physics",
    subjectIcon: "atom",
    subjectColor: "bg-indigo-100 text-indigo-600",
    dueDate: "Nov 10, 2026",
    dueTime: "04:00 PM",
    dueBadge: "Due in 6 Days",
    status: "Pending",
    isGraded: false,
    score: null,
    grade: null,
    teacherFeedback: "",
    attachedFile: {
      name: "Physics_Worksheet_Motion.pdf",
      size: "1.8 MB",
    },
    instructions: [
      "Calculate linear and angular velocity vectors.",
      "Write down the step-by-step formula substitutions.",
      "Upload clean scans or PDF printout.",
    ],
  },
  {
    id: "asg_chemistry_ex1",
    title: "O₂ Chemistry Exercise",
    subtitle: "PDF · Problem set",
    iconType: "molecule",
    subject: "Chemistry",
    subjectIcon: "molecule",
    subjectColor: "bg-teal-100 text-teal-600",
    dueDate: "Nov 12, 2026",
    dueTime: "06:00 PM",
    dueBadge: "Due in 8 Days",
    status: "Submitted",
    submittedAt: "Nov 7, 2026, 02:40 PM",
    isGraded: false, // In Review / Waiting for teacher result
    score: null,
    grade: null,
    teacherFeedback: "",
    attachedFile: {
      name: "O2_Chemistry_Exercise.pdf",
      size: "3.2 MB",
    },
    instructions: [
      "Balance all oxidation equations for oxygen compounds.",
      "List molar ratios and stoichiometric balances.",
      "Submit as PDF or clear image files.",
    ],
  },
  {
    id: "asg_chemistry_ex2",
    title: "O₂ Chemistry Exercise",
    subtitle: "PDF · Problem set",
    iconType: "molecule",
    subject: "Chemistry",
    subjectIcon: "molecule",
    subjectColor: "bg-teal-100 text-teal-600",
    dueDate: "Nov 12, 2026",
    dueTime: "06:00 PM",
    dueBadge: "Overdue",
    status: "Overdue",
    isGraded: false,
    score: null,
    grade: null,
    teacherFeedback: "",
    attachedFile: {
      name: "O2_Chemistry_Exercise.pdf",
      size: "3.2 MB",
    },
    instructions: [
      "Balance oxidation reactions and stoichiometry equations.",
      "Submit clean handwritten or typed answers.",
    ],
  },
];

