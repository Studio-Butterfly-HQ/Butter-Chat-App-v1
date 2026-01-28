import { useMemo, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid";
import { DataGridPagination } from "@/components/ui/data-grid-pagination";
import { DataGridTable } from "@/components/ui/data-grid-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Search, Eye, RefreshCcw, Trash2 } from "lucide-react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import websites from "@/constants/dummy/websites.json";
import employees from "@/constants/employees.json";

export type SyncStatus = "SYNCED" | "FAILED" | "QUEUED";

export interface WebsiteRow {
  website_name: string;
  website_url: string;
  status: SyncStatus;
  last_updated: string;
}

export interface IEmployee {
  user_name: string;
  email: string;
    profile_uri: string;
    departments: string[];
    assigned_conversations: number;
    is_online: boolean;
    last_updated: string;
}

interface InviteEmployeeFormValues {
  name: string;
  email: string;
  department: string;
  shift: string;
}

export function WebsitesTable() {
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

  const inviteForm = useForm<InviteEmployeeFormValues>({
    defaultValues: {
      name: "",
      email: "",
      department: "",
      shift: "",
    },
    mode: "onBlur",
  });

  const StatusBadge = ({ status }: { status: SyncStatus }) => {
    if (status === "SYNCED") {
      return <Badge className="bg-green-500/10 text-green-500">Synced</Badge>;
    }

    if (status === "FAILED") {
      return <Badge className="bg-red-500/10 text-red-500">Failed</Badge>;
    }

    return <Badge className="bg-blue-500/10 text-blue-500">Queued</Badge>;
  };

const websiteColumns: ColumnDef<WebsiteRow>[] = [
  // ================= Website =================
  {
    accessorKey: "website_name",
    header: "Website URL",
    size: 420,
    cell: ({ row }) => (
      <div>
        <div className="font-medium">
          {row.original.website_name}
        </div>
        <div className="text-sm text-muted-foreground">
          {row.original.website_url}
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

        <Button className="h-10">
          <Plus />
          Add Website
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-popover max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium text-primary">
                Invite New Employee
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Enter the email of the person you want to invite. They will
                receive an invitation email.
              </DialogDescription>
            </DialogHeader>
            <Form {...inviteForm}>
              <form
                onSubmit={inviteForm.handleSubmit((data) => {
                  console.log("Invite employee:", data);
                  setIsDialogOpen(false);
                  inviteForm.reset();
                })}
              >
                <div className="space-y-5 mt-2">
                  {/* Employee Name */}
                  <FormField
                    control={inviteForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm text-primary">
                          Employee Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          className="h-10"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Employee Email */}
                  <FormField
                    control={inviteForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm text-primary">
                          Employee Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <Input
                          {...field}
                          type="email"
                          placeholder="user@example.com"
                          className="h-10"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Department */}
                  <FormField
                    control={inviteForm.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm text-primary">
                          Department <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select a Department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineering">
                              Engineering
                            </SelectItem>
                            <SelectItem value="support">Support</SelectItem>
                            <SelectItem value="hr">HR</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Shift */}
                  <FormField
                    control={inviteForm.control}
                    name="shift"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm text-primary">
                          Shift <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select a Shift" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="evening">Evening</SelectItem>
                            <SelectItem value="night">Night</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter className="flex gap-2 md:gap-0 mt-6">
                  <DialogClose asChild>
                    <Button variant="outline" className="bg-transparent">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Send Invitation</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
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
