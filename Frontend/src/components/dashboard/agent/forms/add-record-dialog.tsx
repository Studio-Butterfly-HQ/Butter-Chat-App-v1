import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addRecordSchema,
  AddRecordFormValues,
} from "@/schemas/addRecordSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

interface AddRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const hour = i % 12 === 0 ? 12 : i % 12;
      const ampm = i < 12 ? "AM" : "PM";
      const minute = j === 0 ? "00" : "30";
      times.push(`${hour}:${minute} ${ampm}`);
    }
  }
  return times;
};

const TIME_OPTIONS = generateTimeOptions();

export function AddRecordDialog({ open, onOpenChange }: AddRecordDialogProps) {
  const [isDaysOpen, setIsDaysOpen] = useState(false);

  const form = useForm<AddRecordFormValues>({
    resolver: zodResolver(addRecordSchema),
    defaultValues: {
      outletName: "",
      address: "",
      phoneNumber: "",
      openingHour: "",
      closingHour: "",
      selectedDays: [], // Initialize as empty array
    },
  });

  const onSubmit = (data: AddRecordFormValues) => {
    console.log(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-popover max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal text-primary">
            Add Address
          </DialogTitle>
          <DialogDescription>
            Add a new address for your form. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 mt-2"
          >
            <FormField
              control={form.control}
              name="outletName"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="font-normal text-primary">
                    Outlet Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Joh Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="font-normal text-primary">
                    Address<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="font-normal text-primary">
                    Phone Number<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="user@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="openingHour"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="font-normal text-primary">
                    Opening Hour<span className="text-red-500">*</span>
                  </FormLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type="time"
                        placeholder="00:00 am"
                        className="h-9"
                      />
                      <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="closingHour"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="font-normal text-primary">
                    Closing Hour<span className="text-red-500">*</span>
                  </FormLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type="time"
                        placeholder="00:00 am"
                        className="h-9"
                      />
                      <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                    </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selectedDays"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel className="font-normal text-primary">
                    Open Days<span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover open={isDaysOpen} onOpenChange={setIsDaysOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={isDaysOpen}
                          className="w-full justify-between bg-transparent h-auto min-h-10 py-2 text-left font-normal"
                        >
                          {field.value && field.value.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {field.value.slice(0, 3).map((day) => (
                                <Badge
                                  key={day}
                                  variant="secondary"
                                  className="rounded-sm px-1 font-normal"
                                >
                                  {day}
                                </Badge>
                              ))}
                              {field.value.length > 3 && (
                                <span className="text-muted-foreground text-xs self-center">
                                  +{field.value.length - 3} more
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              Select days...
                            </span>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[380px] p-0" align="start">
                      <div className="p-2 grid gap-1">
                        {DAYS.map((day) => (
                          <div
                            key={day}
                            className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                            onClick={() => {
                              const currentValues = field.value || [];
                              const newValues = currentValues.includes(day)
                                ? currentValues.filter((d) => d !== day)
                                : [...currentValues, day];
                              field.onChange(newValues);
                            }}
                          >
                            <Checkbox
                              id={day}
                              checked={field.value?.includes(day)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                let newValues: string[];
                                if (checked) {
                                  newValues = [...currentValues, day];
                                } else {
                                  newValues = currentValues.filter(
                                    (d) => d !== day,
                                  );
                                }
                                field.onChange(newValues);
                              }}
                            />
                            <Label
                              htmlFor={day}
                              className="flex-1 cursor-pointer font-normal"
                            >
                              {day}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
