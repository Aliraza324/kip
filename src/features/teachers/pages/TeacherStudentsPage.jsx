import { useState } from "react";
import { teacherClassesListMock } from "@/mocks";
import { TeacherStudentsClassCard } from "../components/students";

export const TeacherStudentsPage = () => {
  const [classes] = useState(teacherClassesListMock);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Students
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Select a class to manage and view enrolled students.
        </p>
      </div>

      {/* Classes list for selecting students by class */}
      <div className="space-y-3.5 sm:space-y-4">
        {classes.map((cls) => (
          <TeacherStudentsClassCard key={cls.id} classItem={cls} />
        ))}
      </div>
    </div>
  );
};

export default TeacherStudentsPage;

