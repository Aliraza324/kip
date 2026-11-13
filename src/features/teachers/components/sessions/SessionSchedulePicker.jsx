import { Clock } from "lucide-react";

const DAYS_OF_WEEK = [
  { id: "Mon", label: "Mon" },
  { id: "Tue", label: "Tue" },
  { id: "Wed", label: "Wed" },
  { id: "Thu", label: "Thu" },
  { id: "Fri", label: "Fri" },
  { id: "Sat", label: "Sat" },
  { id: "Sun", label: "Sun" },
];

const TIME_SLOT_PRESETS = [
  { label: "10:00 AM – 10:45 AM (45 min)", start: "10:00 AM", end: "10:45 AM" },
  { label: "09:00 AM – 09:45 AM (45 min)", start: "09:00 AM", end: "09:45 AM" },
  { label: "11:00 AM – 11:45 AM (45 min)", start: "11:00 AM", end: "11:45 AM" },
  { label: "12:00 PM – 12:45 PM (45 min)", start: "12:00 PM", end: "12:45 PM" },
  { label: "02:00 PM – 02:45 PM (45 min)", start: "02:00 PM", end: "02:45 PM" },
  { label: "03:00 PM – 03:45 PM (45 min)", start: "03:00 PM", end: "03:45 PM" },
  { label: "10:00 AM – 11:00 AM (1 hour)", start: "10:00 AM", end: "11:00 AM" },
  { label: "02:00 PM – 03:00 PM (1 hour)", start: "02:00 PM", end: "03:00 PM" },
];

export const SessionSchedulePicker = ({
  selectedDays = ["Mon", "Wed", "Fri"],
  onDaysChange,
  startTime = "10:00 AM",
  endTime = "10:45 AM",
  onTimeChange,
}) => {
  const toggleDay = (dayId) => {
    if (selectedDays.includes(dayId)) {
      if (selectedDays.length === 1) return; // Keep at least one day
      onDaysChange(selectedDays.filter((d) => d !== dayId));
    } else {
      onDaysChange([...selectedDays, dayId]);
    }
  };

  const currentDurationString = `${startTime} – ${endTime}`;

  const handlePresetSelect = (presetString) => {
    const found = TIME_SLOT_PRESETS.find((p) => `${p.start} – ${p.end}` === presetString);
    if (found) {
      onTimeChange(found.start, found.end);
    }
  };

  return (
    <div className="space-y-3.5 p-3.5 rounded-2xl bg-blue-50/40 border border-blue-100/70">
      {/* 1. Days of the Week Selection */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700">
            Session Days (Week Schedule) *
          </label>
          <span className="text-[11px] font-semibold text-[#0080f6]">
            {selectedDays.join(", ")}
          </span>
        </div>

        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = selectedDays.includes(day.id);
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => toggleDay(day.id)}
                className={`flex-1 py-1.5 px-1 sm:px-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                  isSelected
                    ? "bg-[#0080f6] text-white shadow-2xs scale-102"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100/80"
                }`}
              >
                {day.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Session Durations * Dropdown */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-700">Session Durations *</label>
        <div className="relative">
          <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={currentDurationString}
            onChange={(e) => handlePresetSelect(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-8 py-2.5 text-xs sm:text-sm text-slate-800 font-semibold outline-none focus:border-[#0080f6] shadow-2xs cursor-pointer"
          >
            {TIME_SLOT_PRESETS.map((slot) => {
              const val = `${slot.start} – ${slot.end}`;
              return (
                <option key={val} value={val}>
                  {slot.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SessionSchedulePicker;

