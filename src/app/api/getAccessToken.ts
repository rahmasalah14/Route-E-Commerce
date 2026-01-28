// app/api/getAccessToken.ts
'use server'
import { cookies } from "next/headers"
import { decode } from "next-auth/jwt"

export async function getAccessToken(): Promise<string> {
  const cookieStore = await cookies()

  const sessionToken =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value

  if (!sessionToken) {
    throw new Error("No session token found")
  }

  const decoded = await decode({
    token: sessionToken,
    secret: process.env.NEXT_AUTH_SECRET!,
  })

  if (!decoded || typeof decoded === "string") {
    throw new Error("Invalid decoded token")
  }

  if (!decoded.token) {
    throw new Error("No token in JWT")
  }

  return decoded.token as string
}
