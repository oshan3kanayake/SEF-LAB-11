import { Link } from "react-router-dom";

function DishCard({ dish }) {
  return (
    <div className={`dish-card ${!dish.available ? "sold-out" : ""}`}>
      <div className="dish-header">
        <h3>{dish.name}</h3>
        <span className="dish-category">{dish.category}</span>
      </div>
      <p className="dish-price">Rs. {dish.price.toFixed(2)}</p>
      <div className="dish-footer">
        {!dish.available ? (
          <span className="sold-out-badge">Sold out</span>
        ) : (
          <span className="available-badge">Available</span>
        )}
        <Link to={`/dish/${dish.id}`} className="view-detail-btn">
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default DishCard;
