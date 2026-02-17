import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Trash2, Pencil, ChevronRight } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDebounce } from "@/hooks/use-debounce";
import formsData from "@/constants/dummy/forms.json";

export type Form = {
  id: string;
  title: string;
  lastUpdated: string;
  totalSubmissions: number;
};

export function FormsTable() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });

  // Use dummy data directly
  const allForms = formsData as Form[];

  const formColumns: ColumnDef<Form>[] = [
    // ================= Title =================
    {
      accessorKey: "title",
      header: "Title",
      size: 420,
      cell: ({ row }) => (
        <div className="font-medium">{row.original.title}</div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-48" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Last Updated =================
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      size: 180,
      cell: ({ row }) => {
        const date = new Date(row.original.lastUpdated);
        // Calculate days ago or display date
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        let dateString;
        if (diffDays === 0) {
          dateString = "Today";
        } else if (diffDays === 1) {
          dateString = "1 day ago";
        } else if (diffDays < 30) {
          dateString = `${diffDays} days ago`;
        } else {
          dateString = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
        }
        return <span className="text-muted-foreground">{dateString}</span>;
      },
      meta: {
        skeleton: <Skeleton className="h-4 w-24" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Total Submission =================
    {
      accessorKey: "totalSubmissions",
      header: "Total Submission",
      size: 180,
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.totalSubmissions}
        </span>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-12" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Actions =================
    {
      id: "actions",
      header: "",
      size: 120,
      cell: ({ row }) => (
        <div className="flex items-center gap-4 justify-end pr-4">
          <Pencil className="h-4 w-4 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground" />
          <Trash2 className="h-4 w-4 shrink-0 cursor-pointer text-red-500 hover:text-red-600" />
          <Button
            className="h-8 w-8 rounded-full"
            onClick={() => navigate(`${row.original.id}`)}
          >
            <ChevronRight />
          </Button>
        </div>
      ),
      meta: {
        skeleton: (
          <div className="flex gap-4 justify-end">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        ),
        headerClassName: "font-medium",
      },
    },
  ];

  const table = useReactTable({
    data: allForms,
    columns: formColumns,
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
              placeholder="Search Form..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 bg-transparent border-input"
            />
          </div>
          <Button className="h-10 bg-white text-black hover:bg-gray-200">
            <Plus className="h-4 w-4" />
            Add Form
          </Button>
        </div>

        <DataGrid
          table={table}
          isLoading={false}
          recordCount={allForms.length}
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
