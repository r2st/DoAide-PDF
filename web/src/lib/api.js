import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: API_URL,
  timeout: 120000,
});

export async function processFile(endpoint, formData, onProgress) {
  const response = await api.post(endpoint, formData, {
    responseType: "blob",
    onUploadProgress: onProgress
      ? (e) => onProgress(Math.round((e.loaded * 100) / (e.total || 1)))
      : undefined,
  });
  return response.data;
}

export async function processFileJson(endpoint, formData) {
  const response = await api.post(endpoint, formData);
  return response.data;
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
