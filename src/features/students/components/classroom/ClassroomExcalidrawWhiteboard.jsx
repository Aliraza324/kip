import React, { Component, useState, useEffect } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import {
  X, Sparkles, RefreshCw, MousePointer, Edit3, Eraser,
  Square, Circle, ArrowRight, Type, Trash2, Maximize2, Minimize2,
} from "lucide-react";

class WhiteboardErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Excalidraw Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 w-full h-[620px] flex flex-col items-center justify-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
          <h4 className="text-base font-bold text-slate-800">Whiteboard Notice</h4>
          <p className="text-xs text-rose-600 max-w-md font-mono bg-rose-50 p-2.5 rounded-lg border border-rose-200/60">
            {this.state.error?.message || "Failed to initialize canvas"}
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-[#0080f6] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer hover:bg-blue-600 transition-colors"
          >
            Retry Loading Whiteboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const QUICK_TOOLS = [
  { id: "selection", label: "Select", icon: MousePointer },
  { id: "freedraw", label: "Pen", icon: Edit3 },
  { id: "eraser", label: "Eraser", icon: Eraser },
  { id: "rectangle", label: "Box", icon: Square },
  { id: "ellipse", label: "Circle", icon: Circle },
  { id: "arrow", label: "Arrow", icon: ArrowRight },
  { id: "text", label: "Text", icon: Type },
];

export const ClassroomExcalidrawWhiteboard = ({
  onClose,
  title = "Mathematics – Live Whiteboard",
}) => {
  const [theme, setTheme] = useState("light");
  const [excalidrawApi, setExcalidrawApi] = useState(null);
  const [activeTool, setActiveTool] = useState("freedraw");
  // Default to maximized full-screen whiteboard per user requirement
  const [isMaximized, setIsMaximized] = useState(true);

  const handleSelectTool = (toolId) => {
    setActiveTool(toolId);
    if (excalidrawApi) {
      excalidrawApi.setActiveTool({ type: toolId });
    }
  };

  const handleClearWhiteboard = () => {
    if (excalidrawApi) {
      excalidrawApi.resetScene();
    }
  };

  useEffect(() => {
    if (excalidrawApi) {
      excalidrawApi.refresh();
      excalidrawApi.setActiveTool({ type: "freedraw" });
    }
  }, [excalidrawApi]);

  const containerClasses = isMaximized
    ? "fixed inset-2 sm:inset-4 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
    : "relative flex-1 bg-white border border-slate-200/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden min-h-[580px] sm:min-h-[660px] h-full z-10";

  return (
    <div className={containerClasses}>
      {/* Top Header Bar: Title, Quick Tools & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-5 py-2.5 bg-white border-b border-slate-100 z-20 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <h3 className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-none">
            <Sparkles className="w-4 h-4 text-[#0080f6] shrink-0" />
            <span>{title}</span>
          </h3>
        </div>

        {/* Guaranteed Visible Floating Tool Strip */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 shadow-2xs">
          {QUICK_TOOLS.map((t) => {
            const Icon = t.icon;
            const isSelected = activeTool === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTool(t.id)}
                title={t.label}
                className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#0080f6] text-white shadow-xs"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline text-[11px]">{t.label}</span>
              </button>
            );
          })}
          <div className="w-px h-4 bg-slate-300 mx-0.5" />
          <button
            type="button"
            onClick={handleClearWhiteboard}
            title="Clear Canvas"
            className="p-1.5 sm:px-2 rounded-xl text-[11px] font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Clear</span>
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsMaximized((m) => !m)}
            title={isMaximized ? "Exit Maximize" : "Maximize Whiteboard"}
            className="p-1.5 rounded-full text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-full text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/70 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* 100% Native Excalidraw Canvas */}
      <div
        style={{ height: isMaximized ? "calc(100vh - 80px)" : "640px", width: "100%", position: "relative" }}
        className="flex-1 w-full relative"
      >
        <WhiteboardErrorBoundary>
          <Excalidraw
            excalidrawAPI={setExcalidrawApi}
            theme={theme}
            name={title}
            langCode="en"
            zenModeEnabled={false}
            viewModeEnabled={false}
            gridModeEnabled={true}
            UIOptions={{
              canvasActions: {
                export: { saveFileToDisk: true },
                loadScene: false,
                saveToActiveFile: false,
                toggleTheme: true,
              },
            }}
          />
        </WhiteboardErrorBoundary>
      </div>
    </div>
  );
};

export default ClassroomExcalidrawWhiteboard;
