"use client"


import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { Product } from "@/types"
import { useUserStore } from "@/context/userContext"
import { useCartStore } from "@/context/cartContext"
import { useMutation } from "urql"
import { CartMutation } from "@/gql/cartMutation"


interface AddToCartButtonProps {
  product: Product
  quantity?:number
  compact?: boolean
}

export function AddToCartButton({ product,quantity=1, compact = false }: AddToCartButtonProps) {
  const {user}=useUserStore()
  const [_,addProductToCart]=useMutation(CartMutation)
  const {cart,addToCart}=useCartStore()
  const isProductInCart = cart?.cartItems.some((item) => item.product.id === product.id);

  const handleAddToCart =async () => {
    if(user)
    await addProductToCart({input:{ "productID": product.id,"quantity": quantity}})
    addToCart(product,quantity)
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

