
"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
export const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters"),
})

 function Login() {

 let searchParams = useSearchParams()
  console.log(searchParams.get("error"))
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
    const res= await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/",})
      console.log(res)
  }
  return (
<div className="mt-4 mb-4">
    {searchParams.get("error") && (
    <h2 className="text-center text-red-600 mb-4">
      {searchParams.get("error")}
    </h2>
  )}


  <Card className="w-full  max-w-md mx-auto shadow-lg">



  <CardHeader className="text-center space-y-2">
    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
    <CardDescription>
      Login to your account to continue shopping
    </CardDescription>
  </CardHeader>

  <CardContent>
    <form
      id="login-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
   
   
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              {...field}
              id="email"
              type="email"
              placeholder="name@example.com"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.error && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

  
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              {...field}
              id="password"
              type="password"
              placeholder="••••••••"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.error && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />

      <div className="text-right">
        <button
          type="button"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" className="w-full">
        Login
      </Button>

    </form>
  </CardContent>

  <CardFooter className="flex flex-col gap-2">
    <p className="text-sm text-muted-foreground">
      Don’t have an account?
    </p>
    <Link href="/register">
   <Button variant="outline" className="w-full p-3">
      Create Account
    </Button>
    </Link>
  </CardFooter>
  </Card>

</div>
  )
}

export default Login