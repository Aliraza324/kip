import { useState } from "react";
import { Share2, Plus, Edit3, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export const AdminSocialLinksTable = ({ links }) => {
  const [socialList, setSocialList] = useState(links || []);

  const toggleLink = (id) => {
    setSocialList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const updateUrl = (id, newUrl) => {
    setSocialList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, url: newUrl } : s))
    );
  };

  const deleteLink = (id) => {
    setSocialList((prev) => prev.filter((s) => s.id !== id));
    toast.error("Social link removed");
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-2xs overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0080f6] flex items-center justify-center shrink-0 mt-0.5">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Social Media Links</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Add, update, or remove social media links that will appear on the Contact Us page.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => toast.success("Add social link modal")}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-bold shadow-2xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#0080f6]" />
          <span>Add Social Link</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Platform</th>
              <th className="py-3 px-4">Profile URL</th>
              <th className="py-3 px-4 text-center">Display on Website</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
            {socialList.map((soc) => (
              <tr key={soc.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center font-black text-xs">
                      <span className={soc.iconColor}>{soc.platform[0]}</span>
                    </div>
                    <span className="font-bold text-slate-900">{soc.platform}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <input
                    type="text"
                    value={soc.url}
                    onChange={(e) => updateUrl(soc.id, e.target.value)}
                    className="w-full max-w-md px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:border-[#0080f6] outline-none"
                  />
                </td>
                <td className="py-3.5 px-4 text-center">
                  <button
                    type="button"
                    onClick={() => toggleLink(soc.id)}
                    className={`w-10 h-6 rounded-full transition-colors relative inline-block cursor-pointer align-middle ${
                      soc.enabled ? "bg-[#0080f6]" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                        soc.enabled ? "right-1" : "left-1"
                      }`}
                    />
                  </button>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toast.success("Edit link")}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#0080f6] hover:bg-slate-100 cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteLink(soc.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSocialLinksTable;
