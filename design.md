# KIP Project Architecture, Design System & Performance Blueprint

This document sets the mandatory engineering standards, design system specifications, component architecture, and performance targets for the **KIP** platform covering the **Landing**, **Student**, **Teacher**, and **Admin** portals.

---

## 1. Visual Identity & Color System

The color system is derived directly from the institutional brand palette and configured as theme tokens in `src/index.css` via Tailwind CSS v4 `@theme`.

### Brand Color Tokens

| Semantic Token | Tailwind Class | Hex Code | RGB | Purpose & Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Main Headings & Nav** | `bg-primary`, `text-primary` | `#01287b` | `rgb(1, 40, 123)` | Top navigation bars, hero headers, page titles, primary badges. |
| **Buttons & Links** | `bg-secondary`, `text-secondary` | `#007be3` | `rgb(0, 123, 227)` | Primary action buttons, interactive links, tabs, progress bars. |
| **Yellow Accents** | `bg-accent`, `text-accent` | `#febf11` | `rgb(254, 191, 17)` | Badges, alert highlights, star ratings, CTA attention elements. |
| **Background (Base)** | `bg-bg-base` | `#ffffff` | `rgb(255, 255, 255)` | Main viewport background, default page canvas. |
| **Card / Surface** | `bg-bg-surface` | `#fcfcfc` | `rgb(252, 252, 252)` | Card containers, sidebar panels, modals, dropdown surfaces. |
| **Dark Frame / Slate** | `bg-brand-slate` | `#3b4756` | `rgb(59, 71, 86)` | Outer portal frames, dark footers, high-contrast borders. |
| **Body Text** | `text-text-body` | `#1e293b` | `rgb(30, 41, 59)` | Standard paragraphs, table data, form labels. |
| **Muted Text** | `text-text-muted` | `#64748b` | `rgb(100, 116, 139)` | Subtitles, timestamps, placeholders, captions. |
| **Subtle Border** | `border-border-subtle` | `#e2e8f0` | `rgb(226, 232, 240)` | Dividers, card strokes, table row separators. |

```css
/* Configured in src/index.css */
@theme {
  --color-brand-navy: #01287b;
  --color-brand-blue: #007be3;
  --color-brand-yellow: #febf11;
  --color-brand-slate: #3b4756;

  --color-primary: #01287b;
  --color-primary-hover: #011d59;
  --color-primary-light: #e8edf8;

  --color-secondary: #007be3;
  --color-secondary-hover: #0066c0;
  --color-secondary-light: #e5f3fc;

  --color-accent: #febf11;
  --color-accent-hover: #e2a808;
  --color-accent-light: #fff8e7;
}
```

---

## 2. Hard Rule: Maximum 200 Lines per Component

> [!IMPORTANT]
> **No component file may exceed 200 lines of code (LOC).**
> Any component exceeding 150 lines is a candidate for modular decomposition.

### Decomposition Strategy
1. **Container vs. Presentational Split**: Move data fetching, form handling, and state calculations into custom hooks (`useCourseList.js`, `useStudentGrades.js`).
2. **Subcomponent Extraction**: Move repetitive UI units (table rows, card items, modal dialogs, toolbar controls) into dedicated files inside `features/{domain}/components/`.
3. **Pure Presentational Atoms**: Keep leaf components lightweight, receiving pure props.

```
Example:
src/features/students/
├── components/
│   ├── StudentCourseCard.jsx       (~65 lines)
│   ├── StudentAssignmentItem.jsx   (~45 lines)
│   ├── StudentGradeTable.jsx       (~110 lines)
│   └── StudentStatWidget.jsx       (~40 lines)
├── hooks/
│   └── useStudentDashboard.js      (~75 lines)
└── pages/
    └── StudentDashboardPage.jsx    (~95 lines)
```

---

## 3. Centralized Mock Data Architecture (`src/mocks/`)

> [!IMPORTANT]
> **Zero hardcoded mock data inside JSX.**
> All mock data must reside in `src/mocks/` with standardized schema contracts.

### Structure
```
src/mocks/
├── index.js            # Single barrel export
├── auth.mock.js        # Admin, Teacher, Student accounts and roles
├── landing.mock.js     # Hero section, feature grids, statistics
├── student.mock.js     # Enrolled courses, assignments, GPA, schedules
├── teacher.mock.js     # Assigned classes, grading queue, attendance rosters
└── admin.mock.js       # System metrics, user accounts, audit trails
```

