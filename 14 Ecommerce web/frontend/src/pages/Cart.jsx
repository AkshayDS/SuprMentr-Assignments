// ============================================================
// pages/Cart.jsx
// ============================================================
// The Cart page reads the global cart array from CartContext.
//
// CHECKOUT FLOW:
// When the user clicks "Proceed to Checkout":
//   1. If not logged in → redirect to /login
//   2. If logged in → show order confirmation with user's name
//   3. Clear the cart after successful "order"
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Order confirmation state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Handle checkout
  const handleCheckout = () => {
    // If user is not logged in, redirect to login page
    if (!user) {
      navigate("/login");
      return;
    }

    // Save order details before clearing cart
    setOrderDetails({
      userName: user.name,
      items: [...cart],
      total: totalPrice >= 2000 ? totalPrice : totalPrice + 99,
      itemCount: totalItems,
      orderId: "AES-" + Date.now().toString(36).toUpperCase(),
    });

    // Show confirmation & clear cart
    setOrderPlaced(true);
    clearCart();
  };

  // ---- ORDER SUCCESS SCREEN ----
  if (orderPlaced && orderDetails) {
    return (
      <div className="cart-page">
        <div className="order-success">
          <div className="success-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 className="success-title">Order Placed Successfully! 🎉</h1>
          <p className="success-greeting">
            Thank you, <strong>{orderDetails.userName}</strong>!
          </p>
          <p className="success-message">
            Your order has been successfully placed and is being processed. You will receive a confirmation email shortly.
          </p>

          <div className="success-details">
            <div className="success-detail-row">
              <span>Order ID</span>
              <span className="order-id">{orderDetails.orderId}</span>
            </div>
            <div className="success-detail-row">
              <span>Items Ordered</span>
              <span>{orderDetails.itemCount} items</span>
            </div>
            <div className="success-detail-row">
              <span>Total Paid</span>
              <span className="order-total">₹{orderDetails.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="success-items-preview">
            <h3>Items in This Order</h3>
            {orderDetails.items.map((item) => (
              <div key={item.id} className="success-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <span className="success-item-name">{item.name}</span>
                  <span className="success-item-qty">Qty: {item.quantity} × ₹{item.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="success-actions">
            <Link to="/products" className="btn btn-primary btn-lg">
              Continue Shopping
            </Link>
            <Link to="/" className="btn btn-outline btn-lg">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---- EMPTY CART STATE ----
  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--text-muted)'}}>
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ---- CART WITH ITEMS ----
  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart ({totalItems} items)</h1>

      <div className="cart-layout">
        {/* ---- CART ITEMS LIST ---- */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <span className="cart-item-category">{item.category}</span>
                <span className="cart-item-price">
                  ₹{item.price.toFixed(2)} each
                </span>
              </div>
              <div className="cart-item-controls">
                <div className="quantity-toggle">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="cart-item-subtotal">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove item"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ---- ORDER SUMMARY ---- */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">
              {totalPrice >= 2000 ? "FREE" : "₹99"}
            </span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>
              ₹{(totalPrice >= 2000 ? totalPrice : totalPrice + 99).toFixed(2)}
            </span>
          </div>
          <button
            className="btn btn-primary btn-lg btn-checkout"
            onClick={handleCheckout}
          >
            {user ? "Proceed to Checkout" : "Login to Checkout"}
          </button>
          <Link to="/products" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
