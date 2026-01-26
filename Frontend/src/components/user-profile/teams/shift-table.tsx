import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plus, Search, Clock} from "lucide-react";
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

import shifts from "@/constants/shifts.json";
import { Skeleton } from "@/components/ui/skeleton";

interface ShiftEmployee {
  name: string;
  avatar: string;
  email: string;
  role: "EMPLOYEE";
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shiftName, setShiftName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSaveShift = () => {
    console.log({ shiftName, startTime, endTime });
    setIsDialogOpen(false);
    setShiftName("");
    setStartTime("");
    setEndTime("");
  };

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
            <Avatar className="h-10 w-10 bg-secondary">
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
            <Skeleton className="h-10 w-10 rounded-full" />
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
      accessorFn: (row) => `${row.start_time} ${row.end_time}`,
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
          <DialogContent className="bg-popover max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-xl font-normal text-primary">
                Add Shift
              </DialogTitle>
              <DialogDescription>
                Create a new shift for your team members. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-5 mt-2">
              <div className="space-y-2">
                <label className="text-sm font-normal text-primary">
                  Shift Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Morning Shift"
                  value={shiftName}
                  onChange={(e) => setShiftName(e.target.value)}
                  className="h-10"
                />
              </div>

              {/* Start Time */}
              <div className="space-y-2">
                <label className="text-sm font-normal text-primary">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="00:00 am"
                    className="h-10"
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-normal text-primary">
                  End Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="00:00 am"
                    className="h-10"
                  />
                  <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <DialogFooter className="flex gap-2 md:gap-0">
              <DialogClose >
                <Button
                  variant="outline"
                  className="bg-transparent"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleSaveShift}>
                Save Shift
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
        <div className="w-full space-y-2.5 ">
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
