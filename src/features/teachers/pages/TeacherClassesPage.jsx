import { useTeacherClasses } from "@/hooks";
import { TeacherClassCard } from "../components/classes/TeacherClassCard";
import { BookOpen, AlertCircle, RefreshCw } from "lucide-react";

export const TeacherClassesPage = () => {
  const { classes, isLoading, isError, error, refetch } = useTeacherClasses();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Classes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View all classes assigned to you and the number of students in each class.
          </p>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="space-y-3.5 sm:space-y-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-2xs animate-pulse flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100" />
                <div className="space-y-2">
                  <div className="w-40 h-4 bg-slate-100 rounded" />
                  <div className="w-24 h-3 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="w-20 h-8 bg-slate-100 rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {!isLoading && isError && (
        <div className="bg-red-50 border border-red-200/80 rounded-3xl p-8 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
          <h3 className="text-base font-bold text-red-800">
            Failed to load assigned classes
          </h3>
          <p className="text-xs text-red-600 max-w-md mx-auto">
            {error?.message || "An error occurred while fetching your classes. Please try again."}
          </p>
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && classes.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center space-y-3 shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800">
            No Classes Assigned Yet
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            You do not have any classes assigned to your account right now. Once the administrator assigns you to a class, it will show up here.
          </p>
        </div>
      )}

      {/* Classes List */}
      {!isLoading && !isError && classes.length > 0 && (
        <div className="space-y-3.5 sm:space-y-4">
          {classes.map((cls) => (
            <TeacherClassCard key={cls.id} classItem={cls} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherClassesPage;
