import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Eye, RefreshCcw, Trash2 } from "lucide-react";
import { UploadDocumentsDialog } from "@/components/dashboard/agent/upload-documents-dialog";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetDocuments } from "@/provider/document/document.queries";
import type { Document } from "@/provider/document/document.types";

export type SyncStatus = "SYNCED" | "FAILED" | "QUEUED";

export function DocumentsTable() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: documentsResponse, isLoading } = useGetDocuments();

  const StatusBadge = ({ status }: { status: SyncStatus }) => {
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

  const allDocuments = documentsResponse?.data?.documents || [];
  console.log(allDocuments);

  const documentColumns: ColumnDef<Document>[] = [
    // ================= Document =================
    {
      accessorKey: "originalName",
      header: "Document",
      size: 420,
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.originalName}</div>
          <div className="text-xs text-muted-foreground">
            {(row.original.size / 1024).toFixed(2)} KB • {row.original.mimetype}
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
      id: "status",
      header: "Status",
      size: 140,
      cell: () => <StatusBadge status="SYNCED" />,
      meta: {
        skeleton: <Skeleton className="h-6 w-20 rounded-full" />,
        headerClassName: "text-primary font-medium",
      },
    },

    // ================= Last Updated =================
    {
      accessorKey: "uploadedAt",
      header: "Last Updated",
      size: 180,
      cell: ({ row }) => {
        const date = new Date(row.original.uploadedAt);
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
  ];

  const table = useReactTable({
    data: allDocuments,
    columns: documentColumns,
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
    <>
    <div className="space-y-8  p-4">
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
        <UploadDocumentsDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </div>

      <DataGrid
        table={table}
        isLoading={isLoading}
        recordCount={allDocuments.length}
        tableLayout={{
          headerBackground: false,
          rowBorder: true,
          rowRounded: false,
        }}
      >  
      <div className="w-full flex flex-col justify-between min-h-[calc(100vh-12.11rem)] space-y-2.5">
          <DataGridContainer className="" border={false}>
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </DataGridContainer>
          <DataGridPagination className="" />
        </div>
      </DataGrid>
    </div>
    </>
  );
}
