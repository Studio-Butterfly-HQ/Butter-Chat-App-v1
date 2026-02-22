import ChatBox from "@/components/dashboard/test-agent/chat-box";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams, Link } from "react-router-dom";
import { useCompanyById } from "@/provider/company/company.queries";
import { RefreshCcw, X, Loader2 } from "lucide-react";

export default function AskButterAiPage() {
  const { companyId } = useParams();
  const { data: company, isLoading } = useCompanyById(companyId);
  const dispatch = useAppDispatch();
  return (
    <div className="flex dark:h-[calc(100vh-1.5rem)] h-[calc(100vh-1.6rem)] flex-col justify-center overflow-hidden">
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
                <BreadcrumbItem className="hidden md:block text-sm md:text-base font-semibold">
                  <BreadcrumbLink asChild className="font-semibold">
                    <Link to="/test-agent">Test Agent</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="font-semibold text-sm md:text-base">
                    <Link to={`/test-agent/${companyId}`}>
                      {company?.company_name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-sm md:text-base">
                    Chat Box
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4">
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-full bg-transparent font-normal"
          >
            <RefreshCcw className="h-4 w-4" />
            Reset Chat
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 rounded-full bg-transparent font-normal"
          >
            <X className="h-4 w-4" />
            Close Session
          </Button>
        </div>
      </header>
      <ChatBox />
    </div>
  );
}
