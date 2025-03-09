"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid2X2, List, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ProductsFilter } from "@/components/ProductsFilter"

export function ProductsHeader() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <div className="flex items-center">
        <p className="text-gray-500 mr-2">Showing 24 of 256 products</p>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="lg:hidden">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <ProductsFilter />
          </SheetContent>
        </Sheet>

        <Select defaultValue="featured">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-r-none ${viewMode === "grid" ? "bg-gray-100" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-l-none ${viewMode === "list" ? "bg-gray-100" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

