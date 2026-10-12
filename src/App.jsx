import { Routes, Route, NavLink } from "react-router-dom";
import MenuPage from "./features/menu/pages/MenuPage";
import DishDetailPage from "./features/menu/pages/DishDetailPage";
import OrderPage from "./features/menu/pages/OrderPage";

export default function App() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-container">
          <div className="brand-logo">
            <span className="brand-icon">🍽️</span>
            <div className="brand-text">
              <h1>CampusEats Dashboard</h1>
              <span className="brand-badge">SE3090 Lab 02</span>
            </div>
          </div>
          <nav className="nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
              end
            >
              Menu
            </NavLink>
            <span className="nav-separator">|</span>
            <NavLink
              to="/order"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`
              }
            >
              Place Order
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/dish/:id" element={<DishDetailPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route
            path="*"
            element={
              <div className="not-found-page">
                <h2>404 — Page not found</h2>
                <p>The requested page or route does not exist.</p>
                <NavLink to="/" className="btn btn-primary">
                  Return to Menu
                </NavLink>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>SE3090 – Software Engineering Frameworks | Lab Practical 02</p>
      </footer>
    </div>
  );
}
