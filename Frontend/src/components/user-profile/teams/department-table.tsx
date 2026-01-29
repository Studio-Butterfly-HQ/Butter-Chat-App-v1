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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { EmployeeSearchCard } from "./employee-search-card";

import departments from "@/constants/departments.json";

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
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [allDepartments, setAllDepartments] = useState<DepartmentRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [open, setOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  


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
                {dept.employees.length} Employees
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
        headerClassName: "text-primary",
      },
    },

    {
      id: "employees",
      header: "Employees",
      size: 280,
      minSize: 240,
      accessorFn: (row) => {
        const count = row.employees.length;
        const emails = row.employees.map((e) => e.email).join(" ");
        return `${count} employees ${emails}`;
      },
      cell: ({ row }) => {
        const employees = row.original.employees;
        return (
          <div className="flex items-center">
            <div className="flex -space-x-2 overflow-hidden">
              {employees.slice(0, 3).map((emp, idx) => (
                <Avatar
                  key={idx}
                  className="h-10 w-10 border-2 bg-secondary border-background"
                >
                  <AvatarImage src={emp.profile_uri} alt={emp.user_name} />
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
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
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
          (emp) => emp.status === "ACTIVE",
        ).length;
        const totalCount = employees.length;

        return (
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`h-2 w-2 rounded-full ${
                onlineCount > 0 ? "bg-green-500" : "bg-muted-foreground"
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
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <Button className="h-10" onClick={() => setOpen(true)}>
          <Plus />
          Add new Department
        </Button>
        <Dialog open={open} onOpenChange={setOpen} >
          <DialogContent className="bg-popover max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium text-primary">
                Add Department
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Create a new department for organizing employees. Click save
                when you're done.
              </DialogDescription>
            </DialogHeader>

            {/* FORM */}
            <div className="space-y-5 mt-2">

              <div className="space-y-2">
                <label className="text-sm text-primary">
                  Department Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Sales Department"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="h-10"
                />
              </div>

              {/* Add Employees */}
              <div className="space-y-2">
                <label className="text-sm text-primary">
                  Add Employees
                </label>
                <EmployeeSearchCard />
              </div>
            </div>

            {/* FOOTER */}
            <DialogFooter className="flex gap-2 md:gap-0">
              <DialogClose asChild>
                <Button variant="outline" className="bg-transparent">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={() => {
                  console.log({
                    departmentName,
                    employees: selectedEmails,
                  });
                }}
              >
                Save Department
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
