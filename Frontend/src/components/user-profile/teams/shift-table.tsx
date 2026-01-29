import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plus, Search, Clock } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  createShiftSchema,
  CreateShiftFormValues,
} from "@/schemas/createShiftSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateShift, useGetShifts } from "@/provider/shift/shift.queries";
import type { Shift } from "@/provider/shift/shift.types";
import { Skeleton } from "@/components/ui/skeleton";

// Helper function to convert 24-hour time to 12-hour format with AM/PM
const formatTo12Hour = (time24: string): string => {
  if (!time24) return time24;

  // Remove seconds if present (HH:MM:SS -> HH:MM)
  const timeParts = time24.split(":");
  const hours24 = parseInt(timeParts[0], 10);
  const minutes = timeParts[1];

  // Convert to 12-hour format
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12; // Convert 0 to 12 for midnight

  return `${hours12}:${minutes} ${period}`;
};

export function ShiftTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutateAsync } = useCreateShift();
  const { data: shiftsResponse, isLoading } = useGetShifts();

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
      console.log("data: ", payload);
      await mutateAsync(payload);
      shiftForm.reset();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error in shift page: ", error);
    }
  };

  // Use API data directly without transformation
  const shifts = shiftsResponse?.data || [];

  const shiftColumns: ColumnDef<Shift>[] = [
    {
      accessorKey: "shift_name",
      header: "Shift",
      size: 260,
      cell: ({ row }) => {
        const shift = row.original;

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-secondary">
              <AvatarFallback className="text-lg font-medium">
                {shift.shift_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{shift.shift_name}</div>
              <div className="text-xs text-muted-foreground">
                {shift?.users?.length} {" "}
                {shift?.users?.length > 1 ? "Employees" : "Employee"}
              </div>
            </div>
          </div>
        );
      },
      meta: {
        skeleton: (
          <div className="flex items-center gap-3 h-[44px]">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ),
        headerClassName: "text-primary font-medium",
      },
    },

    {
      id: "duration",
      header: "Duration",
      size: 220,
      accessorFn: (row) =>
        `${formatTo12Hour(row.shift_start_time)} - ${formatTo12Hour(row.shift_end_time)}`,
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {formatTo12Hour(row.original.shift_start_time)} -{" "}
          {formatTo12Hour(row.original.shift_end_time)}
        </span>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-36" />,
        headerClassName: "text-primary font-medium",
      },
    },

    {
      id: "employees",
      header: "Employees",
      size: 260,
      accessorFn: (row) => {
        const count = row.users.length;
        const emails = row.users.map((e) => e.email).join(" ");
        const employeeText = count === 0 ? "0 employees" : `${count} employees`;
        return `${employeeText} ${emails}`;
      },
      cell: ({ row }) => {
        const users = row.original.users;

        if (users.length === 0) {
          return (
            <span className="text-sm text-muted-foreground">No Employees</span>
          );
        }

        return (
          <div className="flex items-center">
            <div className="flex -space-x-2 overflow-hidden">
              {users.slice(0, 3).map((user, idx) => (
                <Avatar
                  key={idx}
                  className="h-11 w-11 border-2 border-background bg-secondary"
                >
                  {user.profile_uri ? (
                    <AvatarImage src={user.profile_uri} alt={user.user_name} />
                  ) : null}
                  <AvatarFallback className="text-sm font-medium">
                    {user.user_name
                      ? user.user_name.charAt(0).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            {users.length > 3 && (
              <span className="ml-3 text-sm text-muted-foreground font-medium">
                +{users.length - 3} more
              </span>
            )}
          </div>
        );
      },
      meta: {
        skeleton: (
          <div className="flex -space-x-2 h-[44px]">
            <Skeleton className="h-11 w-11 rounded-full" />
            <Skeleton className="h-11 w-11 rounded-full" />
            <Skeleton className="h-11 w-11 rounded-full" />
          </div>
        ),
        headerClassName: "text-primary font-medium",
      },
    },

    {
      id: "status",
      header: "Status",
      size: 180,
      cell: ({ row }) => {
        const users = row.original.users;
        const online = users.filter((e) => e.status === "ACTIVE").length;

        return (
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`h-2 w-2 rounded-full ${
                online > 0 ? "bg-green-500" : "bg-muted-foreground"
              }`}
            />
            <span className="text-muted-foreground">
              {online} of {users.length} Online
            </span>
          </div>
        );
      },
      meta: {
        skeleton: <Skeleton className="h-4 w-28" />,
        headerClassName: "text-primary font-medium",
      },
    },
  ];

  const table = useReactTable({
    data: shifts,
    columns: shiftColumns,
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-8 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <Button className="h-10" onClick={() => setIsDialogOpen(true)}>
          <Plus />
          Add new Shift
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-popover max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-normal text-primary">
                Add Shift
              </DialogTitle>
              <DialogDescription>
              Create a new shift for your team members. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <Form {...shiftForm}>
            <form
              onSubmit={shiftForm.handleSubmit(onShiftFormSubmit)}
            >
                <div className="space-y-5 mt-2">
                  {/* Shift Name */}
                  <FormField
                    control={shiftForm.control}
                    name="shift_name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-base font-normal text-primary">
                          Shift Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="Morning Shift"
                          className="h-10"
                        />
                      <FormMessage className="text-sm"/>
                      </FormItem>
                    )}
                  />

                  {/* Start Time */}
                  <FormField
                    control={shiftForm.control}
                    name="shift_start_time"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-base font-normal text-primary">
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
                      <FormMessage className="text-sm"/>
                      </FormItem>
                    )}
                  />

                  {/* End Time */}
                  <FormField
                    control={shiftForm.control}
                    name="shift_end_time"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-base font-normal text-primary">
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
                      <FormMessage className="text-sm"/>
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
                <Button type="submit">
                  Save Shift
                </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <DataGrid
        table={table}
        isLoading={isLoading}
        recordCount={shifts.length}
        tableLayout={{
          headerBackground: false,
          rowBorder: true,
          rowRounded: false,
        }}
      >
        <div className="w-full space-y-2.5">
          <DataGridContainer border={false}>
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </DataGridContainer>
          <DataGridPagination />
        </div>
      </DataGrid>
    </div>
  );
}
