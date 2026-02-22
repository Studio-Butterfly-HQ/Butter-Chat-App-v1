import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, ChevronRight } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDebounce } from "@/hooks/use-debounce";
import { useCompanyList } from "@/provider/company/company.queries";
import { Company } from "@/provider/company/company.types";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CompanyTable() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
  const { data: companyData, isLoading } = useCompanyList();

  const companies = companyData?.data || [];
  // console.log(companies);

  const companyColumns: ColumnDef<Company>[] = [
    // ================= Logo =================
    {
      accessorKey: "logo",
      header: "",
      size: 45,
      cell: ({ row }) => (
        <Avatar className="rounded-md">
          <AvatarImage
            src={row.original?.logo || undefined}
            alt={row.original.company_name}
            className="object-cover"
          />
          <AvatarFallback className="rounded-md">
            {row.original.company_name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      ),
      meta: {
        skeleton: <Skeleton className="h-10 w-10 rounded-md" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Company Name =================
    {
      accessorKey: "company_name",
      header: "Company Name",
      size: 300,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">
            {row.original.company_name}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.subdomain}
          </span>
        </div>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-48" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Company Category =================
    {
      accessorKey: "company_category",
      header: "Category",
      size: 150,
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.company_category || "-"}
        </span>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-24" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Joined =================
    {
      accessorKey: "createdDate",
      header: "Joined",
      size: 150,
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.createdDate
            ? format(new Date(row.original.createdDate), "dd MMM, yyyy")
            : "-"}
        </span>
      ),
      meta: {
        skeleton: <Skeleton className="h-4 w-24" />,
        headerClassName: "font-medium",
      },
    },

    // ================= Status =================
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
      cell: ({ row }) => (
        <span className="text-muted-foreground capitalize">
          {row.original.status?.toLowerCase()}
        </span>
      ),
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
          <Button
            className="h-8 w-8 rounded-full"
            onClick={() => navigate(`${row.original.id}`)}
          >
            <ChevronRight />
          </Button>
        </div>
      ),
      meta: {
        skeleton: (
          <div className="flex gap-4 justify-end">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        ),
        headerClassName: "font-medium",
      },
    },
  ];

  const table = useReactTable({
    data: companies,
    columns: companyColumns,
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
              placeholder="Search Company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 bg-transparent border-input"
            />
          </div>
          <Button className="h-10 bg-white text-black hover:bg-gray-200">
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </div>

        <DataGrid
          table={table}
          isLoading={isLoading}
          recordCount={companies.length}
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
    </>
  );
}
