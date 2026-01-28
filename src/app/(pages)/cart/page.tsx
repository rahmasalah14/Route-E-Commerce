"use client"
import CheckOutBtn from '@/app/_Components/checkoutbtn/page'
import { CartContext } from '@/app/_Components/context/cartContext'
import { getAccessToken } from '@/app/api/getAccessToken'
import Loading from '@/app/loading'
import { CartResponse } from '@/interfaces'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'

function Cart() {
 const {cart,setCart,isLoading,setIsLoading,getCart}= useContext(CartContext)
 
  async function removeCartItem(productId:string)
  {
    setIsLoading(true)
     let accessToken = await getAccessToken()
     const res= await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId,{
      method:'DELETE',
      headers:{
        token: accessToken
      }
     })
     const data:CartResponse = await res.json()
     data.status=='success'&& toast.success('Product Removed Successfully')
     console.log(res)
     if(data.status=='success')
     {
      setCart(data)
     }
    setIsLoading(false)
    
  }
   async function ClearCartItem()
  {
    setIsLoading(true)
     let accessToken = await getAccessToken()
     const res= await fetch('https://ecommerce.routemisr.com/api/v1/cart',{
      method:'DELETE',
      headers:{
        token: accessToken
      }
     })
     const data:CartResponse = await res.json()
     data.status=='success'&& toast.success('Products Removed Successfully')
     console.log(res)
     
     await getCart()
   
    setIsLoading(false)
    
  }
  async function updateCartItem(productId:string,count:number)
  {
    setIsLoading(true)
     let accessToken = await getAccessToken()
     const res= await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+productId,{
      method:'PUT',
      body:JSON.stringify({count}),
      headers:{
        token: accessToken
       
      }
     })
     const data:CartResponse = await res.json()
     data.status=='success'&& toast.success('Product Removed Successfully')
     console.log(res)
     if(data.status=='success')
     {
      setCart(data)
     }
    setIsLoading(false)
    
  }
 
 
 
 return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-2xl shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Shopping Cart
      </h2>

  {isLoading? (
   <Loading></Loading>
  ) : (
    <>

      <div className="space-y-5">
        {cart?.data.products?.map(item => (

          <div key={item._id} className="flex items-center justify-between p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow mb-4">

  <div className="flex items-center gap-4">
    <img
      src={item.product.imageCover}
      alt={item.product.title}
      className="w-20 h-20 object-cover rounded-lg border"
    />

    <div className="space-y-1">
      <h3 className="text-base font-semibold text-start text-gray-900 leading-tight">
        {item.product.title}
      </h3>


      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Quantity</span>

        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-lg font-medium"
            aria-label="Decrease quantity"
           onClick={()=>updateCartItem(item._id,item.count--)}
          >
            −
          </button>

          <span className="px-4 py-1 text-sm font-semibold text-gray-900">
            {item.count}
          </span>

          <button
            className="px-3 py-1 text-gray-700 hover:bg-gray-100 text-lg font-medium"
            aria-label="Increase quantity"
         onClick={()=>updateCartItem(item._id,item.count++)}
          >
            +
          </button>
        </div>
      </div>

      <p className="text-sm text-start font-bold text-green-600">
        EGP {item.price}
      </p>
    </div>
  </div>

  <button
   onClick={()=>removeCartItem(item.product._id)}
    className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
  >
    Remove
  </button>
          </div>
        ))}
      </div>
   
      <div className="mt-10 p-6 bg-white rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <p className="text-sm text-gray-500">Total Price</p>
          <h3 className="text-2xl font-bold text-green-600">
            EGP {cart?.data.totalCartPrice}
          </h3>
        </div>

        <div className="flex gap-4">

          <CheckOutBtn getCart={getCart!} ClearCartItem={ClearCartItem!} cartId={cart?.cartId!}></CheckOutBtn>
          
          <button
         onClick={()=>ClearCartItem()}  
            className="px-8 py-3 rounded-lg font-semibold text-red-600 border border-red-500 hover:bg-red-50 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  )}



</div>
  )
}

export default Cart