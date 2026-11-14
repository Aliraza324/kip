export const AdminContactInfoCard = ({ details, onChange }) => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-4">
      <h4 className="text-base font-bold text-slate-900 tracking-tight">Contact Details</h4>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Phone</label>
          <input
            type="text"
            name="phone"
            value={details.phone}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            value={details.email}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Address</label>
          <input
            type="text"
            name="address"
            value={details.address}
            onChange={onChange}
            className="w-full px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0080f6] outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminContactInfoCard;
