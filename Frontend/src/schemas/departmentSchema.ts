import { z } from "zod"

export const createDepartmentSchema = z.object({
  department_name: z
    .string()
    .min(3, "Must be at least 3 characters"),
})

export type CreateDepartmentFormValues = z.infer<
  typeof createDepartmentSchema
>
