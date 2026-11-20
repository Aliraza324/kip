/**
 * Utility functions for Student Learning Materials
 * Opens and downloads real file URLs (Cloudinary / server storage).
 */

export const openMaterialInBrowser = (material) => {
  if (!material) return false;
  const targetUrl = material.url || material.file?.url;
  if (!targetUrl) return false;

  const newTab = window.open(targetUrl, "_blank", "noopener,noreferrer");
  return Boolean(newTab);
};

export const downloadMaterialFile = (material) => {
  if (!material) return;
  const targetUrl = material.url || material.file?.url;
  if (!targetUrl) return;

  const fileName =
    material.file?.name ||
    `${(material.title || "material").replace(/\s+/g, "_")}.${
      material.type === "video" ? "mp4" : "pdf"
    }`;

  const link = document.createElement("a");
  link.href = targetUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
