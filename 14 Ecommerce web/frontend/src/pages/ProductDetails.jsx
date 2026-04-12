// ============================================================
// pages/ProductDetails.jsx — Animated Product Info & Toast
// ============================================================
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-slate-500 mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors">
          Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 right-4 sm:right-8 z-50 bg-slate-900 border border-slate-700 shadow-xl rounded-xl p-4 flex items-center gap-3 w-80"
          >
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Added to Cart</p>
              <p className="text-slate-400 text-xs truncate">{product.name}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link to="/products" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-accent transition-colors">
          <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Products
        </Link>
      </nav>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-200/60">
        {/* Product Image */}
        <div className="w-full md:w-1/2 min-h-[400px] bg-slate-50 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain drop-shadow-xl"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <span className="text-sm font-bold text-accent uppercase tracking-widest mb-2">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-slate-900 mb-6">₹{product.price.toFixed(2)}</p>

          <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold mb-6 border w-max ${product.inStock ? "bg-accent-50 text-accent-dark border-accent-100" : "bg-danger-light/50 text-danger border-danger-light"}`}>
            <span className={`w-2 h-2 rounded-full mr-2 ${product.inStock ? "bg-accent" : "bg-danger"}`}></span>
            {product.inStock ? "In Stock & Ready to Ship" : "Currently Out of Stock"}
          </div>

          <p className="text-slate-600 leading-relaxed mb-8">{product.description}</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 mt-auto">
            <motion.button
              whileTap={product.inStock ? { scale: 0.97 } : {}}
              className="flex-1 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              Add to Cart
            </motion.button>
            <motion.button
              whileTap={product.inStock ? { scale: 0.97 } : {}}
              className="flex-1 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-lg shadow-accent/25 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              Buy Now
            </motion.button>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex items-center text-sm font-medium text-slate-600">
              <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3 text-lg">🚚</span>
              Free shipping on orders above ₹2000
            </div>
            <div className="flex items-center text-sm font-medium text-slate-600">
              <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3 text-lg">↩️</span>
              30-day hassle-free returns
            </div>
            <div className="flex items-center text-sm font-medium text-slate-600">
              <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-3 text-lg">🛡️</span>
              1-year manufacturer warranty
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
