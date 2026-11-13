import { useState } from "react";
import { teacherClassesListMock } from "@/mocks";
import { TeacherClassCard } from "../components/classes/TeacherClassCard";

export const TeacherClassesPage = () => {
  const [classes] = useState(teacherClassesListMock);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Header Banner matching SS 1 */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          My Classes
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          View all classes assigned to you and the number of students in each class.
        </p>
      </div>

      {/* Classes List */}
      <div className="space-y-3.5 sm:space-y-4">
        {classes.map((cls) => (
          <TeacherClassCard key={cls.id} classItem={cls} />
        ))}
      </div>
    </div>
  );
};

export default TeacherClassesPage;

