import React from 'react'
import { WebsitesTable } from '@/components/dashboard/agent/websites/websites-table'

export default function WebsitePage() {
  return (
    <div className="bg-popover rounded-b-xl min-h-[calc(100vh-90px)]">
      <WebsitesTable />
    </div>
  )
}
