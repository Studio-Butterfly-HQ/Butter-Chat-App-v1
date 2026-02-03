"use client";

import React, { useEffect, useState } from "react";
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
import userData from "@/constants/dummy/user.json";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSelectedInboxUserId,
  openUserSidebar,
} from "@/store/slices/ui/ui-slice";

export type TicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "PENDING"
  | "ON_HOLD"
  | "IN_REVIEW"
  | "NEW"
  | "RESOLVED"
  | "SCHEDULED"
  | "CANCELLED";

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

const statusMap: Record<TicketStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  PENDING: "Pending",
  ON_HOLD: "On Hold",
  IN_REVIEW: "In Review",
  NEW: "New",
  RESOLVED: "Resolved",
  SCHEDULED: "Scheduled",
  CANCELLED: "Cancelled",
};

export const StatusBadge = ({ status }: { status: TicketStatus }) => {
  const colorMap: Record<TicketStatus, string> = {
    OPEN: "bg-blue-500/10 text-blue-500 border-none",
    IN_PROGRESS: "bg-indigo-500/10 text-indigo-500 border-none",
    COMPLETED: "bg-green-500/10 text-green-500 border-none",
    PENDING: "bg-yellow-500/10 text-yellow-500 border-none",
    ON_HOLD: "bg-orange-500/10 text-orange-500 border-none",
    IN_REVIEW: "bg-purple-500/10 text-purple-500 border-none",
    NEW: "bg-sky-500/10 text-sky-500 border-none",
    RESOLVED: "bg-emerald-500/10 text-emerald-500 border-none",
    SCHEDULED: "bg-cyan-500/10 text-cyan-500 border-none",
    CANCELLED: "bg-red-500/10 text-red-500 border-none",
  };

  return (
    <Badge
      className={cn(
        "rounded-xl px-2.5 py-0.5 text-[11px] font-medium",
        colorMap[status],
      )}
    >
      {statusMap[status]}
    </Badge>
  );
};

const dummyInboxData: InboxData[] = (userData as any).map((user: any) => ({
  id: user.id,
  status: user.id === "1" ? "OPEN" : "IN_PROGRESS",
  customer: {
    name: user.user.name,
    avatar: user.user.avatar,
    source: user.user.source,
  },
  summary: user.recentConversations[0]?.message || "No recent message",
  tags: user.tags,
  assignee: { name: user.assignment.assignedTo, avatar: "" },
  group: user.assignment.group,
  lastUpdated: "21m",
}));

export default function YourInboxTable() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const isUserSidebarOpen = useAppSelector(
    (state) => state.ui.isUserSidebarOpen,
  );

  useEffect(() => {
    const selectedRowIds = Object.keys(rowSelection);
    if (selectedRowIds.length > 0) {
      setSelectedIds(selectedRowIds);
    } else {
      setSelectedIds([]);
    }
  }, [rowSelection]);

  const columns: ColumnDef<InboxData>[] = [
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
      size: 110,
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      meta: {
        headerClassName: "text-primary font-medium",
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
            <AvatarImage src={row.original.customer.avatar} />
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
        headerClassName: "text-primary font-medium",
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
      size: 350,
      cell: ({ row }) => (
        <div className="space-y-1.5 py-2">
          <div className="text-sm text-foreground line-clamp-1">
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
        headerClassName: "text-primary font-medium",
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
      accessorKey: "assignee",
      header: "Assignee",
      size: 180,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={row.original.assignee.avatar} />
            <AvatarFallback className="text-[10px]">
              {row.original.assignee.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{row.original.assignee.name}</span>
        </div>
      ),
      meta: {
        headerClassName: "text-primary font-medium",
        skeleton: (
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        ),
      },
    },
    {
      accessorKey: "group",
      header: "Group",
      size: 150,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-sm">{row.original.group}</span>
        </div>
      ),
      meta: {
        headerClassName: "text-primary font-medium",
        skeleton: (
          <div className="flex items-center gap-2">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        ),
      },
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      size: 120,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.lastUpdated}
        </span>
      ),
      meta: {
        headerClassName: "text-primary font-medium",
        skeleton: <Skeleton className="h-4 w-16" />,
      },
    },
  ];

  const compactColumns: ColumnDef<InboxData>[] = [
    {
      accessorKey: "compact",
      header: "",
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
          <div className="flex items-start gap-3 py-1 pr-2">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={row.original.customer.avatar} />
              <AvatarFallback>
                {row.original.customer.name
                  ? row.original.customer.name.charAt(0)
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground truncate max-w-[100px]">
                    {row.original.customer.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <Avatar className="h-4 w-4 border border-background">
                      <AvatarImage src={row.original.assignee.avatar} />
                      <AvatarFallback className="text-[6px]">
                        {row.original.assignee.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Inbox className="h-3.5 w-3.5 text-muted-foreground" />
                    <ShoppingBag className="h-3.5 w-3.5 text-muted-foreground" />
                    {sourceIcon(row.original.customer.source)}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    {row.original.lastUpdated}
                  </span>
                </div>
              </div>
              <div className="text-sm truncate text-muted-foreground line-clamp-1">
                {row.original.summary}
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: dummyInboxData,
    columns: isUserSidebarOpen ? compactColumns : columns,
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

  return (
    <div className="h-full p-4">
      <DataGrid
        table={table}
        recordCount={dummyInboxData.length}
        onRowClick={(row: InboxData) => {
          dispatch(setSelectedInboxUserId(row.id));
          dispatch(openUserSidebar());
        }}
        tableLayout={{
          headerBackground: false,
          rowBorder: true,
          rowRounded: false,
          width: isUserSidebarOpen ? "auto" : "fixed",
        }}
        tableClassNames={{
          header: isUserSidebarOpen ? "hidden" : "",
        }}
      >
        <div className="w-full h-full flex flex-col justify-between space-y-2.5">
          <DataGridContainer border={false} className="flex-1">
            <ScrollArea className="h-full">
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
