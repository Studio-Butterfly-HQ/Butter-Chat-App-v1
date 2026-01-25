import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {EmployeeTable}  from '@/components/dashboard/audiences/employee-table';
import {DepartmentTable}  from '@/components/dashboard/audiences/department-table';

const AudiencesPage = () => {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <div className="min-h-screen bg-popover rounded-b-xl">
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b border-border rounded-none w-full justify-start h-auto p-0 mb-4">
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
            <EmployeeTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AudiencesPage;
