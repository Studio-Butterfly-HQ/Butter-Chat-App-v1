import React from 'react'
import { WebsitesTable } from '@/components/dashboard/agent/websites/websites-table'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from 'react-router-dom'

export default function WebsitePage() {
  return (
    <div className="h-full flex flex-col">
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
                    <Link to="/ai-agent">AI Agent</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="text-sm md:text-base font-semibold">
                  <BreadcrumbPage className="font-semibold">Websites</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4">
          <Badge
            variant="outline"
            className="cursor-pointer text-muted-foreground  rounded-full hover:bg-accent px-3 py-1.5 text-xs font-normal"
          >
            <BookOpen className="h-3 w-3 mr-1.5" />
            Learn More
          </Badge>
        </div>
      </header>
      <WebsitesTable />
    </div>
  )
}
