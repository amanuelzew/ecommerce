"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, ArrowRight, Clock, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types"
import { searchProducts } from "@/lib/products"



interface GlobalSearchProps {
  children?: React.ReactNode
}

export function GlobalSearch({ children }: GlobalSearchProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse recent searches", e)
      }
    }
  }, [])

  // Save recent searches to localStorage
  const saveSearch = (search: string) => {
    if (!search.trim()) return

    const newSearches = [search, ...recentSearches.filter((s) => s !== search)].slice(0, 5)

    setRecentSearches(newSearches)
    localStorage.setItem("recentSearches", JSON.stringify(newSearches))
  }

  // Focus input when dialog opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  // Handle search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 2) {
        setLoading(true)
        const searchResults = await searchProducts(query)
        setResults(searchResults)
        setLoading(false)
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    saveSearch(searchQuery)
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Close on escape
    if (e.key === "Escape") {
      setOpen(false)
    }

    // Global keyboard shortcut
    if (e.key === "/" && e.ctrlKey) {
      e.preventDefault()
      setOpen(true)
    }
  }

  // Add global keyboard listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && e.ctrlKey) {
        e.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  }, [])

  const trendingSearches = ["Summer Collection", "Dresses", "Sneakers", "Accessories", "Sale"]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 max-h-[80vh] overflow-hidden" onKeyDown={handleKeyDown}>
        <div className="flex items-center p-4 border-b">
          <Search className="h-5 w-5 text-muted-foreground mr-2" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, categories, brands..."
            className="border-0 focus-visible:ring-0 text-lg p-0 h-auto"
          />
          {query && (
            <Button variant="ghost" size="icon" onClick={clearSearch}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-65px)]">
          {loading && (
            <div className="p-4 text-center">
              <div className="animate-pulse">Searching...</div>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Products</h3>
              <div className="space-y-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    onClick={() => {
                      saveSearch(query)
                      setOpen(false)
                    }}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="relative h-16 w-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                         src={"/next.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>

              <div className="mt-4 text-center">
                <Link
                  href={`/products?q=${encodeURIComponent(query)}`}
                  onClick={() => {
                    saveSearch(query)
                    setOpen(false)
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  View all results for "{query}"
                </Link>
              </div>
            </div>
          )}

          {!loading && query.length > 2 && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No results found for "{query}"</p>
              <p className="text-sm">Try a different search term or browse our categories</p>
            </div>
          )}

          {(!query || query.length <= 2) && (
            <div className="p-4">
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setRecentSearches([])
                        localStorage.removeItem("recentSearches")
                      }}
                      className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="rounded-full h-8"
                        onClick={() => handleSearch(search)}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {search}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Trending</h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="rounded-full h-8"
                      onClick={() => handleSearch(search)}
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {search}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Popular Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {["Clothing", "Shoes", "Accessories", "Electronics", "Home", "Beauty"].map((category) => (
                    <Link
                      key={category}
                      href={`/category/${category.toLowerCase()}`}
                      onClick={() => setOpen(false)}
                      className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-full mb-2"></div>
                      <span className="text-sm">{category}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-2 text-xs text-center text-muted-foreground border-t">
          Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border">ESC</kbd> to close or{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border">Ctrl</kbd> +{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded border">/</kbd> to open search
        </div>
      </DialogContent>
    </Dialog>
  )
}

