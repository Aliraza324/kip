import { useState, useEffect, useCallback } from "react";
import { useMutation } from "../useMutation";
import { adminDashboardService } from "@/service/apiService";
import toast from "react-hot-toast";

// Module-level cache & in-flight promise to prevent duplicate requests across components
let cacheData = null;
let activeRequest = null;
const listeners = new Set();

const notifyListeners = () => {
  listeners.forEach((listener) => {
    try {
      listener(cacheData);
    } catch {}
  });
};

/**
 * Fetch dashboard data with caching and request deduplication
 */
export async function fetchDashboardData(force = false) {
  if (!force && cacheData) {
    return cacheData;
  }
  if (activeRequest) {
    return activeRequest;
  }
  activeRequest = (async () => {
    try {
      const res = await adminDashboardService.getDashboard();
      const clean = res?.data !== undefined ? res.data : res;
      cacheData = clean;
      notifyListeners();
      return clean;
    } finally {
      activeRequest = null;
    }
  })();
  return activeRequest;
}

/**
 * Hook to fetch and manage Admin Dashboard data (KPIs, queries received growth chart, notifications)
 */
export function useAdminDashboard() {
  const [data, setData] = useState(cacheData);
  const [loading, setLoading] = useState(!cacheData);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleUpdate = (newData) => {
      setData(newData);
      setLoading(false);
    };
    listeners.add(handleUpdate);

    if (!cacheData && !activeRequest) {
      setLoading(true);
      fetchDashboardData(true)
        .then((res) => {
          setData(res);
          setError(null);
        })
        .catch((err) => {
          setError(err?.message || "Failed to load dashboard data");
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (activeRequest) {
      activeRequest
        .then((res) => {
          setData(res);
          setError(null);
        })
        .catch((err) => {
          setError(err?.message || "Failed to load dashboard data");
        })
        .finally(() => {
          setLoading(false);
        });
    }

    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchDashboardData(true);
      setData(res);
      return res;
    } catch (err) {
      setError(err?.message || "Failed to refresh dashboard");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    dashboard: data,
    kpis: data?.kpis || null,
    queriesGrowth: data?.queriesGrowth || data?.queriesChart || [],
    totalQueriesReceived: data?.totalQueriesReceived ?? data?.kpis?.totalQueries ?? 0,
    studentGrowth: data?.studentGrowth || [],
    notifications: data?.notifications || [],
    loading,
    error,
    refetch,
  };
}

/**
 * Mutation hook to refresh or trigger updates to the Admin Dashboard
 */
export function useRefreshAdminDashboard(options = {}) {
  const { onSuccess, onError, ...rest } = options;

  return useMutation(
    async () => {
      const res = await fetchDashboardData(true);
      return res;
    },
    {
      onSuccess: (data, vars) => {
        toast.success("Dashboard data updated");
        onSuccess?.(data, vars);
      },
      onError: (err, vars) => {
        toast.error(err?.message || "Failed to refresh dashboard");
        onError?.(err, vars);
      },
      ...rest,
    }
  );
}

export const useAdminDashboardMutation = useRefreshAdminDashboard;

export default useAdminDashboard;
