// ============================================================
// components/Navbar.jsx — Deep Slate Navbar with Mobile Menu
// ============================================================
// 30% color: Deep Slate (#0F172A) background
// 10% accent: Electric Emerald for active states & badge
// Includes responsive hamburger menu with Framer Motion
// ============================================================

import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg flex items-center gap-1.5 ${
      isActive
        ? "text-accent bg-accent/10"
        : "text-slate-300 hover:text-white hover:bg-white/5"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 shadow-nav pb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group" onClick={closeMobile}>
          <svg className="w-7 h-7 text-accent transition-transform duration-300 group-hover:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className="text-xl font-bold text-white tracking-tight">
            Aero<span className="text-accent">Sports</span>
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Products</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>

          {/* Cart */}
          <NavLink to="/cart" className={linkClass}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Auth Links */}
          {user ? (
            <>
              <NavLink to="/profile" className={linkClass}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Profile
              </NavLink>
              <NavLink to="/my-orders" className={linkClass}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Orders
              </NavLink>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 text-sm font-medium text-slate-300 border border-slate-600 rounded-lg hover:bg-white/10 hover:text-white transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            {mobileOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
            ) : (
              <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-800 border-t border-slate-700 overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              <NavLink to="/" end className={linkClass} onClick={closeMobile}>Home</NavLink>
              <NavLink to="/products" className={linkClass} onClick={closeMobile}>Products</NavLink>
              <NavLink to="/about" className={linkClass} onClick={closeMobile}>About</NavLink>
              <NavLink to="/cart" className={linkClass} onClick={closeMobile}>
                Cart {totalItems > 0 && <span className="ml-1 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{totalItems}</span>}
              </NavLink>
              {user ? (
                <>
                  <NavLink to="/profile" className={linkClass} onClick={closeMobile}>Profile</NavLink>
                  <NavLink to="/my-orders" className={linkClass} onClick={closeMobile}>Orders</NavLink>
                  <button onClick={handleLogout} className="text-left px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">Logout</button>
                </>
              ) : (
                <NavLink to="/login" className={linkClass} onClick={closeMobile}>Login</NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
