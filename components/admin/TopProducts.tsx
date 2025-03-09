import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

interface TopProductsProps {
  className?: string
}

// Mock top products data
const topProducts = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    sales: 120,
    revenue: 3599.8,
    stock: 45,
  },
  {
    id: "3",
    name: "Leather Sneakers",
    sales: 98,
    revenue: 8819.02,
    stock: 32,
  },
  {
    id: "5",
    name: "Wool Blend Coat",
    sales: 76,
    revenue: 15199.24,
    stock: 18,
  },
  {
    id: "7",
    name: "Wireless Earbuds",
    sales: 65,
    revenue: 5199.35,
    stock: 27,
  },
  {
    id: "4",
    name: "Minimalist Watch",
    sales: 54,
    revenue: 7019.46,
    stock: 15,
  },
]

export function TopProducts({ className }: TopProductsProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Top Products</CardTitle>
          <CardDescription>Best selling products this month</CardDescription>
        </div>
        <Link href="/admin/products" className="text-sm text-primary hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Sales</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <Link href={`/admin/products/${product.id}`} className="hover:underline">
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell className="text-right">{product.sales}</TableCell>
                <TableCell className="text-right">${product.revenue.toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

