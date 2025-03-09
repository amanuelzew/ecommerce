import { ProductCard } from "@/components/ProductCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear.",
    price: 29.99,
    quantity:1,
    category: "CLOTHING",
  }
]


export async function FeaturedProducts() {
  const products = mockProducts.slice(0)

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <Link href="/products">
          <Button variant="outline">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

