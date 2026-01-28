"use client"

import { useContext, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag } from "lucide-react"
import { Order } from "@/interfaces"
import { getOrdersAction } from "./_action/getOrders.action"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

    async function loadOrders() {
      const res = await getOrdersAction()
      if (res.success && res.data) setOrders(res.data)
        console.log(res);
        setLoading(false)
    }

 useEffect(() => {
    loadOrders()
  }, [])


   if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading orders...</p>
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center py-20 text-gray-400">
        <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
        <h2 className="text-lg font-medium">No orders yet</h2>
        <p className="text-sm mt-1">Once you place an order, it will appear here.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
        <Card key={order.id} className="rounded-2xl shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <CardTitle className="text-lg font-semibold">{`Order #${order.id}`}</CardTitle>
              <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <Badge
              variant={order.isDelivered ? "default" : "secondary"}
              className="mt-2 sm:mt-0"
            >
              {order.isDelivered ? "Delivered" : "Pending"}
            </Badge>
          </CardHeader>

          <Separator />

          <CardContent className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4">
            <div className="space-y-1">
              <p className="text-sm">Items: {order.cartItems.length}</p>
              <p className="font-medium text-lg">EGP {order.totalOrderPrice}</p>
            </div>
            <Dialog>
  <DialogTrigger className="bg-accent-foreground text-accent p-3 rounded-xl">View Details</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Order Details</DialogTitle>
      <DialogDescription>
       <h3>Shipping Address:</h3>
        <p>{order.shippingAddress.city}, {order.shippingAddress.details}</p>
      </DialogDescription>
      <DialogDescription>
       <h3>Phone:</h3>
        <p>{order.shippingAddress.phone}</p>
      </DialogDescription>
      <DialogDescription>
       <h3>Email:</h3>
        <p>{order.user.email}</p>
      </DialogDescription>
       <DialogDescription>
       <h3>Shipping Price:</h3>
        <p>{order.shippingPrice}</p>
      </DialogDescription>
      <DialogDescription>
       <h3>Is Paid:</h3>
        <p>{order.isPaid ? "Yes" : "No"}</p>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
           </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
