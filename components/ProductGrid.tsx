"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"
import { useQuery } from "urql"
import { ProductsQuery } from "@/gql/productsQuery"


export function ProductGrid() {
  
  const [{data,error,fetching},replay]=useQuery({query:ProductsQuery})

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data &&
        data.products.map((product:Product) => (
          <ProductCard key={product.id} product={product} />
        ))
        }

        {fetching &&
          Array(4)
            .fill(0)
            .map((_, i) => <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-80"></div>)}
      </div>

      
    </div>
  )
}

