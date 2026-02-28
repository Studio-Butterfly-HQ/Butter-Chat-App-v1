import * as z from "zod";

export const addReplySchema = z.object({
  visibility: z.enum(["shared", "private"]),
  language: z.string().min(1, "Language is required"),
  department: z.string().min(1, "Department is required"),
  body: z.string().min(1, "Reply text is required"),
  tags: z.array(z.string()),
});

export type AddReplyFormValues = z.infer<typeof addReplySchema>;
