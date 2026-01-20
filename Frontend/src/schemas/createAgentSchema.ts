import { z } from "zod"

export const createAgentSchema = z.object({
  name: z
    .string()
    .min(3, "Must be at least 3 characters"),
  personality: z.enum([
    "friendly",
    "neutral",
    "professional",
    "humorous",
  ]),
  instructions: z
    .string()
    .min(10, "Instructions must be at least 10 characters"),
})

export type CreateAgentFormValues = z.infer<typeof createAgentSchema>
