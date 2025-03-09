import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopNow</h3>
            <p className="text-gray-600 mb-4">
              Your one-stop shop for all your needs. Quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-600 hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/category/clothing" className="text-gray-600 hover:text-primary">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/category/shoes" className="text-gray-600 hover:text-primary">
                  Shoes
                </Link>
              </li>
              <li>
                <Link href="/category/accessories" className="text-gray-600 hover:text-primary">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/category/jewelry" className="text-gray-600 hover:text-primary">
                  Jewelry
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex">
              <Input placeholder="Your email" className="rounded-r-none" />
              <Button className="rounded-l-none">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} ShopE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

