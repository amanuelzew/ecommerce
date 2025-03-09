"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { Product } from "@/types"
import { useUserStore } from "@/context/userContext"
import { useCartStore } from "@/context/cartContext"


interface AddToCartButtonProps {
  product: Product
  compact?: boolean
}

export function AddToCartButton({ product, compact = false }: AddToCartButtonProps) {

  
  const {cart,addToCart}=useCartStore()
  const isProductInCart = cart?.cartItems.some((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    addToCart(product)
  }

  if (compact) {
    return (
      <Button onClick={handleAddToCart} className="w-full" size="sm" disabled={isProductInCart}>
          {isProductInCart ? (
        <>
          <Check className="mr-2 h-4 w-4" /> Already in Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </>
      )}
      </Button>
    )
  }

  return (
    <Button onClick={handleAddToCart} className="flex-1" disabled={isProductInCart}>
      {isProductInCart ? (
        <>
          <Check className="mr-2 h-4 w-4" /> Already in Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </>
      )}
    </Button>
  )
}

