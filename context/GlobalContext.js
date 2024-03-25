"use client";
import { createContext, useContext, useState } from "react";

// create context
export const GlobalContext = createContext();

// create provider
export const GlobalProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setUnreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// create custom hook to access context
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
