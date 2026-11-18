import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAdminDashboard } from "@/hooks/admin";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getDefaultLast6Months = () => {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (5 - i), 1));
    return { month: MONTH_NAMES[d.getUTCMonth()], year: d.getUTCFullYear(), value: 0, monthly: 0 };
  });
};

const computeNiceMax = (val) => {
  if (val <= 0) return 10;
  if (val <= 5) return 5;
  if (val <= 10) return 10;
  if (val <= 25) return 25;
  if (val <= 50) return 50;
  if (val <= 100) return 100;
  const exp = Math.floor(Math.log10(val));
  const base = Math.pow(10, exp);
  const f = val / base;
  if (f <= 1.5) return Math.ceil(1.5 * base);
  if (f <= 2) return Math.ceil(2 * base);
  if (f <= 3) return Math.ceil(3 * base);
  if (f <= 5) return Math.ceil(5 * base);
  if (f <= 7.5) return Math.ceil(7.5 * base);
  return Math.ceil(10 * base);
};

export const AdminGrowthChartCard = ({
  queriesGrowth: propGrowth,
  totalQueries: propTotal,
  loading: propLoading,
}) => {
  // If props are not passed, fetch via hook
  const dashboard = useAdminDashboard();
  const rawGrowth = propGrowth !== undefined ? propGrowth : dashboard.queriesGrowth;
  const totalCount = propTotal !== undefined ? propTotal : dashboard.totalQueriesReceived;
  const isLoading = propLoading !== undefined ? propLoading : dashboard.loading;

  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Normalize points data (guarantee 6 months)
  const chartData = useMemo(() => {
    let source = Array.isArray(rawGrowth) && rawGrowth.length > 0 ? rawGrowth : getDefaultLast6Months();
    if (source.length > 6) source = source.slice(-6);

    const maxVal = Math.max(...source.map((p) => Number(p.value) || 0), Number(totalCount) || 0, 0);
    const maxTick = computeNiceMax(maxVal);

    // 6 Y-ticks (5 equal intervals of 40px, total height 200px from y=65 to y=265)
    const yTicks = [0, 1, 2, 3, 4, 5].map((i) => {
      const val = Math.round(maxTick - i * (maxTick / 5));
      return {
        val: val.toLocaleString(),
        y: 65 + i * 40,
        showLine: i < 5,
      };
    });

    const xStart = 95;
    const xEnd = 580;
    const stepX = (xEnd - xStart) / Math.max(1, source.length - 1);

    const pointsData = source.map((pt, idx) => {
      let valNum = Number(pt.value) || 0;
      if (idx === source.length - 1 && totalCount > valNum) {
        valNum = totalCount;
      }
      const x = xStart + idx * stepX;
      const y = maxTick > 0 ? 265 - (valNum / maxTick) * 200 : 265;
      return {
        month: pt.month,
        year: pt.year,
        value: valNum,
        valueStr: valNum.toLocaleString(),
        monthly: pt.monthly || 0,
        x,
        y,
      };
    });

    const firstPt = pointsData[0] || { x: 95, y: 265 };
    const lastPt = pointsData[pointsData.length - 1] || { x: 580, y: 265 };
    const linePath = pointsData.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`).join(" ");
    const areaPath = `${linePath} L ${lastPt.x} 265 L ${firstPt.x} 265 Z`;

    return {
      yTicks,
      pointsData,
      linePath,
      areaPath,
      maxTick,
    };
  }, [rawGrowth]);

  const { yTicks, pointsData, linePath, areaPath } = chartData;

  // Active badge target (hovered point or latest month by default)
  const defaultIdx = pointsData.length > 0 ? pointsData.length - 1 : 0;
  const activePt = hoveredIdx !== null && pointsData[hoveredIdx] ? pointsData[hoveredIdx] : pointsData[defaultIdx];

  return (
    <div className="bg-white rounded-[26px] sm:rounded-[32px] p-5 sm:p-7 lg:p-8 border border-slate-100 shadow-2xs transition-all hover:shadow-xs space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              Total Queries Received
            </h3>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0080f6] border border-blue-100/70">
              {totalCount.toLocaleString()} Total
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Contact queries received over the last 6 months
          </p>
        </div>

        <div>
          <Link
            to="/admin/contact-queries"
            className="text-xs sm:text-sm font-bold text-[#0080f6] hover:text-blue-700 inline-flex items-center gap-1 transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Responsive SVG Chart */}
      <div className="w-full overflow-hidden relative">
        <svg
          viewBox="0 0 660 310"
          className="w-full h-auto select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Soft area gradient */}
            <linearGradient id="queriesOverviewGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0080f6" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#0080f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0080f6" stopOpacity="0.01" />
            </linearGradient>

            {/* Glowing drop shadow for the active value badge */}
            <filter id="badgeBlueGlow" x="-30%" y="-30%" width="160%" height="180%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0080f6" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* Y Axis Guide Lines & Labels */}
          {yTicks.map((tick) => (
            <g key={tick.y}>
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
          {areaPath && <path d={areaPath} fill="url(#queriesOverviewGradient)" />}

          {/* Blue Line Stroke */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#0080f6"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Points with White Halo Ring */}
          {pointsData.map((pt, idx) => {
            const isHovered = hoveredIdx === idx;
            const isActive = activePt && activePt.month === pt.month;
            return (
              <g
                key={`${pt.month}-${pt.year || idx}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Invisible larger hover target */}
                <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

                {/* Visible circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? "6.5" : "5"}
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
                    isActive ? "fill-[#0080f6] font-bold" : "fill-slate-500"
                  }`}
                >
                  {pt.month}
                </text>
              </g>
            );
          })}

          {/* Active Highlight Badge */}
          {activePt && (
            <g
              transform={`translate(${activePt.x - 33}, ${Math.max(8, activePt.y - 48)})`}
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
                {activePt.valueStr}
              </text>
              {/* Downward Pointer Triangle */}
              <polygon
                points="29,28 37,28 33,33"
                fill="#0080f6"
              />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

export default AdminGrowthChartCard;
