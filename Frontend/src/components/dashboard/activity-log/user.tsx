import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, MoreVertical, Download, Plus } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDebounce } from "@/hooks/use-debounce";
import activityLogData from "@/constants/dummy/activity-log-data.json";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type ActivityLogRecord = {
  id: string;
  actionType: string;
  detailedDescription: string;
  performedBy: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  status: string;
};

export default function User() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const allRecords = activityLogData as ActivityLogRecord[];

  const columns: ColumnDef<ActivityLogRecord>[] = [
    // ================= ID =================
    {
      accessorKey: "id",
      header: "ID",
      size: 100,
      cell: ({ row }) => (
        <div className="text-sm font-medium text-muted-foreground">
          {row.original.id}
        </div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-20" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Action Type =================
    {
      accessorKey: "actionType",
      header: "Action Type",
      size: 150,
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {row.original.actionType}
        </div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-24" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Detailed Description =================
    {
      accessorKey: "detailedDescription",
      header: "Detailed Description",
      size: 250,
      cell: ({ row }) => (
        <div
          className="text-sm text-foreground line-clamp-1"
          title={row.original.detailedDescription}
        >
          {row.original.detailedDescription}
        </div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-48" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Performed By =================
    {
      accessorKey: "performedBy.name",
      header: "Performed By",
      size: 200,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={row.original.performedBy.avatar} />
            <AvatarFallback>
              {row.original.performedBy.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {row.original.performedBy.name}
          </span>
        </div>
      ),
      meta: {
        skeleton: <Skeleton className="h-6 w-32" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Timestamp =================
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      size: 180,
      cell: ({ row }) => (
        <div className="text-sm text-foreground">{row.original.timestamp}</div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-32" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Status =================
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
      cell: ({ row }) => {
        const status = row.original.status;
        let variant: "default" | "secondary" | "destructive" | "outline" =
          "default";
        let className = "";

        if (status === "Success") {
          variant = "default"; // Or custom green
          className = "bg-green-300 text-green-900 border-transparent";
        } else if (status === "Warning") {
          variant = "secondary"; // Or custom yellow
          className = "bg-yellow-300 text-yellow-900 border-transparent";
        } else if (status === "Failed") {
          variant = "destructive";
          className = "bg-red-300 text-red-900 border-transparent";
        }

        return (
          <Badge
            variant={variant}
            className={`rounded-full px-3 font-normal ${className}`}
          >
            {status}
          </Badge>
        );
      },
      meta: {
        skeleton: <Skeleton className="h-5 w-16 rounded-full" />,
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
    columns,
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
    <div className="h-full p-4 pb-0 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 shrink-0">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Logs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 bg-transparent border-input"
          />
        </div>
        <Button variant="outline" className="h-10 bg-card">
          <Plus className="h-4 w-4" />
          Add Log
        </Button>
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
  );
}
