import AddToCartBtn from '@/app/_Components/addToCart/page'
import { Category } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import React from 'react'

import Loading from "@/app/loading"
import { Product } from "@/interfaces"
import { Badge } from "@/components/ui/badge"
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
import Image from "next/image"
import { HeartIcon } from "lucide-react"
import Link from "next/link"


async function CategoryDetails({params}:{params:Params}) {
     let {categoryId}=await params
    
         const res= await fetch('https://ecommerce.routemisr.com/api/v1/categories/'+categoryId)
         const {data:category}:{data:Category} = await res.json()
 if(category)
 {
     const res= await fetch('https://ecommerce.routemisr.com/api/v1/products')
  const {data:products}:{data:Product[]} = await res.json()

    const filteredProducts = products.filter(
    (product) => product.category?._id === categoryId);
     return (
       <div>
          <h1 className="text-3xl font-bold mb-3">
            {category.name}
          </h1>
        <div className="bg-base-200 py-8 sm:py-16 lg:py-24">
         <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {
            filteredProducts.map(product => (
                <Card key={product.id}>
                    <Link href={'/products/'+product.id}>
               
      <CardHeader>
        <Image className="w-full" src={product.imageCover} alt='' height={300} width={300}></Image>
        
        <CardTitle>{product.title.split(' ').slice(0, 2).join(" ")}</CardTitle>
        <CardDescription>
          {product.category.name}

        </CardDescription>
        <CardDescription>
        <Badge>{product.brand.name}</Badge>
          
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-yellow-500">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                </svg>
          </div>
          <p> {product.ratingsAverage}</p>
        </div>
    <p className="font-bold">EGP {product.price}</p>         
      </CardContent>
                    </Link>
                    <AddToCartBtn productId={product.id}></AddToCartBtn>
                  
                 </Card>
              ))
         }
        </div>
        </div>
        </div>
        </div>
  )
 }
}

export default CategoryDetails