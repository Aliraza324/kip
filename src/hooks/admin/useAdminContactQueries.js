import { useState, useEffect, useCallback } from "react";
import { useMutation } from "../useMutation";
import { adminContactService } from "@/service/apiService";
import toast from "react-hot-toast";

/**
 * Hook to fetch and manage Contact Queries list in the Admin Portal
 */
export function useAdminContactQueries(initialParams = { page: 1, limit: 10, status: "all" }) {
  const [params, setParams] = useState(initialParams);
  const [messages, setMessages] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0, totalPages: 1, unreadCount: 0, pendingCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async (currentParams) => {
    try {
      setLoading(true);
      setError(null);
      const queryParams = { ...currentParams };
      if (queryParams.status === "all") delete queryParams.status;
      const res = await adminContactService.listMessages(queryParams);
      const items = res?.data || [];
      const resMeta = res?.meta || {};
      setMessages(items);
      setMeta({
        page: resMeta.page || currentParams.page || 1,
        limit: resMeta.limit || currentParams.limit || 10,
        total: resMeta.total || items.length,
        totalPages: resMeta.totalPages || 1,
        unreadCount: resMeta.unreadCount || 0,
        pendingCount: resMeta.pendingCount || 0,
      });
    } catch (err) {
      setError(err?.message || "Failed to load contact queries.");
      toast.error(err?.message || "Failed to load contact queries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages(params);
  }, [fetchMessages, params]);

  const refetch = useCallback(() => {
    fetchMessages(params);
  }, [fetchMessages, params]);

  return {
    messages,
    meta,
    loading,
    error,
    params,
    setParams,
    refetch,
  };
}

/**
 * Mutation hook for admin to send response/reply to user's query
 */
export function useAdminReplyContactMessage(options = {}) {
  const { onSuccess, onError, ...rest } = options;
  return useMutation(
    async ({ messageId, replyMessage }) => {
      return await adminContactService.replyMessage(messageId, replyMessage);
    },
    {
      onSuccess: (result, variables) => {
        toast.success("Response sent to user's email successfully! ✉️");
        onSuccess?.(result, variables);
      },
      onError: (err, variables) => {
        toast.error(err?.message || "Failed to send response email.");
        onError?.(err, variables);
      },
      ...rest,
    }
  );
}

/**
 * Mutation hook to toggle read/unread status
 */
export function useAdminSetContactMessageRead(options = {}) {
  const { onSuccess, onError, ...rest } = options;
  return useMutation(
    async ({ messageId, isRead }) => {
      return await adminContactService.setRead(messageId, isRead);
    },
    {
      onSuccess: (result, variables) => {
        onSuccess?.(result, variables);
      },
      onError: (err, variables) => {
        toast.error(err?.message || "Failed to update status.");
        onError?.(err, variables);
      },
      ...rest,
    }
  );
}

/**
 * Mutation hook to delete query
 */
export function useAdminDeleteContactMessage(options = {}) {
  const { onSuccess, onError, ...rest } = options;
  return useMutation(
    async (messageId) => {
      return await adminContactService.deleteMessage(messageId);
    },
    {
      onSuccess: (result, variables) => {
        toast.success("Query deleted successfully.");
        onSuccess?.(result, variables);
      },
      onError: (err, variables) => {
        toast.error(err?.message || "Failed to delete query.");
        onError?.(err, variables);
      },
      ...rest,
    }
  );
}

export default {
  useAdminContactQueries,
  useAdminReplyContactMessage,
  useAdminSetContactMessageRead,
  useAdminDeleteContactMessage,
};
