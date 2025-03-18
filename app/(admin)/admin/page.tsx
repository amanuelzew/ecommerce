import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CreditCard, DollarSign, Package, ShoppingCart, Users } from "lucide-react"
import { RecentOrders } from "@/components/admin/RecentOrders"
import { SalesChart } from "@/components/admin/SalesChart"
import { TopProducts } from "@/components/admin/TopProducts"
import db from "@/utils/db"
const getTotalRevenue=async()=>{
  const total= await db.order.aggregate({_sum:{total:true}})
  return total._sum.total
}
const getTotalOrders=async()=>{
  const total=await db.order.aggregate({_count:{id:true}})
  return total._count.id
}
const getAverageOrder = async()=>{
  const total=await db.order.aggregate({_avg:{total:true}})
  return  total._avg.total
}
const getTotalProducts=async()=>{
  const total=await db.product.aggregate({_count:{id:true}})
  return  total._count.id
}

export default async function AdminDashboard() {
  const totalRevenue=await getTotalRevenue()
  const orders=await getTotalOrders()
  const averageOrderValue=await getAverageOrder()
  const products=await getTotalProducts()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* card stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue||0}</div>
            <p className="text-xs text-muted-foreground">**+20.1% from last month**</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders}</div>
            <p className="text-xs text-muted-foreground">**+12.4% from last month**</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products}</div>
            <p className="text-xs text-muted-foreground">**+8 new products added**</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">**Active Users**</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+180 new users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">**Conversion Rate**</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">**+0.5% from last month**</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageOrderValue?.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">**+$4.65 from last month**</p>
          </CardContent>
        </Card>
      </div>

      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart className="lg:col-span-4" />
        <TopProducts className="lg:col-span-3" />
      </div> */}

      <RecentOrders />
    </div>
  )
}

