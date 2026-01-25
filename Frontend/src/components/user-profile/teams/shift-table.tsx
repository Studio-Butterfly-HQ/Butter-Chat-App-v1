import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plus, Search } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import shifts from "@/constants/shifts.json";
import { Skeleton } from "@/components/ui/skeleton";

interface ShiftEmployee {
  name: string;
  avatar: string;
  status: "ACTIVE" | "INACTIVE";
}

interface ShiftRow {
  shift_name: string;
  start_time: string;
  end_time: string;
  employees: ShiftEmployee[];
}

export function ShiftTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [allShifts, setAllShifts] = useState<ShiftRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllShifts(shifts as ShiftRow[]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const shiftColumns: ColumnDef<ShiftRow>[] = [
    {
      accessorKey: "shift_name",
      header: "Shift",
      size: 260,
      cell: ({ row }) => {
        const shift = row.original;

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 bg-secondary">
              <AvatarFallback className="text-lg font-medium">
                {shift.shift_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{shift.shift_name}</div>
              <div className="text-xs text-muted-foreground">
                {shift.employees.length} Employees
              </div>
            </div>
          </div>
        );
      },
      meta: {
        skeleton: (
          <div className="flex items-center gap-3 h-[44px]">
            <Skeleton className="h-11 w-11 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ),
        headerClassName: "text-primary",
      },
    },

    {
      id: "duration",
      header: "Duration",
      size: 220,
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.start_time} - {row.original.end_time}
        </span>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-36" />,
        headerClassName: "text-primary",
      },
    },

    {
      id: "employees",
      header: "Employees",
      size: 260,
      cell: ({ row }) => {
        const employees = row.original.employees;

        return (
          <div className="flex items-center">
            <div className="flex -space-x-2 overflow-hidden">
              {employees.slice(0, 3).map((emp, idx) => (
                <Avatar
                  key={idx}
                  className="h-11 w-11 border-2 border-background bg-secondary"
                >
                  {emp.avatar ? (
                    <AvatarImage src={emp.avatar} alt={emp.name} />
                  ) : null}
                  <AvatarFallback className="text-sm font-medium">
                    {emp.name ? emp.name.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            {employees.length > 3 && (
              <span className="ml-3 text-sm text-muted-foreground font-medium">
                +{employees.length - 3} more
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
        headerClassName: "text-primary",
      },
    },

    {
      id: "status",
      header: "Status",
      size: 180,
      cell: ({ row }) => {
        const employees = row.original.employees;
        const online = employees.filter((e) => e.status === "ACTIVE").length;

        return (
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`h-2 w-2 rounded-full ${
                online > 0 ? "bg-green-500" : "bg-muted-foreground"
              }`}
            />
            <span className="text-muted-foreground">
              {online} of {employees.length} Online
            </span>
          </div>
        );
      },
      meta: {
        skeleton: <Skeleton className="h-4 w-28" />,
        headerClassName: "text-primary",
      },
    },
  ];

  const table = useReactTable({
    data: allShifts,
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
            placeholder="Search shift"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <Button className="h-10">
          <Plus />
          Add new Shift
        </Button>
      </div>

      <DataGrid
        table={table}
        isLoading={isLoading}
        recordCount={allShifts.length}
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
