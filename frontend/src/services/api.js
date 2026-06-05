const defaultApiBaseUrl = import.meta.env.DEV ? "http://localhost:5000" : "";

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || defaultApiBaseUrl
).replace(/\/$/, "");

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

const readJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(apiUrl(path), options);
  const data = await readJson(response);

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const registerTeam = (data) =>
  apiRequest("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const loginAdmin = (password) =>
  apiRequest("/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
