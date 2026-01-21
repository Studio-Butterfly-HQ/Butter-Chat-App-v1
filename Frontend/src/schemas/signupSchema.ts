import { z } from "zod"

export const signupSchema = z
  .object({
    company_name: z
      .string()
      .min(3, "Must be at least 3 characters"),

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
      .min(8, "Must be at least 8 characters"),

    confirm_password: z
      .string()
      .min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export type SignupFormValues = z.infer<typeof signupSchema>
