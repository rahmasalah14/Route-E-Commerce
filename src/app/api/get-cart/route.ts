import { NextResponse } from "next/server"
import { CartResponse } from "@/interfaces"
import { getAccessToken } from "../getAccessToken";

export async function GET() {
    let accessToken=await getAccessToken();
  
  try {
    

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: {
          token: accessToken,
      }}
    )

    const data: CartResponse = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Unauthorized or token invalid" },
      { status: 401 }
    )
  }
}
