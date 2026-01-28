"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerSchema } from "@/app/_Components/schema"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type RegisterForm = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  })

  async function onSubmit(data: RegisterForm) {
    setLoading(true)
    setApiError(null)

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      )

      const result = await res.json()
      console.log(result)
      if (result.message === "success") {
        router.push("/login")
      } else {
        setApiError(result.message || "Something went wrong")
      }
    } catch (error) {
      setApiError("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">
         Register now and Join US
        </h1>

       <div className="border-2 rounded-lg p-6 mb-4">
         <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="mb-3">Name</Label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label  className="mb-3">Email</Label>
            <Input type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-3">Password</Label>
            <Input type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label  className="mb-3">Confirm Password</Label>
            <Input type="password" {...register("rePassword")} />
            {errors.rePassword && (
              <p className="text-sm text-red-500">
                {errors.rePassword.message}
              </p>
            )}
          </div>

          <div>
            <Label  className="mb-3">Phone</Label>
            <Input {...register("phone")} />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {apiError && (
            <p className="text-center text-red-500 text-sm">{apiError}</p>
          )}

          <Button className="w-full bg-accent-foreground text-white" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>
       </div>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