### Consumption Pattern
```javascript
// Good: imported from centralized mock registry
import { studentCoursesMock, studentStatsMock } from "@/mocks";

// Bad: inline mock arrays inside component files
const dummyCourses = [{ id: 1, name: "CS101" }]; // REJECTED
```

---

## 4. SPA Navigation Rule: `<Link>` / `<NavLink>` vs `<a>`

> [!CAUTION]
> **Never use raw `<a>` tags for internal platform routing.**
> Raw `<a>` tags trigger browser full-page refreshes, destroying in-memory React state, busting cached chunk modules, and violating INP/LCP performance metrics.

### Navigation Policy
- **Internal Routes**: Always use `<Link to="...">` or `<NavLink to="...">` from the routing library.
- **Active Navigation States**: Use `<NavLink className={({ isActive }) => ...}>` to apply the active accent/secondary color indicator.
- **External Links Only**: Raw `<a href="https://..." target="_blank" rel="noopener noreferrer">` is strictly restricted to external third-party destinations.

---

## 5. Performance Engineering & Core Web Vitals Targets

The platform must strictly satisfy Google Core Web Vitals across both mobile and desktop profiles:

| Metric | Target | Description | Enforcement Technique |
| :--- | :--- | :--- | :--- |
| **LCP** | **≤ 2.5s** | Largest Contentful Paint | Critical image preloading, hero font subsets, dynamic route code splitting. |
| **INP** | **≤ 200ms** | Interaction to Next Paint | React 19 concurrent transitions (`useTransition`), debounced handlers, virtualized scroll. |
| **CLS** | **≤ 0.1** | Cumulative Layout Shift | Explicit aspect-ratio containers, fixed dimension skeleton loaders, zero layout-shifting banners. |

### LCP Safeguards
- Preload hero images using `<link rel="preload" as="image">` or responsive `fetchpriority="high"`.
- Avoid rendering render-blocking modal overlays during initial paint.

### INP Safeguards
- Avoid running state updates synchronously inside high-frequency scroll or resize listeners.
- Use `useTransition()` for tab changes and portal switching:
  ```javascript
  const [isPending, startTransition] = useTransition();
  const handleTabSwitch = (newTab) => {
    startTransition(() => setActiveTab(newTab));
  };
  ```

### CLS Safeguards
- Always provide width and height or Tailwind aspect ratio classes (`aspect-video`, `min-h-[280px]`) on dynamic content blocks.
- Reserve placeholder space for asynchronous data using skeleton blocks matching exact dimensions.

---

## 6. Code Splitting & Route Chunking (Student, Teacher, Admin, Landing)

The platform splits bundles strictly by portal domain. Users accessing the Student portal will not download code or assets intended for the Teacher or Admin suites.

### Vite Manual Chunks Configuration (`vite.config.js`)
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            if (id.includes('lucide-react') || id.includes('framer-motion')) return 'vendor-ui';
            return 'vendor';
          }
          if (id.includes('src/features/students')) return 'chunk-student';
          if (id.includes('src/features/teachers')) return 'chunk-teacher';
          if (id.includes('src/features/admin')) return 'chunk-admin';
          if (id.includes('src/features/landing')) return 'chunk-landing';
        },
      },
    },
  },
});
```

### Lazy Route Loading Pattern
```javascript
import { lazy, Suspense } from 'react';
import { RouteLoadingSkeleton } from '@/shared/components/RouteLoadingSkeleton';

const StudentPortal = lazy(() => import('@/features/students/routes/StudentRoutes'));
const TeacherPortal = lazy(() => import('@/features/teachers/routes/TeacherRoutes'));
const AdminPortal   = lazy(() => import('@/features/admin/routes/AdminRoutes'));
const LandingPage   = lazy(() => import('@/features/landing/pages/LandingPage'));

