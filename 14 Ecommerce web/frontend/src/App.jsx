// ============================================================
// App.jsx — Root Component
// ============================================================
// Wraps the entire app in both AuthProvider and CartProvider,
// making authentication and cart state globally accessible.
//
// DATA FLOW:
//   AuthProvider (auth state — user, token, login, logout)
//     └── CartProvider (cart state)
//           └── BrowserRouter
//                 ├── Navbar (reads auth + cart state)
//                 └── Routes
//                       ├── / → Home
//                       ├── /products → ProductListing
//                       ├── /product/:id → ProductDetails
//                       ├── /cart → Cart
//                       ├── /about → About
//                       ├── /login → Login (public)
//                       ├── /signup → Signup (public)
//                       └── /profile → Profile (protected)
// ============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import "./index.css";

function App() {
  return (
    // AuthProvider wraps everything — auth state is global
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          {/* Navbar is outside <Routes> so it renders on ALL pages */}
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
