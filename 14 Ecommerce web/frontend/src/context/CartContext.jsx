// ============================================================
// context/CartContext.jsx
// ============================================================
// This file creates a React Context for global cart state.
//
// HOW IT WORKS:
// 1. We create a CartContext using React.createContext().
// 2. The CartProvider component wraps the entire app (in App.jsx),
//    making the cart state available to ANY component that calls
//    useCart() — no matter how deeply nested.
// 3. When a user clicks "Add to Cart" on the ProductDetails page,
//    the addToCart function updates the global cart array.
// 4. The Cart page reads the same global cart array via useCart()
//    to display item list, quantities, and total.
//
// This avoids "prop drilling" — the Product page and the Cart
// page don't share a parent-child relationship, yet they both
// read/write the same cart state seamlessly through Context.
// ============================================================

import { createContext, useContext, useState, useMemo } from "react";

// Step 1: Create the Context object
const CartContext = createContext();

// Step 2: Custom hook for easy access in any component
// Usage: const { cart, addToCart, removeFromCart } = useCart();
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// Step 3: Provider component that holds the cart state & logic
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ---- ADD TO CART ----
  // If the product already exists in the cart, increase its quantity.
  // Otherwise, add a new entry with quantity = 1.
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Product already in cart → increment quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // New product → add with quantity 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // ---- REMOVE FROM CART ----
  // Completely removes the item from the cart array
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // ---- UPDATE QUANTITY ----
  // Sets the quantity of a specific item. If quantity hits 0, remove it.
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // ---- CLEAR CART ----
  // Empties the entire cart (used after successful checkout)
  const clearCart = () => {
    setCart([]);
  };

  // ---- CALCULATED VALUES ----
  // useMemo ensures these are only recalculated when `cart` changes.
  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  // Step 4: Provide all cart data & functions to child components
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
