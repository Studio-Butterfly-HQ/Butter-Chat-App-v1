import { z } from "zod";

export const addRecordSchema = z.object({
  outletName: z.string().min(1, "Outlet Name is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  openingHour: z.string().min(1, "Opening Hour is required"),
  closingHour: z.string().min(1, "Closing Hour is required"),
  selectedDays: z.array(z.string()).min(1, "Please select at least one day"),
});

export type AddRecordFormValues = z.infer<typeof addRecordSchema>;
