import { useState } from "react";
import { GripVertical, Video, Layers, BarChart3, Users, Edit3, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";

const iconMap = {
  video: Video,
  layers: Layers,
  chart: BarChart3,
  users: Users,
};

export const AdminFeaturesListCard = ({ features, onAddClick }) => {
  const [list, setList] = useState(features || []);

  const toggleFeature = (id) => {
    setList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const deleteFeature = (id) => {
    setList((prev) => prev.filter((f) => f.id !== id));
    toast.error("Feature deleted");
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#0080f6]" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Features List ({list.length})
          </h3>
        </div>

        <button
          type="button"
          onClick={onAddClick}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#0080f6]" />
          <span>Add Feature</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {list.map((feat) => {
          const Icon = iconMap[feat.iconType] || Layers;
          return (
            <div
              key={feat.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50/70 border border-slate-100/90 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <GripVertical className="w-4 h-4 text-slate-400 cursor-grab shrink-0" />
                <div className="w-9 h-9 rounded-xl bg-blue-100/70 text-[#0080f6] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {feat.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                    {feat.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 shrink-0 self-end sm:self-auto">
                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={() => toggleFeature(feat.id)}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                    feat.enabled ? "bg-[#0080f6]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                      feat.enabled ? "right-1" : "left-1"
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => toast.success("Edit feature modal")}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-[#0080f6] hover:bg-white transition-colors cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => deleteFeature(feat.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminFeaturesListCard;
