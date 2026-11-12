import { useState } from "react";
import { BookOpen } from "lucide-react";
import toast from "react-hot-toast";
import { studentMaterialsListMock } from "@/mocks";
import {
  StudentMaterialCard,
  StudentMaterialPreviewModal,
} from "../components/materials";
import {
  openMaterialInBrowser,
  downloadMaterialFile,
} from "../utils/pdfGenerator";

const CATEGORIES = [
  "All Materials",
  "Mathematics",
  "Science",
  "English",
  "Physics",
  "Chemistry",
  "Computer Science",
];

export const StudentMaterialsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Materials");
  const [previewMaterial, setPreviewMaterial] = useState(null);

  const filteredMaterials = studentMaterialsListMock.filter((item) => {
    if (selectedCategory === "All Materials") return true;
    return item.subject.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleDownload = (material) => {
    downloadMaterialFile(material);
    toast.success(`Downloading ${material.title} (${material.format})...`);
  };

  const handleView = (material) => {
    if (material.type === "pdf") {
      const opened = openMaterialInBrowser(material);
      if (opened) {
        toast.success(`Opening ${material.title} in browser tab...`);
      } else {
        // Fallback if browser blocked popups
        setPreviewMaterial(material);
        toast.error("Browser popup blocked. Opened preview dialog.");
      }
    } else {
      // Videos open preview modal
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

      {/* Categories Filter Tabs Matching Image */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
                : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Materials List */}
      <div className="space-y-3">
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map((material) => (
            <StudentMaterialCard
              key={material.id}
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

