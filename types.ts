import { Category  } from "@prisma/client";

export type GQLContext = {
    user?: { id: string; email: string; isAdmin: boolean; firstName: String; lastName: String, cart: Cart } | null
}


interface CartItem {
    product: {
        id: string;
        name: string;
        price: number;
        description: string;
        category: string;
    };
    quantity: number;
}

interface Cart {
    id: string; // Assuming ID is a string, adjust if needed
    cartItems: CartItem[];
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    token: string;
    cart: Cart | null; // Cart can be null
}
// Define the Zustand store types
export interface StoreState {
    user: User | null;
    createUser: (userData: User) => void;
    removeUser: () => void;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: Category
}
export type signinUserInput = {
    email: string
    password: string
}
export type signupUserInput = {
    email: string
    password: string
    firstName: string
    lastName: string
}
export type createProductInput = {
    name: string
    description: string
    price: number
    quantity: number
    category?: Category
}
export type editProductInput = {
    name?: string
    description?: string
    price?: number
    quantity?: number
    category?: Category
}

export type addToCartInput = {
    productID: string
    quantity: number
}