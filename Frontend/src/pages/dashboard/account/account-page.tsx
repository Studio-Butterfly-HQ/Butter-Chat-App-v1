import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveAccountTab } from "@/store/slices/ui/ui-slice";
import DateTime from "@/components/dashboard/account/date-time/date-time";
import Security from "@/components/dashboard/account/security/security";
import General from "@/components/dashboard/account/general/general";

const AccountPage = () => {
  const dispatch = useAppDispatch();
  const { activeAccountTab } = useAppSelector((state) => state.ui);

  return (
    <>
      <header className="flex flex-col md:flex-row mb-0.5 min-h-16 md:h-16 shrink-0 items-start md:items-center justify-between gap-3 md:gap-2 py-3 md:py-0 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full md:w-auto">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            <span className="text-sm md:text-base font-semibold whitespace-nowrap">
              My Account
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 w-full md:w-auto justify-start md:justify-end overflow-x-auto">
          <Badge
            variant="outline"
            className="cursor-pointer text-muted-foreground rounded-full hover:bg-accent px-2 md:px-3 py-1.5 text-xs font-normal whitespace-nowrap"
            onClick={() => {
              /* TODO: Open documentation */
            }}
          >
            <BookOpen className="h-3 w-3 mr-1.5" />
            <span>Learn More</span>
          </Badge>
        </div>
      </header>
      <div className="mx-auto w-full">
        <Tabs
          value={activeAccountTab}
          onValueChange={(value) => dispatch(setActiveAccountTab(value))}
          className="w-full"
        >
          <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 pl-4 mb-4">
            <TabsTrigger
              value="general"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              General
            </TabsTrigger>

            <TabsTrigger
              value="security"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-0">
            <General />
          </TabsContent>
          <TabsContent value="security" className="mt-0">
            <Security />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AccountPage;
