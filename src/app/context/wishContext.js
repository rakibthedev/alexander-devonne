"use client";
import { createContext, useState, useEffect } from "react";

export const WishContext = createContext(null);

export const WishProvider = ({ children }) => {
  const [wishItem, setWishItem] = useState(() => {
    // Initialize state from localStorage if available
    const savedWishItems = localStorage.getItem('wishItem');
    return savedWishItems ? JSON.parse(savedWishItems) : [];
  });
  const [wishPopupShow, setWishPopupShow] = useState(false);

  //Effect to update localStorage whenever wishItem changes
  useEffect(() => {
    localStorage.setItem('wishItem', JSON.stringify(wishItem));
  }, [wishItem]);

  return (
    <WishContext.Provider value={{ wishItem, setWishItem, wishPopupShow, setWishPopupShow }}>
      {children}
    </WishContext.Provider>
  );
};
