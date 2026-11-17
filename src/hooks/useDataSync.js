import { useState, useEffect } from "react";
import { liveStore } from "@/service/dataStore";

/**
 * Custom Hook for Real-time Reactive Data Synchronization.
 * Any component using this hook updates instantly whenever data changes
 * without needing a browser reload or refresh.
 */
export function useDataSync(entity) {
  const [data, setData] = useState(() => liveStore.get(entity));

  useEffect(() => {
    // Initial fetch to ensure up-to-date
    setData(liveStore.get(entity));

    // Listen for live mutations across components and browser tabs
    const unsubscribe = liveStore.subscribe(entity, (latestData) => {
      setData(Array.isArray(latestData) ? [...latestData] : { ...latestData });
    });

    return unsubscribe;
  }, [entity]);

  return data;
}

export const useLiveStudents = (classId = null) => {
  const allStudents = useDataSync("students");
  if (!Array.isArray(allStudents)) return [];
  return classId ? allStudents.filter((s) => s.classId === classId) : allStudents;
};

export const useLiveTeachers = () => {
  const allTeachers = useDataSync("teachers");
  return Array.isArray(allTeachers) ? allTeachers : [];
};

export const useLiveClasses = () => {
  const allClasses = useDataSync("classes");
  return Array.isArray(allClasses) ? allClasses : [];
};

export const useLiveContent = (pageKey = "home") => {
  const allContent = useDataSync("content");
  return allContent?.[pageKey] || {};
};

export const useLiveNotifications = () => {
  const allNotifications = useDataSync("notifications");
  return Array.isArray(allNotifications) ? allNotifications : [];
};

export default useDataSync;
