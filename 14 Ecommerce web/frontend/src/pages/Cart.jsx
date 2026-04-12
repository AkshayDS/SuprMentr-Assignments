// ============================================================
// pages/Cart.jsx — Shopping Cart with Animations
// ============================================================
// Uses AnimatePresence for smooth removal of items.
// ============================================================

import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50, height: 0, marginBottom: 0, padding: 0, overflow: "hidden", transition: { duration: 0.3 } },
};

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Cart is Empty</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet. Discover our premium collection and elevate your game today.</p>
        <Link to="/products" className="px-8 py-3.5 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-all shadow-lg shadow-accent/25 hover:-translate-y-0.5">
          Start Shopping
        </Link>
      </motion.div>
    );
  }

  const shippingPrice = totalPrice >= 2000 ? 0 : 99;

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart <span className="text-slate-400 text-xl font-normal ml-2">({totalItems} items)</span></h1>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-card border border-slate-200/60 overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 gap-4 p-5 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-1"></div>
          </div>

          <div className="divide-y divide-slate-100">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div key={item.id} variants={itemVariants} initial="hidden" animate="visible" exit="exit" layout className="p-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-4 w-full">
                    <Link to={`/product/${item.id}`} className="w-20 h-20 bg-slate-50 rounded-xl p-2 shrink-0 border border-slate-100 hidden sm:block">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </Link>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{item.category}</span>
                      <Link to={`/product/${item.id}`} className="block font-bold text-slate-800 hover:text-accent transition-colors line-clamp-2 mt-0.5">{item.name}</Link>
                      <div className="text-sm font-semibold text-slate-500 mt-1">₹{item.price.toFixed(2)}</div>
                    </div>
                  </div>

                  <div className="col-span-3 w-full sm:w-auto flex justify-center mt-2 sm:mt-0">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm h-10">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      </button>
                      <span className="w-10 text-center font-semibold text-slate-800">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-full flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 w-full sm:w-auto flex justify-between sm:justify-end items-center mt-2 sm:mt-0">
                    <span className="sm:hidden text-sm font-semibold text-slate-500">Total:</span>
                    <span className="font-black text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <div className="col-span-1 w-full sm:w-auto flex justify-end">
                    <button onClick={() => removeFromCart(item.id)} className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-400 hover:text-danger hover:bg-danger-light/50 transition-colors" title="Remove item">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-card border border-slate-200/60 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-slate-900">₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                {shippingPrice === 0 ? (
                  <span className="font-bold text-accent">FREE</span>
                ) : (
                  <span className="font-semibold text-slate-900">₹{shippingPrice.toFixed(2)}</span>
                )}
              </div>
              {shippingPrice > 0 && (
                <p className="text-xs text-slate-500">Add ₹{(2000 - totalPrice).toFixed(2)} more for free shipping!</p>
              )}
            </div>

            <div className="border-t border-slate-200 pt-4 mb-8">
              <div className="flex justify-between items-center bg-slate-50 rounded-xl p-4 border border-slate-100">
                <span className="font-bold text-slate-800">Total</span>
                <span className="text-2xl font-black text-slate-900">₹{(totalPrice + shippingPrice).toFixed(2)}</span>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleCheckout}
              className="w-full py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent-dark transition-all shadow-lg shadow-accent/25 flex items-center justify-center gap-2"
            >
              {user ? "Proceed to Checkout" : "Login to Checkout"}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </motion.button>

            <Link to="/products" className="block text-center mt-6 text-sm font-medium text-slate-500 hover:text-accent transition-colors">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
