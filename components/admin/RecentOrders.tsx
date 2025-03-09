import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock recent orders data
const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2023-05-15",
    total: 129.99,
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2023-05-14",
    total: 79.95,
    status: "processing",
    paymentStatus: "paid",
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "2023-05-13",
    total: 249.5,
    status: "completed",
    paymentStatus: "paid",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "2023-05-12",
    total: 59.99,
    status: "shipped",
    paymentStatus: "paid",
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    date: "2023-05-11",
    total: 149.95,
    status: "pending",
    paymentStatus: "pending",
  },
]

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
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <Link href={`/admin/orders/${order.id}`} className="hover:underline">
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`} />
                    <span className="capitalize">{order.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getPaymentStatusVariant(order.paymentStatus)}>{order.paymentStatus}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

