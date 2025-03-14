"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart,
  Tag,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    /*{ name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/users", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
    { name: "Marketing", href: "/admin/marketing", icon: Tag },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings }, */
  ]

  return (
    <div
      className={cn(
        "bg-white border-r mb-6 rounded-b-lg flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <Link
          href="/admin"
          className={cn(
            "font-bold text-xl transition-opacity",
            collapsed ? "opacity-0 invisible w-0" : "opacity-100 visible",
          )}
        >
          ShopNow Admin
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="ml-auto">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 py-6 overflow-y-auto overflow-x-hidden">
        <nav className="px-2 space-y-1">
          {navigation.map((item,index) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100",
                  collapsed ? "justify-end px-0" : "",
                )}
              >
                <item.icon className={cn("",
                     isActive ? "text-primary" : "text-gray-400",
                     collapsed ? "h-7 w-7" : "h-5 w-5",
                     )} />
                <span
                  className={cn(
                    "ml-3 transition-opacity",
                    collapsed ? "opacity-0 invisible w-0" : "opacity-100 visible",
                  )}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>

     
    </div>
  )
}

