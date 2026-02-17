import { memo } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  inviteEmployeeSchema,
  type InviteEmployeeFormValues,
} from "@/schemas/inviteEmployeeSchema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetDepartments } from "@/provider/department/department.queries";
import { useGetShifts } from "@/provider/shift/shift.queries";
import { useInviteUser } from "@/provider/user/user.queries";
import { Department } from "@/provider/department/department.types";
import { Shift } from "@/provider/shift/shift.types";

interface InviteEmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InviteEmployeeDialog = memo(function InviteEmployeeDialog({
  open,
  onOpenChange,
}: InviteEmployeeDialogProps) {
  const { data: departmentsData } = useGetDepartments();
  const { data: shiftsData } = useGetShifts();
  const { mutateAsync: inviteUser, isPending } = useInviteUser();

  const inviteForm = useForm<InviteEmployeeFormValues>({
    resolver: zodResolver(inviteEmployeeSchema),
    defaultValues: {
      email: "",
      department: "",
      shift: "",
    },
    mode: "onChange",
  });

  const handleFormSubmit = async (data: InviteEmployeeFormValues) => {
    try {
      await inviteUser({
        email: data.email,
        department_ids: [data.department],
        shift_ids: [data.shift],
      });
      onOpenChange(false);
      inviteForm.reset();
    } catch (error) {
      console.log("Error inviting user-page: ", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-popover max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-primary">
            Invite New Employee
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the email of the person you want to invite. They will receive
            an invitation email.
          </DialogDescription>
        </DialogHeader>
        <Form {...inviteForm}>
          <form onSubmit={inviteForm.handleSubmit(handleFormSubmit)}>
            <div className="space-y-4 mt-2">
              {/* Employee Email */}
              <FormField
                control={inviteForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-normal text-primary">
                      Employee Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <Input {...field} type="email" placeholder="user@example.com" />
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              {/* Department */}
              <FormField
                control={inviteForm.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className=" font-normal text-primary">
                      Department <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departmentsData?.data?.map((dept: Department) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.department_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              {/* Shift */}
              <FormField
                control={inviteForm.control}
                name="shift"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-normal text-primary">
                      Shift <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Shift" />
                      </SelectTrigger>
                      <SelectContent>
                        {shiftsData?.data?.map((shift: Shift) => (
                          <SelectItem key={shift.id} value={shift.id}>
                            {shift.shift_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
              <Button type="submit" disabled={isPending}>
                {isPending ? "Sending..." : "Send Invitation"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
