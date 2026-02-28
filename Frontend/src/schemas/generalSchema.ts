import { z } from "zod";

export const generalSchema = z.object({
  user_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().optional(),
});

export type GeneralFormValues = z.infer<typeof generalSchema>;
