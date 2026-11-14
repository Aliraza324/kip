import { Calendar, Layers, Star } from "lucide-react";

export const AdminStudentProgressTab = ({ student }) => {
  const factors = [
    { label: "Attendance", percentage: 92, icon: Calendar, color: "bg-blue-500" },
    { label: "Assignments", percentage: 67, icon: Layers, color: "bg-purple-500" },
    { label: "Live Class", percentage: 85, icon: Star, color: "bg-emerald-500" },
  ];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-2xs space-y-6">
      <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
        Academic Progress Summary
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Overall Circular Donut */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-4 border-r border-slate-100">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#0080f6"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * 78) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900 leading-none">78%</span>
              <span className="text-xs font-semibold text-slate-400 mt-1">Overall Progress</span>
            </div>
          </div>
        </div>

        {/* Factors Breakdown */}
        <div className="md:col-span-7 space-y-4">
          {factors.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{f.label}</span>
                  </div>
                  <span>{f.percentage}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${f.color} transition-all duration-300`}
                    style={{ width: `${f.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminStudentProgressTab;
