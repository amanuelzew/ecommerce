"use client"
import { Cart, StoreState, User } from "@/types";
import  { createContext, useContext, useState, ReactNode } from "react";


// Create the default values for context
const UserContext = createContext<StoreState>({
  user: null,
  createUser: () => {},
  removeUser: () => {},
});

// Provider component
export const UserProvider = ({ children }:{children:ReactNode}) => {
  const [user, setUser] = useState<User| null>(null);

  const createUser = (userData: User) => {
    setUser(userData);
  };

  const removeUser = () => {
    setUser(null);
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
