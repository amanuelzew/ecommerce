"use client"
import { notFound } from "next/navigation"
import Image from "next/image"
import { AddToCartButton } from "@/components/AddToCartButton"
import { useQuery } from "urql"
import { ProductQuery } from "@/gql/productQuery"
import { useState } from "react"


export default function ProductDetail({ id }: { id: string }) {

    const [{ data, error, fetching }, replay] = useQuery({ query: ProductQuery, variables: { productId: id } })
    const [quantity,setQuantity]=useState(1)

    
    return (
        <main className="container mx-auto px-4 py-8">
            {data &&
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                        <Image
                            src={"/placeholder.svg?height=600&width=600"}
                            alt={data.product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold">{data.product.name}</h1>
                        <p className="text-xl font-semibold mt-2">${data.product.price.toFixed(2)}</p>

                        <div className="flex items-center mt-4">
                            <div className="flex">
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${i < data.product.rating ? "text-yellow-400" : "text-gray-300"}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">({data.product.reviewCount} reviews)</span>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Description</h2>
                            <p className="mt-2 text-gray-600">{data.product.description}</p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Select Size</h2>
                            <div className="flex gap-2 mt-2">
                                {["XS", "S", "M", "L", "XL"].map((size) => (
                                    <button key={size} className="border rounded-md px-3 py-1 hover:bg-gray-100">
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Select Color</h2>
                            <div className="flex gap-2 mt-2">
                                {["Black", "White", "Blue", "Red"].map((color) => (
                                    <button
                                        key={color}
                                        className="border rounded-full w-8 h-8 flex items-center justify-center"
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    >
                                        <span className="sr-only">{color}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <div className="flex border rounded-md">
                                <button className="px-3 py-2 border-r" onClick={()=>setQuantity((prev)=>Math.max(1,prev-1))}>-</button>
                                <input type="number" min="1" value={quantity} className="w-16 text-center" onChange={(e)=>setQuantity(parseInt(e.target.value))}/>
                                <button className="px-3 py-2 border-l" onClick={()=>setQuantity((prev)=>prev+1)}>+</button>
                            </div>
                            <AddToCartButton product={data.product} quantity={quantity} />
                        </div>
                    </div>
                </div>
            }

        </main>
    )
}

