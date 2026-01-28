'use server'
import { getAccessToken } from "@/app/api/getAccessToken";


export async function addToCartAction(productId: string) {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart/', {
      method: 'POST',
      body: JSON.stringify({ productId }),
      headers: {
        token: accessToken,
        'content-type': 'application/json',
      },
    });

    const data = await res.json();

    return {
      success: res.ok,
      data,
      status: res.status,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Add to cart failed",
    };
  }
}
export async function addToWishAction(productId: string) {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist/', {
      method: 'POST',
      body: JSON.stringify({ productId }),
      headers: {
        token: accessToken,
        'content-type': 'application/json',
      },
    });

    const data = await res.json();

    return {
      success: res.ok,
      data,
      status: res.status,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Add to wishlist failed",
    };
  }
}