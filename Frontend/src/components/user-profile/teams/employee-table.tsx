import { useMemo, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"


import employees from "@/constants/employees.json";

interface IEmployee {
  user_name: string;
  email: string;
  profile_uri: string;
  departments: string[];
  assigned_conversations: number;
  last_updated: string;
  is_online: boolean;
}
interface InviteEmployeeFormValues {
  name: string;
  email: string;
  department: string;
  shift: string;
}

export function EmployeeTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [allEmployees, setAllEmployees] = useState<IEmployee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllEmployees(employees);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const inviteForm = useForm<InviteEmployeeFormValues>({
    defaultValues: {
      name: "",
      email: "",
      department: "",
      shift: "",
    },
    mode: "onBlur",
  })

  const columns = useMemo<ColumnDef<IEmployee>[]>(
    () => [
      {
        id: "user",
        header: "Customer",
        accessorFn: (row) => `${row.user_name} ${row.email}`,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-secondary">
              <AvatarImage
                src={row.original.profile_uri}
                alt={row.original.user_name}
              />
              <AvatarFallback className="bg-secondary text-foreground">
                {row.original.user_name
                  ? row.original.user_name.charAt(0).toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-primary">
                {row.original.user_name}
              </div>
              <div className="text-sm text-muted-foreground">
                {row.original.email}
              </div>
            </div>
          </div>
        ),
        size: 280,
        meta: {
          skeleton: (
            <div className="flex items-center gap-3 h-[41px]">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ),
          headerClassName: "text-primary",
        },
      },
      {
        id: "departments",
        header: "Department",
        accessorFn: (row) => row.departments.join(" "),
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-2">
            {row.original.departments.map((dept) => (
              <Badge
                key={dept}
                variant="secondary"
                className="bg-secondary rounded-xl text-muted-foreground font-normal"
              >
                {dept}
              </Badge>
            ))}
          </div>
        ),
        size: 250,
        meta: {
          skeleton: <Skeleton className="h-4 w-32 rounded-xl" />,
          headerClassName: "text-primary",
        },
      },
      {
        accessorKey: "assigned_conversations",
        header: "Assigned Conversation",
        cell: ({ row }) => (
          <span className="text-foreground">
            {row.original.assigned_conversations}
          </span>
        ),
        size: 180,
        meta: {
          skeleton: <Skeleton className="h-4 w-10" />,
          headerClassName: "text-primary",
        },
      },
      {
        id: "status",
        header: "Last Updated",
        accessorFn: (row) =>
          row.is_online
            ? "accepting conversation online"
            : `last seen ${row.last_updated}`,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {row.original.is_online ? (
                <>
                  {" "}
                  <span className="text-green-500 pr-2"> ● </span> Accepting
                  Conversation{" "}
                </>
              ) : (
                <>
                  {" "}
                  <span className="text-muted-foreground pr-2"> ● </span> Last
                  seen: {row.original.last_updated}{" "}
                </>
              )}
            </span>
          </div>
        ),
        size: 220,
        meta: {
          skeleton: <Skeleton className="h-4 w-36" />,
          headerClassName: "text-primary",
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: allEmployees,
    columns,
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
          Invite Employee
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-popover max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium text-primary">
                Invite New Employee
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Enter the email of the person you want to invite. They will
                receive an invitation email.
              </DialogDescription>
            </DialogHeader>
            <Form {...inviteForm}>
              <form
                onSubmit={inviteForm.handleSubmit((data) => {
                  console.log("Invite employee:", data);
                  setIsDialogOpen(false);
                  inviteForm.reset();
                })}
              >
                <div className="space-y-5 mt-2">
                  {/* Employee Name */}
                  <FormField
                    control={inviteForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-primary">
                          Employee Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          className="h-10"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Employee Email */}
                  <FormField
                    control={inviteForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-primary">
                          Employee Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <Input
                          {...field}
                          type="email"
                          placeholder="user@example.com"
                          className="h-10"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Department */}
                  <FormField
                    control={inviteForm.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-primary">
                          Department <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select a Department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">
                              Engineering
                            </SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="hr">HR</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Shift */}
                  <FormField
                    control={inviteForm.control}
                    name="shift"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-primary">
                          Shift <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select a Shift" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="evening">Evening</SelectItem>
                            <SelectItem value="night">Night</SelectItem>
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
                  <Button type="submit">Send Invitation</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <DataGrid
        table={table}
        isLoading={isLoading}
        recordCount={employees.length || 0}
        tableLayout={{
          headerBackground: false,
          rowBorder: true,
          rowRounded: false,
        }}
      >
        <div className="w-full flex flex-col justify-between min-h-[calc(100vh-16.1rem)] space-y-2.5">
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
