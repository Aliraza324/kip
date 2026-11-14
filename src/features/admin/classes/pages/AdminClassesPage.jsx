import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  adminClassesHeaderMock,
  adminClassesFiltersMock,
  adminClassesListMock,
} from "@/mocks";
import {
  AdminClassesHeader,
  AdminClassesFilters,
  AdminClassesTable,
  AdminClassesPagination,
  AdminAddClassModal,
  AdminClassDetailModal,
} from "../components";

export const AdminClassesPage = () => {
  const navigate = useNavigate();
  const [classesList, setClassesList] = useState(adminClassesListMock);
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedTeacher, setSelectedTeacher] = useState("All Teachers");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingClass, setViewingClass] = useState(null);

  // Filtered classes list
  const filteredClasses = useMemo(() => {
    return classesList.filter((cls) => {
      const matchGrade =
        selectedGrade === "All Grades" || cls.grade === selectedGrade;
      const matchTeacher =
        selectedTeacher === "All Teachers" ||
        cls.primaryTeacher?.name === selectedTeacher ||
        (cls.teachersList && cls.teachersList.includes(selectedTeacher));
      const matchStatus =
        selectedStatus === "All Status" || cls.status === selectedStatus;

      return matchGrade && matchTeacher && matchStatus;
    });
  }, [classesList, selectedGrade, selectedTeacher, selectedStatus]);

  // Paginated slice
  const paginatedClasses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredClasses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredClasses, currentPage, itemsPerPage]);

  // Selection handlers
  const handleToggleSelectAll = () => {
    if (selectedIds.length === paginatedClasses.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedClasses.map((c) => c.id));
    }
  };

  const handleToggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add new class handler
  const handleSaveClass = (newClassData) => {
    const newEntry = {
      id: `cls-${Date.now()}`,
      index: classesList.length + 1,
      name: newClassData.name,
      grade: newClassData.grade,
      primaryTeacher: {
        name: newClassData.teacherName,
        avatar: classesList[0].primaryTeacher.avatar,
      },
      moreTeachersCount: 1,
      teachersList: [newClassData.teacherName],
      studentsCount: newClassData.studentsCount || 30,
      status: "Active",
      section: newClassData.section,
      room: newClassData.room,
    };
    setClassesList((prev) => [newEntry, ...prev]);
  };

  const handleMoreOptions = (cls) => {
    toast(`Quick options for ${cls.name}`, { icon: "ℹ️" });
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-8 animate-in fade-in duration-150">
      {/* 1. Header with Add Class button */}
      <AdminClassesHeader
        title={adminClassesHeaderMock.title}
        subtitle={adminClassesHeaderMock.subtitle}
        onAddClass={() => setIsAddModalOpen(true)}
      />

      {/* 2. Filter Pills */}
      <AdminClassesFilters
        gradeOptions={adminClassesFiltersMock.grades}
        selectedGrade={selectedGrade}
        onSelectGrade={(g) => {
          setSelectedGrade(g);
          setCurrentPage(1);
        }}
        teacherOptions={adminClassesFiltersMock.teachers}
        selectedTeacher={selectedTeacher}
        onSelectTeacher={(t) => {
          setSelectedTeacher(t);
          setCurrentPage(1);
        }}
        statusOptions={adminClassesFiltersMock.statuses}
        selectedStatus={selectedStatus}
        onSelectStatus={(s) => {
          setSelectedStatus(s);
          setCurrentPage(1);
        }}
      />

      {/* 3. Classes Table */}
      <AdminClassesTable
        classes={paginatedClasses}
        selectedIds={selectedIds}
        onToggleSelectAll={handleToggleSelectAll}
        onToggleSelectOne={handleToggleSelectOne}
        onViewClass={(cls) => navigate(`/admin/classes/${cls.id}`)}
        onEditClass={(cls) => {
          toast.success(`Opening editor for ${cls.name}`);
          setViewingClass(cls);
        }}
        onMoreOptions={handleMoreOptions}
      />

      {/* 4. Pagination */}
      <AdminClassesPagination
        currentPage={currentPage}
        totalItems={filteredClasses.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* 5. Modals */}
      <AdminAddClassModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSaveClass={handleSaveClass}
      />

      <AdminClassDetailModal
        isOpen={Boolean(viewingClass)}
        onClose={() => setViewingClass(null)}
        classData={viewingClass}
      />
    </div>
  );
};

export default AdminClassesPage;

