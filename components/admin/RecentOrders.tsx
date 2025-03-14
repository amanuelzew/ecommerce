"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useQuery } from "urql"
import { orderQuery } from "@/gql/orderQuery"
import { Order } from "@/types"

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500"
    case "processing":
      return "bg-blue-500"
    case "shipped":
      return "bg-purple-500"
    case "pending":
      return "bg-yellow-500"
    case "cancelled":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getPaymentStatusVariant = (status: string) => {
  switch (status) {
    case "paid":
      return "default"
    case "pending":
      return "outline"
    case "refunded":
      return "destructive"
    default:
      return "secondary"
  }
}

export function RecentOrders() {
  const [{ data, fetching, error }, replay] = useQuery({ query: orderQuery })
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Latest 5 orders from your store</CardDescription>
        </div>
        <Link href="/admin/orders" className="text-sm text-primary hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        {fetching ? (
          <div className="border rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading Orders...</p>
          </div>
        ) :
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.order.map((order: Order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                      ORD-{order.id.slice(0, 3)}
                    </Link>
                  </TableCell>
                  <TableCell>{order.user.firstName + " " + order.user.lastName}</TableCell>
                  <TableCell>{new Date(parseFloat(order.createdAt)).toDateString()}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor("completed")}`} />
                      <span className="capitalize">completed</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPaymentStatusVariant("paid")}>Paid</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
      </CardContent>
    </Card>
  )
}

