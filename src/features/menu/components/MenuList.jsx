import DishCard from "./DishCard";

function MenuList({ dishes }) {
  if (!dishes || !dishes.length) {
    return (
      <div className="empty-state">
        <p>No dishes match your search.</p>
      </div>
    );
  }

  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}

export default MenuList;
