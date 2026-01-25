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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, ChevronLeft, ChevronRight, SearchIcon } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import employees from "@/constants/employees.json";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

interface IEmployee {
  name: string;
  email: string;
  avatar: string;
  departments: string[];
  assigned_conversations: number;
  last_updated: string;
  is_online: boolean;
}

export function EmployeeTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [allEmployees, setAllEmployees] = useState<IEmployee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllEmployees(employees);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const columns = useMemo<ColumnDef<IEmployee>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Customer",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 bg-secondary">
              <AvatarImage src={row.original.avatar} alt={row.original.name} />
              <AvatarFallback className="bg-secondary text-foreground">
                {row.original.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-primary">
                {row.original.name}
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
        accessorKey: "departments",
        header: "Department",
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
        accessorKey: "assignedConversations",
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
        accessorKey: "lastUpdated",
        header: "Last Updated",
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

  const pageCount = table.getPageCount();
  const currentPage = pagination.pageIndex + 1;

  return (
    //manually table and pagination
    // <div className="space-y-8 p-4">
    //   {/* Controls */}
    //   <div className="flex items-center justify-between gap-4">
    //     <div className="relative flex-1 max-w-sm">
    //       <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    //       <Input
    //         placeholder="Search Employees"
    //         value={globalFilter}
    //         onChange={e => setGlobalFilter(e.target.value)}
    //         className="pl-10 bg-transparent border-border"
    //       />
    //     </div>
    //     <Button className="bg-transparent border border-border hover:bg-secondary text-foreground">
    //       <Plus className="h-4 w-4 mr-2" />
    //       Invite Employee
    //     </Button>
    //   </div>

    //   {/* Table */}
    //   <div className="rounded-lg border border-border overflow-hidden">
    //     <Table>
    //       <TableHeader>
    //         <TableRow className="border-border hover:bg-transparent">
    //           {table.getHeaderGroups().map(headerGroup =>
    //             headerGroup.headers.map(header => (
    //               <TableHead
    //                 key={header.id}
    //                 className="text-muted-foreground font-normal"
    //               >
    //                 {flexRender(
    //                   header.column.columnDef.header,
    //                   header.getContext()
    //                 )}
    //               </TableHead>
    //             ))
    //           )}
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {table.getRowModel().rows.map(row => (
    //           <TableRow
    //             key={row.id}
    //             className="border-border hover:bg-secondary/50"
    //           >
    //             {row.getVisibleCells().map(cell => (
    //               <TableCell key={cell.id}>
    //                 {flexRender(
    //                   cell.column.columnDef.cell,
    //                   cell.getContext()
    //                 )}
    //               </TableCell>
    //             ))}
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </div>

    //   {/* Pagination */}
    //   <div className="flex items-center justify-between">
    //     <div className="flex items-center gap-2 text-sm text-muted-foreground">
    //       <span>Rows per page:</span>
    //       <Select
    //         value={String(pagination.pageSize)}
    //         onValueChange={value =>
    //           setPagination({
    //             ...pagination,
    //             pageSize: Number(value),
    //             pageIndex: 0,
    //           })
    //         }
    //       >
    //         <SelectTrigger className="w-[70px] h-8 bg-transparent border-border">
    //           <SelectValue />
    //         </SelectTrigger>
    //         <SelectContent>
    //           <SelectItem value="10">10</SelectItem>
    //           <SelectItem value="20">20</SelectItem>
    //           <SelectItem value="50">50</SelectItem>
    //           <SelectItem value="100">100</SelectItem>
    //         </SelectContent>
    //       </Select>
    //     </div>

    //     <div className="flex items-center gap-4">
    //       <span className="text-sm text-muted-foreground">
    //         Page {currentPage} of {pageCount}
    //       </span>
    //       <div className="flex items-center gap-1">
    //         <Button
    //           variant="ghost"
    //           size="icon"
    //           className="h-8 w-8"
    //           onClick={() => table.previousPage()}
    //           disabled={!table.getCanPreviousPage()}
    //         >
    //           <ChevronLeft className="h-4 w-4" />
    //         </Button>
    //         <Button
    //           variant="ghost"
    //           size="icon"
    //           className="h-8 w-8"
    //           onClick={() => table.nextPage()}
    //           disabled={!table.getCanNextPage()}
    //         >
    //           <ChevronRight className="h-4 w-4" />
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="space-y-8 p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Employees"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <Button className="h-10">
          <Plus />
          Invite Employee
        </Button>
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
