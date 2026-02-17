import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Eye, RefreshCcw, Trash2, Pencil } from "lucide-react";
import { DeleteSnippetDialog } from "@/components/dashboard/agent/snippets/delete-snippet-dialog";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { Snippet } from "@/provider/snippet/snippet.types";
import { useDebounce } from "@/hooks/use-debounce";
import { DUMMY_SNIPPETS } from "@/constants/snippets";

export function SnippetsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snippetToDelete, setSnippetToDelete] = useState<Snippet | null>(null);

  // Use dummy data
  const snippets = DUMMY_SNIPPETS;
  const isLoading = false;

  const handleDeleteClick = (snippet: Snippet) => {
    setSnippetToDelete(snippet);
    setDeleteDialogOpen(true);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "SYNCED") {
      return (
        <Badge className="bg-green-300 rounded-xl text-green-800">Synced</Badge>
      );
    }

    if (status === "FAILED") {
      return (
        <Badge className="bg-red-300 rounded-xl text-red-800">Failed</Badge>
      );
    }

    return (
      <Badge className="bg-blue-300 rounded-xl text-blue-800">Queued</Badge>
    );
  };

  const snippetColumns: ColumnDef<Snippet>[] = [
    // ================= Title =================
    {
      accessorKey: "title",
      header: "Title",
      size: 420,
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.title}</div>
          <div className="text-xs text-muted-foreground line-clamp-1">
            {row.original.content}
          </div>
        </div>
      ),
      meta: {
        skeleton: (
          <div className="space-y-1">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-64" />
          </div>
        ),
        headerClassName: "font-medium",
      },
    },

    // ================= Status =================
    {
      id: "status",
      header: "Status",
      size: 140,
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      meta: {
        skeleton: <Skeleton className="h-6 w-20 rounded-full" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Last Updated =================
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
      size: 180,
      cell: ({ row }) => {
        const date = new Date(row.original.updatedAt);
        return (
          <span className="text-muted-foreground">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        );
      },
      meta: {
        skeleton: <Skeleton className="h-4 w-24" />,
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
          <Trash2
            className="h-4 w-4 shrink-0 cursor-pointer text-red-500 hover:text-red-600"
            onClick={() => handleDeleteClick(row.original)}
          />
        </div>
      ),
      meta: {
        skeleton: (
          <div className="flex gap-4 justify-start">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        ),
        headerClassName: "font-medium",
      },
    },
  ];

  const table = useReactTable({
    data: snippets,
    columns: snippetColumns,
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
              placeholder="Search Snippet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <Button className="h-10" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Snippet
          </Button>
        </div>

        <DataGrid
          table={table}
          isLoading={isLoading}
          recordCount={snippets.length}
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

      <DeleteSnippetDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        snippet={snippetToDelete}
      />
    </>
  );
}
