import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookOpen, Play, BotMessageSquare } from "lucide-react";
import { Configure } from "@/components/dashboard/agent/tabs/configure/configure";
import { KnowledgeBase } from "@/components/dashboard/agent/tabs/knowledge-base";
import Flow from "@/components/dashboard/agent/tabs/flow";
import Tool from "@/components/dashboard/agent/tabs/tool";
import { useGetAgents } from "@/provider/agent/agent.queries";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  openTestAiAgent,
  setActiveAiAgentTab,
  setSelectedAiAgentId,
} from "@/store/slices/ui/ui-slice";

const AiAgentPage = () => {
  const { data: agentsData, isLoading } = useGetAgents();
  const selectedAgentId = useAppSelector((state) => state.ui.selectedAiAgentId);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isTestAiAgentOpen);
  const activeTab = useAppSelector((state) => state.ui.activeAiAgentTab);

  const agents = agentsData?.data || [];
  const activeAgent = agents.find((agent) => agent.id === selectedAgentId);

  // Set default selected agent
  useEffect(() => {
    if (agents.length > 0 && !selectedAgentId) {
      dispatch(setSelectedAiAgentId(agents[0].id));
    }
  }, [agents, selectedAgentId]);

  const handleTabChange = (value: string) => {
    dispatch(setActiveAiAgentTab(value));
  };

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
              AI Agent
            </span>
            <Select
              value={selectedAgentId || ""}
              onValueChange={(value) => dispatch(setSelectedAiAgentId(value))}
            >
              <SelectTrigger className="w-auto min-w-[160px] h-auto px-4 md:px-6 py-1.5 text-xs font-normal border rounded-full hover:bg-accent">
                <SelectValue className="text-xs" placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent className="w-auto min-w-[160px]">
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.agent_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          <Badge
            variant="outline"
            className={`cursor-pointer text-muted-foreground rounded-full hover:bg-accent px-3 py-1.5 text-xs font-normal whitespace-nowrap ${isOpen ? "bg-accent" : ""}`}
            onClick={() => dispatch(openTestAiAgent())}
          >
            <BotMessageSquare className="h-3.5 w-3.5 mr-1.5" />
            <span>Test AI Agent</span>
          </Badge>
          <Badge className="cursor-pointer rounded-full px-2 md:px-3 py-1.5 text-xs font-normal whitespace-nowrap">
            <Play className="h-3 w-3 mr-1.5" />
            <span>Enable AI Agent</span>
          </Badge>
        </div>
      </header>
      <div className="mx-auto w-full">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 pl-4 mb-4">
            <TabsTrigger
              value="configure"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              Configure
            </TabsTrigger>
            <TabsTrigger
              value="knowledgeBase"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger
              value="flow"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              Flow
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configure" className="mt-0">
            <Configure selectedAgent={activeAgent} />
          </TabsContent>

          <TabsContent value="knowledgeBase" className="mt-0">
            <KnowledgeBase />
          </TabsContent>
          <TabsContent value="flow" className="mt-0">
            <Flow />
          </TabsContent>

          <TabsContent value="tools" className="mt-0">
            <Tool />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AiAgentPage;
