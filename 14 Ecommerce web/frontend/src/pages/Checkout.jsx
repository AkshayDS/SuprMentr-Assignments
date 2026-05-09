// ============================================================
// pages/Checkout.jsx — Animated 3-Step Checkout Checkout
// ============================================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import BASE_URL from "../config/api";

const API_URL = `${BASE_URL}/api/orders`;

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const stepVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

const Checkout = () => {
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");

  const [paymentMethod] = useState("Cash on Delivery");

  const shippingPrice = totalPrice >= 2000 ? 0 : 99;
  const orderTotal = totalPrice + shippingPrice;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Cart is Empty</h2>
        <p className="text-slate-500 mb-6">Add items before checking out.</p>
        <button className="px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors" onClick={() => navigate("/products")}>
          Browse Products
        </button>
      </div>
    );
  }

  const goToStep = (s) => {
    if (s === 2 && (!address.trim() || !city.trim() || !postalCode.trim())) {
      setError("Please fill in all address fields.");
      return;
    }
    setError("");
    setStep(s);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");
    try {
      const orderData = {
        orderItems: cart.map(item => ({ name: item.name, qty: item.quantity, image: item.image, price: item.price, product: item.id })),
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        itemsPrice: totalPrice,
        shippingPrice,
        totalPrice: orderTotal,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      setError(err.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Stepper */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-slate-200 z-0"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-accent z-0 transition-all duration-500" style={{ width: `${(step - 1) * 50}%` }}></div>
        
        {[{num: 1, label: "Shipping"}, {num: 2, label: "Payment"}, {num: 3, label: "Review"}].map((s) => (
          <div key={s.num} className="relative z-10 flex flex-col items-center bg-offwhite px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= s.num ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'bg-slate-200 text-slate-500'}`}>
              {step > s.num ? "✓" : s.num}
            </div>
            <span className={`text-xs sm:text-sm font-semibold mt-2 absolute top-10 whitespace-nowrap ${step >= s.num ? 'text-slate-900' : 'text-slate-400'}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-danger-light text-danger p-4 rounded-xl mb-6 border border-danger-light flex items-center gap-3">
           <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
           <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-card border border-slate-200/60 p-6 md:p-8 mt-12 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                 Shipping Details
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Street Address</label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all" placeholder="House number and street name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all" placeholder="City" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">PIN Code</label>
                    <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all" placeholder="Postal code" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
                  <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none transition-all" placeholder="Country" />
                </div>
                <div className="pt-4 flex justify-end">
                  <motion.button whileTap={{scale:0.97}} onClick={() => goToStep(2)} className="px-8 py-3.5 bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/25 hover:bg-accent-dark transition-colors">
                    Continue to Payment
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                 Payment Method
              </h2>
              <div className="border-2 border-accent bg-accent-50 rounded-xl p-5 flex items-center cursor-pointer">
                <div className="w-5 h-5 rounded-full border-4 border-accent bg-white mr-4"></div>
                <div>
                  <p className="font-bold text-slate-900">Cash on Delivery (COD)</p>
                  <p className="text-sm text-slate-600">Pay with cash when your order arrives.</p>
                </div>
              </div>
              
              <div className="pt-8 flex items-center justify-between">
                <button onClick={() => setStep(1)} className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">← Back to Shipping</button>
                <motion.button whileTap={{scale:0.97}} onClick={() => goToStep(3)} className="px-8 py-3.5 bg-accent text-white font-bold rounded-xl shadow-lg shadow-accent/25 hover:bg-accent-dark transition-colors">
                  Review Order
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                 <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                 Review & Place Order
              </h2>

              <div className="space-y-6">
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-lg p-1 border border-slate-200">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800 text-sm line-clamp-1">{item.name}</p>
                          <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-bold text-slate-900 text-sm">₹{(item.quantity * item.price).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Shipping To</h3>
                    <p className="text-sm text-slate-700 font-medium">{address}<br/>{city} - {postalCode}<br/>{country}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Summary</h3>
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>Items:</span><span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600 mb-3">
                      <span>Shipping:</span><span>{shippingPrice === 0 ? "FREE" : `₹${shippingPrice.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-200">
                      <span>Total:</span><span>₹{orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                <button onClick={() => setStep(2)} className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">← Back to Payment</button>
                <motion.button 
                  whileTap={{scale:0.97}} 
                  disabled={loading}
                  onClick={handlePlaceOrder} 
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Placing Order...</>
                  ) : (
                    <>Confirm & Place Order <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Checkout;
