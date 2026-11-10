export const ClassroomChipIcon = ({ type, color }) => {
  const iconColor = color === "yellow" ? "text-[#febf11]" : "text-[#007be3]";

  switch (type) {
    case "video":
      return (
        <svg
          className={`w-5 h-5 ${iconColor} shrink-0`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="6" width="13" height="12" rx="2.5" />
          <path d="M15 10l5-3v10l-5-3v-4z" />
        </svg>
      );
    case "pen":
      return (
        <svg
          className={`w-5 h-5 ${iconColor} shrink-0`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2l4 4-10 10H8v-4L18 2z" />
          <path d="M4 21h16" />
        </svg>
      );
    case "chat":
      return (
        <svg
          className={`w-5 h-5 ${iconColor} shrink-0`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "screen":
      return (
        <svg
          className={`w-5 h-5 ${iconColor} shrink-0`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case "hand":
      return (
        <svg
          className={`w-5 h-5 ${iconColor} shrink-0`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 11V6a2 2 0 0 0-4 0v4" />
          <path d="M14 10V4a2 2 0 0 0-4 0v6" />
          <path d="M10 10.5V6a2 2 0 0 0-4 0v8" />
          <path d="M6 14v-2a2 2 0 0 0-4 0v4a8 8 0 0 0 16 0v-5a2 2 0 0 0-4 0" />
        </svg>
      );
    case "users":
      return (
        <svg
          className={`w-5 h-5 ${iconColor} shrink-0`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="7" r="4" />
          <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
          <path d="M2 13a9 9 0 0 1 2-4" />
          <path d="M22 13a9 9 0 0 0-2-4" />
        </svg>
      );
    default:
      return null;
  }
};

