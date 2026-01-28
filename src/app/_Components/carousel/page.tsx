
"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { Product } from '@/interfaces'
function Carouse({product}:{product:Product}) {
  return (
    <Carousel opts={{
    align: "start",
    loop: true,
  }} plugins={[
        Autoplay({
          delay: 1500,
        }),
      ]}>
  <CarouselContent>
    
    {
        product.images.map((img,index)=><CarouselItem key={index}><Image className="w-full" src={img} alt='' height={300} width={300}></Image></CarouselItem>)
    }
  
  </CarouselContent>
</Carousel>
  )
}

export default Carouse