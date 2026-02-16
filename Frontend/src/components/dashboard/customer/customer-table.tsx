import { useState } from "react";
import { useGetCustomers } from "@/provider/customer";
import type { Customer } from "@/provider/customer";
import { CustomerActions } from "./customer-actions";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  ColumnDef,
  RowSelectionState,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Facebook,
  Globe,
  Instagram,
  MessageCircle,
  Twitter,
  Linkedin,
  Send,
  Search,
  Play,
  Hash,
  Filter,
  X,
  Download,
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

const SourceIcon = ({ source }: { source: string }) => {
  const iconClass = "h-3.5 w-3.5";
  switch (source.toLowerCase()) {
    case "facebook":
      return <Facebook className={`${iconClass} text-[#1877F2]`} />;
    case "twitter":
      return <Twitter className={`${iconClass} text-[#1DA1F2]`} />;
    case "instagram":
      return <Instagram className={`${iconClass} text-[#E4405F]`} />;
    case "linkedin":
      return <Linkedin className={`${iconClass} text-[#0A66C2]`} />;
    case "whatsapp":
      return <MessageCircle className={`${iconClass} text-[#25D366]`} />;
    case "telegram":
      return <Send className={`${iconClass} text-[#0088cc]`} />;
    case "messenger":
      return <MessageCircle className={`${iconClass} text-[#0084FF]`} />;
    case "discord":
      return <Hash className={`${iconClass} text-[#5865F2]`} />;
    case "snapchat":
      return <MessageCircle className={`${iconClass} text-[#FFFC00]`} />;
    default:
      return <Globe className={`${iconClass} text-muted-foreground`} />;
  }
};

export default function CustomerTable() {
  const navigate = useNavigate();
  const { data: customerResponse, isLoading } = useGetCustomers();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const customerListData: Customer[] = customerResponse?.data ?? [];

  const handleSourceChange = (checked: boolean, value: string) => {
    const newSelectedSources = checked
      ? [...selectedSources, value]
      : selectedSources.filter((v) => v !== value);

    setSelectedSources(newSelectedSources);
    table
      .getColumn("source")
      ?.setFilterValue(
        newSelectedSources.length ? newSelectedSources : undefined,
      );
  };

  const columns: ColumnDef<Customer>[] = [
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
      id: "user",
      accessorFn: (row) => `${row.name} ${row.contact}`,
      header: "User",
      size: 250,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={row.original.profile_uri || ""} />
            <AvatarFallback className="text-[10px]">
              {row.original.name
                ? row.original.name.charAt(0).toUpperCase()
                : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="font-medium text-foreground">
              {row.original.name}
            </div>
            <div className="text-sm text-muted-foreground">
              {row.original.contact}
            </div>
          </div>
        </div>
      ),
      meta: {
        headerClassName: "font-medium",
        skeleton: (
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ),
      },
    },
    {
      accessorKey: "source",
      header: "Source",
      size: 150,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <SourceIcon source={row.original.source} />
          <span className="text-sm text-muted-foreground">
            {row.original.source}
          </span>
        </div>
      ),
      meta: {
        headerClassName: "font-medium",
        skeleton: (
          <div className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-3.5 rounded" />
            <Skeleton className="h-4 w-16" />
          </div>
        ),
      },
      filterFn: (row, id, value) => {
        if (!value || !Array.isArray(value)) return true;
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "updatedDate",
      header: "Last Updated",
      size: 140,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.original.updatedDate).toLocaleDateString()}
        </span>
      ),
      meta: {
        headerClassName: "font-medium",
        skeleton: <Skeleton className="h-4 w-16" />,
      },
    },
    {
      accessorKey: "createdDate",
      header: "Created",
      size: 140,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.original.createdDate).toLocaleDateString()}
        </span>
      ),
      meta: {
        headerClassName: "font-medium",
        skeleton: <Skeleton className="h-4 w-20" />,
      },
    },
    {
      accessorKey: "conversation_count",
      header: "Conversation",
      size: 120,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.conversation_count}
        </span>
      ),
      meta: {
        headerClassName: "font-medium",
        skeleton: <Skeleton className="h-4 w-8" />,
      },
    },
    {
      id: "actions",
      header: "",
      size: 40,
      cell: ({ row }) => <CustomerActions customer={row.original} />,
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data: customerListData,
    columns,
    state: {
      pagination,
      rowSelection,
      globalFilter: debouncedSearchTerm,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setSearchTerm,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="h-full p-4 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-10 bg-transparent">
                <Filter className="h-4 w-4" />
                Filter
                {selectedSources.length > 0 && (
                  <Badge
                    variant="secondary"
                    className=" rounded-sm px-2 font-normal"
                  >
                    {selectedSources.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-0" align="start">
              <div className="p-2">
                <div className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                  Source
                </div>
                <div className="space-y-1">
                  {["Facebook", "Instagram", "Twitter"].map((source) => {
                    const count = table
                      .getCoreRowModel()
                      .rows.filter(
                        (item) => item.original.source === source,
                      ).length;
                    return (
                      <div
                        key={source}
                        className="flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
                      >
                        <Checkbox
                          id={source}
                          checked={selectedSources.includes(source)}
                          onCheckedChange={(checked) =>
                            handleSourceChange(checked === true, source)
                          }
                        />
                        <Label
                          htmlFor={source}
                          className="flex flex-1 items-center justify-between text-sm font-normal cursor-pointer"
                        >
                          <span>{source}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {count}
                          </span>
                        </Label>
                      </div>
                    );
                  })}
                </div>
                {selectedSources.length > 0 && (
                  <div className="pt-2 mt-2 border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-xs font-normal h-8"
                      onClick={() => {
                        setSelectedSources([]);
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <Button className="h-10">
            <Download />
            Download
          </Button>
        </div>
      </div>
      <DataGrid
        table={table}
        isLoading={isLoading}
        recordCount={table.getFilteredRowModel().rows.length}
        tableLayout={{
          headerBackground: false,
          rowBorder: true,
          rowRounded: false,
          width: "fixed",
        }}
        onRowClick={(row) => navigate(`/customers/details`)}
      >
        <div className="w-full min-h-[calc(100vh-11.2rem)] flex flex-col justify-between space-y-2.5">
          <DataGridContainer border={false}>
            <ScrollArea className="h-full w-full">
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
