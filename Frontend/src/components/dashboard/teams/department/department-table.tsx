import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Loader2, Plus, Search } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDepartments } from "@/provider/department/department.queries";
import type { Department } from "@/provider/department/department.types";
import { AddDepartmentDialog } from "./add-department-dialog";
import { useDebounce } from "@/hooks/use-debounce";

export function DepartmentTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [open, setOpen] = useState(false);

  const { data: departmentsResponse, isLoading } = useGetDepartments();

  // Use API data directly
  const allDepartments = departmentsResponse?.data || [];

  const columns: ColumnDef<Department>[] = [
    {
      accessorKey: "department_name",
      header: "Department",
      size: 300,
      minSize: 260,
      cell: ({ row }) => {
        const dept = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-secondary">
              <AvatarFallback className="text-lg font-medium">
                {dept.department_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-primary">
                {dept.department_name}
              </div>
              <div className="text-xs text-muted-foreground">
                {dept.employee_count}
                {dept.employee_count > 1 ? " Employees" : " Employee"}
              </div>
            </div>
          </div>
        );
      },
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
        headerClassName: "font-medium",
      },
    },

    {
      id: "employees",
      header: "Employees",
      size: 260,
      minSize: 240,
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
                  className="h-10 w-10 border-2 bg-secondary border-background"
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
          <div className="flex -space-x-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        ),
        headerClassName: "font-medium",
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
        headerClassName: "font-medium",
      },
    },
  ];

  const table = useReactTable({
    data: allDepartments,
    columns,
    state: {
      globalFilter: debouncedSearchTerm,
      pagination,
    },
    onGlobalFilterChange: setSearchTerm,
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>

        <Button className="h-10" onClick={() => setOpen(true)}>
          <Plus />
          Add new Department
        </Button>

        <AddDepartmentDialog open={open} onOpenChange={setOpen} />
      </div>

      <DataGrid
        table={table}
        isLoading={isLoading}
        recordCount={allDepartments.length}
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
