// ============================================================
// pages/Home.jsx
// ============================================================
// The landing page with a hero section and featured products.
// Uses the products data array to filter for featured items.
// ============================================================

import { Link } from "react-router-dom";
import products from "../data/products";

const Home = () => {
  // Filter products that are marked as "featured"
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="home-page">
      {/* ---- HERO SECTION ---- */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">New Season Collection</span>
          <h1 className="hero-title">
            Elevate Your <span className="gradient-text">Game</span>
          </h1>
          <p className="hero-subtitle">
            Premium badminton gear for champions. From tournament-grade rackets
            to pro-level apparel — gear up and dominate the court.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Shop Now →
            </Link>
            <Link to="/about" className="btn btn-outline">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-glow"></div>
        </div>
      </section>

      {/* ---- STATS BAR ---- */}
      <section className="stats-bar">
        <div className="stat">
          <span className="stat-number">500+</span>
          <span className="stat-label">Products</span>
        </div>
        <div className="stat">
          <span className="stat-number">10K+</span>
          <span className="stat-label">Happy Players</span>
        </div>
        <div className="stat">
          <span className="stat-number">50+</span>
          <span className="stat-label">Brands</span>
        </div>
        <div className="stat">
          <span className="stat-number">4.9★</span>
          <span className="stat-label">Avg. Rating</span>
        </div>
      </section>

      {/* ---- FEATURED PRODUCTS ---- */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Gear</h2>
          <Link to="/products" className="see-all-link">
            View All Products →
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
            >
              <div className="img-container">
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.featured && <span className="badge hot-badge">Featured</span>}
              </div>
              <div className="card-content">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="card-footer">
                  <span className="product-price">₹{product.price.toFixed(2)}</span>
                  <span className="view-link">View Details →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
