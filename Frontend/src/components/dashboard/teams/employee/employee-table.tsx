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
import { InviteEmployeeDialog } from "./invite-employee-dialog";
import { useDebounce } from "@/hooks/use-debounce";

import { useGetUsers } from "@/provider/user/user.queries";
import { User, UserDepartment } from "@/provider/user/user.types";

export function EmployeeTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: usersData, isLoading } = useGetUsers();

  const allEmployees = usersData?.data || [];

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "user",
        header: "Employee",
        accessorFn: (row) => `${row.user_name} ${row.email}`,
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-secondary">
              <AvatarImage
                src={row.original.avatar || ""}
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
          headerClassName: "text-primary font-medium",
        },
      },
      {
        id: "departments",
        header: "Department",
        accessorFn: (row) =>
          row.departments
            .map((d: UserDepartment) => d.department_name)
            .join(" "),
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-2">
            {row.original.departments.map((dept: UserDepartment) => (
              <Badge
                key={dept.id}
                variant="secondary"
                className="bg-secondary rounded-xl text-muted-foreground font-normal"
              >
                {dept.department_name}
              </Badge>
            ))}
          </div>
        ),
        size: 250,
        meta: {
          skeleton: <Skeleton className="h-4 w-32 rounded-xl" />,
          headerClassName: "text-primary font-medium",
        },
      },
      {
        accessorKey: "assigned_conversations",
        header: "Assigned Conversation",
        cell: ({ row }) => (
          <span className="text-foreground">
            {row.original.assigned_conversations || 0}
          </span>
        ),
        size: 180,
        meta: {
          skeleton: <Skeleton className="h-4 w-10" />,
          headerClassName: "text-primary font-medium",
        },
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground capitalize">
              {row.original.status?.toLowerCase() ?? "unknown"}
            </span>
          </div>
        ),
        size: 150,
        meta: {
          skeleton: <Skeleton className="h-4 w-36" />,
          headerClassName: "text-primary font-medium",
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: allEmployees,
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

        <Button className="h-10" onClick={() => setIsDialogOpen(true)}>
          <Plus />
          Invite Employee
        </Button>

        <InviteEmployeeDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>

      <DataGrid
        table={table}
        isLoading={isLoading}
        recordCount={allEmployees.length || 0}
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
