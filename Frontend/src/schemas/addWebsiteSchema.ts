import { z } from "zod";

export const addWebsiteSchema = z.object({
  uri: z.string().min(3, "Website URL is required").url("Please enter a valid URL"),

//   scanOption: z.enum([
//     "child-pages",
//     "all-pages",
//     "specified-url",
//   ]),

//   cssSelector: z.string().optional(),

//   excludeSelectors: z.string().optional(),
})

export type AddWebsiteFormValues = z.infer<
  typeof addWebsiteSchema
>
