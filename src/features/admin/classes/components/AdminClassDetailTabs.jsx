export const AdminClassDetailTabs = ({
  activeTab = "teachers",
  onTabChange,
  studentsCount = 32,
}) => {
  const tabs = [
    { id: "teachers", label: "Assigned Teachers" },
    { id: "students", label: `Students (${studentsCount})` },
    { id: "assignments", label: "Assignments" },
  ];

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              isActive
                ? "bg-[#0080f6] text-white shadow-md shadow-blue-500/25"
                : "bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default AdminClassDetailTabs;

