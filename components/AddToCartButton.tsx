"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  compact?: boolean
}

export function AddToCartButton({ product, compact = false }: AddToCartButtonProps) {
//  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
   // addToCart({...product,quantity: 1,})
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (compact) {
    return (
      <Button onClick={handleAddToCart} className="w-full" size="sm" variant={added ? "success" : "default"}>
        {added ? (
          <>
            <Check className="mr-2 h-4 w-4" /> Added
          </>
        ) : (
          "Add to Cart"
        )}
      </Button>
    )
  }

  return (
    <Button onClick={handleAddToCart} className="flex-1" variant={added ? "success" : "default"}>
      {added ? (
        <>
          <Check className="mr-2 h-4 w-4" /> Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </>
      )}
    </Button>
  )
}

