import { Category,Cart as Carts} from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export type GQLContext = {
    user?: { id: string; email: string; isAdmin: boolean; firstName: String; lastName: String, cart: Carts } | null
}

export interface CartItem {
    product: {
        id: string;
        name: string;
        price: number;
        description: string;
        category: Category;
    };
    quantity: number;
}

export interface Cart {
    cartItems: CartItem[];
}

export interface User {
    firstName: string 
    lastName: string 
    email: string 
    isAdmin: boolean;
    cartId: string | null
}
export interface StoreState {
    user: User| null;
    createUser: (userData: User) => void;
    removeUser: () => void;
}
export interface CartState {
    cart: Cart;
    setCart:React.Dispatch<React.SetStateAction<Cart>>; 
    addToCart:(product:Product,quantity?:number) => void;
    removeFromCart: (productId:string) => void;
    clearCart: () => void;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    //quantity: number;
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
export type paginationInput={
    limit:number
    offset:number
}