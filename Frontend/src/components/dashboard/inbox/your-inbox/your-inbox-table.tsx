import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  MoreHorizontal,
  Mail,
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  openUserSidebar,
  openCustomerChat,
  setSelectedInboxUserId,
} from "@/store/slices/ui/ui-slice";
import { InboxEmptyState } from "@/components/dashboard/inbox/inbox-empty-state";

export type TicketStatus = "WAITING" | "ON_GOING" | "COMPLETE";

interface InboxData {
  id: string;
  status: TicketStatus;
  customer: { name: string; avatar: string; source: string };
  summary: string;
  tags: string[];
  assignee: { name: string; avatar: string };
  group: string;
  lastUpdated: string;
}

export const normalizeStatus = (raw: string): TicketStatus => {
  const upper = raw.toUpperCase();
  if (upper === "WAITING") return "WAITING";
  if (upper === "ON GOING") return "ON_GOING";
  return "COMPLETE";
};

const statusMap: Record<TicketStatus, string> = {
  WAITING: "Waiting",
  ON_GOING: "On Going",
  COMPLETE: "Complete",
};

export const StatusBadge = ({ status }: { status: TicketStatus }) => {
  const colorMap: Record<TicketStatus, string> = {
    WAITING: "bg-yellow-500/10 text-yellow-500 border-none",
    ON_GOING: "bg-blue-500/10 text-blue-500 border-none",
    COMPLETE: "bg-green-500/10 text-green-500 border-none",
  };

  return (
    <Badge
      className={cn(
        "rounded-xl px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
        colorMap[status],
      )}
    >
      {statusMap[status]}
    </Badge>
  );
};

export default function YourInboxTable() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isCustomerChatOpen = useAppSelector(
    (state) => state.ui.isCustomerChatOpen,
  );
  const isUserSidebarOpen = useAppSelector(
    (state) => state.ui.isUserSidebarOpen,
  );
  const activeRecord = useAppSelector((state) => state.chat.active);

  const active = useMemo(() => Object.values(activeRecord), [activeRecord]);

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
    data: active,
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

  if (active.length === 0) {
    return <InboxEmptyState />;
  }

  return (
    <div
      className={`h-full pb-0 flex flex-col ${isCompactMode ? "p-0.5" : "p-4"}`}
    >
      <DataGrid
        table={table}
        recordCount={active.length}
        onRowClick={(row: Conversation) => {
          // dispatch(setSelectedInboxUserId(row.id));
          // if (!isCustomerChatOpen) {
          //   dispatch(openUserSidebar());
          // }
          // dispatch(openCustomerChat());
        }}
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
