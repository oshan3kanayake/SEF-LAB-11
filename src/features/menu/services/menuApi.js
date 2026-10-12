// CampusEats Menu API Service - Connects React Frontend (Lab 02) to ASP.NET Core Backend (Lab 03)

import { MENU_URL } from "../../../config";

export const API_BASE_URL = MENU_URL; // from VITE_API_URL
export const LOCAL_FALLBACK_URL = "/menu.json";

// Smart fetch: attempts to load from live ASP.NET Core API, falls back to local JSON if backend is offline
export async function fetchMenuItems() {
  try {
    const response = await fetch(API_BASE_URL);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Backend returned status ${response.status}`);
  } catch (error) {
    console.warn("Backend API not reachable, using local fallback menu.json:", error.message);
    const fallback = await fetch(LOCAL_FALLBACK_URL);
    return await fallback.json();
  }
}
