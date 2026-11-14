import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Video, Users, BookOpen, Calendar, MoreVertical, Eye, Edit2, Trash2,
  FlaskConical, Code2,
} from "lucide-react";
import toast from "react-hot-toast";

const renderSessionIcon = (iconType) => {
  if (iconType === "sqrt") return <span className="font-serif font-black text-base">√x</span>;
  if (iconType === "clover") return <FlaskConical className="w-5 h-5 stroke-[2.2]" />;
  if (iconType === "code") return <Code2 className="w-5 h-5 stroke-[2.2]" />;
  return <BookOpen className="w-5 h-5 stroke-[2.2]" />;
};

export const TeacherSessionCard = ({ session, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEnterSession = () => {
    toast.success(`Entering session: ${session.title}`);
    navigate(`/teacher/sessions/${session.id}`);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-100 shadow-2xs hover:shadow-xs transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 overflow-hidden">
      {/* Left: Icon + Title & Type */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${session.colorClass}`}>
          {renderSessionIcon(session.iconType)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <Link
              to={`/teacher/sessions/${session.id}`}
              className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 hover:text-[#0080f6] truncate transition-colors"
            >
              {session.title}
            </Link>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold ${
                session.type === "instant"
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                  : "bg-blue-50 text-[#0080f6] border border-blue-200/60"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${session.type === "instant" ? "bg-emerald-500" : "bg-[#0080f6]"}`} />
              <span>{session.statusBadge}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Middle: 3 Stats Icons (Responsive grid on small screens down to 320px) */}
      <div className="grid grid-cols-3 gap-1 sm:flex sm:items-center sm:gap-x-6 text-xs text-slate-500 font-semibold px-0.5 lg:px-4 py-0.5">
        <div className="flex items-center gap-1 shrink-0">
          <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0080f6] shrink-0" />
          <span className="text-slate-800 font-bold">{session.studentsCount}</span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-normal">Students</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0080f6] shrink-0" />
          <span className="text-slate-800 font-bold">{session.materialsCount}</span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-normal">Materials</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0080f6] shrink-0" />
          <span className="text-slate-800 font-bold">{session.scheduledCount}</span>
          <span className="text-[10px] sm:text-xs text-slate-400 font-normal">Scheduled</span>
        </div>
      </div>

      {/* Right: Enter Session Button + 3 Dots Menu */}
      <div className="flex items-center justify-between lg:justify-end gap-2 shrink-0 w-full sm:w-auto pt-1 sm:pt-0 border-t border-slate-50 sm:border-t-0">
        <button
          type="button"
          onClick={handleEnterSession}
          className={`flex-1 sm:flex-initial px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
            session.type === "instant"
              ? "bg-[#0080f6] hover:bg-[#006fd6] text-white shadow-md shadow-blue-500/25 active:scale-95"
              : "border border-slate-200 hover:bg-slate-50 text-slate-700"
          }`}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Enter Session</span>
        </button>

        {/* 3 Dots Menu with View, Edit, Delete per user requirement */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 sm:p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Session actions"
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
              <Link
                to={`/teacher/sessions/${session.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0080f6]"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </Link>
              <button
                type="button"
                onClick={() => { setMenuOpen(false); onEdit(session); }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#0080f6]"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit Session</span>
              </button>
              <button
                type="button"
                onClick={() => { setMenuOpen(false); onDelete(session); }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherSessionCard;

