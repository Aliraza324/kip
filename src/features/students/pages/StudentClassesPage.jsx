import { useState } from "react";
import { Search, Calendar, User, Layers, ChevronDown } from "lucide-react";
import { studentClassesListMock } from "@/mocks";
import { StudentClassCard } from "../components/classes/StudentClassCard";
import { StudentClassDetailView } from "../components/classes/StudentClassDetailView";
import { LiveClassroomView } from "../components/classroom/LiveClassroomView";

export const StudentClassesPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [isLiveClassOpen, setIsLiveClassOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("all");

  // If student joins online live class, render Live Virtual Classroom View
  if (isLiveClassOpen) {
    return (
      <LiveClassroomView
        onLeaveClass={() => setIsLiveClassOpen(false)}
      />
    );
  }

  // If a class is selected via "Enter Class", render Screen 2
  if (selectedClass) {
    return (
      <StudentClassDetailView
        classData={selectedClass}
        onBack={() => setSelectedClass(null)}
        onJoinLiveClass={() => setIsLiveClassOpen(true)}
      />
    );
  }

  // Filter logic
  const filteredClasses = studentClassesListMock.filter((item) => {
    if (activeTab === "in-progress" && item.status !== "In Progress") return false;
    if (activeTab === "completed" && item.status !== "Completed") return false;

    if (
      searchQuery &&
      !item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (teacherFilter !== "all" && !item.teacher.includes(teacherFilter)) return false;

    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Subtitle Matching Image 1 */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          My Classes
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          View and continue your enrolled classes.
        </p>
      </div>

      {/* Tabs: All Classes, In Progress, Completed */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "all"
              ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
              : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
          }`}
        >
          All Classes
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("in-progress")}
          className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "in-progress"
              ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
              : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
          }`}
        >
          In Progress
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("completed")}
          className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "completed"
              ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
              : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Filter Row: Search, Date/Time, Teacher, Course */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
        <div className="lg:col-span-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Class.."
            className="w-full bg-white border border-slate-200/80 rounded-2xl pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-700 outline-none focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100/50 shadow-2xs placeholder:text-slate-400 transition-all"
          />
        </div>

        <div className="lg:col-span-2">
          <button
            type="button"
            className="w-full bg-white border border-slate-200/80 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:border-blue-200 flex items-center justify-center gap-2 shadow-2xs"
          >
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">Date /Time</span>
          </button>
        </div>

        <div className="lg:col-span-2 relative">
          <select
            value={teacherFilter}
            onChange={(e) => setTeacherFilter(e.target.value)}
            className="w-full appearance-none bg-white border border-slate-200/80 rounded-2xl pl-9 pr-8 py-2.5 text-xs font-semibold text-slate-600 outline-none focus:border-[#0080f6] shadow-2xs cursor-pointer"
          >
            <option value="all">Teacher</option>
            <option value="James">Mr. James Wilson</option>
          </select>
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>

        <div className="lg:col-span-2 relative">
          <select className="w-full appearance-none bg-white border border-slate-200/80 rounded-2xl pl-9 pr-8 py-2.5 text-xs font-semibold text-slate-600 outline-none focus:border-[#0080f6] shadow-2xs cursor-pointer">
            <option value="all">Course</option>
            <option value="math">Mathematics</option>
          </select>
          <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Classes List / Table with Status Column & Enter Class Button */}
      <div className="space-y-3.5">
        {filteredClasses.map((classItem) => (
          <StudentClassCard
            key={classItem.id}
            classItem={classItem}
            onEnterClass={(item) => setSelectedClass(item)}
          />
        ))}

        {filteredClasses.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center text-slate-400">
            <Layers className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="font-bold text-slate-700">No classes found</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting your filters or search keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentClassesPage;
