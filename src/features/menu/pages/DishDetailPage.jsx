import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { MENU_URL } from "../../../config";

function DishDetailPage() {
  const { id } = useParams(); // from /dish/:id
  const { data: dishes, isLoading } = useFetch(MENU_URL, "/menu.json");

  const dish = dishes ? dishes.find((d) => String(d.id) === String(id)) : null;

  return (
    <div className="detail-page-container">
      <Link to="/" className="back-link">← Back to menu</Link>

      <div className="detail-card">
        <div className="detail-header">
          <h2>{dish ? dish.name : `Dish #${id}`}</h2>
          {dish && <span className="dish-category">{dish.category}</span>}
        </div>

        <p className="detail-dish-id">Showing details for dish #{id}</p>

        {isLoading ? (
          <p className="loading-text">Loading details...</p>
        ) : dish ? (
          <div className="detail-body">
            <p className="detail-description">{dish.description || "Freshly prepared campus specialty dish."}</p>
            <div className="detail-meta">
              <span className="detail-price">Price: Rs. {dish.price.toFixed(2)}</span>
              <span className={`status-pill ${dish.available ? "in-stock" : "out-of-stock"}`}>
                {dish.available ? "In Stock" : "Sold out"}
              </span>
            </div>
            {dish.available ? (
              <Link to="/order" className="order-cta-btn">
                Order this Dish →
              </Link>
            ) : (
              <p className="sold-out-note">This item is currently unavailable for order.</p>
            )}
          </div>
        ) : (
          <p className="not-found-text">Dish details not found in menu database.</p>
        )}
      </div>
    </div>
  );
}

export default DishDetailPage;
