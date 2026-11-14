import { useState } from "react";
import { Edit3, Trash2, ChevronDown, HelpCircle } from "lucide-react";
import toast from "react-hot-toast";

const colors = ["#2563EB", "#0080F6", "#7C3AED", "#10B981", "#F59E0B", "#EF4444"];

export const AdminSectionMediaCard = ({ data, onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState(data.accentColor || "#2563EB");

  const handleColorSelect = (c) => {
    setSelectedColor(c);
    onColorChange?.(c);
  };

  return (
    <div className="space-y-5">
      {/* Section Image Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
        <h4 className="text-sm font-bold text-slate-800">Section Image</h4>

        <div className="rounded-2xl border border-slate-100 overflow-hidden bg-slate-50/50 p-3">
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-slate-100 flex items-center justify-center">
            <img
              src={data.image}
              alt="Section Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">
                {data.imageName || "about-hero.png"}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {data.imageMeta || "1600 × 900 px • 1.8 MB"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => toast.success("Replace image selected")}
                className="p-1.5 rounded-lg text-slate-400 hover:text-[#0080f6] hover:bg-blue-50 transition-colors cursor-pointer"
                title="Change Image"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => toast.error("Image removed")}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Remove Image"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Accent Color */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-3">
        <div className="flex items-center gap-1.5">
          <h4 className="text-sm font-bold text-slate-800">Section Accent Color</h4>
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <div className="relative">
          <div className="flex items-center justify-between px-4 py-2.5 rounded-full border border-slate-200 bg-white">
            <div className="flex items-center gap-2.5">
              <span
                className="w-4 h-4 rounded-md shrink-0 shadow-2xs"
                style={{ backgroundColor: selectedColor }}
              />
              <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase">
                {selectedColor}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleColorSelect(c)}
                className={`w-6 h-6 rounded-full cursor-pointer transition-transform hover:scale-110 ${
                  selectedColor === c ? "ring-2 ring-offset-2 ring-[#0080f6] scale-110" : ""
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSectionMediaCard;
