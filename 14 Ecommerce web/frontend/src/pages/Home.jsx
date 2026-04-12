// ============================================================
// pages/Home.jsx — Hero + Stats + Featured Products
// ============================================================
// Framer Motion: Page fade-in, staggered featured grid,
//   floating hero visual, counter entrance animations.
// ============================================================

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products";

// Animation variants
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Home = () => {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit">
      {/* ---- HERO ---- */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-6"
          >
            New Season Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 py-2"
          >
            Elevate Your <span className="gradient-text">Game</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-slate-400 max-w-xl mb-8 leading-relaxed"
          >
            Premium badminton gear for champions. From tournament-grade rackets
            to pro-level apparel — gear up and dominate the court.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/products" className="inline-flex items-center px-7 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg shadow-accent/25">
              Shop Now →
            </Link>
            <Link to="/about" className="inline-flex items-center px-7 py-3.5 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-400 font-semibold rounded-xl transition-colors duration-200">
              Learn More
            </Link>
          </motion.div>
        </div>
        {/* Decorative gradient blob */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* ---- STATS BAR ---- */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-5xl mx-auto px-4 py-8 relative z-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-6 md:p-8">
          {[
            { num: "500+", label: "Products" },
            { num: "10K+", label: "Happy Players" },
            { num: "50+", label: "Brands" },
            { num: "4.9★", label: "Avg. Rating" },
          ].map((s, i) => (
            <motion.div key={i} variants={itemVariants} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-slate-900">{s.num}</div>
              <div className="text-sm text-slate-600 font-semibold mt-1 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ---- FEATURED PRODUCTS ---- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Featured Gear</h2>
          <Link to="/products" className="text-accent font-semibold text-sm hover:text-accent-dark transition-colors">
            View All Products →
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Link to={`/product/${product.id}`}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
                >
                  <div className="relative aspect-square bg-slate-50 overflow-hidden">
                    <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                    {product.featured && (
                      <span className="absolute top-3 left-3 bg-accent text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-semibold text-accent uppercase tracking-widest">{product.category}</span>
                    <h3 className="text-base font-bold text-slate-900 mt-1 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-black text-slate-900">₹{product.price.toFixed(2)}</span>
                      <span className="text-sm text-accent font-semibold group-hover:translate-x-1 transition-transform duration-200">View →</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
