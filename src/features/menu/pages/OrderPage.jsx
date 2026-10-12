import { useState } from "react";
import { Link } from "react-router-dom";

function OrderPage() {
  const [form, setForm] = useState({ name: "", email: "", qty: 1 });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  function validate(v) {
    const e = {};
    if (v.name.trim().length < 2) e.name = "Name too short";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email))
      e.email = "Enter a valid email";
    if (Number(v.qty) < 1) e.qty = "Qty must be ≥ 1";
    return e;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setDone(true);
    }
  }

  if (done) {
    return (
      <div className="order-page-container">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p className="success-message">
            Thanks, <strong>{form.name}</strong>! Order received for{" "}
            <strong>{form.qty}</strong> item(s).
          </p>
          <p className="confirmation-note">
            A confirmation receipt has been simulated to <code>{form.email}</code>.
          </p>
          <div className="success-actions">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setForm({ name: "", email: "", qty: 1 });
                setDone(false);
              }}
            >
              Place Another Order
            </button>
            <Link to="/" className="btn btn-primary">
              Back to Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page-container">
      <div className="form-card">
        <h2>Place Your Campus Order</h2>
        <p className="subtitle">
          Fill out the details below to complete your food order.
        </p>

        <form onSubmit={handleSubmit} className="order-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className={`form-control ${errors.name ? "input-error" : ""}`}
              placeholder="e.g. John Smith"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-message">⚠️ {errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`form-control ${errors.email ? "input-error" : ""}`}
              placeholder="e.g. john@example.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">⚠️ {errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="qty">Quantity</label>
            <input
              id="qty"
              name="qty"
              type="number"
              min="1"
              className={`form-control ${errors.qty ? "input-error" : ""}`}
              value={form.qty}
              onChange={handleChange}
            />
            {errors.qty && <span className="error-message">⚠️ {errors.qty}</span>}
          </div>

          <button type="submit" className="btn btn-primary submit-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderPage;
