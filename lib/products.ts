import { Product } from "@/types"


// Mock data for products
/* const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    description: "A comfortable and versatile white t-shirt made from 100% organic cotton. Perfect for everyday wear.",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Clothing",
    rating: 4.5,
    reviewCount: 120,
    isNew: true,
    discount: 0,
  },
  {
    id: "2",
    name: "Slim Fit Jeans",
    description: "Modern slim fit jeans with a comfortable stretch. Made from high-quality denim that lasts.",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Clothing",
    rating: 4.3,
    reviewCount: 85,
    isNew: false,
    discount: 15,
  },
  {
    id: "3",
    name: "Leather Sneakers",
    description:
      "Premium leather sneakers with a cushioned insole for all-day comfort. Versatile design for any outfit.",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Shoes",
    rating: 4.7,
    reviewCount: 64,
    isNew: true,
    discount: 0,
  },
  {
    id: "4",
    name: "Minimalist Watch",
    description:
      "Elegant minimalist watch with a stainless steel case and genuine leather strap. Water-resistant up to 30 meters.",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
    rating: 4.8,
    reviewCount: 42,
    isNew: false,
    discount: 10,
  },
  {
    id: "5",
    name: "Wool Blend Coat",
    description:
      "A stylish and warm wool blend coat perfect for colder weather. Features a classic design that never goes out of style.",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Clothing",
    rating: 4.6,
    reviewCount: 37,
    isNew: false,
    discount: 0,
  },
  {
    id: "6",
    name: "Crossbody Bag",
    description: "Practical and stylish crossbody bag with multiple compartments. Made from durable vegan leather.",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
    rating: 4.4,
    reviewCount: 56,
    isNew: true,
    discount: 0,
  },
  {
    id: "7",
    name: "Wireless Earbuds",
    description:
      "High-quality wireless earbuds with noise cancellation and long battery life. Perfect for workouts and daily use.",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Electronics",
    rating: 4.2,
    reviewCount: 98,
    isNew: false,
    discount: 20,
  },
  {
    id: "8",
    name: "Silk Scarf",
    description:
      "Luxurious silk scarf with a beautiful print. Adds elegance to any outfit and can be styled in multiple ways.",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=400",
    category: "Accessories",
    rating: 4.9,
    reviewCount: 28,
    isNew: false,
    discount: 0,
  },
] */
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

export async function searchProducts(query: string): Promise<Product[]> {
 

  if (!query) return []

  const lowerQuery = query.toLowerCase()

  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery),
  )
}

