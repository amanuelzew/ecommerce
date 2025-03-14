"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { orderQuery } from "@/gql/orderQuery"
import { Order } from "@/types"
import Image from "next/image"
import { useQuery } from "urql"

export default function Orders() {

    const [{ data, fetching, error }, replay] = useQuery({ query: orderQuery })    

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">My Orders</h1>
                <p className="text-muted-foreground">View and track your orders</p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Id</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="cursor-pointer">
                    {data && data.order.map((order: Order, index: number) => (
                        <Dialog key={index}>
                            <DialogTrigger asChild>
                                <TableRow >
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell className="font-medium">{new Date(parseFloat(order.createdAt)).toDateString()}</TableCell>
                                    <TableCell>{order.total}</TableCell>
                                </TableRow>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Order</DialogTitle>
                                    <DialogDescription>Products Ordered</DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <table className="w-full" >
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
                                                {order.orderItems.map((item,index) => (
                                                    <tr key={index}>
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
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.product.price.toFixed(2)}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            ${(item.product.price * item.quantity).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                    </table>
                                </div>

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Close</Button>
                                    </DialogClose>
                                    <DialogClose asChild></DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    ))}
                </TableBody>
            </Table>

        </div >


    )
}

