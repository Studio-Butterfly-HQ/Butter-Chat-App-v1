import { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {Configure} from '@/components/dashboard/agent/configure';
import {KnowledgeBase} from '@/components/dashboard/agent/knowledge-base';
import Flow from '@/components/dashboard/agent/flow';
import Tool from '@/components/dashboard/agent/tool';

const AiAgentPage = () => {
  const [activeTab, setActiveTab] = useState('configure');
  const location = useLocation();
  const isSubRoute = location.pathname !== '/ai-agent';

  if (isSubRoute) {
    return <Outlet />;
  }

  return (
    <div className="min-h-[calc(100vh-90px)] bg-popover rounded-b-xl">
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
