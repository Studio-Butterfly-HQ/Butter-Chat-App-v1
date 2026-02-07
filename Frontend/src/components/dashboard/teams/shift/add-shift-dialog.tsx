import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createShiftSchema,
  CreateShiftFormValues,
} from "@/schemas/createShiftSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateShift } from "@/provider/shift/shift.queries";
import { Spinner } from "@/components/ui/spinner";
import { Clock } from "lucide-react";

interface AddShiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddShiftDialog = memo(function AddShiftDialog({
  open,
  onOpenChange,
}: AddShiftDialogProps) {
  const { mutateAsync: createShift, isPending: isLoading } = useCreateShift();

  const shiftForm = useForm<CreateShiftFormValues>({
    resolver: zodResolver(createShiftSchema),
    defaultValues: {
      shift_name: "",
      shift_start_time: "",
      shift_end_time: "",
    },
    mode: "onChange",
  });

  const onShiftFormSubmit = async (data: CreateShiftFormValues) => {
    try {
      const parseTo24 = (time: string) => {
        if (!time) return time;

        const hhmm24 = time.match(/^(?:[01]?\d|2[0-3]):[0-5]\d$/);
        if (hhmm24) return hhmm24[0];

        const ampm = time.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
        if (ampm) {
          let hh = parseInt(ampm[1], 10);
          const mm = ampm[2];
          const isPM = /p/i.test(ampm[3]);
          if (hh === 12) hh = isPM ? 12 : 0;
          else if (isPM) hh += 12;
          return `${hh.toString().padStart(2, "0")}:${mm}`;
        }

        const parsed = new Date(`1970-01-01T${time}`);
        if (!isNaN(parsed.getTime())) {
          const hh = parsed.getHours().toString().padStart(2, "0");
          const mm = parsed.getMinutes().toString().padStart(2, "0");
          return `${hh}:${mm}`;
        }

        return time;
      };

      const payload: CreateShiftFormValues = {
        ...data,
        shift_start_time: parseTo24(data.shift_start_time),
        shift_end_time: parseTo24(data.shift_end_time),
      };
      await createShift(payload);
      shiftForm.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error in shift page: ", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-popover max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal text-primary">
            Add Shift
          </DialogTitle>
          <DialogDescription>
            Create a new shift for your team members. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>

        <Form {...shiftForm}>
          <form onSubmit={shiftForm.handleSubmit(onShiftFormSubmit)}>
            <div className="space-y-5 mt-2">
              {/* Shift Name */}
              <FormField
                control={shiftForm.control}
                name="shift_name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-normal text-primary">
                      Shift Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Morning Shift"
                      className="h-10"
                    />
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              {/* Start Time */}
              <FormField
                control={shiftForm.control}
                name="shift_start_time"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-normal text-primary">
                      Start Time <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type="time"
                        placeholder="00:00 am"
                        className="h-10"
                      />
                      <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    </div>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              {/* End Time */}
              <FormField
                control={shiftForm.control}
                name="shift_end_time"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-normal text-primary">
                      End Time <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type="time"
                        placeholder="00:00 am"
                        className="h-10"
                      />
                      <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    </div>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="flex gap-2 md:gap-0 mt-6">
              <DialogClose asChild>
                <Button variant="outline" className="bg-transparent">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner />
                    Saving...
                  </>
                ) : (
                  <>Save Shift</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
