import UnassignedTable from "@/components/dashboard/inbox/unassigned/unassigned-table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { SlidersHorizontal, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleCustomerChat,
  closeUserSidebar,
} from "@/store/slices/ui/ui-slice";

export default function UnassignedPage() {
  const dispatch = useAppDispatch();
  const isUserSidebarOpen = useAppSelector(
    (state) => state.ui.isUserSidebarOpen,
  );

  const handleViewClick = () => {
    if (isUserSidebarOpen) {
      dispatch(closeUserSidebar());
    }
    dispatch(toggleCustomerChat());
  };

  return (
    <div className="h-full flex flex-col">
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
                    Unassigned
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 gap-1.5 px-2 bg-transparent"
            >
              <SlidersHorizontal className="h-3 w-3" />
              Filter
            </Button>
            <Button
              variant="default"
              size="sm"
              className="h-7 gap-1.5 px-2"
              onClick={handleViewClick}
            >
              <Layout className="h-3 w-3" />
              View
            </Button>
          </div>
        </div>
      </header>
      <UnassignedTable />
    </div>
  );
}
