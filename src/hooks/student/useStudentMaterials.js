import { useState, useEffect, useCallback } from "react";
import { studentMaterialService } from "@/service/apiService";

export const useStudentMaterials = (options = {}) => {
  const { initialCategory = "All Materials", initialLimit = 6 } = options;

  const [selectedCategory, setSelectedCategoryState] = useState(initialCategory);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [materials, setMaterials] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: initialLimit,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const setSelectedCategory = useCallback((cat) => {
    setSelectedCategoryState(cat);
    setPage(1); // Reset page on category filter change
  }, []);

  const fetchMaterials = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = {
        page,
        limit,
      };
      if (selectedCategory && selectedCategory !== "All Materials") {
        params.subject = selectedCategory;
      }

      const res = await studentMaterialService.getMaterials(params);
      const rawItems = Array.isArray(res?.data)
        ? res.data
        : res?.data?.items || [];
      const meta = res?.meta || {};

      setMaterials(rawItems);
      if (Array.isArray(meta.subjects)) {
        setSubjects(meta.subjects);
      }
      setPagination({
        page: meta.page || page,
        limit: meta.limit || limit,
        total: typeof meta.total === "number" ? meta.total : rawItems.length,
        totalPages: meta.totalPages || 1,
        hasNext: Boolean(meta.hasNext),
        hasPrev: Boolean(meta.hasPrev),
      });
    } catch (err) {
      console.warn("useStudentMaterials fetch error:", err);
      setError(err);
      setMaterials([]);
      setPagination({
        page: 1,
        limit,
        total: 0,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, page, limit]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  return {
    materials,
    subjects,
    selectedCategory,
    setSelectedCategory,
    page,
    setPage,
    limit,
    setLimit,
    pagination,
    isLoading,
    error,
    refetch: fetchMaterials,
  };
};

export default useStudentMaterials;
