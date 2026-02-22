import { z } from "zod";

export const customerLoginSchema = z.object({
  contact: z.string().min(3, "Must be at least 3 characters long"),
  password: z.string().min(8, "Must be at least 8 characters long"),
  source: z.string().min(1, "Source is required"),
  company_id: z.string().uuid("Invalid company ID"),
});

export type CustomerLoginFormValues = z.infer<typeof customerLoginSchema>;
