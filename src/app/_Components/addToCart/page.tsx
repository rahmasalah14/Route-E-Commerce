"use client"
import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  CardFooter
} from "@/components/ui/card"
import { HeartIcon, Loader, ShoppingCartIcon } from "lucide-react"
import toast from 'react-hot-toast';
import { CartContext } from '../context/cartContext'
import { WishContext } from '../context/wishlistContext'
import { addToCartAction, addToWishAction } from '@/app/(pages)/products/_action/addToCart.action'

function AddToCartBtn({ productId }: { productId: string }) {
  const { getCart } = useContext(CartContext)
  const { getWish } = useContext(WishContext)

  const [isLoadingCart, setIsLoadingCart] = useState(false)
  const [isLoadingWish, setIsLoadingWish] = useState(false)

  async function addProductCart() {
    setIsLoadingCart(true)
    try {
      const res = await addToCartAction(productId)
      if (!res.success) {
        toast.error(res.message || "Error adding to cart")
        return
      }
      toast.success("Added to cart")
      await getCart?.()
    } catch (err) {
      console.error("Cart error:", err)
      toast.error("Error adding to cart")
    } finally {
      setIsLoadingCart(false)
    }
  }

  async function addProductWish() {
    setIsLoadingWish(true)
    try {
      const res = await addToWishAction(productId)
      if (!res.success) {
        toast.error(res.message || "Error adding to wishlist")
        return
      }
      toast.success("Added to Wishlist")
      await getWish?.()
    } catch (err) {
      console.error("Wishlist error:", err)
      toast.error("Error adding to wishlist")
    } finally {
      setIsLoadingWish(false)
    }
  }

  return (
    <CardFooter className="flex gap-3">
      <Button
        onClick={addProductCart}
        className="grow cursor-pointer bg-accent-foreground text-white text-md"
        disabled={isLoadingCart}
      >
        {isLoadingCart ? <Loader /> : <ShoppingCartIcon />}
        Add to Cart
      </Button>

      <Button
        variant="outline"
        onClick={addProductWish}
        disabled={isLoadingWish}
      >
        {isLoadingWish ? <Loader /> : <HeartIcon />}
      </Button>
    </CardFooter>
  )
}

export default AddToCartBtn
