import * as z from "zod"

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
  rePassword: z.string(),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"),
}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "Passwords do not match",
})
