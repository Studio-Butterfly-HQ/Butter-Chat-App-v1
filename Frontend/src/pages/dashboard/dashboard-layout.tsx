import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useCompanyProfile } from "@/provider/profile/profile.queries";
import { SidebarRight } from "@/components/sidebar-right";

export default function DashboardLayout() {
  const { isLoading } = useCompanyProfile();
  return (
    <SidebarProvider>
      <AppSidebar isLoading={isLoading} />
      <SidebarInset>
        {/* <header className="flex bg-popover rounded-t-xl mb-0.5 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-6"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header> */}
        <main className="min-h-[calc(100vh-1.5rem)] md:m-3 md:ml-0 bg-popover md:rounded-xl flex-1 overflow-y-auto scrollbar-hide">
          <Outlet />
        </main>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
