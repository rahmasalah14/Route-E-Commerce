"use client"
import { WishResponse } from "@/interfaces/wishlist";
import { createContext, ReactNode, useEffect, useState } from "react";

export const WishContext = createContext<{
    wish:WishResponse | null,
    setWish:(value:WishResponse | null)=>void,
    isLoading:boolean,
    setIsLoading:(value:boolean)=>void,
     getWish:()=>void
}>({
     wish: null,
    setWish:()=>{},
    isLoading:false,
    setIsLoading:()=>{},
    getWish:()=>{}
})
export default function WishContextProvider({children}:{children :ReactNode})
{

    const [wish, setWish] = useState<WishResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function getWish()
    {
        setIsLoading(true)
         const res= await fetch('/api/get-wish',
            {
                headers:{
                    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Nzc3MTRjODI0ZDMzNjJjNDUyNWJmNiIsIm5hbWUiOiJyYWhtYSBBYmRvIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3Njk0MzU0NjksImV4cCI6MTc3NzIxMTQ2OX0.zYDADGM6qUAlLYOJOEc1mMBFBUYjFZLVpkw-aeiSrps'
                }
            }
         )
         const data:WishResponse = await res.json()
         setWish(data);
         console.log(data)
         setIsLoading(false)
    }
    useEffect(() => {
      getWish()
    }, [])
    

    return <WishContext.Provider value={{wish,setWish,isLoading,setIsLoading,getWish}}>
        {children}
    </WishContext.Provider>
}