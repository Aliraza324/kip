import { useState, useMemo } from "react";
import { BookOpen, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useStudentMaterials } from "@/hooks";
import {
  StudentMaterialCard,
  StudentMaterialPreviewModal,
  StudentMaterialsPagination,
} from "../components/materials";
import {
  openMaterialInBrowser,
  downloadMaterialFile,
} from "../utils/materialUtils";

export const StudentMaterialsPage = () => {
  const [previewMaterial, setPreviewMaterial] = useState(null);

  const {
    materials,
    subjects,
    selectedCategory,
    setSelectedCategory,
    page,
    setPage,
    pagination,
    isLoading,
  } = useStudentMaterials({ initialLimit: 6 });

  // Dynamic category tabs from student's enrolled subjects
  const categoryTabs = useMemo(() => {
    const list = ["All Materials"];
    (subjects || []).forEach((sub) => {
      if (sub && !list.some((c) => c.toLowerCase() === sub.toLowerCase())) {
        list.push(sub);
      }
    });
    return list;
  }, [subjects]);

  const handleDownload = (material) => {
    const targetUrl = material.url || material.file?.url;
    if (!targetUrl) {
      toast.error("File download URL is not available.");
      return;
    }
    downloadMaterialFile(material);
    toast.success(`Downloading ${material.title} (${material.format || "File"})...`);
  };

  const handleView = (material) => {
    const targetUrl = material.url || material.file?.url;
    if (material.type === "pdf" || (!material.type && targetUrl)) {
      if (targetUrl) {
        const opened = openMaterialInBrowser(material);
        if (opened) {
          toast.success(`Opening ${material.title} in browser...`);
        } else {
          setPreviewMaterial(material);
          toast.error("Browser popup blocked. Opened preview dialog.");
        }
      } else {
        setPreviewMaterial(material);
      }
    } else {
      // Videos & interactive notes open preview modal
      setPreviewMaterial(material);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Learning Materials
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Access study notes, lectures, and other resources for your classes.
        </p>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categoryTabs.map((cat) => {
          const isActive =
            selectedCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 active:scale-95 ${
                isActive
                  ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Materials List */}
      <div className="space-y-3 min-h-[300px]">
        {isLoading ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-2xs flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#0080f6] animate-spin" />
            <p className="text-xs sm:text-sm font-medium text-slate-500">
              Loading learning materials...
            </p>
          </div>
        ) : materials.length > 0 ? (
          materials.map((material) => (
            <StudentMaterialCard
              key={material.id || material._id}
              material={material}
              onDownload={handleDownload}
              onView={handleView}
            />
          ))
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-2xs">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">
              No materials available
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              There are no resources under &quot;{selectedCategory}&quot; at this moment.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!isLoading && pagination.total > 0 && (
        <StudentMaterialsPagination
          currentPage={page}
          totalItems={pagination.total}
          itemsPerPage={pagination.limit || 6}
          totalPages={pagination.totalPages || 1}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}

      {/* Preview Modal Fallback */}
      <StudentMaterialPreviewModal
        isOpen={Boolean(previewMaterial)}
        material={previewMaterial}
        onClose={() => setPreviewMaterial(null)}
      />
    </div>
  );
};

export default StudentMaterialsPage;
