"use client"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { CarTaxiFrontIcon, HeartIcon, ShoppingCartIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 import { Badge } from "@/components/ui/badge"
import { useContext } from "react"
import { CartContext } from "../context/cartContext"
import { signOut, useSession } from "next-auth/react"
function Nav() {
 const {cart,isLoading} = useContext(CartContext)
 let session = useSession()
 console.log(session)
 return (  
<nav className="bg-gray-100 px-4 py-3">
<div className="container  mx-auto">
  <div className="flex items-center justify-between">
      <h1 className="text-2xl"><Link href={'/'}>ShopMart</Link></h1>
        
      <NavigationMenu>
        <NavigationMenuList >

          <NavigationMenuItem>
            <NavigationMenuLink asChild  className={navigationMenuTriggerStyle()}>
              <Link href="/products">Products</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/categories">Categories</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/brands">Brands</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>


           <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/subcategories">SubCategories</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

         
      <NavigationMenu>
        <NavigationMenuList >

      <div className="flex  gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button><UserIcon></UserIcon></Button>
              </DropdownMenuTrigger>
              
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              
              {
                session.status === 'authenticated' ?
                <>
                
                <DropdownMenuItem onClick={()=>signOut({
                  callbackUrl:'/login'
                })}>LogOut</DropdownMenuItem>
              <Link href={'/allorders'}><DropdownMenuItem>Orders</DropdownMenuItem></Link>
                
                </>:
                <>
                <Link href={'/login'}><DropdownMenuItem>Login</DropdownMenuItem></Link>
              <Link href={'/register'}><DropdownMenuItem>Register</DropdownMenuItem></Link>
                </>
              }


            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>


       
 {session.status === 'authenticated' && <>
 
          <div className="relative">
           <Button>
             <Link href="/cart"><ShoppingCartIcon></ShoppingCartIcon> 
          </Link>
           </Button>
            <Badge className="h-5 absolute top-0 end-0 min-w-5 rounded-full px-1 font-mono tabular-nums">{cart?.numOfCartItems}</Badge>
       
          </div>

             <Button>
             <Link href="/wishlist"><HeartIcon></HeartIcon> 
             </Link>
           </Button>
 </>}
          
      </div>
          
        </NavigationMenuList>
      </NavigationMenu>
  </div>
</div>
</nav>
  )
}

export default Nav