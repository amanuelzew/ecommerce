"use client"
import { ProductGrid } from "@/components/ProductGrid"
import { Suspense, useState } from "react"
import { ProductsFilter } from "@/components/ProductsFilter"
import { ProductsSkeleton } from "@/components/ProductsSkeleton"
import { ProductsHeader } from "@/components/ProductsHeader"

export default function Products({page}:{page:number}) {
  
  const [activeFilters, setActiveFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 500] as number[],
    brands: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
  })

  const [sortOption, setSortOption] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleFilterChange = (filters: {
    categories: string[]
    priceRange: number[]
    brands: string[]
    sizes: string[]
    colors: string[]
  }) => {
    setActiveFilters(filters)
  }

  const handleSortChange = (option: string) => {
    setSortOption(option)
  }

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductsFilter onFilterChange={handleFilterChange} />
        </aside>

        <div className="lg:col-span-3">
          <ProductsHeader onSortChange={handleSortChange} onViewModeChange={handleViewModeChange} />

          <Suspense fallback={<ProductsSkeleton />}>
            <ProductGrid filters={activeFilters} sortOption={sortOption} 
            viewMode={viewMode} page={page} />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

