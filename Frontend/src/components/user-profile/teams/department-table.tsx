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

import departments from "@/constants/departments.json";
import { Skeleton } from "@/components/ui/skeleton";

interface Employee {
  user_name: string;
  email: string;
  profile_uri: string;
  role: "EMPLOYEE";
  status: "ACTIVE" | "INACTIVE";
  shift_start: string;
  shift_end: string;
}

interface DepartmentRow {
  department_name: string;
  description: string;
  employees: Employee[];
}

export function DepartmentTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 20});
  const [allDepartments, setAllDepartments] = useState<DepartmentRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllDepartments(departments as DepartmentRow[]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const columns: ColumnDef<DepartmentRow>[] = [
  {
    accessorKey: "department_name",
    header: "Department",
    size: 300,
    minSize: 260,
    cell: ({ row }) => {
      const dept = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 bg-secondary">
            <AvatarFallback className="text-lg font-medium">
              {dept.department_name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-primary">
              {dept.department_name}
            </div>
            <div className="text-xs text-muted-foreground">
              {dept.employees.length} Employees
            </div>
          </div>
        </div>
      );
    },
    meta: {
      skeleton: (
        <div className="flex items-center gap-3 h-[41px]">
          <Skeleton className="h-11 w-11 rounded-full" />
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
    id: "employees",
    header: "Employees",
    size: 280,
    minSize: 240,
    cell: ({ row }) => {
      const employees = row.original.employees;
      return (
        <div className="flex items-center">
          <div className="flex -space-x-2 overflow-hidden">
            {employees.slice(0, 3).map((emp, idx) => (
              <Avatar
                key={idx}
                className="h-11 w-11 border-2 bg-secondary border-background"
              >
                <AvatarImage
                  src={emp.profile_uri}
                  alt={emp.user_name}
                />
                <AvatarFallback className="text-sm font-medium">
                  {emp.user_name
                    ? emp.user_name.charAt(0).toUpperCase()
                    : "U"}
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
        <div className="flex -space-x-2">
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
    size: 200,
    minSize: 180,
    cell: ({ row }) => {
      const employees = row.original.employees;
      const onlineCount = employees.filter(
        (emp) => emp.status === "ACTIVE"
      ).length;
      const totalCount = employees.length;

      return (
        <div className="flex items-center gap-2 text-sm">
          <span
            className={`h-2 w-2 rounded-full ${
              onlineCount > 0
                ? "bg-green-500"
                : "bg-muted-foreground"
            }`}
          />
          <span className="text-muted-foreground">
            {onlineCount} of {totalCount} Online
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
    data: allDepartments,
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
            placeholder="Search Department"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <Button className="h-10">
          <Plus />
          Add new Department
        </Button>
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
