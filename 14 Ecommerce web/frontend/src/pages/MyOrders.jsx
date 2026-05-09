// ============================================================
// pages/MyOrders.jsx — Animated Order History
// ============================================================
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import BASE_URL from "../config/api";

const API_URL = `${BASE_URL}/api/orders/myorders`;

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const MyOrders = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveringId, setDeliveringId] = useState(null);

  const handleDeliver = async (orderId) => {
    setDeliveringId(orderId);
    try {
      const res = await fetch(`${BASE_URL}/api/orders/${orderId}/deliver`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders((prev) => prev.map((o) => (o._id === orderId ? updatedOrder : o)));
      } else {
        console.error("Failed to mark as delivered");
      }
    } catch (err) {
      console.error("Error marking delivered:", err);
    } finally {
      setDeliveringId(null);
    }
  };

  useEffect(() => {
    if (!user && !token) navigate("/login");
  }, [user, token, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchOrders();
  }, [token]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-accent" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>
    );
  }

  return (
    <motion.div variants={pageVariants} initial="hidden" animate="visible" exit="exit" className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Order History</h1>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center shadow-sm">
          <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          <h2 className="text-xl font-bold text-slate-800 mb-2">No Orders Yet</h2>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">You haven't placed any orders. Discover our premium collection!</p>
          <Link to="/products" className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors">Browse Products</Link>
        </div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          {orders.map((order) => (
            <motion.div key={order._id} variants={itemVariants} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-card transition-shadow">
              {/* Order Header */}
              <div className="bg-slate-50 border-b border-slate-200 p-5 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Order Placed: {formatDate(order.createdAt)}</p>
                  <p className="font-semibold text-slate-900">ID: #{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${order.isPaid ? 'bg-accent/10 border-accent/20 text-accent-dark' : 'bg-warning/10 border-warning/20 text-warning-dark'}`}>
                    {order.isPaid ? "Paid" : "COD / Unpaid"}
                  </span>
                  <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${order.isDelivered ? 'bg-accent/10 border-accent/20 text-accent-dark' : 'bg-warning/10 border-warning/20 text-warning-dark'}`}>
                    {order.isDelivered ? `Delivered on ${formatDate(order.deliveredAt)}` : "Processing"}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.orderItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="w-16 h-16 bg-white border border-slate-100 rounded-lg p-1 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm truncate">{item.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">Qty: {item.qty} × ₹{item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="bg-slate-50 border-t border-slate-200 p-5 flex flex-wrap justify-between items-center gap-4">
                <div className="text-sm font-medium text-slate-600 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs">📍</span>
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </div>
                <div className="text-right flex items-center justify-end gap-4">
                  {user?.isAdmin && !order.isDelivered && (
                    <button
                      onClick={() => handleDeliver(order._id)}
                      disabled={deliveringId === order._id}
                      className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors flex items-center gap-2"
                    >
                      {deliveringId === order._id ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                          Processing...
                        </>
                      ) : (
                        "Mark as Delivered"
                      )}
                    </button>
                  )}
                  <div>
                    <span className="text-sm text-slate-500 mr-2">Total Amount:</span>
                    <span className="text-lg font-black text-slate-900">₹{order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyOrders;
