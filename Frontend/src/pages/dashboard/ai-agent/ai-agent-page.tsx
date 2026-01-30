import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BookOpen, Play, Bot } from 'lucide-react';
import {Configure} from '@/components/dashboard/agent/configure';
import {KnowledgeBase} from '@/components/dashboard/agent/knowledge-base';
import Flow from '@/components/dashboard/agent/flow';
import Tool from '@/components/dashboard/agent/tool';

const AiAgentPage = () => {
  const [activeTab, setActiveTab] = useState('configure');
  const [selectedAgent, setSelectedAgent] = useState('aarong-agent');

  return (
    <div className="rounded-xl">
      <header className="flex mb-0.5 h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
          <div className="flex items-center gap-4">
            <span className="text-base font-semibold">AI Agent</span>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-[180px] h-auto px-6 py-1.5 text-xs font-normal border rounded-full hover:bg-accent">
                <SelectValue className="text-xs" placeholder="Select agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aarong-agent">Aarong Agent</SelectItem>
                <SelectItem value="customer-support">Customer Support</SelectItem>
                <SelectItem value="sales-agent">Sales Agent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4">
          <Badge variant="outline" className="cursor-pointer rounded-full hover:bg-accent px-3 py-1.5 text-xs font-normal">
            <BookOpen className="h-3 w-3 mr-1.5" />
            Learn More
          </Badge>
          <Badge variant="outline" className="cursor-pointer rounded-full hover:bg-accent px-3 py-1.5 text-xs font-normal">
            <Bot className="h-3 w-3 mr-1.5" />
            Test AI Agent
          </Badge>
          <Badge className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-normal">
            <Play className="h-3 w-3 mr-1.5" />
            Enable AI Agent
          </Badge>
        </div>
      </header>
      <div className="mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
            <Configure />
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
    </div>
  );
};

export default AiAgentPage;
