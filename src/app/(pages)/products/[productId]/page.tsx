import { Product } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import { Badge } from "@/components/ui/badge"
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Carouse from '@/app/_Components/carousel/page'
import AddToCartBtn from '@/app/_Components/addToCart/page'
async function ProductDetails({params}:{params:Params}) {

    let {productId}=await params

     const res= await fetch('https://ecommerce.routemisr.com/api/v1/products/'+productId)
     const {data:product}:{data:Product} = await res.json()
 if(product)
 {
     return (
 <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-12">
<div className='p-5'>
<Carouse product={product}></Carouse>
</div>

  <Card className="p-6 space-y-6">
 
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold leading-tight">
        {product.title}
      </h1>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{product.category.name}</span>
        <Badge variant="secondary">{product.brand.name}</Badge>
      </div>
    </div>

   
   
    <div className="flex items-center gap-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`size-5 ${
              i < Math.round(product.ratingsAverage)
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {product.ratingsAverage} / 5
      </span>
    </div>

    <div className="text-3xl font-bold text-black">
      EGP {product.price}
    </div>

 
    <AddToCartBtn productId={product.id}></AddToCartBtn>

  
    <div className="border-t pt-4 text-sm text-muted-foreground">
      <p>✔ Original product</p>
      <p>✔ Cash on delivery available</p>
      <p>✔ Fast shipping within 2–4 days</p>
    </div>
  </Card>
</div>

  )
 }
}

export default ProductDetails