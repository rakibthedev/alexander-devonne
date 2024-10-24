"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    // Initialize state from localStorage if available
    const savedCartItems = localStorage.getItem('cartItem');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [popupShow, setPopupShow] = useState(false);

  // Effect to update localStorage whenever cartItem changes
  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
  }, [cartItem]);

  return (
    <CartContext.Provider value={{ cartItem, setCartItem, popupShow, setPopupShow }}>
      {children}
    </CartContext.Provider>
  );
};
