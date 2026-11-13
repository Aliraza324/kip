import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

export const TeacherStudentAttendanceHistoryCard = ({ history = [] }) => {
  const [selectedMonth, setSelectedMonth] = useState("Nov 2024");

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-2xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
          Attendance History
        </h3>
        <div className="relative">
          <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            aria-label="History month filter"
            className="appearance-none pl-8 pr-7 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 cursor-pointer"
          >
            <option>Nov 2024</option>
            <option>Oct 2024</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* History Table */}
      <div className="overflow-x-auto no-scrollbar -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle px-4 sm:px-0">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-bold border-y border-slate-100 text-xs">
                <th className="py-3 px-4 rounded-l-xl">Date</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    {row.date}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {row.subject}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        row.status === "Present"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200/60"
                          : "bg-rose-50 text-rose-600 border-rose-200/60"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          row.status === "Present" ? "bg-emerald-500" : "bg-rose-500"
                        }`}
                      />
                      <span>{row.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherStudentAttendanceHistoryCard;

