export const WhatYouCanDoCardIcon = ({ type }) => {
  switch (type) {
    case "video":
      return (
        <svg
          className="w-8 h-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="5" width="13" height="14" rx="3" />
          <path d="M15 10l5-3v10l-5-3v-4z" />
        </svg>
      );
    case "screenShare":
      return (
        <svg
          className="w-8 h-8 text-slate-900"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
          <polyline points="16 8 12 4 8 8" />
          <line x1="12" y1="4" x2="12" y2="15" />
        </svg>
      );
    case "whiteboard":
      return (
        <svg
          className="w-8 h-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          <path d="M4 21h16" />
        </svg>
      );
    case "scheduling":
      return (
        <svg
          className="w-8 h-8 text-slate-900"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="17" rx="3" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <circle cx="8" cy="14" r="1.2" fill="currentColor" />
          <circle cx="12" cy="14" r="1.2" fill="currentColor" />
          <circle cx="16" cy="14" r="1.2" fill="currentColor" />
          <circle cx="8" cy="17.5" r="1.2" fill="currentColor" />
          <circle cx="12" cy="17.5" r="1.2" fill="currentColor" />
          <circle cx="16" cy="17.5" r="1.2" fill="currentColor" />
        </svg>
      );
    case "materials":
      return (
        <svg
          className="w-8 h-8 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2.5 L17 5 L12 7.5 L7 5 Z" />
          <path d="M16 6.5 V9" />
          <path d="M3 8.5 C3 7 4.5 7 6 7 H11 V20.5 H6 C4 20.5 3 19.5 3 18 Z" />
          <path d="M21 8.5 C21 7 19.5 7 18 7 H13 V20.5 H18 C20 20.5 21 19.5 21 18 Z" />
        </svg>
      );
    case "teacherTools":
      return (
        <svg
          className="w-8 h-8 text-slate-900"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2.5" />
          <circle cx="8" cy="9.5" r="2.2" fill="currentColor" />
          <path d="M4.5 15a3.5 3.5 0 0 1 7 0" fill="currentColor" />
          <line x1="14" y1="8" x2="18" y2="8" />
          <line x1="14" y1="11" x2="17" y2="11" />
          <line x1="9" y1="21" x2="15" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    default:
      return null;
  }
};

