// ============================================================
// pages/ProductListing.jsx
// ============================================================
// Displays all products in a responsive grid with:
//   - Search bar to filter by product name
//   - Category filter tabs
//   - Price range slider
//   - Sort dropdown
// Each card is a <Link> that navigates to /product/:id.
// ============================================================

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";

const ProductListing = () => {
  // Filter & search state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from data
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter + search + sort products (memoized for performance)
  const filteredProducts = useMemo(() => {
    let result = products;

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search filter (case-insensitive match on name or description)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Sort
    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name-az":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, searchTerm, maxPrice, sortBy]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
    setMaxPrice(20000);
    setSortBy("default");
  };

  return (
    <div className="listing-page">
      <div className="listing-header">
        <h1>All Products</h1>
        <p className="listing-subtitle">
          Browse our complete collection of premium sports gear
        </p>
      </div>

      {/* ---- SEARCH BAR ---- */}
      <div className="search-bar-container">
        <div className="search-bar">
          <svg className="search-bar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search for rackets, shoes, accessories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="search-clear" onClick={() => setSearchTerm("")}>✕</button>
          )}
        </div>
        <button
          className={`filter-toggle-btn ${showFilters ? "filter-active" : ""}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          Filters
        </button>
      </div>

      {/* ---- FILTER PANEL (collapsible) ---- */}
      {showFilters && (
        <div className="filter-panel">
          <div className="filter-group-inline">
            <div className="filter-item">
              <label>Max Price: <span className="price-highlight">₹{maxPrice}</span></label>
              <input
                type="range"
                min="0"
                max="20000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-slider"
              />
              <div className="slider-labels">
                <span>₹0</span>
                <span>₹20000</span>
              </div>
            </div>
            <div className="filter-item">
              <label>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="name-az">Name: A → Z</option>
              </select>
            </div>
            <div className="filter-item">
              <button className="reset-filters-btn" onClick={resetFilters}>
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---- CATEGORY TABS ---- */}
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tab-btn ${selectedCategory === cat ? "tab-active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ---- RESULTS COUNT ---- */}
      <div className="results-info">
        <span>Showing {filteredProducts.length} of {products.length} products</span>
      </div>

      {/* ---- PRODUCT GRID ---- */}
      {filteredProducts.length === 0 ? (
        <div className="empty-results">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--text-muted)'}}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters.</p>
          <button className="btn btn-primary" onClick={resetFilters}>Clear Filters</button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="product-card"
            >
              <div className="img-container">
                <img src={product.image} alt={product.name} loading="lazy" />
                {!product.inStock && (
                  <span className="badge oos-badge">Out of Stock</span>
                )}
                {product.featured && product.inStock && (
                  <span className="badge hot-badge">Featured</span>
                )}
              </div>
              <div className="card-content">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <div className="card-footer">
                  <span className="product-price">
                    ₹{product.price.toFixed(2)}
                  </span>
                  <span className="view-link">View →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListing;
