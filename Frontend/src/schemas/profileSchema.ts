import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(3, "Must be at least 3 characters"),
  category: z.string().min(1, "Category is required"),
  country: z.string().min(1, "Country is required"),
  language: z.string().min(1, "Language is required"),
  timezone: z.string().min(1, "Timezone is required"),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
