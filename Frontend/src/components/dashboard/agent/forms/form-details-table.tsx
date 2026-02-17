import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, MoreVertical } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDebounce } from "@/hooks/use-debounce";
import formRecordsData from "@/constants/dummy/form-records.json";
import { AddRecordDialog } from "@/components/dashboard/agent/forms/add-record-dialog";

export type FormRecord = {
  id: string;
  outletName: string;
  address: string;
  phoneNumber: string;
  openingHour: string;
  closingHour: string;
  openDays: string;
};

export function FormDetailsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);

  // Use dummy data directly
  const allRecords = formRecordsData as FormRecord[];

  const recordColumns: ColumnDef<FormRecord>[] = [
    // ================= Outlet Name =================
    {
      accessorKey: "outletName",
      header: "Outlet Name",
      size: 200,
      cell: ({ row }) => (
        <div className="font-medium text-sm">{row.original.outletName}</div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-32" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Address =================
    {
      accessorKey: "address",
      header: "Address",
      size: 300,
      cell: ({ row }) => (
        <div
          className="text-sm text-muted-foreground line-clamp-2"
          title={row.original.address}
        >
          {row.original.address}
        </div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-48" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Phone Number =================
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      size: 150,
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">{row.original.phoneNumber}</div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-24" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Opening Hour =================
    {
      accessorKey: "openingHour",
      header: "Opening Hour",
      size: 120,
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">{row.original.openingHour}</div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-16" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Closing Hour =================
    {
      accessorKey: "closingHour",
      header: "Closing Hour",
      size: 120,
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">{row.original.closingHour}</div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-16" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Open Days =================
    {
      accessorKey: "openDays",
      header: "Open Days",
      size: 200,
      cell: ({ row }) => (
        <div
          className="text-sm text-muted-foreground line-clamp-1"
          title={row.original.openDays}
        >
          {row.original.openDays}
        </div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-32" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Actions =================
    {
      id: "actions",
      header: "",
      size: 50,
      cell: () => (
        <div className="flex items-center justify-end pr-4">
          <MoreVertical className="h-4 w-4 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground" />
        </div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-4 rounded-full" />,
        headerClassName: "font-medium",
      },
    },
  ];

  const table = useReactTable({
    data: allRecords,
    columns: recordColumns,
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
    <>
      <div className="h-full p-4 pb-0 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 shrink-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Form Record..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 bg-transparent border-input"
            />
          </div>
          <Button
            className="h-10"
            onClick={() => setIsAddRecordOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Add Record
          </Button>
          <AddRecordDialog
            open={isAddRecordOpen}
            onOpenChange={setIsAddRecordOpen}
          />
        </div>

        <DataGrid
          table={table}
          isLoading={false}
          recordCount={allRecords.length}
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
    </>
  );
}
