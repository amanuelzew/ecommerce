"use client"
import { Cart, StoreState, User } from "@/types";
import  { createContext, useContext, useState, ReactNode, useEffect } from "react";


// Create the default values for context
const UserContext = createContext<StoreState>({
  user: null,
  createUser: () => {},
  removeUser: () => {},
});

// Provider component
export const UserProvider = ({ children }:{children:ReactNode}) => {
  const [user, setUser] = useState<User| null>(null);

  // Load user from session storage on initial render
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const createUser = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };

  const removeUser = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };
  return (
    <UserContext.Provider value={{ user, createUser, removeUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserStore = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useStore must be used within a userProvider");
  }
  return context;
};
