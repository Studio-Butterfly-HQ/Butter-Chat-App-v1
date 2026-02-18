import { useParams, Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import companyData from "@/constants/dummy/company.json";
import { useNavigate } from "react-router-dom";

export default function ProvideInfoPage() {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const company = companyData.find((c) => c.id === companyId);

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
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
                  <BreadcrumbLink asChild>
                    <Link to="/test-agent">Test Agent</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold">
                    {company.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center w-full max-w-5xl">
          {/* Card 1 */}
          <Card className="flex-1 w-full shadow-none bg-transparent border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">
                We're Almost there
              </CardTitle>
              <CardDescription>
                Just provide a little info to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="What's your name?"
                className="bg-muted/50 border-0"
              />
              <Input
                placeholder="What's your email?"
                className="bg-muted/50 border-0"
              />
              <Button
                size="lg"
                className="w-full"
                onClick={() => navigate(`/test-agent/chat/${companyId}`)}
              >
                Start Conversation
              </Button>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="flex-1 w-full shadow-none bg-transparent border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">
                Context Info
              </CardTitle>
              <CardDescription>Please provide context details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Subject" className="bg-muted/50 border-0" />
              <Input placeholder="Message" className="bg-muted/50 border-0" />
              <Button
                size="lg"
                className="w-full"
              >
                Start Conversation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
