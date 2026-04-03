import { API_BASE_URL } from "@/config/env";

export function getMediaUrl(path) {
  if (!path) return null;

 
  if (path.startsWith("http")) return path;

 
  return `${API_BASE_URL}${path}`;
}