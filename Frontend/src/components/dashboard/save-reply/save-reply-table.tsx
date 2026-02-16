import { useState, useMemo } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  EllipsisVertical,
  Search,
  Filter,
  Download,
  Trash2,
  Pencil,
  Plus,
  Lock,
  Globe,
  User,
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
import saveReplyListData from "@/constants/dummy/save-reply-list.json";
import { useNavigate } from "react-router-dom";

interface SaveReplyListData {
  id: string;
  title: string;
  description: string;
  owner: { name: string; avatar: string };
  type: string;
  lastUpdated: string;
}

const TypeIcon = ({ type }: { type: string }) => {
  if (type.toLowerCase() === "private") {
    return <User className="h-4 w-4 text-muted-foreground" />;
  }
  return <Globe className="h-4 w-4 text-muted-foreground" />;
};

const SaveReplyActions = ({ saveReply }: { saveReply: SaveReplyListData }) => {
  return (
    <div className="flex items-center gap-4">
      <Trash2 className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive" />
      <Pencil className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
    </div>
  );
};

export default function SaveReplyTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const navigate = useNavigate();

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const handleTypeChange = (checked: boolean, value: string) => {
    const newSelectedTypes = checked ? [...selectedTypes, value] : selectedTypes.filter((v) => v !== value);
    setSelectedTypes(newSelectedTypes);
    table.getColumn("type")?.setFilterValue(newSelectedTypes.length ? newSelectedTypes : undefined);
  };

  const columns: ColumnDef<SaveReplyListData>[] = [
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
      id: "savedReply",
      accessorFn: (row) => `${row.title} ${row.description}`,
      header: "Saved Reply",
      size: 400,
      cell: ({ row }) => (
        <div className="flex flex-col gap-1">
          <div className="font-medium text-foreground">
            {row.original.title}
          </div>
          <div className="text-sm text-muted-foreground line-clamp-1">
            {row.original.description}
          </div>
        </div>
      ),
      meta: {
        headerClassName: "font-medium",
        skeleton: (
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        ),
      },
    },
    {
      id: "owner",
      accessorFn: (row) => row.owner.name,
      header: "Owner",
      size: 200,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={row.original.owner.avatar} />
            <AvatarFallback className="text-[10px]">
              {row.original.owner.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {row.original.owner.name}
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
      accessorKey: "type",
      header: "Type",
      size: 150,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <TypeIcon type={row.original.type} />
          <span className="text-sm text-muted-foreground">
            {row.original.type}
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
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      size: 140,
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {row.original.lastUpdated}
        </span>
      ),
      meta: {
        headerClassName: "font-medium",
        skeleton: <Skeleton className="h-4 w-20" />,
      },
    },
    {
      id: "actions",
      header: "",
      size: 80,
      cell: ({ row }) => <SaveReplyActions saveReply={row.original} />,
      enableSorting: false,
    },
  ];

  const table = useReactTable({
    data: saveReplyListData as SaveReplyListData[],
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
    <div className="h-full p-4 pb-0 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 shrink-0">
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
                {selectedTypes.length > 0 && (
                  <Badge
                    variant="secondary"
                    className=" rounded-sm px-2 font-normal"
                  >
                    {selectedTypes.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-0" align="start">
              <div className="p-2">
                <div className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                  Type
                </div>
                <div className="space-y-1">
                  {["Private", "Public"].map((type) => {
                    const count = table.getCoreRowModel().rows.filter((item) => item.original.type === type).length;
                    return (
                      <div
                        key={type}
                        className="flex items-center space-x-2 rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground"
                      >
                        <Checkbox
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) =>
                            handleTypeChange(checked === true, type)
                          }
                        />
                        <Label
                          htmlFor={type}
                          className="flex flex-1 items-center justify-between text-sm font-normal cursor-pointer"
                        >
                          <span>{type}</span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {count}
                          </span>
                        </Label>
                      </div>
                    );
                  })}
                </div>
                {selectedTypes.length > 0 && (
                  <div className="pt-2 mt-2 border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-xs font-normal h-8"
                      onClick={() => {
                        setSelectedTypes([]);
                      }}
                    >
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          <Button className="h-10" onClick={() => navigate("/save-reply/add-reply")}>
            <Plus className="h-4 w-4" />
            Add Reply
          </Button>
        </div>
      </div>
      <DataGrid
        table={table}
        recordCount={table.getFilteredRowModel().rows.length}
        tableLayout={{
          headerBackground: false,
          rowBorder: true,
          rowRounded: false,
          width: "fixed",
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
