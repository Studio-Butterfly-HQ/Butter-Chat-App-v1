import { z } from "zod";

export const invitationSchema = z.object({
  user_name: z.string().min(3, "Must be at least 3 characters"),
  password: z.string().min(6, "Must be at least 6 characters"),
  bio: z.string().optional(),
});

export type InvitationFormValues = z.infer<typeof invitationSchema>;
