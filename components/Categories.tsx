import Link from "next/link"
import Image from "next/image"

const categories = [
  { name: "Clothing", image: "/placeholder.svg?height=300&width=300", href: "/category/clothing" },
  { name: "Shoes", image: "/placeholder.svg?height=300&width=300", href: "/category/shoes" },
  { name: "Accessories", image: "/placeholder.svg?height=300&width=300", href: "/category/accessories" },
  { name: "Jewelry", image: "/placeholder.svg?height=300&width=300", href: "/category/jewelry" },
]

export function Categories() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.href} className="group">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                 src={"/vercel.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

