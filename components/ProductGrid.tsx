"use client"

import { ProductCard } from "@/components/ProductCard"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import { ProductsQuery } from "@/gql/productsQuery"
import { Product } from "@/types"
import { useQuery } from "urql"

interface ProductGridProps {
  filters?: {
    categories: string[]
    priceRange: number[]
    brands: string[]
    sizes: string[]
    colors: string[]
  }
  sortOption?: string
  viewMode?: "grid" | "list",
  page?: number,
}
const PRODUCTPERPAGE=2
const TOTALPRODUCTS=5
export function ProductGrid({ filters, sortOption = "featured", viewMode = "grid", page=-1 }: ProductGridProps) {

  //const [products,setProducts]=useState([])
  //const [getProducts, replay] = useQuery({ query: ProductsQuery })
  const [{data,fetching,error}, replayy] = useQuery({
    query: ProductsQuery,
    variables: {input:{ limit: PRODUCTPERPAGE, offset: (page-1) * PRODUCTPERPAGE }}
  })
  /* 
  const{data:productsData,fetching:productsFetching,error:productsError}=getProducts
  const{data:getPaginatedProductsData,fetching:getPaginatedProductsFetching,error:getPaginatedProductsError}=getPaginatedProducts
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]) */

 /* useEffect(() => {
    if (productsData && productsData.products)
      setProducts(productsData.products)
  }, [productsData]) */
  /* useEffect(() => {
    if (getPaginatedProductsData && getPaginatedProductsData.products)
      setProducts(getPaginatedProductsData.products)
  }, [getPaginatedProductsData]) */
  // Apply filters and sorting
  /* useEffect(() => {
    if (getProductsData && !getProductsData.products.length) return

    let result = [...products]

    // Apply category filter
    if (filters?.categories.length) {
      result = result.filter((product) =>
        filters.categories.some((cat) => product.category.toLowerCase() === cat.toLowerCase()),
      )
    }

    // Apply price range filter
    if (filters?.priceRange) {
      const [min, max] = filters.priceRange
      result = result.filter((product) => product.price >= min && product.price <= max)
    }

    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price)
          break
        case "price-desc":
          result.sort((a, b) => b.price - a.price)
          break
      }
    }

    setFilteredProducts(result)
  }, [products, filters, sortOption]) */
  return (
    <div>
      <div className={
        viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"
      }>
        {data&& data.products.length > 0
          ? data.products.map((product:Product) => <ProductCard key={product.id} product={product} layout={viewMode} />)
          : !fetching && (
            <div className="col-span-full py-12 text-center">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}

        {fetching &&
          Array(4)
            .fill(0)
            .map((_, i) => <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-80"></div>)}
      </div>
     {page>0&&
      <Pagination className="p-5">
        <PaginationContent>
          <PaginationItem >
            <PaginationPrevious href={`/products?page=${page-1}`}
            aria-disabled={page <= 1}
            tabIndex={page <= 1 ? -1 : undefined}
            className={
              page <= 1 ? "pointer-events-none opacity-50" : undefined
            }
            />
          </PaginationItem>
          <PaginationItem>
            {Array.from({ length: Math.ceil(TOTALPRODUCTS/PRODUCTPERPAGE)}, (_, i) => i + 1).map((item,index)=>(
             <PaginationLink href={`/products?page=${item}`} 
             key={index}
             isActive={page ==item}
             >{item}</PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={`/products?page=${page+1}`} 
            aria-disabled={page >= TOTALPRODUCTS/PRODUCTPERPAGE}
            tabIndex={page >= TOTALPRODUCTS/PRODUCTPERPAGE ? -1 : undefined}
            className={
              page >= TOTALPRODUCTS/PRODUCTPERPAGE ? "pointer-events-none opacity-50" : undefined
            }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      }
    </div>
  )
}

