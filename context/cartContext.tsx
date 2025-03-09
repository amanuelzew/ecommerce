"use client"
import { Cart,CartState, Product } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";


// Create the default values for context
const CartContext = createContext<CartState>({
    cart: {  cartItems: [] },
    addToCart: (product: Product, quantity?: number) => { },
    removeFromCart: (productId: string) => { },
    clearCart: () => { }
});

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart>({cartItems: [] });

    const addToCart = (product: Product, quantity: number=1) => {
        setCart((prev) => {
            // Check if the product is already in the cart
            const existingItemIndex = prev.cartItems.findIndex((item) => item.product.id === product.id);
           
            if (existingItemIndex > -1) {
                // If product exists, update the quantity
                const updatedCartItems = [...prev.cartItems];
                updatedCartItems[existingItemIndex].quantity = quantity;

                return {
                    ...prev,
                    cartItems: updatedCartItems,
                };
            } else {
                
                // If product doesn't exist, add it to the cart
                return {
                    ...prev,
                    cartItems: [
                        ...prev.cartItems,
                        {
                            product: product,
                            quantity: quantity,
                        },
                    ],
                };
            }
        })
    };
    const removeFromCart = (productId: string) => {
        setCart((prev)=>{ 
            const updatedCart=prev.cartItems.filter((item)=>item.product.id!==productId)
            return {...prev,cartItems:updatedCart}
        })
    };
    const clearCart = () => {
        setCart({  cartItems: [] })
    };
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartStore = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("cartStore must be used within a cartProvider");
    }
    return context;
};
