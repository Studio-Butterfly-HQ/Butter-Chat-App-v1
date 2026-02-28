import { z } from "zod";

export const inviteEmployeeSchema = z.object({
  email: z.string().email("Invalid email address"),
  department: z.string().min(1, "Department is required"),
  shift: z.string().min(1, "Shift is required"),
});

export type InviteEmployeeFormValues = z.infer<typeof inviteEmployeeSchema>;
