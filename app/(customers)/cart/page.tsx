"use client"

import { initializePayment } from "@/actions/payment"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/context/cartContext"
import { useUserStore } from "@/context/userContext"
import { clearCartMutation } from "@/gql/ClearCartMutation"
import { deleteCartMutation } from "@/gql/deleteCartMutation"
import { orderMutation } from "@/gql/orderMutation"
import { updateCartMutation } from "@/gql/updateCartMutation"
import { CartItem } from "@/types"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, useActionState, useTransition } from "react"
import { useFormState } from "react-dom"
import { useMutation } from "urql"



export default function CartPage() {

  const router = useRouter()
  const { user } = useUserStore()
  const [_, editProductInCart] = useMutation(updateCartMutation)
  const [__, deleteProductInCart] = useMutation(deleteCartMutation)
  const [___, emptyCart] = useMutation(clearCartMutation)
  const [____, order] = useMutation(orderMutation)
  const { cart, addToCart, removeFromCart, clearCart } = useCartStore()
  
  const subtotal = cart?.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  
  /* const [state, action, pending] = useActionState(initializePayment, {
    currency:"ETB",amount:subtotal.toString(),
    tx_ref:"negade-tx-12345678sss66",first_name:user?.firstName,last_name:user?.lastName
  }); */
  const [pending,startTransition]=useTransition()
  const incrementProductQuantityInCart = async (item: CartItem) => {
    if (user)
      await editProductInCart({ input: { "productID": item.product.id, "quantity": Math.min(item.product.quantity, item.quantity + 1) } })
    addToCart(item.product, Math.min(item.product.quantity, item.quantity + 1))
  }
  const decrementProductQuantityInCart = async (item: CartItem) => {
    if (user)
      await editProductInCart({ input: { "productID": item.product.id, "quantity": Math.max(1, item.quantity - 1) } })
    addToCart(item.product, Math.max(1, item.quantity - 1))
  }

  const addItemToCart = async (item: CartItem, e: ChangeEvent<HTMLInputElement>) => {
    if (user)
      await ({ input: { "productID": item.product.id, "quantity": Number.parseInt(e.target.value) || 1 } })
    addToCart(item.product, Number.parseInt(e.target.value) || 1)
  }
  const deleteItemFromCart = async (item: CartItem) => {
    if (user)
      await deleteProductInCart({ deleteCartItemId: item.product.id })
    removeFromCart(item.product.id)
  }
  const clearItemFromCart = async () => {
    if (user)
      await emptyCart()
    clearCart()
  }

  const checkout = async () => {
    startTransition(()=>initializePayment({
      currency:"ETB",amount:subtotal.toString(),
      tx_ref:"negade-tx-12345678sss332s",first_name:user?.firstName,last_name:user?.lastName,
      return_url:"https://3000-idx-ecommerce-1741264807708.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/orders"
    }))
    const result = await order()
    if (result.data.createOrder) {
      clearItemFromCart()
      //router.push('/orders')
    } 
  }

  if (cart?.cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
        <p className="mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>

      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cart?.cartItems.map((item) => (
                  <tr key={item.product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 relative flex-shrink-0">
                          <Image
                            src={"/next.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>

                      </div>
                    </td>
                    {/* update quantity */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex border rounded-md w-24">
                        <button
                          className="px-2 py-1 border-r"
                          onClick={() => decrementProductQuantityInCart(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          max={item.product.quantity}
                          value={item.quantity}
                          onChange={(e) => addItemToCart(item, e)}
                          className="w-10 text-center"
                        />
                        <button
                          className="px-2 py-1 border-l"
                          onClick={(e) => incrementProductQuantityInCart(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => deleteItemFromCart(item)}
                        className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => clearItemFromCart()}>
              Clear Cart
            </Button>
            <Link href="/">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal?.toFixed(2)}</span>
              </div>

            </div>

            {user &&
              <Button className="w-full mt-6" onClick={checkout}>Proceed to Checkout</Button>
            }
          </div>
        </div>
      </div>
      
    </main>
  )
}