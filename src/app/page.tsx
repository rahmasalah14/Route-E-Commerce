"use client"

import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function HomePage() {
   const { data: session, status } = useSession()

  if (status === "loading") {
    return null 
  }
  return (
    <main className="min-h-[80vh] p-6 flex items-center justify-center">
      <section className="text-center px-4 space-y-6">
 {status === "authenticated" && (
          <p className="text-4xl text-muted-foreground">
            Hi {session?.user?.name}
          </p>
        )}
        <h1 className="text-6xl md:text-5xl font-bold tracking-tight">
          Welcome to <span className="font-extrabold">ShopMart</span>
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed">
          Discover the latest technology, fashion, and lifestyle products.
          Quality guaranteed with fast shipping and excellent customer service.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link href={'/products'}><Button size="lg" className="px-8">
            Shop Now
          </Button></Link>
<Link href={'/categories'}>

          <Button
            size="lg"
            variant="outline"
            className="px-8"
          >
            Browse Categories
          </Button>

</Link>
        </div>

      </section>
    </main>
  )
}
