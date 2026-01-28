"use client"
import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HeartIcon, Loader, ShoppingCartIcon } from "lucide-react"
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../context/cartContext'
import { WishContext } from '../context/wishlistContext'
import { addToCartAction, addToWishAction } from '@/app/(pages)/products/_action/addToCart.action'
import { get } from 'http'
import { set } from 'zod'
 function AddToCartBtn({productId}:{productId: string}) {
  let {getCart}=useContext(CartContext)
 let {getWish}=useContext(WishContext)
  const [isLoading, setIsLoading] = useState(false)
  
 async function addProductCart() {
  setIsLoading(true)
  
  const res = await addToCartAction(productId);

if (!res.success) {
  toast.error(res.message || "Error");
  return;
}
setIsLoading(false)
toast.success("Added to cart");
await getCart();
}


  async function addProductWish() {
    setIsLoading(true)
 const res = await addToWishAction(productId);

if (!res.success) {
  toast.error(res.message || "Error");
  return;
}
setIsLoading(false)
toast.success("Added to Wishlist");
await getWish();
}

  return (
    <CardFooter className="flex gap-3">
   <Button  onClick={addProductCart} className="grow cursor-pointer  bg-accent-foreground text-white text-md">Add to Cart { isLoading? <Loader></Loader>: <ShoppingCartIcon></ShoppingCartIcon>}</Button> 
    <HeartIcon className='cursor-pointer' onClick={addProductWish}></HeartIcon>
   </CardFooter>
  )
}

export default AddToCartBtn