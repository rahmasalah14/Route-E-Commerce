"use client"

import { CartContext } from '@/app/_Components/context/cartContext'
import { WishContext } from '@/app/_Components/context/wishlistContext'
import { getAccessToken } from '@/app/api/getAccessToken'
import Loading from '@/app/loading'
import { WishResponse } from '@/interfaces/wishlist'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'

function Wishlist() {

  const {wish,getWish, isLoading,setIsLoading}= useContext(WishContext)
    let {getCart}=useContext(CartContext)
    async function addProductCart(productId:string)
    {
      setIsLoading(true)
       let accessToken = await getAccessToken()
       const res= await fetch('https://ecommerce.routemisr.com/api/v1/cart/',{
        method:'POST',
        body:JSON.stringify({productId}),
        headers:{
          token: accessToken,
         "content-type":"application/json"
        }
       })
       const data = await res.json()
       data.status=='success'&& toast.success('product added successfully')
       console.log(res)
        await  getCart()
      setIsLoading(false)
    }
    
  async function removeWishItem(productId:string)
  {
    setIsLoading(true)
     let accessToken = await getAccessToken()
     const res= await fetch('https://ecommerce.routemisr.com/api/v1/wishlist/'+productId,{
      method:'DELETE',
      headers:{
        token: accessToken
       
      }
     })
     const data:WishResponse = await res.json()
     data.status=='success'&& toast.success('Product Removed Successfully')
     console.log(res)
   
     if(data.status=='success')
     {
      getWish()
     }
    setIsLoading(false)
    
  }
  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-2xl shadow-sm">
  <h2 className="text-3xl font-bold text-gray-900 mb-8">
    My Wishlist
  </h2>

  {isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wish?.data.map(item => (
       <div key={item._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group">

  <div className="relative">
    <img
      src={item.imageCover}
      alt={item.title}
      className="w-full h-56 object-cover"
    />


    <button
      onClick={()=>removeWishItem(item._id)}
      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
      aria-label="Remove from wishlist"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>


  <div className="p-4 space-y-2">
    <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
      {item.title}
    </h3>

    <p className="text-sm text-gray-500">
      {item.category?.name}
    </p>

    <div className="flex items-center justify-between pt-2">
      <span className="text-lg font-bold text-green-600">
        EGP {item.price}
      </span>

      <button
      
        className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        onClick={()=>{
          addProductCart(item._id)
          removeWishItem(item._id)
        }}

>
        Add to Cart
      </button>
    </div>
  </div>


        </div>
      ))}
    </div>
  )}
</div>
  )
}

export default Wishlist