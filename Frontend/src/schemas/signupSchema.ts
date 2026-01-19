import { z } from "zod"

export const signupSchema = z
  .object({
    companyName: z
      .string()
      .min(2, "Company name must be at least 2 characters"),

    subdomain: z
      .string()
      .min(3, "Subdomain must be at least 3 characters")
      .regex(
        /^[a-z0-9-]+$/,
        "Only contain lowercase letters, numbers, and hyphens"
      ),

    email: z
      .string()
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export type SignupFormValues = z.infer<typeof signupSchema>
