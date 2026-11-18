import { useMutation } from "./useMutation";
import { newsletterService, contactPublicService } from "@/service/apiService";
import { useLiveContent } from "./useDataSync";
import toast from "react-hot-toast";

/**
 * Mutation hook for newsletter subscription ("Stay in the Loop")
 */
export function useSubscribeNewsletter(options = {}) {
  const { onSuccess, onError, ...rest } = options;
  return useMutation(
    async (email) => {
      return await newsletterService.subscribe(email);
    },
    {
      onSuccess: (result, variables) => {
        const message =
          result?.message || "Thank you for subscribing! Check your email for updates 📬";
        toast.success(message);
        onSuccess?.(result, variables);
      },
      onError: (err, variables) => {
        toast.error(err?.message || "Failed to subscribe. Please try again.");
        onError?.(err, variables);
      },
      ...rest,
    }
  );
}

/**
 * Mutation hook for public contact message submission
 */
export function useSubmitContactMessage(options = {}) {
  const { onSuccess, onError, ...rest } = options;
  return useMutation(
    async (formData) => {
      return await contactPublicService.submitMessage(formData);
    },
    {
      onSuccess: (result, variables) => {
        const message = result?.message || "Your message has been sent successfully!";
        toast.success(message);
        onSuccess?.(result, variables);
      },
      onError: (err, variables) => {
        toast.error(err?.message || "Failed to send message. Please try again.");
        onError?.(err, variables);
      },
      ...rest,
    }
  );
}

export { useLiveContent };

export default {
  useSubscribeNewsletter,
  useSubmitContactMessage,
  useLiveContent,
};
