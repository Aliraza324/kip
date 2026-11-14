import { Layers, Info, LayoutGrid, Mail } from "lucide-react";

const iconMap = {
  home: Layers,
  about: Info,
  features: LayoutGrid,
  "how-it-works": Layers,
  contact: Mail,
};

export const AdminSectionHeroForm = ({ tabKey, sectionTitle, sectionSub, data, onChange }) => {
  const Icon = iconMap[tabKey] || Layers;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3 pb-3 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0 mt-0.5">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {sectionTitle}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">{sectionSub}</p>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-4 text-xs sm:text-sm">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            Section Title (Small)
          </label>
          <input
            type="text"
            name="badge"
            value={data.badge}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all uppercase tracking-wider font-semibold"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Main Heading</label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Description</label>
          <textarea
            name="description"
            rows={3}
            value={data.description}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Buttons Links */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold text-slate-700 block">Buttons</label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                Button Text
              </span>
              <input
                type="text"
                name="btn1Text"
                value={data.btn1Text}
                onChange={onChange}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 focus:border-[#0080f6] outline-none"
              />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                Button Link
              </span>
              <input
                type="text"
                name="btn1Link"
                value={data.btn1Link}
                onChange={onChange}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 focus:border-[#0080f6] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                Button Text
              </span>
              <input
                type="text"
                name="btn2Text"
                value={data.btn2Text}
                onChange={onChange}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 focus:border-[#0080f6] outline-none"
              />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                Button Link
              </span>
              <input
                type="text"
                name="btn2Link"
                value={data.btn2Link}
                onChange={onChange}
                className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-slate-800 focus:border-[#0080f6] outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSectionHeroForm;
