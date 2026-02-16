import CustomerTable from "@/components/dashboard/customer/customer-table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
export default function CustomerPage() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <header className="flex mb-0.5 h-16 border-b border-border shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
          <div className="flex items-center gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-sm md:text-base font-semibold">
                    Customer
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4">
          <Badge
            variant="outline"
            className="cursor-pointer text-muted-foreground  rounded-full hover:bg-accent px-3 py-1.5 text-xs font-normal"
          >
            <BookOpen className="h-3 w-3 mr-1.5" />
            Learn More
          </Badge>
        </div>
      </header>
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
        <CustomerTable />
      </div>
    </div>
  );
}
