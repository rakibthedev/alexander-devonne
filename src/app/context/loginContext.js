"use client";
import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [loggedUserData, setLoggedUserData] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Effect to initialize loggedUserData from sessionStorage
  useEffect(() => {
    setIsClient(true);
    const savedLoginData = sessionStorage.getItem('loginData');
    
    if (savedLoginData) {
      try {
        setLoggedUserData(JSON.parse(savedLoginData));
      } catch (error) {
        console.error("Error parsing login data from sessionStorage", error);
      }
    }
  }, []);

  // Effect to update sessionStorage whenever loggedUserData changes
  useEffect(() => {
    if (isClient) {
      sessionStorage.setItem('loginData', JSON.stringify(loggedUserData));
    }
  }, [loggedUserData, isClient]);

  return (
    <LoginContext.Provider value={{ loggedUserData, setLoggedUserData }}>
      {children}
    </LoginContext.Provider>
  );
};
