import { Calendar, Layers, Star } from "lucide-react";

export const TeacherStudentProgressTab = ({ student }) => {
  const factors = student?.progressFactors || [
    { id: "att", label: "Attendance", percentage: 92, iconType: "calendar" },
    { id: "asg", label: "Assignments", percentage: 67, iconType: "layers" },
    { id: "live", label: "live class", percentage: 85, iconType: "star" },
  ];

  const getFactorIcon = (type) => {
    if (type === "calendar") return <Calendar className="w-4 h-4 text-[#0080f6]" />;
    if (type === "layers") return <Layers className="w-4 h-4 text-emerald-500" />;
    return <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" />;
  };

  const getFactorBg = (type) => {
    if (type === "calendar") return "bg-blue-50";
    if (type === "layers") return "bg-emerald-50";
    return "bg-amber-50";
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-100 shadow-2xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Academic Progress Circular Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mb-6 self-start">
            Academic Progress
          </h3>

          <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="48"
                className="stroke-slate-100"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="48"
                className="stroke-[#0080f6] transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={301.6}
                strokeDashoffset={301.6 * (1 - 0.78)}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {student?.kpi?.overallProgress || "78%"}
              </span>
              <span className="text-xs text-slate-400 font-semibold mt-0.5">
                Overall Progress
              </span>
            </div>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px h-64 bg-slate-100" />

        {/* Right Column: Progress Factors */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Progress Factors
            </h3>
          </div>

          <div className="space-y-5">
            {factors.map((factor) => (
              <div key={factor.id} className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 font-bold text-slate-800">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${getFactorBg(
                        factor.iconType
                      )}`}
                    >
                      {getFactorIcon(factor.iconType)}
                    </div>
                    <span>{factor.label}</span>
                  </div>
                  <span className="font-black text-slate-900">
                    {factor.percentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 rounded-full bg-blue-50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#0080f6] transition-all duration-700"
                    style={{ width: `${factor.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherStudentProgressTab;

