"use client"
import { getAccessToken } from "@/app/api/getAccessToken";
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
    cart:CartResponse | null,
    cartId?:string | null,
    setCart:(value:CartResponse | null)=>void,
    isLoading:boolean,
    setIsLoading:(value:boolean)=>void,
    getCart:()=>void
}>({
     cart: null,
        cartId:null,
    setCart:()=>{},
    isLoading:false,
    setIsLoading:()=>{}
    ,getCart:()=>{}
})
export default function CartContextProvider({children}:{children :ReactNode})
{

    const [cart, setCart] = useState<CartResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [cartId, setCartId] = useState<string | null>(null)
    async function getCart()
    {
        let accessToken=await getAccessToken();
        setIsLoading(true)
         const res= await fetch('/api/get-cart',
                {
                    headers:{
                        token:accessToken
                    }
                }
             )
         const data:CartResponse = await res.json()
         setCart(data);
         setCartId(data.cartId);
         console.log(data)
         setIsLoading(false)
    }
    useEffect(() => {
      getCart()
    }, [])
    

    return <CartContext.Provider value={{cart,cartId,setCart,isLoading,setIsLoading,getCart}}>
        {children}
    </CartContext.Provider>
}