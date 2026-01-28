"use client"
import * as jwt_decode from "jwt-decode"
import { getAccessToken } from "@/app/api/getAccessToken"
import { Order } from "@/interfaces/allorders"

export async function getOrdersAction(): Promise<{ success: boolean; data?: Order[]; message?: string }> {
  
    const accessToken = await getAccessToken()

  if (!accessToken) {
    return { success: false, message: "Unauthenticated" }
  }

  const decodedToken = jwt_decode.default<{ id: string }>(accessToken)
  const userId = decodedToken.id
  if (!userId) {
    return { success: false, message: "Unauthenticated" }
  }

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)

  const data = await res.json()

  if (data.success === false) {
    return { success: false, message: data?.message }
  }

  return { success: true, data }
}
