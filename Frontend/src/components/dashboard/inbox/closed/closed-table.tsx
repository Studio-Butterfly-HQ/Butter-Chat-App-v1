import { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Inbox,
  ShoppingBag,
  Facebook,
  Globe,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import {
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Conversation } from "@/store/slices/chat/chat-types";
import { useAppSelector } from "@/store/hooks";
import { InboxEmptyState } from "@/components/dashboard/inbox/inbox-empty-state";
import closedData from "@/constants/dummy/closed-inbox.json";
import {
  StatusBadge,
  normalizeStatus,
} from "@/components/dashboard/inbox/your-inbox/your-inbox-table";

export default function ClosedTable() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const isCustomerChatOpen = useAppSelector(
    (state) => state.ui.isCustomerChatOpen,
  );
  const isUserSidebarOpen = useAppSelector(
    (state) => state.ui.isUserSidebarOpen,
  );

  const closed = useMemo(() => closedData as Conversation[], []);

  const isCompactMode = isCustomerChatOpen || isUserSidebarOpen;

  useEffect(() => {
    const selectedRowIds = Object.keys(rowSelection);
    if (selectedRowIds.length > 0) {
      setSelectedIds(selectedRowIds);
    } else {
      setSelectedIds([]);
    }
  }, [rowSelection]);

  const columns = useMemo<ColumnDef<Conversation>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        size: 35,
        meta: {
          skeleton: <Skeleton className="h-4 w-4 rounded" />,
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 100,
        cell: ({ row }) => (
          <StatusBadge status={normalizeStatus(row.original.status)} />
        ),
        meta: {
          headerClassName: "font-medium",
          skeleton: <Skeleton className="h-6 w-20 rounded-xl" />,
        },
      },
      {
        accessorKey: "customer",
        header: "Customer",
        size: 180,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={row.original.customer.picture}
                className="object-cover"
              />
              <AvatarFallback className="text-[10px]">
                {row.original.customer.name
                  ? row.original.customer.name.charAt(0).toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">
              {row.original.customer.name}
            </span>
          </div>
        ),
        meta: {
          headerClassName: "font-medium",
          skeleton: (
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ),
        },
      },
      {
        accessorKey: "summary",
        header: "Summary",
        size: 290,
        cell: ({ row }) => (
          <div className="space-y-1.5 py-2">
            <div className="text-sm text-foreground line-clamp-2">
              {row.original.summary}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {row.original.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-muted text-muted-foreground hover:bg-muted/80 text-[10px] py-0 px-2 rounded-xl font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ),
        meta: {
          headerClassName: "font-medium",
          skeleton: (
            <div className="space-y-2 py-2">
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-1.5">
                <Skeleton className="h-4 w-12 rounded-xl" />
                <Skeleton className="h-4 w-12 rounded-xl" />
              </div>
            </div>
          ),
        },
      },
      {
        accessorKey: "assigned_to",
        header: "Assignee",
        size: 180,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={row.original.assigned_to?.profile_uri || ""} />
              <AvatarFallback className="text-[10px]">
                {row.original.assigned_to?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">
              {row.original.assigned_to?.name || "Unassigned"}
            </span>
          </div>
        ),
        meta: {
          headerClassName: "font-medium",
          skeleton: (
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ),
        },
      },
      {
        accessorKey: "department",
        header: "Department",
        size: 150,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm">
              {row.original.department?.department_name || "General"}
            </span>
          </div>
        ),
        meta: {
          headerClassName: "font-medium",
          skeleton: (
            <div className="flex items-center gap-2">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          ),
        },
      },
      {
        accessorKey: "metadata",
        header: "Last Updated",
        size: 120,
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {row.original.metadata?.last_updated || ""}
          </span>
        ),
        meta: {
          headerClassName: "font-medium",
          skeleton: <Skeleton className="h-4 w-16" />,
        },
      },
    ],
    [],
  );

  const compactColumns = useMemo<ColumnDef<Conversation>[]>(
    () => [
      {
        accessorKey: "compact",
        header: "",
        size: 200,
        cell: ({ row }) => {
          const sourceIcon = (source: string) => {
            switch (source.toLowerCase()) {
              case "facebook":
                return <Facebook className="h-3.5 w-3.5 text-[#1877F2]" />;
              case "instagram":
                return <Instagram className="h-3.5 w-3.5 text-[#E4405F]" />;
              case "whatsapp":
                return <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />;
              case "messenger":
                return <MessageCircle className="h-3.5 w-3.5 text-[#0084FF]" />;
              default:
                return <Globe className="h-3.5 w-3.5 text-muted-foreground" />;
            }
          };

          return (
            <div className="flex items-center gap-3 py-1 overflow-hidden">
              <Avatar className="h-7 w-7 border border-border flex-shrink-0">
                <AvatarImage src={row.original.customer.picture} />
                <AvatarFallback>
                  {row.original.customer.name
                    ? row.original.customer.name.charAt(0)
                    : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-center justify-between gap-1 h-5">
                  <div className="flex items-center min-w-0 flex-1">
                    <span className="text-sm font-bold text-foreground truncate leading-none">
                      {row.original.customer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="flex items-center gap-1 opacity-60">
                      <Avatar className="h-4 w-4 border border-background flex-shrink-0">
                        <AvatarImage
                          src={row.original.assigned_to?.profile_uri || ""}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-[6px]">
                          {row.original.assigned_to?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <Inbox className="h-3 w-3 text-muted-foreground" />
                      <ShoppingBag className="h-3 w-3 text-muted-foreground" />
                      {sourceIcon(row.original.customer.source)}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                      {row.original.metadata?.last_updated || ""}
                    </span>
                  </div>
                </div>
                <div className="text-sm truncate text-muted-foreground leading-none">
                  {row.original.summary}
                </div>
              </div>
            </div>
          );
        },
      },
    ],
    [],
  );

  const activeColumns = isCompactMode ? compactColumns : columns;

  const table = useReactTable({
    data: closed,
    columns: activeColumns,
    state: {
      pagination,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (closed.length === 0) {
    return <InboxEmptyState />;
  }

  return (
    <div
      className={`h-full pb-0 flex flex-col ${isCompactMode ? "p-0.5" : "p-4"}`}
    >
      <DataGrid
        table={table}
        recordCount={closed.length}
        tableLayout={{
          headerBackground: false,
          rowBorder: isCompactMode ? false : true,
          rowRounded: false,
          width: "fixed",
        }}
        tableClassNames={{
          header: isCompactMode ? "hidden" : "",
        }}
      >
        <div className="w-full flex-1 flex flex-col">
          <DataGridContainer border={false} className="flex-1 min-h-0">
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </DataGridContainer>
          <div className={`py-2 ${isCompactMode ? "px-4" : ""}`}>
            <DataGridPagination />
          </div>
        </div>
      </DataGrid>
    </div>
  );
}
