import { useMutation } from "../useMutation";
import { contentService } from "@/service/apiService";
import toast from "react-hot-toast";

/**
 * Mutation hook for saving a hero section's content (title, description, buttons, videoUrl, etc.)
 */
export function useUpdateHeroContent(options = {}) {
  return useMutation(
    async ({ section, data }) => {
      return await contentService.updatePageContent(section, data);
    },
    {
      onSuccess: () => {
        toast.success("Hero section saved and reflected in real time!");
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to save hero section content.");
      },
      ...options,
    }
  );
}

/**
 * Mutation hook for uploading a hero section image
 */
export function useUploadHeroImage(options = {}) {
  return useMutation(
    async ({ section, file }) => {
      return await contentService.uploadImage(section, file);
    },
    {
      onSuccess: () => {
        toast.success("Hero image uploaded to Cloudinary successfully!");
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to upload hero image.");
      },
      ...options,
    }
  );
}

/**
 * Mutation hook for uploading a hero section video
 */
export function useUploadHeroVideo(options = {}) {
  return useMutation(
    async ({ section, file }) => {
      return await contentService.uploadVideo(section, file);
    },
    {
      onSuccess: () => {
        toast.success("Hero video uploaded to cloud storage successfully!");
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to upload hero video.");
      },
      ...options,
    }
  );
}

export default {
  useUpdateHeroContent,
  useUploadHeroImage,
  useUploadHeroVideo,
};
