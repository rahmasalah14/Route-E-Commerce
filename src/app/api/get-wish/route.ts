import { WishResponse } from "@/interfaces/wishlist"
import { NextResponse } from "next/server"
import { getAccessToken } from "../getAccessToken";

export async function GET() {
      let accessToken=await getAccessToken();
  
  try {

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token: accessToken,
        },
      }
    )

    const data: WishResponse = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    )
  }
}
