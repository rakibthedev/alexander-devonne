"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]);
  const [popupShow, setPopupShow] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Effect to initialize cartItem from sessionStorage
  useEffect(() => {
    setIsClient(true);
    const savedCartItems = sessionStorage.getItem('cartItem');
    
    if (savedCartItems) {
      try {
        setCartItem(JSON.parse(savedCartItems));
      } catch (error) {
        console.error("Error parsing cart items from sessionStorage", error);
      }
    }
  }, []);

  // Effect to update sessionStorage whenever cartItem changes
  useEffect(() => {
    if (isClient) {
      sessionStorage.setItem('cartItem', JSON.stringify(cartItem));
    }
  }, [cartItem, isClient]);

  return (
    <CartContext.Provider value={{ cartItem, setCartItem, popupShow, setPopupShow }}>
      {children}
    </CartContext.Provider>
  );
};
