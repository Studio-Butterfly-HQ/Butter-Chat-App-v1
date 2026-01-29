import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {EmployeeTable}  from '@/components/user-profile/teams/employee-table';
import {DepartmentTable}  from '@/components/user-profile/teams/department-table';
import {ShiftTable}  from '@/components/user-profile/teams/shift-table';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const TeamsPage = () => {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <div className="min-h-[calc(100vh-90px)] bg-popover rounded-b-xl">
      <header className="flex bg-popover rounded-t-xl mb-0.5 h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-6"
          />
          <div className="flex items-center gap-4">
            <span className="text-base font-semibold">AI Agent</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4">
          <Badge variant="outline" className="cursor-pointer rounded-full hover:bg-accent px-3 py-1.5 text-xs font-normal">
            <BookOpen className="h-3 w-3 mr-1.5" />
            Learn More
          </Badge>
        </div>
      </header>
      <div className="mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 pl-4 mb-4">
            <TabsTrigger 
              value="employees" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              Employees
            </TabsTrigger>
            <TabsTrigger 
              value="departments"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              Departments
            </TabsTrigger>
            <TabsTrigger 
              value="shifts"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent bg-transparent px-4 py-3 text-muted-foreground data-[state=active]:text-foreground"
            >
              Shifts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="mt-0">
            <EmployeeTable />
          </TabsContent>
          
          <TabsContent value="departments" className="mt-0">
            <DepartmentTable />
          </TabsContent>
          
          <TabsContent value="shifts" className="mt-0">
            <ShiftTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeamsPage;
