import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters long"),
})

export type LoginFormValues = z.infer<typeof loginSchema>
