import { useState } from "react";
import { X, Layers, Image as ImageIcon, Upload, HelpCircle } from "lucide-react";
import toast from "react-hot-toast";

export const AdminAddFeatureModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState("Add Teacher");
  const [desc, setDesc] = useState("Easily add and manage teachers on your platform.");
  const [enabled, setEnabled] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter feature title");
      return;
    }
    onAdd?.({
      id: `feat-${Date.now()}`,
      title,
      description: desc,
      iconType: "users",
      enabled,
    });
    toast.success("Feature added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl p-6 sm:p-8 border border-slate-100 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">Add Feature</h3>
            <p className="text-xs text-slate-500 font-medium">Create a new feature for the Features section.</p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Left Inputs */}
            <div className="md:col-span-7 space-y-4 text-xs sm:text-sm">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Feature Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter feature title"
                  className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Short Description *</label>
                <textarea
                  rows={3}
                  maxLength={120}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Enter short description"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                  required
                />
                <span className="text-[11px] text-slate-400 font-medium block text-right mt-1">
                  {desc.length} / 120
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2">Display Status</span>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setEnabled(!enabled)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      enabled ? "bg-[#0080f6]" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                        enabled ? "right-1" : "left-1"
                      }`}
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">Show on Website</span>
                </label>
              </div>
            </div>

            {/* Right Upload Box */}
            <div className="md:col-span-5 space-y-2">
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-bold text-slate-700">Feature Icon *</label>
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="border-2 border-dashed border-blue-200/90 rounded-2xl p-5 text-center bg-blue-50/20 hover:bg-blue-50/40 transition-colors flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0080f6] flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <p className="text-xs font-bold text-slate-800">Upload Feature Icon</p>
                <p className="text-[10px] text-slate-400 leading-tight">
                  PNG, JPG or SVG (Max 2 MB)<br />Recommended Size: 128 × 128 px
                </p>
                <button
                  type="button"
                  onClick={() => toast.success("Icon picker opened")}
                  className="mt-1 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span>Choose Icon</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#0080f6] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer"
            >
              + Add Feature
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddFeatureModal;
