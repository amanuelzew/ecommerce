"use client"


import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, User, Menu, X, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { GlobalSearch } from "@/components/GlobalSearch"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { link } from "fs"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { removeToken } from "@/utils/token"
import { useUserStore } from "@/context/userContext"
import { useCartStore } from "@/context/cartContext"


export const navItem = [
    { title: "Home", link: "/" },
    { title: "Products", link: "/products" },
    { title: "Clothing", link: "#" },
    { title: "Accessories", link: "#" },
    { title: "About", link: "#About" },
    { title: "Contact us", link: "#contact" },
];
export function Header() {
    //const { cart } = useCart()
    const {user,removeUser}=useUserStore()
    const {cart,clearCart}=useCartStore()
    const path = usePathname()
    const router=useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const totalItems = cart?.cartItems.length||0
    console.log(user,"iopuy")
    const logout=()=>{
        router.push("/")
        removeToken()
        removeUser()
        clearCart()
    }

    return (
        <header className="border-b sticky top-0 bg-white z-40">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <button className="mr-4 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>

                        <Link href="/" className="text-2xl font-bold">
                            ShopNow
                        </Link>

                        <nav className="ml-8 hidden md:block">
                            <ul className="flex space-x-6">
                                {navItem.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.link} className={cn("", path == item.link && "text-blue-700")}>{item.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        <GlobalSearch>
                            <Button variant="ghost" size="icon" className="hidden md:flex">
                                <span className="sr-only">Search</span>
                                <Search className="h-5 w-5"/>
                            </Button>
                        </GlobalSearch>

                        {user?
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <span className="text-sm text-gray-400">{user.firstName+" "+user.lastName}</span>
                                <DropdownMenuItem asChild>
                                    <Link href="/account">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="/account/orders">My Orders</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/account/wishlist">Wishlist</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={()=>logout()}>Logout</DropdownMenuItem>
                                
                            </DropdownMenuContent>
                        </DropdownMenu>
                       
                        :<Button className="rounded-sm" onClick={()=>router.push("/signin")}>Sign in</Button>}
                        <Link href="/cart" className="relative">
                            <Button variant="ghost" size="icon">
                                <ShoppingCart className="h-5 w-5" />
                                {totalItems||0 > 0 && (
                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                                        {totalItems}
                                    </Badge>
                                )}
                            </Button>
                        </Link>
                        
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t">
                    <div className="container mx-auto px-4 py-4">
                        <div className="mb-4">
                            <GlobalSearch>
                                <Button variant="outline" className="w-full justify-start">
                                  <Search className="h-5 w-5"/>
                                    Search products...
                                </Button>
                            </GlobalSearch>
                        </div>

                        <nav>
                            <ul className="space-y-4">
                                {navItem.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.link} className={cn("", path == item.link && "text-blue-700")}>{item.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    )
}


