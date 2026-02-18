import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";

import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/dashboard/test-agent/login-form";
import { SignUpForm } from "@/components/dashboard/test-agent/signup-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCompanyById } from "@/provider/company/company.queries";
import { Loader2 } from "lucide-react";

export default function ProvideInfoPage() {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const [isLogin, setIsLogin] = useState(false);

  const { data: company, isLoading, isError } = useCompanyById(companyId);
  console.log("this is data", company);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const handleSubmit = () => {
    navigate(`/test-agent/chat/${companyId}`);
  };

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
                  <BreadcrumbPage className="font-semibold text-sm md:text-base">
                    {company?.company_name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex items-center justify-center">
        {isError || !company ? (
          <div className="text-muted-foreground">Company not found</div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center w-full h-full">
            {/* left - Forms */}
            <div className="flex-1 flex flex-col max-w-lg justify-center w-full">
              {isLogin ? (
                <LoginForm
                  onToggle={() => setIsLogin(false)}
                  onSubmit={handleSubmit}
                />
              ) : (
                <SignUpForm
                  onToggle={() => setIsLogin(true)}
                  onSubmit={handleSubmit}
                />
              )}
            </div>

            {/* right - Company Info */}
            <div className="flex-1 flex flex-col justify-center space-y-8 max-w-lg mx-auto p-6 md:mx-0">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 rounded-lg border">
                  <AvatarImage
                    src={company.logo || undefined}
                    alt={company.company_name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xl rounded-lg font-bold bg-muted text-primary">
                    {company.company_name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {company.company_name}
                    </h2>
                    <Badge variant="secondary" className="text-xs uppercase">
                      {company.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {company.subdomain || "No subdomain"}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Welcome to Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Please fill out the form to get connected with our support
                  agents. We'll match you with the right team based on your
                  needs.
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-4 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Category
                  </p>
                  <p className="font-medium truncate">
                    {company.company_category || "Not specified"}
                  </p>
                </div>
                <div className="space-y-1 border-l pl-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Country
                  </p>
                  <p className="font-medium truncate">
                    {company.country || "Not specified"}
                  </p>
                </div>
                <div className="space-y-1 border-l pl-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Language
                  </p>
                  <p className="font-medium truncate">
                    {company.language || "Not specified"}
                  </p>
                </div>
                <div className="space-y-1 border-l pl-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Timezone
                  </p>
                  <p className="font-medium truncate">
                    {company.timezone || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
