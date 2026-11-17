import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAdminClasses } from "@/hooks/admin";
import { classService, teacherService } from "@/service/apiService";
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
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedTeacher, setSelectedTeacher] = useState("All Teachers");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewingClass, setViewingClass] = useState(null);
  const [teachersList, setTeachersList] = useState([]);

  // Fetch classes from backend using hook
  const { classes, meta, isLoading, refetch } = useAdminClasses({
    grade: selectedGrade,
    teacherId: selectedTeacher,
    status: selectedStatus,
    page: currentPage,
    limit: itemsPerPage,
  });

  // Load teachers for the filter dropdown
  useEffect(() => {
    teacherService
      .getAll({ limit: 100 })
      .then((res) => {
        const items = res?.data || (Array.isArray(res) ? res : []);
        setTeachersList(items);
      })
      .catch(() => setTeachersList([]));
  }, []);

  // Grade filter options (derived dynamically from backend meta + standard grades)
  const gradeOptions = useMemo(() => {
    const backendGrades = meta?.filters?.grades || [];
    const defaults = ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "O Level (Year 1)", "O Level (Year 2)", "A Level"];
    const unique = Array.from(new Set([...backendGrades, ...defaults]));
    return ["All Grades", ...unique];
  }, [meta?.filters?.grades]);

  // Teacher filter options
  const teacherOptions = useMemo(() => {
    return [
      { id: "All Teachers", label: "All Teachers" },
      ...teachersList.map((t) => ({ id: t.id, label: t.fullName || t.name })),
    ];
  }, [teachersList]);

  const statusOptions = ["All Status", "Active", "Inactive"];

  // Selection handlers
  const handleToggleSelectAll = () => {
    if (selectedIds.length === classes.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(classes.map((c) => c.id));
    }
  };

  const handleToggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add new class handler
  const handleSaveClass = async (newClassData) => {
    await classService.create(newClassData);
    refetch();
  };

  // Delete class handler
  const handleDeleteClass = async (cls) => {
    const confirmed = window.confirm(`Are you sure you want to delete class "${cls.name}"?`);
    if (!confirmed) return;

    try {
      await classService.delete(cls.id);
      toast.success(`Class "${cls.name}" deleted successfully!`);
      refetch();
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to delete class");
    }
  };

  const handleMoreOptions = (cls) => {
    toast(`Class: ${cls.name} (${cls.grade})`, { icon: "ℹ️" });
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-8 animate-in fade-in duration-150">
      {/* 1. Header with Add Class button */}
      <AdminClassesHeader
        title="Classes"
        subtitle="Manage all classes, assigned teachers, and student rosters."
        onAddClass={() => setIsAddModalOpen(true)}
      />

      {/* 2. Filter Pills */}
      <AdminClassesFilters
        gradeOptions={gradeOptions}
        selectedGrade={selectedGrade}
        onSelectGrade={(g) => {
          setSelectedGrade(g);
          setCurrentPage(1);
        }}
        teacherOptions={teacherOptions}
        selectedTeacher={selectedTeacher}
        onSelectTeacher={(t) => {
          setSelectedTeacher(t);
          setCurrentPage(1);
        }}
        statusOptions={statusOptions}
        selectedStatus={selectedStatus}
        onSelectStatus={(s) => {
          setSelectedStatus(s);
          setCurrentPage(1);
        }}
      />

      {/* 3. Classes Table */}
      {isLoading ? (
        <div className="bg-white rounded-3xl border border-slate-200/70 p-12 text-center text-slate-500 font-medium">
          Loading classes...
        </div>
      ) : (
        <AdminClassesTable
          classes={classes}
          startIndex={(currentPage - 1) * itemsPerPage}
          selectedIds={selectedIds}
          onToggleSelectAll={handleToggleSelectAll}
          onToggleSelectOne={handleToggleSelectOne}
          onViewClass={(cls) => navigate(`/admin/classes/${cls.id}`)}
          onEditClass={(cls) => setViewingClass(cls)}
          onDeleteClass={handleDeleteClass}
          onMoreOptions={handleMoreOptions}
        />
      )}

      {/* 4. Pagination */}
      <AdminClassesPagination
        currentPage={currentPage}
        totalItems={meta?.total ?? classes.length}
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

