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
  ArrowUpRight,
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
import customerData from "@/constants/dummy/customer.json";

export type TicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "PENDING"
  | "DELAYED"
  | "STARTED"
  | "UNDER_REVIEW"
  | "CANCELLED"
  | "RESOLVED"
  | "SCHEDULED"
  | "IN_REVIEW"
  | "ON_HOLD";

interface CustomerData {
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
  DELAYED: "Delayed",
  STARTED: "Started",
  UNDER_REVIEW: "Under Review",
  CANCELLED: "Cancelled",
  RESOLVED: "Resolved",
  SCHEDULED: "Scheduled",
  IN_REVIEW: "In Review",
  ON_HOLD: "On Hold",
};

export const StatusBadge = ({ status }: { status: TicketStatus }) => {
  const colorMap: Record<TicketStatus, string> = {
    OPEN: "bg-blue-500/10 text-blue-500 border-none",
    IN_PROGRESS: "bg-indigo-500/10 text-indigo-500 border-none",
    COMPLETED: "bg-green-500/10 text-green-500 border-none",
    PENDING: "bg-yellow-500/10 text-yellow-500 border-none",
    DELAYED: "bg-red-500/10 text-red-500 border-none",
    STARTED: "bg-sky-500/10 text-sky-500 border-none",
    UNDER_REVIEW: "bg-purple-500/10 text-purple-500 border-none",
    CANCELLED: "bg-red-500/10 text-red-500 border-none",
    RESOLVED: "bg-emerald-500/10 text-emerald-500 border-none",
    SCHEDULED: "bg-cyan-500/10 text-cyan-500 border-none",
    IN_REVIEW: "bg-blue-500/10 text-blue-500 border-none",
    ON_HOLD: "bg-orange-500/10 text-orange-500 border-none",
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

export default function CustomerDetailsTable() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const currentCustomer = customerData[0].customer;

  const columns: ColumnDef<CustomerData>[] = [
    {
      accessorKey: "status",
      header: "Status",
      size: 110,
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      meta: {
        headerClassName: "font-medium",
      },
    },
    {
      accessorKey: "summary",
      header: "Summary",
      size: 350,
      cell: ({ row }) => (
        <div className="space-y-1.5 py-2">
          <div className="text-sm text-muted-foreground line-clamp-1">
            {row.original.summary}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {row.original.tags.map((tag) => {
              const isStatusTag =
                tag === "Status" ||
                tag === "Review" ||
                tag === "Completion" ||
                tag === "Feedback" ||
                tag === "Issues" ||
                tag === "Kickoff" ||
                tag === "Approval" ||
                tag === "Resolution" ||
                tag === "Scheduling"; // Heuristic for the blue tag
              return (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={cn(
                    "text-[10px] py-0 px-2 rounded-xl font-normal border-none",
                    isStatusTag
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
                  )}
                >
                  {tag}
                </Badge>
              );
            })}
          </div>
        </div>
      ),
      meta: {
        headerClassName: "font-medium",
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
              {row.original.assignee.name ? row.original.assignee.name.charAt(0) : "U"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {row.original.assignee.name}
          </span>
        </div>
      ),
      meta: {
        headerClassName: "font-medium",
      },
    },
    {
      accessorKey: "group",
      header: "Group",
      size: 150,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-400" />
          <span className="text-sm text-muted-foreground">
            {row.original.group}
          </span>
        </div>
      ),
      meta: {
        headerClassName: "font-medium",
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
        headerClassName: "font-medium",
      },
    },
  ];

  const table = useReactTable({
    data: customerData as CustomerData[],
    columns,
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

  // Helper to map Source string to Icon
  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case "facebook":
        return <Facebook className="w-3 h-3" />;
      case "instagram":
        return <Instagram className="w-3 h-3" />;
      default:
        return <Globe className="w-3 h-3" />;
    }
  };

  // Header Component for Customer Info
  const CustomerHeader = ({
    customer,
  }: {
    customer: CustomerData["customer"];
  }) => {
    return (
      <div className="flex items-center gap-4 px-2">
        <div className="relative">
          <Avatar className="h-20 w-20 border-2 border-border">
            <AvatarImage src={customer.avatar} />
            <AvatarFallback className="text-xl">
              {customer.name ? customer.name.charAt(0) : "U"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <Badge
            variant="secondary"
            className="rounded-full px-2.5 py-0.5 text-xs text-muted-foreground bg-muted font-normal"
          >
            Customer
          </Badge>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            {customer.name}
          </h1>
          <div className="flex items-center gap-2 text-base font-medium text-muted-foreground">
            <span className="text-muted-foreground/60">Source:</span>
            <div className="flex items-center gap-1.5 text-foreground">
              {getSourceIcon(customer.source)}
              <span>{customer.source}</span>
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col space-y-6 p-4">
      <CustomerHeader customer={currentCustomer} />
        <DataGrid
          table={table}
          recordCount={customerData.length}
          tableLayout={{
            headerBackground: false,
            rowBorder: true,
            rowRounded: false,
            width: "auto",
          }}
        >
          <div className="w-full min-h-[calc(100vh-11.5rem)] flex flex-col justify-between space-y-2.5">
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
