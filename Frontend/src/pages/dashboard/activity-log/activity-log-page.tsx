import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import User from "@/components/dashboard/activity-log/user";
import Error from "@/components/dashboard/activity-log/error";
import Email from "@/components/dashboard/activity-log/email";
import Ingestion from "@/components/dashboard/activity-log/ingestion";
import { useState } from "react";

const ActivityLogPage = () => {
    const [activeTab, setActiveTab] = useState("user");
    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <header className="flex mb-0.5 h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
          <div className="flex items-center gap-4">
            <span className="text-base font-semibold">Activity Log</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4">
          <Badge
            variant="outline"
            className="cursor-pointer text-muted-foreground rounded-full hover:bg-accent px-3 py-1.5 text-xs font-normal"
          >
            <BookOpen className="h-3 w-3 mr-1.5" />
            Learn More
          </Badge>
        </div>
      </header>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex-1 min-h-0 flex flex-col"
      >
        <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 pl-4 shrink-0">
          <TabsTrigger
            value="user"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
          >
            User
          </TabsTrigger>
          <TabsTrigger
            value="error"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
          >
            Error
          </TabsTrigger>
          <TabsTrigger
            value="email"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
          >
            Email
          </TabsTrigger>
          <TabsTrigger
            value="ingestion"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
          >
            Ingestion
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
          <TabsContent value="user" className="mt-0 h-full">
            <User />
          </TabsContent>

          <TabsContent value="error" className="mt-0 h-full">
            <Error />
          </TabsContent>

          <TabsContent value="email" className="mt-0 h-full">
            <Email />
          </TabsContent>

          <TabsContent value="ingestion" className="mt-0 h-full">
            <Ingestion />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ActivityLogPage;