// Lab 11 - API base URL comes from the environment (set VITE_API_URL on Vercel).
// Vite bakes this in at build time, so redeploy after changing it.
export const API = import.meta.env.VITE_API_URL || "http://localhost:5178";
export const MENU_URL = `${API}/api/menu`;
