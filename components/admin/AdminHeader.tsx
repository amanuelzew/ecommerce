"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, HelpCircle, Settings, LogOut, User, Navigation } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { removeToken } from "@/utils/token"
import { useUserStore } from "@/context/userContext"
import { useRouter } from "next/navigation"

export function AdminHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const {removeUser}=useUserStore()
  const router = useRouter()

  return (
    <header className="h-16 border-b bg-white flex items-center px-6">
      {showSearch ? (
        <div className="flex-1 flex items-center">
          <Input placeholder="Search..." className="max-w-md" autoFocus />
          <Button variant="ghost" size="sm" onClick={() => setShowSearch(false)} className="ml-2">
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} className="mr-4">
            <Search className="h-5 w-5" />
          </Button>

          <div className="flex-1"></div>

          <div className="flex items-center space-x-2">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm">
                View Store
              </Button>
            </Link>

            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-4 border-b">
                    <div className="font-medium">New Order</div>
                    <div className="text-sm text-muted-foreground">Order #ORD-001 has been placed</div>
                    <div className="text-xs text-muted-foreground mt-1">5 minutes ago</div>
                  </div>
                  <div className="p-4 border-b">
                    <div className="font-medium">Low Stock Alert</div>
                    <div className="text-sm text-muted-foreground">
                      Product "Classic White T-Shirt" is running low on stock
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
                  </div>
                  <div className="p-4">
                    <div className="font-medium">New Review</div>
                    <div className="text-sm text-muted-foreground">
                      A new 5-star review has been submitted for "Leather Sneakers"
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">3 hours ago</div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2 text-center">
                  <Link href="/admin/notifications" className="text-sm text-primary hover:underline">
                    View all notifications
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                    A
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>{
                   removeToken()
                   removeUser()
                   router.push("/")
                }}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </header>
  )
}

