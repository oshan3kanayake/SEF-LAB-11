import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFetch } from "../hooks/useFetch";
import MenuList from "../components/MenuList";
import { MENU_URL } from "../../../config";

function MenuPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 400);
  const { data: dishes, isLoading, error } = useFetch(MENU_URL, "/menu.json");

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="status-container loading-state">
        <div className="spinner"></div>
        <p>Loading menu…</p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="status-container error-state">
        <p>Could not load menu: {error}</p>
      </div>
    );
  }

  // 3. Success State
  const filtered = (dishes || []).filter((d) =>
    d.name.toLowerCase().includes(debounced.toLowerCase()) ||
    d.category.toLowerCase().includes(debounced.toLowerCase())
  );

  return (
    <div className="menu-page">
      <div className="search-section">
        <h2>CampusEats Menu</h2>
        <p className="subtitle">Discover today's delicious campus meals and snacks</p>
        <div className="search-bar-wrapper">
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes by name or category..."
          />
          {query && (
            <button className="clear-btn" onClick={() => setQuery("")}>
              ✕
            </button>
          )}
        </div>
        {debounced && (
          <p className="search-status">
            Showing results for "<strong>{debounced}</strong>" ({filtered.length} found)
          </p>
        )}
      </div>

      <MenuList dishes={filtered} />
    </div>
  );
}

export default MenuPage;
