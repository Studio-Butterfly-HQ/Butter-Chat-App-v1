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
  createDepartmentSchema,
  CreateDepartmentFormValues,
} from "@/schemas/departmentSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateDepartment } from "@/provider/department/department.queries";
import { Spinner } from "@/components/ui/spinner";
import { EmployeeSearchCard } from "./employee-search-card";

interface AddDepartmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AddDepartmentDialog = memo(function AddDepartmentDialog({
  open,
  onOpenChange,
}: AddDepartmentDialogProps) {
  const { mutateAsync: createDepartment, isPending } = useCreateDepartment();

  const departmentForm = useForm<CreateDepartmentFormValues>({
    defaultValues: {
      department_name: "",
    },
    resolver: zodResolver(createDepartmentSchema),
    mode: "onChange",
  });

  const onDepartmentFormSubmit = async (data: CreateDepartmentFormValues) => {
    try {
      await createDepartment({
        department_name: data.department_name,
      });
      departmentForm.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating department: ", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-popover max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-primary">
            Add Department
          </DialogTitle>
          <DialogDescription>
            Create a new department for organizing employees. Click save when
            you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...departmentForm}>
          <form onSubmit={departmentForm.handleSubmit(onDepartmentFormSubmit)}>
            <div className="space-y-5 mt-2">
              {/* Department Name */}
              <FormField
                control={departmentForm.control}
                name="department_name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-normal text-primary">
                      Department Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Sales Department"
                      className="h-10"
                    />
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              {/* Add Employees */}
              <div className="space-y-2">
                <label className="text-sm text-primary">Add Employees</label>
                <EmployeeSearchCard />
              </div>
            </div>

            <DialogFooter className="flex gap-2 md:gap-0 mt-6">
              <DialogClose asChild>
                <Button variant="outline" className="bg-transparent">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Spinner />
                    Saving...
                  </>
                ) : (
                  <>Save Department</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
