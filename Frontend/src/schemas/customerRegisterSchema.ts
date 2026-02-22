import { z } from "zod";

export const customerRegisterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  contact: z.string().email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters"),
  source: z.string().min(1, "Source is required"),
  profile_uri: z.string().optional(),
  company_id: z.string().uuid("Invalid company ID"),
});

export type CustomerRegisterFormValues = z.infer<typeof customerRegisterSchema>;
