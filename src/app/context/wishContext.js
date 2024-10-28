"use client";
import { createContext, useState, useEffect } from "react";

export const WishContext = createContext(null);

export const WishProvider = ({ children }) => {
  const [wishItem, setWishItem] = useState([]);
  const [wishPopupShow, setWishPopupShow] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track if we're on the client
  const [lastWishItem, setLastWishItem] = useState([]);
  
  // Effect to initialize wishItem from localStorage
  useEffect(() => {
    setIsClient(true);
    const savedWishItems = localStorage.getItem('wishItem');
    if (savedWishItems) {
      try {
        setWishItem(JSON.parse(savedWishItems));
      } catch (error) {
        console.error("Error parsing wish items from localStorage", error);
      }
    }
  }, []);

  // Effect to update localStorage whenever wishItem changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('wishItem', JSON.stringify(wishItem));
    }
  }, [wishItem, isClient]);

  return (
    <WishContext.Provider value={{ wishItem, setWishItem, wishPopupShow, setWishPopupShow, lastWishItem, setLastWishItem}}>
      {children}
    </WishContext.Provider>
  );
};
