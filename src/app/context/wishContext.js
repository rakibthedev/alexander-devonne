"use client";
import { createContext, useState, useEffect } from "react";

export const WishContext = createContext(null);

export const WishProvider = ({ children }) => {
  const [wishItem, setWishItem] = useState([]);
  const [wishPopupShow, setWishPopupShow] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track if we're on the client
  const [lastWishItem, setLastWishItem] = useState([]);
  
  // Effect to initialize wishItem from sessionStorage
  useEffect(() => {
    setIsClient(true);
    const savedWishItems = sessionStorage.getItem('wishItem');
    if (savedWishItems) {
      try {
        setWishItem(JSON.parse(savedWishItems));
      } catch (error) {
        console.error("Error parsing wish items from sessionStorage", error);
      }
    }
  }, []);

  // Effect to update sessionStorage whenever wishItem changes
  useEffect(() => {
    if (isClient) {
      sessionStorage.setItem('wishItem', JSON.stringify(wishItem));
    }
  }, [wishItem, isClient]);

  return (
    <WishContext.Provider value={{ wishItem, setWishItem, wishPopupShow, setWishPopupShow, lastWishItem, setLastWishItem}}>
      {children}
    </WishContext.Provider>
  );
};
