import { BASE_URL } from "./baseURL";

export const getAuthToken = () => {
  if (typeof localStorage === "undefined") return null;
  return (
    localStorage.getItem("kip_token") ||
    localStorage.getItem("token") ||
    null
  );
};

export const setAuthToken = (token) => {
  if (typeof localStorage === "undefined") return;
  if (token) {
    localStorage.setItem("kip_token", token);
  } else {
    localStorage.removeItem("kip_token");
  }
};

export async function apiRequest(path, { method = "GET", body, headers = {}, ...rest } = {}) {
  const cleanBase = (BASE_URL || "").replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = path.startsWith("http") ? path : `${cleanBase}${cleanPath}`;

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  const token = getAuthToken();

  const requestHeaders = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
      ...rest,
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const err = new Error(data?.message || data?.error || `Request failed with ${response.status}`);
      err.status = response.status;
      err.data = data;
      throw err;
    }
    return data;
  } catch (err) {
    // Graceful fallback for offline / mock dev mode
    console.warn(`[API ${method} ${path}]:`, err.message);
    throw err;
  }
}

export const api = {
  get: (path, options) => apiRequest(path, { ...options, method: "GET" }),
  post: (path, body, options) => apiRequest(path, { ...options, method: "POST", body }),
  put: (path, body, options) => apiRequest(path, { ...options, method: "PUT", body }),
  patch: (path, body, options) => apiRequest(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => apiRequest(path, { ...options, method: "DELETE" }),
  request: apiRequest,
};

export default api;
