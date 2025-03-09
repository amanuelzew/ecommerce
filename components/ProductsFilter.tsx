"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function ProductsFilter() {
  const [priceRange, setPriceRange] = useState([0, 500])

  const categories = [
    { id: "clothing", label: "Clothing" },
    { id: "shoes", label: "Shoes" },
    { id: "accessories", label: "Accessories" },
    { id: "jewelry", label: "Jewelry" },
    { id: "electronics", label: "Electronics" },
  ]

  const brands = [
    { id: "brand1", label: "Brand 1" },
    { id: "brand2", label: "Brand 2" },
    { id: "brand3", label: "Brand 3" },
    { id: "brand4", label: "Brand 4" },
    { id: "brand5", label: "Brand 5" },
  ]

  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
  ]

  const colors = [
    { id: "black", label: "Black", color: "bg-black" },
    { id: "white", label: "White", color: "bg-white border" },
    { id: "red", label: "Red", color: "bg-red-500" },
    { id: "blue", label: "Blue", color: "bg-blue-500" },
    { id: "green", label: "Green", color: "bg-green-500" },
  ]

  return (
    <div className="bg-white rounded-lg border p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm">
          Clear All
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "price"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="text-base font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={category.id} />
                  <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-2">
              <Slider defaultValue={[0, 500]} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger className="text-base font-medium">Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox id={brand.id} />
                  <Label htmlFor={brand.id} className="text-sm font-normal cursor-pointer">
                    {brand.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sizes">
          <AccordionTrigger className="text-base font-medium">Sizes</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizes.map((size) => (
                <div
                  key={size.id}
                  className="flex items-center justify-center w-10 h-10 border rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  {size.label}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="colors">
          <AccordionTrigger className="text-base font-medium">Colors</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 mt-2">
              {colors.map((color) => (
                <div
                  key={color.id}
                  className={`w-8 h-8 rounded-full ${color.color} cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-gray-400`}
                  title={color.label}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full mt-6">Apply Filters</Button>
    </div>
  )
}

