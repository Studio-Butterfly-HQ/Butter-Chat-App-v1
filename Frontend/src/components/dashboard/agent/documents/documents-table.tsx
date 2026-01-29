import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Eye, RefreshCcw, Trash2 } from "lucide-react";
import  {UploadDocumentsDialog}  from "@/components/dashboard/agent/upload-documents-dialog";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";;

import websites from "@/constants/dummy/websites.json";

export type SyncStatus = "SYNCED" | "FAILED" | "QUEUED";

export interface WebsiteRow {
  website_name: string;
  website_url: string;
  status: SyncStatus;
  last_updated: string;
  document_name: string;
}

export function DocumentsTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [allWebsites, setAllWebsites] = useState<WebsiteRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllWebsites(websites as WebsiteRow[]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const StatusBadge = ({ status }: { status: SyncStatus }) => {
    if (status === "SYNCED") {
      return <Badge className="bg-green-300 rounded-xl text-green-800">Synced</Badge>;
    }

    if (status === "FAILED") {
      return <Badge className="bg-red-300 rounded-xl text-red-800">Failed</Badge>;
    }

    return <Badge className="bg-blue-300 rounded-xl text-blue-800">Queued</Badge>;
  };

const websiteColumns: ColumnDef<WebsiteRow>[] = [
  // ================= Website =================
  {
    accessorKey: "document_name",
    header: "Document",
    size: 420,
    cell: ({ row }) => (
      <div>
        <div className="font-medium">
          {row.original.document_name}
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
      headerClassName: "text-primary font-medium",
    },
  },

  // ================= Status =================
  {
    accessorKey: "status",
    header: "Status",
    size: 140,
    cell: ({ row }) => (
      <StatusBadge status={row.original.status} />
    ),
    meta: {
      skeleton: <Skeleton className="h-6 w-20 rounded-full" />,
      headerClassName: "text-primary font-medium",
    },
    
  },

  // ================= Last Updated =================
  {
    accessorKey: "last_updated",
    header: "Last Updated",
    size: 180,
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.last_updated || "—"}
      </span>
    ),
    meta: {
      skeleton: <Skeleton className="h-4 w-24" />,
      headerClassName: "text-primary font-medium",
    },
  },

  // ================= Actions =================
  {
    id: "actions",
    header: "Actions",
    size: 120,
    cell: () => (
      <div className="flex items-center gap-4 justify-start">
        <Eye className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
        <RefreshCcw className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
        <Trash2 className="h-4 w-4 cursor-pointer text-red-500" />
      </div>
    ),
    meta: {
      skeleton: (
        <div className="flex gap-3 justify-start">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      ),
        headerClassName: "text-primary font-medium",
    },
  },
]


  const table = useReactTable({
    data: allWebsites,
    columns: websiteColumns,
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
          Upload Document
        </Button>
        <UploadDocumentsDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>

      <DataGrid
        table={table}
        isLoading={isLoading}
        recordCount={allWebsites.length}
        tableLayout={{
          headerBackground: false,
          rowBorder: true,
          rowRounded: false,
        }}
      >        <div className="w-full space-y-2.5">
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
