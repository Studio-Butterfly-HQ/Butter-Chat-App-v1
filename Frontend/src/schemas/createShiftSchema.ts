import { z } from "zod"

export const createShiftSchema = z
  .object({
    shift_name: z
      .string()
      .min(3, "Must be at least 3 characters"),

    shift_start_time: z
      .string()
      .min(1, "Start time is required"),

    shift_end_time: z
      .string()
      .min(1, "End time is required"),
  })
  .refine(
    (data) => {
      // Assuming HH:MM format from time inputs
      const [startH, startM] = data.shift_start_time.split(':').map(Number);
      const [endH, endM] = data.shift_end_time.split(':').map(Number);
      return endH * 60 + endM > startH * 60 + startM;
    },
    {
      message: "End time must be after start time",
      path: ["shift_end_time"],
    }
  )
export type CreateShiftFormValues = z.infer<typeof createShiftSchema>
