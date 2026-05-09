// ============================================================
// pages/OrderSuccess.jsx — Post-Order Confirmation
// ============================================================
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import BASE_URL from "../config/api";

const API_URL = `${BASE_URL}/api/orders`;

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.2 } },
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.4 } },
};

const OrderSuccess = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token && id) fetchOrder();
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-accent mb-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <p className="text-slate-500 font-medium">Loading your order details...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="max-w-3xl mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/60 flex flex-col items-center text-center p-8 md:p-12 relative">
        {/* Background confetti effect can be added here if desired */}
        
        <motion.div variants={iconVariants} className="w-24 h-24 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
        
        <motion.h1 variants={contentVariants} className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Order Confirmed! 🎉</motion.h1>
        <motion.p variants={contentVariants} className="text-slate-600 mb-8 max-w-md">
          Thank you for your purchase, <strong className="text-slate-900">{user?.name || "Customer"}</strong>. Your order is processing and will be shipped soon.
        </motion.p>

        {order && (
          <motion.div variants={contentVariants} className="w-full text-left bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 mb-8">
            <div className="flex flex-wrap justify-between items-center pb-6 border-b border-slate-200 mb-6 gap-4">
               <div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Order #</p>
                 <p className="text-lg font-bold text-slate-900">{order._id.slice(-8).toUpperCase()}</p>
               </div>
               <div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total</p>
                 <p className="text-lg font-black text-accent">₹{order.totalPrice.toFixed(2)}</p>
               </div>
               <div>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Method</p>
                 <p className="text-sm font-semibold text-slate-800 bg-white px-3 py-1 rounded-lg border border-slate-200">{order.paymentMethod}</p>
               </div>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mb-4">Items Summary ({order.orderItems.length})</h3>
            <div className="space-y-4">
              {order.orderItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg p-1 border border-slate-200 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">Qty: {item.qty} &nbsp;·&nbsp; ₹{item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div variants={contentVariants} className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link to="/my-orders" className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all text-center">
            Track Order
          </Link>
          <Link to="/products" className="px-8 py-3.5 bg-white text-slate-700 font-bold rounded-xl hover:text-slate-900 border border-slate-200 hover:border-slate-300 transition-all text-center">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderSuccess;
