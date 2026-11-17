import { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus, X, Check, Search } from "lucide-react";

/**
 * CreatableTagSelect:
 * - Fixed height `h-[42px] rounded-full` matching Full Name / Email inputs exactly
 * - Left icon at `absolute left-4 top-1/2`
 * - Right chevron at `absolute right-3.5 top-1/2`
 * - Never wraps vertically, never distorts pill shape
 * - Selected chips display horizontally with hidden scrollbar
 * - Search bar and custom typing input are neatly placed inside the dropdown popover
 */
export const CreatableTagSelect = ({
  icon: Icon,
  placeholder = "Select or type...",
  options = [],
  value = [], // Array of strings (or string if isSingle)
  onChange,
  isSingle = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  const selectedList = isSingle
    ? value
      ? [value]
      : []
    : Array.isArray(value)
      ? value
      : value
        ? [value]
        : [];

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchTerm("");
    }
  }, [isOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (item) => {
    if (!item || !item.trim()) return;
    const cleanItem = item.trim();

    if (isSingle) {
      onChange(cleanItem === value ? "" : cleanItem);
      setIsOpen(false);
      setSearchTerm("");
      return;
    }

    if (selectedList.includes(cleanItem)) {
      onChange(selectedList.filter((v) => v !== cleanItem));
    } else {
      onChange([...selectedList, cleanItem]);
    }
    setSearchTerm("");
  };

  const handleRemove = (e, item) => {
    e.stopPropagation();
    if (isSingle) {
      onChange("");
    } else {
      onChange(selectedList.filter((v) => v !== item));
    }
  };

  const handleAddCustom = (e) => {
    e?.preventDefault();
    if (searchTerm.trim()) {
      handleToggle(searchTerm.trim());
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustom();
    }
  };

  // Filter options based on search query
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const isExactMatch = options.some(
    (opt) => opt.toLowerCase() === searchTerm.toLowerCase().trim()
  );

  return (
    <div className="relative text-left w-full select-none" ref={containerRef}>
      {/* Main Pill Box (Fixed height h-[42px] to match all other form fields) */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative w-full h-[42px] rounded-full bg-white/10 border ${
          error ? "border-rose-400" : isOpen ? "border-blue-400 bg-white/15" : "border-white/25"
        } text-white pl-11 pr-9 text-xs sm:text-sm backdrop-blur-md transition-all shadow-inner flex items-center cursor-pointer`}
      >
        {/* Left Inside Icon */}
        {Icon && (
          <Icon className="w-4 h-4 text-white/70 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none shrink-0 z-10" />
        )}

        {/* Content area: Placeholder or Selected Items */}
        {selectedList.length === 0 ? (
          <span className="text-white/55 text-xs sm:text-sm truncate select-none">
            {placeholder}
          </span>
        ) : isSingle ? (
          /* Single Select: Clean text badge */
          <div className="flex items-center justify-between w-full pr-1">
            <span className="text-white font-medium text-xs sm:text-sm truncate">
              {selectedList[0]}
            </span>
            <button
              type="button"
              onClick={(e) => handleRemove(e, selectedList[0])}
              className="text-white/60 hover:text-white hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          /* Multi Select: Clean horizontal chips with no wrapping and hidden scrollbar */
          <div
            className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden w-full py-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedList.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/40 border border-blue-400/40 text-white text-[11px] sm:text-xs font-medium shrink-0 shadow-xs animate-in fade-in zoom-in-95 duration-100"
              >
                <span className="truncate max-w-[130px]">{item}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemove(e, item)}
                  className="text-white/70 hover:text-white hover:bg-white/20 rounded-full p-0.5 transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Right Chevron Caret */}
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/60">
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-blue-300" : ""
            }`}
          />
        </div>
      </div>

      {error && <p className="text-[11px] text-rose-200 font-medium ml-4 mt-0.5">{error}</p>}

      {/* Floating Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl bg-slate-900/95 border border-white/20 backdrop-blur-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Search & Custom Typing Header */}
          <div className="p-2 border-b border-white/10 bg-slate-900/90">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-white/50 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder={isSingle ? "Search or type custom..." : "Search or type to add tag..."}
                className="w-full bg-white/10 border border-white/15 focus:border-blue-400 rounded-xl pl-8 pr-16 py-1.5 text-xs text-white placeholder-white/45 outline-none transition-all shadow-inner"
              />
              {searchTerm.trim() && !isExactMatch && (
                <button
                  type="button"
                  onClick={handleAddCustom}
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-[10px] text-white font-bold flex items-center gap-0.5 shadow-sm cursor-pointer transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add</span>
                </button>
              )}
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-44 overflow-y-auto p-1.5 space-y-0.5 [scrollbar-width:thin] scrollbar-thumb-white/20">
            {/* Custom Option pill preview if user typed custom text */}
            {searchTerm.trim() && !isExactMatch && (
              <button
                type="button"
                onClick={handleAddCustom}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-left bg-blue-600/25 hover:bg-blue-600/40 border border-blue-400/30 text-blue-200 font-medium transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-blue-300 shrink-0" />
                <span className="truncate">
                  Add custom: <strong className="text-white">"{searchTerm.trim()}"</strong>
                </span>
              </button>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = selectedList.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleToggle(opt)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-white/20 text-white font-semibold"
                        : "hover:bg-white/10 text-white/85"
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-300 shrink-0" />}
                  </button>
                );
              })
            ) : !searchTerm.trim() ? (
              <p className="px-3 py-2 text-xs text-white/50 text-center">No options available</p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatableTagSelect;
