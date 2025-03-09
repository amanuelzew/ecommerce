import { ProductGrid } from "@/components/ProductGrid"
import { Suspense } from "react"
import { ProductsFilter } from "@/components/ProductsFilter"
import { ProductsSkeleton } from "@/components/ProductsSkeleton"
import { ProductsHeader } from "@/components/ProductsHeader"

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <ProductsFilter />
        </aside>

        <div className="lg:col-span-3">
          <ProductsHeader />

          <Suspense fallback={<ProductsSkeleton />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

