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
import { useGetShifts } from "@/provider/shift/shift.queries";
import type { Shift } from "@/provider/shift/shift.types";
import { Skeleton } from "@/components/ui/skeleton";
import { AddShiftDialog } from "./add-shift-dialog";
import { useDebounce } from "@/hooks/use-debounce";

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
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: shiftsResponse, isLoading } = useGetShifts();

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
                {shift?.users?.length}
                {shift?.users?.length > 1 ? " Employees" : " Employee"}
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
        headerClassName: "font-medium",
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
          {formatTo12Hour(row.original.shift_start_time)} -
          {formatTo12Hour(row.original.shift_end_time)}
        </span>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-36" />,
        headerClassName: "font-medium",
      },
    },

    {
      id: "employees",
      header: "Employees",
      size: 260,
      accessorFn: (row) => {
        const count = row.users.length;
        const emails = row.users.map((e) => e.email).join(" ");
        const employeeText = count === 1 ? "1 employee" : `${count} employees`;
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
    data: shifts,
    columns: shiftColumns,
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
    <div className="h-full p-4 pb-0 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 shrink-0">
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
          Add new Shift
        </Button>

        <AddShiftDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
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
        <div className="w-full flex-1 flex flex-col">
          <DataGridContainer border={false} className="flex-1 min-h-0">
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </DataGridContainer>
          <div className="shrink-0 py-2">
            <DataGridPagination />
          </div>
        </div>
      </DataGrid>
    </div>
  );
}
