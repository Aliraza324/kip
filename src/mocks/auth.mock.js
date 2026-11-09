/**
 * Mock data for Authentication & Role-Based Access
 */
export const mockUsers = [
  {
    id: "usr_admin_01",
    name: "Dr. Hamza Khan",
    email: "admin@kip.edu.pk",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    permissions: ["all"],
  },
  {
    id: "usr_teacher_01",
    name: "Prof. Ayesha Siddiqui",
    email: "ayesha.s@kip.edu.pk",
    role: "teacher",
    department: "Computer Science",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    classesCount: 4,
  },
  {
    id: "usr_student_01",
    name: "Bilal Ahmed",
    email: "bilal.ahmed@student.kip.edu.pk",
    role: "student",
    rollNumber: "BCS-2024-042",
    semester: 4,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
  },
];

