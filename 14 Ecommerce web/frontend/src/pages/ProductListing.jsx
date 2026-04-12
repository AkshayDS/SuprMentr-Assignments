// ============================================================
// pages/ProductListing.jsx — Staggered Grid + Filters
// ============================================================
// Framer Motion: staggered product card entrance, animated
//   filter panel, hover lift on cards.
// ============================================================

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import products from "../data/products";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== "All") result = result.filter((p) => p.category === selectedCategory);
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
    }
    result = result.filter((p) => p.price <= maxPrice);
    switch (sortBy) {
      case "price-low": result = [...result].sort((a, b) => a.price - b.price); break;
      case "price-high": result = [...result].sort((a, b) => b.price - a.price); break;
      case "name-az": result = [...result].sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return result;
  }, [selectedCategory, searchTerm, maxPrice, sortBy]);

  const resetFilters = () => { setSelectedCategory("All"); setSearchTerm(""); setMaxPrice(20000); setSortBy("default"); };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">All Products</h1>
        <p className="text-slate-500 mt-2">Browse our complete collection of premium sports gear</p>
      </div>

      {/* Search + Filter Toggle */}
      <div className="flex gap-3 mb-6 max-w-2xl mx-auto">
        <div className="flex-1 relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search rackets, shoes, accessories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-lg">✕</button>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-xl border text-sm font-medium flex items-center gap-2 transition-colors ${showFilters ? "bg-accent text-white border-accent" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
            <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
          </svg>
          Filters
        </motion.button>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap gap-6 items-end max-w-2xl mx-auto">
              <div className="flex-1 min-w-[180px]">
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Max Price: <span className="text-accent font-bold">₹{maxPrice}</span></label>
                <input type="range" min="0" max="20000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1"><span>₹0</span><span>₹20000</span></div>
              </div>
              <div className="min-w-[140px]">
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Sort By</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-accent/30">
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="name-az">Name: A → Z</option>
                </select>
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={resetFilters} className="px-4 py-2.5 text-sm font-semibold text-danger bg-danger-light rounded-lg hover:bg-danger/10 transition-colors">
                Reset All
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
              selectedCategory === cat
                ? "bg-accent text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:border-accent/40 hover:text-accent"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-slate-500 mb-6 text-center">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
          <h3 className="text-xl font-bold text-slate-700 mb-2">No products found</h3>
          <p className="text-slate-500 mb-5">Try adjusting your search or filters.</p>
          <motion.button whileTap={{ scale: 0.95 }} onClick={resetFilters} className="px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors">
            Clear Filters
          </motion.button>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <Link to={`/product/${product.id}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 group h-full flex flex-col"
                >
                  <div className="relative aspect-square bg-slate-50 overflow-hidden">
                    <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                    {!product.inStock && (
                      <span className="absolute top-3 left-3 bg-slate-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">Out of Stock</span>
                    )}
                    {product.featured && product.inStock && (
                      <span className="absolute top-3 left-3 bg-accent text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">Featured</span>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <span className="text-[11px] font-semibold text-accent uppercase tracking-widest">{product.category}</span>
                    <h3 className="text-base font-bold text-slate-900 mt-1 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2 flex-1">{product.description}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                      <span className="text-lg font-black text-slate-900">₹{product.price.toFixed(2)}</span>
                      <span className="text-sm text-accent font-semibold group-hover:translate-x-1 transition-transform duration-200">View →</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProductListing;
