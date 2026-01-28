"use client"
import { getAccessToken } from "@/app/api/getAccessToken"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/router"
import { useRef } from "react"
import toast from "react-hot-toast"
export 
function CheckOutBtn({cartId, ClearCartItem,getCart}:{cartId:string, ClearCartItem:Function, getCart:Function}) {
    let detailsInp = useRef <HTMLInputElement | null>(null)
    let cityInp =useRef <HTMLInputElement | null>(null)
    let phoneInp = useRef <HTMLInputElement | null>(null)
     async function checkOutSession()
      {
        const accessToken = await getAccessToken()
        const shippingAddress={
          details:detailsInp.current?.value,
          city:cityInp.current?.value,
          phone:phoneInp.current?.value
        }
    
        const res= await fetch('https://ecommerce.routemisr.com/api/v1/orders/checkout-session/'+cartId+'?url=http://localhost:3000',{
         method:'POST',
          body:JSON.stringify({shippingAddress})
         , headers:{
            token: accessToken,
          "content-type":"application/json"
          }
         })
        const data = await res.json()
        console.log(data)
        if(data.status=='success')
        { 
            window.location.href=data.session.url
          }
      }

      
     async function CashBtn()
      {
                const accessToken = await getAccessToken()

        const shippingAddress={
          details:detailsInp.current?.value,
          city:cityInp.current?.value,
          phone:phoneInp.current?.value
        }
    
        const res= await fetch('https://ecommerce.routemisr.com/api/v1/orders/'+cartId,{
         method:'POST',
          body:JSON.stringify({shippingAddress})
         , headers:{
            token: accessToken,
            "content-type":"application/json"
          }
         })
        const data = await res.json()
        console.log(data)
         if (data.status=='success')
         {
          toast.success('Order Placed Successfully')
           await ClearCartItem();
           await getCart();
        }

      }

      
//     </button>

  return (
     <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="px-8 py-3 rounded-lg font-semibold text-white bg-accent-foreground hover:bg-accent hover:text-accent-foreground transition"
                >Checkout</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
           <DialogTitle>Add Address</DialogTitle>
            <DialogDescription>
            Add a shipping address for your deliveries.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label >City:</Label>
              <Input ref={cityInp} id="city-1" name="city" />
            </div>
            <div className="grid gap-3">
              <Label >Details</Label>
              <Input ref={detailsInp} id="details-1" name="details" />
            </div>
            <div className="grid gap-3">
              <Label >Phone Number</Label>
              <Input ref={phoneInp} id="phone-1" name="phone" />
            </div>
          </div>
          <DialogFooter>
            <button className="px-8 py-3 rounded-lg font-semibold text-white bg-accent-foreground hover:bg-accent hover:text-accent-foreground transition"
            onClick={()=>checkOutSession()} type="submit">Pay Online </button>
           
            <button className="px-8 py-3 rounded-lg font-semibold text-white bg-accent-foreground hover:bg-accent hover:text-accent-foreground transition"
            onClick={()=>CashBtn()} type="button">Pay Cash </button>
        
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CheckOutBtn