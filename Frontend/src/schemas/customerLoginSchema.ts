import { z } from "zod";

export const customerLoginSchema = z.object({
  contact: z.string().email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters long"),
  source: z.string().min(1, "Source is required"),
  company_id: z.string().uuid("Invalid company ID"),
});

export type CustomerLoginFormValues = z.infer<typeof customerLoginSchema>;
