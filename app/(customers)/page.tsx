import { ProductGrid } from "@/components/ProductGrid"
import { FeaturedProducts } from "@/components/FeaturedProducts"
import { Categories } from "@/components/Categories"



export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-8">
       
        <Categories />
       {/*  <FeaturedProducts /> */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">All Products</h2>
          </div>
          <ProductGrid />
        </section>
      </div>
    </main>
  )
}

