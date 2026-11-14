import { useState } from "react";
import { adminDashboardMock } from "@/mocks";

export const AdminGrowthChartCard = () => {
  const { chart } = adminDashboardMock;
  const { title } = chart;

  // Exact coordinates matching the design specification
  const yTicks = [
    { val: 1400, y: 65, showLine: true },
    { val: 1200, y: 105, showLine: true },
    { val: 1000, y: 145, showLine: true },
    { val: 800, y: 185, showLine: true },
    { val: 600, y: 225, showLine: true },
    { val: 400, y: 265, showLine: false },
  ];

  const pointsData = [
    { month: "Jun", value: "800", x: 95, y: 185 },
    { month: "Jul", value: "920", x: 192, y: 161 },
    { month: "Aug", value: "1,010", x: 289, y: 143 },
    { month: "Sep", value: "1,080", x: 386, y: 129 },
    { month: "Oct", value: "1,160", x: 483, y: 113 },
    { month: "Nov", value: "1,248", x: 580, y: 95.4 },
  ];

  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Active badge target (hovered point or Nov by default)
  const activePt = hoveredIdx !== null ? pointsData[hoveredIdx] : pointsData[5];

  const linePath = pointsData.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`).join(" ");
  const areaPath = `${linePath} L 580 265 L 95 265 Z`;

  return (
    <div className="bg-white rounded-[26px] sm:rounded-[32px] p-5 sm:p-7 lg:p-8 border border-slate-100 shadow-2xs transition-all hover:shadow-xs space-y-4 sm:space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h3>
      </div>

      {/* Responsive SVG Chart */}
      <div className="w-full overflow-hidden">
        <svg
          viewBox="0 0 660 310"
          className="w-full h-auto select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Soft area gradient */}
            <linearGradient id="formOverviewGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0080f6" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#0080f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0080f6" stopOpacity="0.01" />
            </linearGradient>

            {/* Glowing drop shadow for the 1,248 badge */}
            <filter id="badgeBlueGlow" x="-30%" y="-30%" width="160%" height="180%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0080f6" floodOpacity="0.38" />
            </filter>
          </defs>

          {/* Y Axis Guide Lines & Labels */}
          {yTicks.map((tick) => (
            <g key={tick.val}>
              <text
                x="76"
                y={tick.y + 4}
                textAnchor="end"
                className="text-[12px] fill-slate-400 font-semibold"
              >
                {tick.val}
              </text>
              {tick.showLine && (
                <line
                  x1="95"
                  y1={tick.y}
                  x2="595"
                  y2={tick.y}
                  stroke="#e8f0f8"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
              )}
            </g>
          ))}

          {/* Shaded Area Under Line */}
          <path d={areaPath} fill="url(#formOverviewGradient)" />

          {/* Blue Line Stroke */}
          <path
            d={linePath}
            fill="none"
            stroke="#0080f6"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points with White Halo Ring */}
          {pointsData.map((pt, idx) => (
            <g
              key={pt.month}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Invisible larger hover target */}
              <circle cx={pt.x} cy={pt.y} r="16" fill="transparent" />

              {/* Visible circle */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIdx === idx ? "6.5" : "5"}
                fill="#0080f6"
                stroke="#ffffff"
                strokeWidth="2.8"
                className="transition-all duration-150"
              />

              {/* Month Label */}
              <text
                x={pt.x}
                y="292"
                textAnchor="middle"
                className={`text-[12px] font-semibold transition-colors ${
                  activePt.month === pt.month ? "fill-[#0080f6] font-bold" : "fill-slate-500"
                }`}
              >
                {pt.month}
              </text>
            </g>
          ))}

          {/* Active Highlight Badge (Default 1,248 on Nov) */}
          <g
            transform={`translate(${activePt.x - 33}, ${activePt.y - 48})`}
            filter="url(#badgeBlueGlow)"
            className="transition-transform duration-200 ease-out pointer-events-none"
          >
            {/* Pill Background */}
            <rect
              width="66"
              height="28"
              rx="14"
              fill="#0080f6"
            />
            {/* Text Value */}
            <text
              x="33"
              y="18.5"
              textAnchor="middle"
              className="text-[12px] fill-white font-bold"
            >
              {activePt.value}
            </text>
            {/* Downward Pointer Triangle */}
            <polygon
              points="29,28 37,28 33,33"
              fill="#0080f6"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default AdminGrowthChartCard;