export function AppRouter() {
  return (
    <Suspense fallback={<RouteLoadingSkeleton />}>
      {/* Route declarations */}
    </Suspense>
  );
}
```

---

## 7. Memoization & Re-render Protocols

Indiscriminate memoization adds memory overhead. Apply memoization under the following concrete rules:

| API | When to Apply | When to Avoid |
| :--- | :--- | :--- |
| **`React.memo()`** | Presentational list items (e.g. `StudentRow`, `CourseCard`) rendered 20+ times that receive stable props. | Simple leaf components rendered only once or with constantly changing children. |
| **`useCallback()`** | Handlers passed down as props to `React.memo()` children or dependencies of `useEffect`. | Inline button click handlers with no memoized descendants. |
| **`useMemo()`** | Heavy filtering, multi-level sorting, GPA recalculation, or deriving complex data structures from raw mock sets. | Trivial string concatenations or basic boolean flags. |

```javascript
// High-cost calculation memoization pattern
const filteredStudents = useMemo(() => {
  return students
    .filter(s => s.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
    .sort((a, b) => b.gpa - a.gpa);
}, [students, debouncedQuery]);

// Stable callback passing pattern
const handleSelectCourse = useCallback((courseId) => {
  setSelectedCourseId(courseId);
}, []);
```

---

## 8. Virtualization & Debouncing Standards

### List Virtualization
- For student rosters, attendance sheets, transaction logs, or course catalogs containing **> 50 items**, list virtualization must be used.
- Only DOM nodes in the visible viewport (+ buffer window) are rendered, capping memory footprint and DOM complexity.

### Debouncing Pattern
- Every search input, table filter, and autosave field must be debounced with a standard window between **300ms** and **400ms**.

```javascript
// Reusable hook: src/features/utils/useDebounce.js
export function useDebounce(value, delay = 350) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

---

## 9. Form Architecture (React Hook Form + Zod)

All data entry forms (user registration, course creation, assignment submissions, grading) must follow the uncontrolled input paradigm via **React Hook Form** paired with **Zod** schema validations.

- **Zero Re-render Typing**: Input typing updates internal ref values rather than triggering whole-form component re-renders.
- **Type-Safe Validation**: All schemas defined using Zod; resolved via `@hookform/resolvers/zod`.
- **Atomic Form Controls**: Reusable `<FormInput>`, `<FormSelect>`, `<FormTextarea>` controls wrapping validation message display within < 60 LOC each.

---

## 10. Folder Structure Analysis & Standardization

### Analysis of Current Workspace
```
src/
├── app/                  # App shell, root routing, providers, global store
├── assets/               # Static media (icons, images)
├── features/             # Business domain modules
│   ├── admin/            # Administrative management
│   ├── auth/             # Login, register, token refresh
│   ├── landing/          # Public marketing & admissions
│   ├── students/         # Student portal (enrolled courses, grades)
│   ├── teachers/         # Teacher portal (rosters, grading)
│   └── utils/            # Domain-independent helpers
├── layouts/              # Shell layouts (Admin, Auth, Public, Student, Teacher)
├── mocks/                # Centralized mock datasets
├── index.css             # Tailwind v4 theme setup
└── main.jsx              # Application bootstrap
```

### Portal Domain Uniformity Standard
To avoid naming drift (`student` vs `students`), all domain folders inside `src/features/` must use plural identifiers:
- `src/features/landing/` (Public marketing pages & admissions)
- `src/features/students/` (Student workspace)
- `src/features/teachers/` (Faculty workspace)
- `src/features/admin/` (Administrative workspace)
- `src/features/auth/` (Authentication & identity)

Each portal domain follows the uniform subfolder blueprint:
```
src/features/{domain}/
├── components/           # Subcomponents (Strictly ≤ 200 LOC per file)
├── hooks/                # Domain-specific state & data hooks
├── services/             # Mock/API interaction layer
├── routes/               # Role-specific route definitions & lazy wrappers
└── index.js              # Module public interface
```

---

## 11. Quality Verification Checklist

Before committing any component or feature:
- [ ] File size does not exceed **200 lines**.
- [ ] No hardcoded arrays or objects; data imported from `src/mocks/`.
- [ ] Navigation strictly uses `<Link>` / `<NavLink>` (no raw `<a>`).
- [ ] Color values use Tailwind classes (`text-primary`, `bg-secondary`, `bg-accent`, `bg-bg-surface`).
- [ ] Route entry points lazy-loaded with a `Suspense` skeleton fallback.
- [ ] High-frequency input handlers debounced (300ms–400ms).
- [ ] `npm run build` generates discrete portal chunks without build errors.

