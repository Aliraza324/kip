import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { teacherClassesListMock, teacherStudentsListMock } from "@/mocks";
import { TeacherStudentsTable } from "../components/students";

export const TeacherClassStudentsListPage = () => {
  const { classId } = useParams();

  const currentClass = useMemo(() => {
    return (
      teacherClassesListMock.find((c) => c.id === classId) ||
      teacherClassesListMock[0]
    );
  }, [classId]);

  const classStudents = useMemo(() => {
    if (!classId) return teacherStudentsListMock;
    const filtered = teacherStudentsListMock.filter(
      (s) => s.classId === classId || s.grade.toLowerCase() === currentClass.grade.toLowerCase()
    );
    return filtered.length > 0 ? filtered : teacherStudentsListMock;
  }, [classId, currentClass]);

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12">
      {/* Back button and page title matching SS 1 */}
      <div>
        <Link
          to="/teacher/students"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0080f6] hover:underline mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Classes</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Students
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage and view all your students for {currentClass.name}.
            </p>
          </div>

          <span className="self-start sm:self-auto inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0080f6] border border-blue-100">
            {currentClass.name}
          </span>
        </div>
      </div>

      {/* Students Table matching SS 1 */}
      <TeacherStudentsTable
        students={classStudents}
        classId={classId || currentClass.id}
      />
    </div>
  );
};

export default TeacherClassStudentsListPage;

