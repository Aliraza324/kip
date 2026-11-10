export const ContactInputField = ({ icon: Icon, error, className = "", ...props }) => (
  <div>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      )}
      <input
        {...props}
        className={`w-full bg-white border rounded-xl sm:rounded-2xl pl-10 pr-4 py-3 sm:py-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-2xs ${
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15"
            : "border-[#dce6f2] focus:border-[#007be3] focus:ring-2 focus:ring-[#007be3]/15"
        } ${className}`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-rose-500">{error.message}</p>}
  </div>
);

export default ContactInputField;

