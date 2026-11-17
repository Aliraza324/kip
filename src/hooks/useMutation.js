import { useState, useCallback, useRef } from "react";

/**
 * Lightweight React Mutation Hook
 * Emulates TanStack Query mutation behavior with pure React hooks:
 * - mutate(variables, { onSuccess, onError, onSettled })
 * - mutateAsync(variables)
 * - isPending / isLoading, isSuccess, isError, error, data, reset
 */
export function useMutation(mutationFn, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("idle"); // "idle" | "pending" | "success" | "error"

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setStatus("idle");
  }, []);

  const mutateAsync = useCallback(
    async (variables) => {
      setStatus("pending");
      setError(null);
      try {
        const result = await mutationFn(variables);
        setData(result);
        setStatus("success");
        optionsRef.current.onSuccess?.(result, variables);
        optionsRef.current.onSettled?.(result, null, variables);
        return result;
      } catch (err) {
        setError(err);
        setStatus("error");
        optionsRef.current.onError?.(err, variables);
        optionsRef.current.onSettled?.(null, err, variables);
        throw err;
      }
    },
    [mutationFn]
  );

  const mutate = useCallback(
    (variables, callOptions = {}) => {
      mutateAsync(variables)
        .then((result) => {
          callOptions.onSuccess?.(result, variables);
          callOptions.onSettled?.(result, null, variables);
        })
        .catch((err) => {
          callOptions.onError?.(err, variables);
          callOptions.onSettled?.(null, err, variables);
        });
    },
    [mutateAsync]
  );

  return {
    mutate,
    mutateAsync,
    reset,
    data,
    error,
    status,
    isIdle: status === "idle",
    isPending: status === "pending",
    isLoading: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
  };
}

export default useMutation;
