import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { AddToCartButton } from "@/components/AddToCartButton"
import { Badge } from "@/components/ui/badge"
import { Heart } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <Link href={`/products/${product.id}`}>
          <div className="relative h-full w-full">
            <Image
              src={product.image || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        <div className="absolute top-2 right-2">
          <button className="rounded-full bg-white p-2 shadow-sm hover:bg-gray-100">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        {product.isNew && (
          <div className="absolute top-2 left-2">
            <Badge>New</Badge>
          </div>
        )}

        {product.discount > 0 && (
          <div className="absolute bottom-2 left-2">
            <Badge variant="destructive">-{product.discount}%</Badge>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        </div>
        <div className="text-sm font-medium text-gray-900">
          {product.discount > 0 ? (
            <div className="flex flex-col items-end">
              <span className="text-red-600">${((product.price * (100 - product.discount)) / 100).toFixed(2)}</span>
              <span className="text-gray-500 line-through text-xs">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span>${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>

      <div className="mt-2">
        <AddToCartButton product={product} compact />
      </div>
    </div>
  )
}

