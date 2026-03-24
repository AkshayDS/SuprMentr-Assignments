// ============================================================
// pages/ProductDetails.jsx
// ============================================================
// A dynamic route that reads the product ID from the URL using
// useParams(). It finds the matching product from dummy data
// and displays full details.
//
// CONTEXT API CONNECTION:
// - The "Add to Cart" button calls addToCart(product) from the
//   global CartContext. This updates the cart array which is
//   shared across the entire app.
// - The "Buy Now" button calls addToCart AND uses useNavigate()
//   to redirect the user to /cart immediately.
// - The Navbar badge updates instantly because it also reads
//   from the same CartContext via useCart().
// ============================================================

import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import { useState } from "react";

const ProductDetails = () => {
  // Read the :id param from the URL (e.g., /product/3 → id = "3")
  const { id } = useParams();
  const navigate = useNavigate();

  // Access cart functions from global context
  const { addToCart } = useCart();

  // State for showing "Added!" feedback
  const [added, setAdded] = useState(false);

  // Find the product matching the URL id
  const product = products.find((p) => p.id === parseInt(id));

  // Handle case where product ID doesn't exist
  if (!product) {
    return (
      <div className="not-found-page">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  // ---- ADD TO CART HANDLER ----
  // Calls the Context API's addToCart function which updates global state.
  // The Cart page will automatically reflect this change because it
  // also subscribes to the same CartContext.
  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // Reset feedback after 1.5s
  };

  // ---- BUY NOW HANDLER ----
  // Adds to cart AND navigates to /cart page immediately
  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/products">← Back to Products</Link>
      </div>

      <div className="detail-layout">
        {/* Product Image */}
        <div className="detail-image-container">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Product Info */}
        <div className="detail-info">
          <span className="product-category">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">₹{product.price.toFixed(2)}</p>

          <div className={`stock-status ${product.inStock ? "in-stock" : "out-of-stock"}`}>
            <span className="stock-dot"></span>
            {product.inStock ? "In Stock & Ready to Ship" : "Currently Out of Stock"}
          </div>

          <p className="detail-description">{product.description}</p>

          {/* Action Buttons */}
          <div className="detail-actions">
            <button
              className={`btn btn-primary btn-lg ${added ? "btn-success" : ""}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
            <button
              className="btn btn-accent btn-lg"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              Buy Now
            </button>
          </div>

          {/* Extra Info */}
          <div className="detail-features">
            <div className="feature-item">
              <span>🚚</span> Free shipping on orders above $50
            </div>
            <div className="feature-item">
              <span>↩️</span> 30-day hassle-free returns
            </div>
            <div className="feature-item">
              <span>🛡️</span> 1-year manufacturer warranty
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
